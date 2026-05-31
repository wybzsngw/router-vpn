"""处理 ShadowClash 教程的 3 张截图：保留原尺寸 (471x1024)，只精确打码隐私字段。

源图 hash 与文件名对应：
1. d203b4729c78e530b3fe03121c2d7ef9 -> shadowclash-1-connect.png
2. b51b04d8614d356d4d58b3db7e47418f -> shadowclash-2-dashboard.png  (打码 IP)
3. 50e8958dfb762a4ef05d580040648fcf -> shadowclash-3-add-profile.png
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SRC_DIR = Path(r"C:\Users\Administrator\.cursor\projects\e-router-vpn-router-vpn\assets")
DST_DIR = Path(r"E:\router-vpn\router-vpn\docs\images\mobile")
DST_DIR.mkdir(parents=True, exist_ok=True)


def find_source(hash_prefix: str) -> Path:
    matches = list(SRC_DIR.glob(f"*_{hash_prefix}-*.png"))
    if not matches:
        raise FileNotFoundError(f"未找到 hash {hash_prefix} 对应源图")
    return matches[0]


def fill_rect(img, box, color):
    """实心矩形覆盖。box=(x0,y0,x1,y1)。"""
    ImageDraw.Draw(img).rectangle(box, fill=color)


def draw_centered_text(img, box, text, color):
    """在矩形中央写一行小字（占位说明）。"""
    x0, y0, x1, y1 = box
    try:
        font = ImageFont.truetype("arial.ttf", 14)
    except OSError:
        font = ImageFont.load_default()
    draw = ImageDraw.Draw(img)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    cx = (x0 + x1) / 2 - tw / 2
    cy = (y0 + y1) / 2 - th / 2
    draw.text((cx, cy), text, fill=color, font=font)


def process_1():
    src = find_source("d203b4729c78e530b3fe03121c2d7ef9")
    img = Image.open(src).convert("RGB")
    img.save(DST_DIR / "shadowclash-1-connect.png", "PNG", optimize=True)


def process_2():
    """打码 IP 124.79.4.143（位于左侧 Network details 卡片内，浅灰背景）。"""
    src = find_source("b51b04d8614d356d4d58b3db7e47418f")
    img = Image.open(src).convert("RGB")
    box = (38, 514, 200, 558)
    fill_rect(img, box, (235, 238, 244))
    draw_centered_text(img, box, "*.*.*.*", (140, 145, 155))
    img.save(DST_DIR / "shadowclash-2-dashboard.png", "PNG", optimize=True)


def process_3():
    src = find_source("50e8958dfb762a4ef05d580040648fcf")
    img = Image.open(src).convert("RGB")
    img.save(DST_DIR / "shadowclash-3-add-profile.png", "PNG", optimize=True)


def main():
    process_1()
    process_2()
    process_3()
    print("完成。输出到:", DST_DIR)
    for p in sorted(DST_DIR.glob("*.png")):
        sz = Image.open(p).size
        print(f"  {p.name}  {sz[0]}x{sz[1]}  {p.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
