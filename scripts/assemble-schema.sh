#!/usr/bin/env bash
#
# scripts/assemble-schema.sh
#
# Re-injects shared JSON-LD schema blocks (Person, Organization, WebSite) into
# every HTML page that contains the SCHEMA:SHARED markers.
#
# Usage:
#   bash scripts/assemble-schema.sh
#
# How it works:
#   1. Reads /schema/shared/{person,organization,website}.json
#   2. Wraps each in <script type="application/ld+json"> ... </script>
#   3. For every *.html at repo root, replaces the block between
#      <!-- SCHEMA:SHARED:START --> and <!-- SCHEMA:SHARED:END --> with the
#      freshly assembled content.
#
# To onboard a new page:
#   Add the following two markers inside its <head>, on their own lines:
#     <!-- SCHEMA:SHARED:START -->
#     <!-- SCHEMA:SHARED:END -->
#   Then run this script.
#
# Idempotent: re-running re-syncs all pages from the shared source files.
# No Node, Python, npm, or external tooling required (bash + awk only).
#
# Run this script after editing any file under /schema/shared/.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARED_DIR="$ROOT/schema/shared"
START_MARKER='<!-- SCHEMA:SHARED:START -->'
END_MARKER='<!-- SCHEMA:SHARED:END -->'

# Deterministic order ensures consistent output across runs.
SHARED_FILES=(person.json organization.json website.json)

for f in "${SHARED_FILES[@]}"; do
  if [[ ! -f "$SHARED_DIR/$f" ]]; then
    echo "ERROR: missing shared schema file: $SHARED_DIR/$f" >&2
    exit 1
  fi
done

# Build the assembled fragment in a temp file (handles JSON special chars safely).
FRAGMENT="$(mktemp)"
trap 'rm -f "$FRAGMENT"' EXIT

{
  echo "$START_MARKER"
  for f in "${SHARED_FILES[@]}"; do
    echo '<script type="application/ld+json">'
    cat "$SHARED_DIR/$f"
    echo
    echo '</script>'
  done
  echo "$END_MARKER"
} > "$FRAGMENT"

updated=0
skipped=0
unchanged=0

for html in "$ROOT"/*.html; do
  [[ -f "$html" ]] || continue
  name="$(basename "$html")"

  if ! grep -qF "$START_MARKER" "$html"; then
    skipped=$((skipped + 1))
    continue
  fi

  if ! grep -qF "$END_MARKER" "$html"; then
    echo "ERROR: $name has START marker but no END marker" >&2
    exit 1
  fi

  # Awk-based replacement of the block between markers (inclusive).
  TMP_OUT="$(mktemp)"
  awk -v start="$START_MARKER" -v end="$END_MARKER" -v fragfile="$FRAGMENT" '
    BEGIN {
      while ((getline line < fragfile) > 0) {
        fragment = (fragment == "" ? line : fragment "\n" line)
      }
      close(fragfile)
    }
    {
      if (index($0, start) > 0) {
        print fragment
        in_block = 1
        next
      }
      if (in_block && index($0, end) > 0) {
        in_block = 0
        next
      }
      if (!in_block) print
    }
  ' "$html" > "$TMP_OUT"

  if cmp -s "$html" "$TMP_OUT"; then
    unchanged=$((unchanged + 1))
    rm "$TMP_OUT"
  else
    mv "$TMP_OUT" "$html"
    updated=$((updated + 1))
    echo "  updated: $name"
  fi
done

echo ""
echo "assemble-schema.sh complete."
echo "  updated:   $updated"
echo "  unchanged: $unchanged"
echo "  skipped:   $skipped (no SCHEMA:SHARED marker)"
