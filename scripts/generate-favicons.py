import os
import base64
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np

# Source official SA logo uploaded by the user
SOURCE_IMAGE = r"C:\Users\seif almaz\.gemini\antigravity-ide\brain\855a760c-93c8-47df-8a4f-e5ca8d5064ca\.user_uploaded\media_1791996864891.jpg"
PUBLIC_DIR = r"d:\HNU\Portfolio\portfolio\public"

def generate_assets():
    # 1. Load source image
    raw_img = Image.open(SOURCE_IMAGE).convert("RGBA")
    print(f"Loaded source image: {raw_img.size}, mode: {raw_img.mode}")

    # Official brand palette from source image
    # Background: #F7F3F0 (warm off-white/cream)
    # Foreground: #222B3B (deep midnight navy / slate)
    BG_COLOR = (247, 243, 240, 255)
    DARK_NAVY = (34, 43, 59, 255)

    # ----------------------------------------------------
    # 2. Master Brand Logo (full logo with SA subtitle)
    # ----------------------------------------------------
    # Content bounding box: x=[382, 641] (w=259), y=[130, 439] (h=309)
    # Center: cx = 511.5, cy = 284.5
    full_cx, full_cy = 511.5, 284.5
    full_crop_size = 420  # Gives balanced margin around the 309px content
    full_left = int(full_cx - full_crop_size / 2)
    full_top = int(full_cy - full_crop_size / 2)
    
    # Create canvas with exact BG_COLOR
    full_canvas = Image.new("RGBA", (full_crop_size, full_crop_size), BG_COLOR)
    cropped_full = raw_img.crop((full_left, full_top, full_left + full_crop_size, full_top + full_crop_size))
    full_canvas.paste(cropped_full, (0, 0))
    
    # Save 1024x1024 master brand logo
    brand_logo_1024 = full_canvas.resize((1024, 1024), Image.Resampling.LANCZOS)
    brand_logo_path = os.path.join(PUBLIC_DIR, "brand-logo.png")
    brand_logo_1024.save(brand_logo_path, format="PNG", optimize=True)
    print(f"Saved master brand logo: {brand_logo_path} (1024x1024)")

    # ----------------------------------------------------
    # 3. Clean Monogram Master (cleanly isolated for Favicons)
    # Monogram bounding box: x=[382, 641] (w=259), y=[130, 349] (h=219)
    # Center: cx = 511.5, cy = 239.5
    # Subtitle starts at y=384. We mask out any pixels below y=355
    # to guarantee zero partial-text artifacts in the favicon suite.
    # ----------------------------------------------------
    mono_img = raw_img.copy()
    mono_arr = np.array(mono_img)
    mono_arr[355:, :, :] = [247, 243, 240, 255]
    mono_img = Image.fromarray(mono_arr)

    mono_cx, mono_cy = 511.5, 239.5
    # Size 360 gives 259/360 = 71.9% width, 219/360 = 60.8% height
    # Diagonal is 339px, which fits with safety inside a 360px circle for Google Search
    mono_size = 360
    mono_left = int(mono_cx - mono_size / 2)
    mono_top = int(mono_cy - mono_size / 2)

    mono_canvas = Image.new("RGBA", (mono_size, mono_size), BG_COLOR)
    cropped_mono = mono_img.crop((mono_left, mono_top, mono_left + mono_size, mono_top + mono_size))
    mono_canvas.paste(cropped_mono, (0, 0))

    # High-resolution 512x512 master square
    master_512_square = mono_canvas.resize((512, 512), Image.Resampling.LANCZOS)

    # ----------------------------------------------------
    # 4. Apple Touch Icon (180x180 - square without transparent corners)
    # iOS human interface guidelines explicitly require square with no transparency
    # ----------------------------------------------------
    apple_touch = master_512_square.resize((180, 180), Image.Resampling.LANCZOS)
    apple_touch_path = os.path.join(PUBLIC_DIR, "apple-touch-icon.png")
    apple_touch.save(apple_touch_path, format="PNG", optimize=True)
    print(f"Saved apple-touch-icon.png (180x180, square)")

    # ----------------------------------------------------
    # 5. Squircle Master for Web / Android / Favicons
    # Subtle squircle (radius 15% = 76px) gives a modern emblem feel
    # ----------------------------------------------------
    squircle_mask_512 = Image.new("L", (512, 512), 0)
    draw_sq = ImageDraw.Draw(squircle_mask_512)
    draw_sq.rounded_rectangle((0, 0, 512, 512), radius=76, fill=255)
    
    master_512_squircle = master_512_square.copy()
    master_512_squircle.putalpha(squircle_mask_512)

    # ----------------------------------------------------
    # 6. Generate Favicon PNG Sizes
    # Google guidelines: Multiple of 48px square (48, 96, 192, etc.)
    # Browser standards: 16, 32
    # ----------------------------------------------------
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,   # Exact Google 48px baseline!
        "favicon-96x96.png": 96,   # Multiple of 48 (48 * 2)
        "android-chrome-192x192.png": 192, # Multiple of 48 (48 * 4)
        "android-chrome-512x512.png": 512,
    }

    generated_images = {}
    for filename, sz in sizes.items():
        resized = master_512_squircle.resize((sz, sz), Image.Resampling.LANCZOS)
        # Apply subtle sharpening on tiny icon sizes (16 and 32) so letterforms stay razor sharp
        if sz <= 32:
            resized = resized.filter(ImageFilter.UnsharpMask(radius=0.7, percent=115, threshold=2))
        elif sz == 48:
            resized = resized.filter(ImageFilter.UnsharpMask(radius=0.6, percent=60, threshold=2))
        
        target_path = os.path.join(PUBLIC_DIR, filename)
        resized.save(target_path, format="PNG", optimize=True)
        generated_images[sz] = resized
        print(f"Saved {filename} ({sz}x{sz})")

    # ----------------------------------------------------
    # 7. Multi-resolution favicon.ico (16, 32, 48)
    # Includes Google's 48x48 frame and standard 32x32 + 16x16
    # ----------------------------------------------------
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    ico_16 = generated_images[16]
    ico_32 = generated_images[32]
    ico_48 = generated_images[48]
    
    ico_48.save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[ico_32, ico_16],
    )
    print(f"Saved multi-resolution favicon.ico with 48x48, 32x32, 16x16")

    # ----------------------------------------------------
    # 8. High-resolution favicon.svg
    # Clean vector squircle container + embedded high-res 512x512 PNG
    # ----------------------------------------------------
    png_512_path = os.path.join(PUBLIC_DIR, "android-chrome-512x512.png")
    with open(png_512_path, "rb") as f:
        b64_png = base64.b64encode(f.read()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <clipPath id="squircle">
      <rect width="512" height="512" rx="76" ry="76" />
    </clipPath>
  </defs>
  <rect width="512" height="512" rx="76" fill="#F7F3F0" />
  <image href="data:image/png;base64,{b64_png}" width="512" height="512" clip-path="url(#squircle)" preserveAspectRatio="xMidYMid meet" />
</svg>'''

    svg_path = os.path.join(PUBLIC_DIR, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Saved high-resolution favicon.svg: {svg_path}")

    # ----------------------------------------------------
    # 9. Professional 1200x630 Social Preview Card (og-card.png)
    # Features the official SA logo, Seif Almaz name, title, and key expertise badges
    # ----------------------------------------------------
    W, H = 1200, 630
    og_card = Image.new("RGBA", (W, H), (41, 39, 37, 255)) # #292725 portfolio theme
    
    # Ambient background glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    # Left deep blue glow behind logo badge
    glow_draw.ellipse((80, 100, 500, 520), fill=(29, 78, 216, 55))
    # Right cyan accent glow
    glow_draw.ellipse((650, 120, 1100, 520), fill=(6, 182, 212, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    og_card = Image.alpha_composite(og_card, glow)

    # Subtle border/grid overlay
    border_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(border_layer)
    b_draw.rounded_rectangle((24, 24, W - 24, H - 24), radius=28, outline=(255, 255, 255, 25), width=1)
    # Inner subtle card highlight
    b_draw.rounded_rectangle((25, 25, W - 25, 120), radius=28, fill=(255, 255, 255, 4))
    og_card = Image.alpha_composite(og_card, border_layer)

    # Left: Official SA Logo inside a sleek glass badge
    # Size 320x320 badge at x=90, y=155
    badge_size = 320
    badge_x, badge_y = 90, int((H - badge_size) / 2)
    
    badge_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    badge_draw = ImageDraw.Draw(badge_layer)
    # Outer glow outline
    badge_draw.rounded_rectangle(
        (badge_x - 3, badge_y - 3, badge_x + badge_size + 3, badge_y + badge_size + 3),
        radius=44,
        outline=(59, 130, 246, 140),
        width=2
    )
    # Badge background (solid off-white ivory with squircle matching logo)
    badge_draw.rounded_rectangle(
        (badge_x, badge_y, badge_x + badge_size, badge_y + badge_size),
        radius=40,
        fill=BG_COLOR
    )
    og_card = Image.alpha_composite(og_card, badge_layer)

    # Paste the full master logo (monogram + "SA") centered inside the badge
    logo_for_badge = brand_logo_1024.resize((270, 270), Image.Resampling.LANCZOS)
    og_card.paste(logo_for_badge, (badge_x + 25, badge_y + 25), logo_for_badge)

    # Right: Typography & Portfolio Identity
    text_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(text_layer)

    # Load system fonts
    font_bold_path = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg_path = r"C:\Windows\Fonts\segoeui.ttf"
    
    font_name = ImageFont.truetype(font_bold_path, 60)
    font_subtitle = ImageFont.truetype(font_bold_path, 28)
    font_desc = ImageFont.truetype(font_reg_path, 21)
    font_tag = ImageFont.truetype(font_bold_path, 17)
    font_domain = ImageFont.truetype(font_reg_path, 20)

    text_x = 460
    
    # Category tag / pill
    pill_text = "OFFICIAL PORTFOLIO"
    t_draw.rounded_rectangle((text_x, 140, text_x + 215, 178), radius=8, fill=(30, 58, 138, 180), outline=(59, 130, 246, 160), width=1)
    t_draw.text((text_x + 16, 149), pill_text, fill=(147, 197, 253, 255), font=font_tag)

    # Name
    t_draw.text((text_x, 194), "Seif Almaz", fill=(255, 255, 255, 255), font=font_name)
    
    # Subtitle / Role
    t_draw.text((text_x, 274), "Data Analytics & AI Engineer", fill=(96, 165, 250, 255), font=font_subtitle)

    # Brief value proposition line
    t_draw.text((text_x, 324), "Machine Learning  •  Power BI Dashboards  •  Data Systems", fill=(203, 213, 225, 220), font=font_desc)

    # Row 1 of Skill Badges
    row1 = ["Predictive Modeling", "Power BI Dashboards", "Computer Vision"]
    curr_x = text_x
    pill_y1 = 376
    for skill in row1:
        bbox = t_draw.textbbox((0, 0), skill, font=font_tag)
        pw = bbox[2] - bbox[0] + 24
        t_draw.rounded_rectangle((curr_x, pill_y1, curr_x + pw, pill_y1 + 34), radius=6, fill=(15, 23, 42, 200), outline=(51, 65, 85, 220), width=1)
        t_draw.text((curr_x + 12, pill_y1 + 7), skill, fill=(148, 163, 184, 255), font=font_tag)
        curr_x += pw + 10

    # Row 2 of Skill Badges
    row2 = ["PyTorch & Deep Learning", "SQL & ETL Pipelines", "Helwan National University"]
    curr_x = text_x
    pill_y2 = 422
    for skill in row2:
        bbox = t_draw.textbbox((0, 0), skill, font=font_tag)
        pw = bbox[2] - bbox[0] + 24
        t_draw.rounded_rectangle((curr_x, pill_y2, curr_x + pw, pill_y2 + 34), radius=6, fill=(15, 23, 42, 200), outline=(51, 65, 85, 220), width=1)
        t_draw.text((curr_x + 12, pill_y2 + 7), skill, fill=(148, 163, 184, 255), font=font_tag)
        curr_x += pw + 10

    # Domain footer with green verified dot
    dot_y = 487
    t_draw.ellipse((text_x, dot_y, text_x + 10, dot_y + 10), fill=(34, 197, 94, 255))
    t_draw.text((text_x + 20, 480), "https://www.seifalmaz.site", fill=(148, 163, 184, 220), font=font_domain)

    og_card = Image.alpha_composite(og_card, text_layer)
    og_card_path = os.path.join(PUBLIC_DIR, "og-card.png")
    og_card.convert("RGB").save(og_card_path, format="PNG", optimize=True)
    print(f"Saved 1200x630 social preview card: {og_card_path}")

if __name__ == "__main__":
    generate_assets()
