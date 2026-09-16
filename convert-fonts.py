"""
Konvèti font .otf/.ttf yo an .woff2 (fòma pi lejè/pi rapid pou web).

KIJAN POU ITILIZE L:
1. Mete fichye sa a nan RASIN pwojè a (menm nivo ak package.json)
2. Enstale zouti a yon sèl fwa:
       pip install fonttools brotli
3. Egzekite l:
       python convert-fonts.py

Li li fichye ki deja nan public/fonts/, kreye yon vèsyon .woff2 pou chak,
epi kite orijinal .otf/.ttf yo la (ou ka efase yo apre lè w konfime tout bagay mache).
"""
import os
from fontTools.ttLib import TTFont

SRC_DIR = "public/fonts"

FILES = [
    "CreatoDisplay-Thin.otf",
    "CreatoDisplay-Light.otf",
    "CreatoDisplay-Regular.otf",
    "CreatoDisplay-Medium.otf",
    "CreatoDisplay-ExtraBold.otf",
    "CreatoDisplay-Black.otf",
    "Waiting-on-the-Bridge.ttf",
]

def main():
    if not os.path.isdir(SRC_DIR):
        print(f"❌ Dosye {SRC_DIR} pa egziste. Egzekite script la nan rasin pwojè a.")
        return

    converted = 0
    for filename in FILES:
        src_path = os.path.join(SRC_DIR, filename)
        if not os.path.exists(src_path):
            print(f"⚠️  Pa jwenn {src_path} — sote l")
            continue

        font = TTFont(src_path)
        font.flavor = "woff2"
        out_name = os.path.splitext(filename)[0] + ".woff2"
        out_path = os.path.join(SRC_DIR, out_name)
        font.save(out_path)
        converted += 1
        print(f"✅ {filename} -> {out_name}")

    print(f"\n{converted} fichye konvèti. Kounye a mete ajou globals.css (zip 4.5 la deja fè sa).")

if __name__ == "__main__":
    main()
