#!/usr/bin/env python3
"""
scripts/generate-og-default.py

Generates /assets/og-default-insights.png (1200x630) as the fallback OG image
for Insight articles that lack a hero image.

Palette pulled from /styles.css design tokens:
  off-white   #f8f7f4
  black       #0a0a0a
  teal-dark   #009e85
  slate       #6b7280
  border      #e5e7eb

Fonts: DejaVu Serif Bold for the wordmark (closest system substitute for DM
Serif Display); DejaVu Sans for the eyebrow and label. Re-render with the
real DM Serif Display if/when designer assets become available.

Run:
  python3 scripts/generate-og-default.py
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og-default-insights.png"

# Brand tokens
OFF_WHITE = (248, 247, 244)
BLACK = (10, 10, 10)
TEAL_DARK = (0, 158, 133)
SLATE = (107, 114, 128)
BORDER = (229, 231, 235)

W, H = 1200, 630

img = Image.new("RGB", (W, H), OFF_WHITE)
draw = ImageDraw.Draw(img)

# Subtle dot grid background (mirrors the on-site .page-hero-bg dot pattern)
for y in range(20, H, 24):
    for x in range(20, W, 24):
        draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(0, 158, 133, 12))

# Top-left teal dot mark + brand wordmark
DOT_X, DOT_Y, DOT_R = 80, 80, 8
draw.ellipse([DOT_X - DOT_R, DOT_Y - DOT_R, DOT_X + DOT_R, DOT_Y + DOT_R], fill=TEAL_DARK)

font_brand = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 20)
draw.text((DOT_X + 20, DOT_Y - 14), "The Product Operator", fill=BLACK, font=font_brand)

# Thin horizontal rule under the wordmark
draw.line([(80, 140), (1120, 140)], fill=BORDER, width=1)

# Eyebrow
font_eyebrow = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
draw.text((80, 210), "OPERATOR  INSIGHTS", fill=TEAL_DARK, font=font_eyebrow)

# Headline (serif, multi-line wrap)
font_headline = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 64)
headline_lines = [
    "The patterns behind",
    "PE-backed product",
    "value creation.",
]
y_cursor = 270
for line in headline_lines:
    draw.text((80, y_cursor), line, fill=BLACK, font=font_headline)
    y_cursor += 80

# Footer label
font_footer = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
draw.text((80, H - 80), "theproductoperator.ai", fill=SLATE, font=font_footer)

# Right-edge teal accent bar
draw.rectangle([(W - 12, 0), (W, H)], fill=TEAL_DARK)

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
