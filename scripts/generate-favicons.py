import os
import base64
from PIL import Image, ImageDraw, ImageFilter

SOURCE_IMAGE = r"C:\Users\seif almaz\.gemini\antigravity-ide\brain\478730c0-b4e7-4807-9ee0-1d64c4d4b93a\.user_uploaded\media_1791912314453.jpg"
PUBLIC_DIR = r"d:\HNU\Portfolio\portfolio\public"

def main():
    # 1. Load source image
    img = Image.open(SOURCE_IMAGE).convert("RGBA")
    print(f"Loaded source image: {img.size}, mode: {img.mode}")

    # 2. Save full original master in public/brand-logo.png
    brand_logo_path = os.path.join(PUBLIC_DIR, "brand-logo.png")
    img.save(brand_logo_path, format="PNG", optimize=True)
    print(f"Saved master brand logo: {brand_logo_path}")

    # 3. Crop balanced square around 'S' monogram
    # Center of monogram: cx = 526, cy = 495
    # Bounding box of monogram: width=413, height=524
    # Size 640 gives ~10% margin vertically and ~17% margin horizontally
    crop_size = 640
    cx, cy = 526, 495
    left = int(cx - crop_size / 2)
    top = int(cy - crop_size / 2)
    cropped = img.crop((left, top, left + crop_size, top + crop_size))

    # 4. Create high-resolution master with subtle squircle rounded corners (radius ~15%)
    # For 640x640, radius = 96px
    radius = 96
    mask = Image.new("L", (crop_size, crop_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, crop_size, crop_size), radius=radius, fill=255)
    
    icon_master = cropped.copy()
    icon_master.putalpha(mask)

    # 5. Generate multiple sizes
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    generated_images = {}
    for filename, sz in sizes.items():
        # High-quality Lanczos downsampling
        resized = icon_master.resize((sz, sz), Image.Resampling.LANCZOS)
        # Apply subtle sharpening on tiny icon sizes (16 and 32) so the 'S' remains ultra-crisp
        if sz <= 32:
            resized = resized.filter(ImageFilter.UnsharpMask(radius=0.7, percent=110, threshold=2))
        
        target_path = os.path.join(PUBLIC_DIR, filename)
        resized.save(target_path, format="PNG", optimize=True)
        generated_images[sz] = resized
        print(f"Saved {filename} ({sz}x{sz})")

    # 6. Generate multi-resolution favicon.ico (16, 32, 48)
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    # For ICO, prepare 16, 32, 48
    ico_16 = generated_images[16]
    ico_32 = generated_images[32]
    ico_48 = icon_master.resize((48, 48), Image.Resampling.LANCZOS).filter(
        ImageFilter.UnsharpMask(radius=0.7, percent=100, threshold=2)
    )
    
    ico_32.save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[ico_16, ico_48],
    )
    print(f"Saved multi-resolution favicon.ico: {ico_path}")

    # 7. Generate favicon.svg embedding the high-resolution 512x512 PNG
    png_512_path = os.path.join(PUBLIC_DIR, "android-chrome-512x512.png")
    with open(png_512_path, "rb") as f:
        b64_png = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <clipPath id="squircle">
      <rect width="512" height="512" rx="76" ry="76" />
    </clipPath>
  </defs>
  <rect width="512" height="512" rx="76" fill="#040b1b" />
  <image href="data:image/png;base64,{b64_png}" width="512" height="512" clip-path="url(#squircle)" preserveAspectRatio="xMidYMid meet" />
</svg>'''

    svg_path = os.path.join(PUBLIC_DIR, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved high-resolution favicon.svg: {svg_path}")

    # Clean up test directory if present
    test_dir = os.path.join(PUBLIC_DIR, "test_fav")
    if os.path.exists(test_dir):
        import shutil
        shutil.rmtree(test_dir)
        print("Cleaned up temporary test directory")

if __name__ == "__main__":
    main()
