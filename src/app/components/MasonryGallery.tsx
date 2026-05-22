import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Hook to handle media queries for responsive columns */
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    const match = queries.findIndex(q => window.matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

/** Hook to measure element size via ResizeObserver */
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

/** Utility to ensure images are loaded before layout/animation */
const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height: number;
  title?: string;
  category?: string;
  gallery?: string[]; // Optional gallery for sliding on hover
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryGalleryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  items,
  ease = 'power4.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className,
  itemClassName
}) => {
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)', '(min-width: 400px)'],
    [4, 3, 2, 1],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    // Preload ALL images including gallery items
    const allUrls = items.flatMap(i => [i.img, ...(i.gallery || [])]);
    preloadImages(allUrls).then(() => setImagesReady(true));
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 32;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height / 400) * columnWidth;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridItems, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const element = document.querySelector(`[data-key="${item.id}"]`);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const containerRect = containerRef.current?.getBoundingClientRect();
        let start = { x: item.x, y: item.y + 100 };
        
        if (containerRect) {
          switch (animateFrom) {
            case 'top': start = { x: item.x, y: -200 }; break;
            case 'bottom': start = { x: item.x, y: window.innerHeight + 200 }; break;
            case 'left': start = { x: -200, y: item.y }; break;
            case 'right': start = { x: window.innerWidth + 200, y: item.y }; break;
            case 'center': start = { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 }; break;
          }
        }

        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(20px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 1.2,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(element, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    if (grid.length > 0) hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full transition-all duration-700 ease-in-out', className)}
      style={{ height: containerHeight, minHeight: '600px' }}
    >
      {grid.map(item => (
        <GridItemCard 
          key={item.id} 
          item={item} 
          scaleOnHover={scaleOnHover} 
          hoverScale={hoverScale}
          itemClassName={itemClassName}
        />
      ))}
    </div>
  );
};

const GridItemCard: React.FC<{ 
  item: GridItem; 
  scaleOnHover: boolean; 
  hoverScale: number;
  itemClassName?: string;
}> = ({ item, scaleOnHover, hoverScale, itemClassName }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const images = useMemo(() => [item.img, ...(item.gallery || [])], [item.img, item.gallery]);

  const handleMouseEnter = (element: HTMLElement) => {
    setIsHovered(true);
    if (scaleOnHover) {
      gsap.to(element, { scale: hoverScale, duration: 0.4, ease: 'power2.out' });
    }
    
    if (images.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIdx(prev => (prev + 1) % images.length);
      }, 1500);
    }
  };

  const handleMouseLeave = (element: HTMLElement) => {
    setIsHovered(false);
    if (scaleOnHover) {
      gsap.to(element, { scale: 1, duration: 0.4, ease: 'power2.out' });
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setActiveIdx(0); // Reset to primary image
  };

  return (
    <div
      data-key={item.id}
      className={cn(
        'absolute overflow-hidden cursor-pointer rounded-3xl bg-white/5 border border-white/10 group',
        itemClassName
      )}
      style={{ willChange: 'transform, width, height, opacity, filter' }}
      onMouseEnter={e => handleMouseEnter(e.currentTarget)}
      onMouseLeave={e => handleMouseLeave(e.currentTarget)}
    >
      <div className="relative w-full h-full">
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${src})`,
              opacity: i === activeIdx ? 1 : 0,
              transform: `scale(${i === activeIdx ? 1 : 1.1}) translateX(${i === activeIdx ? 0 : (i < activeIdx ? -20 : 20)}px)`,
              zIndex: i === activeIdx ? 1 : 0
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-md mb-3 border border-white/10">
            {item.category}
          </span>
          <h3 className="text-white text-2xl font-black tracking-tight">{item.title}</h3>
          {images.length > 1 && isHovered && (
            <div className="flex gap-1 mt-4">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === activeIdx ? "w-8 bg-[#00D4AA]" : "w-2 bg-white/30"
                  )} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
