import { cn } from "@/lib/utils";

/*
  BENTO LAYOUT LOGIC
  Grid is 4 columns wide on desktop (md), 2 columns on mobile.
  
  Count 1: Full Hero
  [ 4x2 ]
  
  Count 2: Split
  [ 2x2 ] [ 2x2 ]
  
  Count 3: Big Left, Two Stacked Right
  [ 2x2 ] [ 2x1 ]
          [ 2x1 ]
          
  Count 4: Big Left, One Wide, Two Small
  [ 2x2 ] [ 2x1 ]
          [ 1x1 ] [ 1x1 ]
          
  Count 5: Big Left, Four Small Mosaic
  [ 2x2 ] [ 1x1 ] [ 1x1 ]
          [ 1x1 ] [ 1x1 ]
*/

interface GalleryProps {
    images: string[];
    className?: string; // Allow custom wrapper styling if needed
}

export function Gallery({ images, className }: GalleryProps) {
    if (!images || images.length === 0) return null;

    const count = images.length;

    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[200px] my-8", className)}>
            {images.map((src, i) => (
                <div
                    key={i}
                    className={cn("relative rounded-lg overflow-hidden bg-neutral-100", getLayout(i, count))}
                    style={{
                        backgroundImage: `url('${src}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            ))}
        </div>
    );
}

function getLayout(i: number, count: number): string {
    // 1 Image (Hero)
    if (count === 1) {
        return "col-span-2 md:col-span-4 row-span-2";
    }

    // 2 Images (Split)
    if (count === 2) {
        return "col-span-1 md:col-span-2 row-span-2";
    }

    // 3 Images (Big Left, Stacked Right)
    if (count === 3) {
        if (i === 0) return "col-span-2 md:col-span-2 row-span-2";
        return "col-span-2 md:col-span-2 row-span-1";
    }

    // 4 Images (Big Left, Wide Top Right, 2 Small Bottom Right)
    if (count === 4) {
        if (i === 0) return "col-span-2 md:col-span-2 row-span-2";
        if (i === 1) return "col-span-2 md:col-span-2 row-span-1";
        return "col-span-1 md:col-span-1 row-span-1";
    }

    // 5+ Images (Big Left, Mosaic Right)
    if (count >= 5) {
        if (i === 0) return "col-span-2 md:col-span-2 row-span-2";
        return "col-span-1 md:col-span-1 row-span-1";
    }

    return "col-span-1";
}
