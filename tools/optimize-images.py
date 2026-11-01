"""Turns the photos in photos/ into web-ready WebP files in site/img/.

Each photo becomes NAME-800.webp and NAME-1600.webp (and NAME-og.jpg for the
ones used as social-share previews). Phone photos are rotated upright.

Usage:  python tools/optimize-images.py            (only new/changed photos)
        python tools/optimize-images.py --all      (rebuild everything)
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos"
OUT = ROOT / "site" / "img"
WIDTHS = (800, 1600)
OG = {"salon-noche", "novios-portal", "salon-montado", "fiesta", "portal-palmeras"}


def save(img, path, width, fmt):
    w, h = img.size
    if w > width:
        img = img.resize((width, round(h * width / w)), Image.LANCZOS)
    if fmt == "webp":
        img.save(path, "WEBP", quality=78, method=6)
    else:
        img.save(path, "JPEG", quality=82, optimize=True, progressive=True)


def main():
    rebuild = "--all" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    for src in sorted(SRC.iterdir()):
        if src.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        name = src.stem
        targets = [OUT / f"{name}-{w}.webp" for w in WIDTHS]
        if not rebuild and all(t.exists() and t.stat().st_mtime >= src.stat().st_mtime for t in targets):
            continue
        img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        for w, t in zip(WIDTHS, targets):
            save(img, t, w, "webp")
        if name in OG:
            save(img, OUT / f"{name}-og.jpg", 1200, "jpeg")
        print(f"{name}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
