import os
from PIL import Image

def generate_thumbs():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, 'public')
    
    # 1. Projects
    proj_dir = os.path.join(public_dir, 'projects')
    proj_thumbs = os.path.join(proj_dir, 'thumbs')
    os.makedirs(proj_thumbs, exist_ok=True)
    
    if os.path.exists(proj_dir):
        for f in os.listdir(proj_dir):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not os.path.isdir(os.path.join(proj_dir, f)):
                src = os.path.join(proj_dir, f)
                name, _ = os.path.splitext(f)
                dst = os.path.join(proj_thumbs, f"{name}.webp")
                
                with Image.open(src) as im:
                    w, h = im.size
                    scale = min(360 / w, 1.0)
                    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
                    out_im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
                    out_im = out_im.resize(new_size, Image.Resampling.LANCZOS)
                    out_im.save(dst, 'WEBP', quality=60, method=6)
                    print(f"Generated project thumb: {dst} ({os.path.getsize(dst)/1024:.1f} KB)")
                    
    # 2. Root public images
    root_thumbs = os.path.join(public_dir, 'thumbs')
    os.makedirs(root_thumbs, exist_ok=True)
    for f in os.listdir(public_dir):
        if f.lower().endswith(('.png', '.jpg', '.jpeg')) and not os.path.isdir(os.path.join(public_dir, f)):
            src = os.path.join(public_dir, f)
            name, _ = os.path.splitext(f)
            dst = os.path.join(root_thumbs, f"{name}.webp")
            
            with Image.open(src) as im:
                w, h = im.size
                scale = min(360 / w, 1.0)
                new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
                out_im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
                out_im = out_im.resize(new_size, Image.Resampling.LANCZOS)
                out_im.save(dst, 'WEBP', quality=60, method=6)
                print(f"Generated root thumb: {dst} ({os.path.getsize(dst)/1024:.1f} KB)")

if __name__ == '__main__':
    generate_thumbs()
