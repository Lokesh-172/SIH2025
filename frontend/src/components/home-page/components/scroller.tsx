'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '../../../lib/utils';

interface ImageScrollerProps {
  imageFolder?: string;
  imageNames: string[];
  imageAltPrefix?: string;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
  maskGradient?: boolean;
  imageClassName?: string;
  containerHeight?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: boolean;
  hoverEffect?: 'scale' | 'brightness' | 'zoom' | 'none';
  imageWidth?: number;
  imageHeight?: number;
}

const ImageScroller: React.FC<ImageScrollerProps> = ({
  imageFolder = '',
  imageNames,
  imageAltPrefix = 'Image',
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
  gap = 'md',
  maskGradient = true,
  imageClassName,
  containerHeight = 'md',
  rounded = 'lg',
  shadow = true,
  hoverEffect = 'scale',
  imageWidth = 400,
  imageHeight = 225,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  // Generate image paths from public folder
  const images = imageNames.map((name, index) => {
    const basePath = imageFolder ? `/${imageFolder}/${name}` : `/${name}`;
    return {
      src: basePath,
      alt: `${imageAltPrefix} ${index + 1}`,
    };
  });

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--scroll-direction',
        direction === 'left' ? 'normal' : 'reverse'
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration = speed === 'fast' ? '15s' : speed === 'normal' ? '30s' : '60s';
      containerRef.current.style.setProperty('--scroll-duration', duration);
    }
  };

  const getGapClasses = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2 sm:gap-3';
      case 'lg':
        return 'gap-6 sm:gap-8 md:gap-10';
      default:
        return 'gap-4 sm:gap-6 md:gap-8';
    }
  };

  const getContainerHeightClasses = () => {
    switch (containerHeight) {
      case 'sm':
        return 'h-32 sm:h-40';
      case 'lg':
        return 'h-48 sm:h-64 md:h-80';
      case 'xl':
        return 'h-64 sm:h-80 md:h-96';
      default:
        return 'h-40 sm:h-48 md:h-64';
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return '';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'xl':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  const getHoverEffectClasses = () => {
    switch (hoverEffect) {
      case 'scale':
        return 'hover:scale-105';
      case 'brightness':
        return 'hover:brightness-110';
      case 'zoom':
        return 'hover:scale-110';
      case 'none':
        return '';
      default:
        return 'hover:scale-105';
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        // Base container styles
        'relative w-full overflow-hidden',
        getContainerHeightClasses(),
        // Mask gradient using Tailwind v4 approach
        maskGradient && 'mask-gradient-to-r',
        className
      )}
      style={
        {
          '--scroll-direction': direction === 'left' ? 'normal' : 'reverse',
          '--scroll-duration': speed === 'fast' ? '15s' : speed === 'normal' ? '30s' : '60s',
        } as React.CSSProperties
      }
    >
      <div
        ref={scrollerRef}
        className={cn(
          // Flexbox layout
          'flex min-w-full shrink-0 flex-nowrap w-max h-full items-center',
          // Gaps
          getGapClasses(),
          // Animation classes using Tailwind v4
          start && '[animation:scroll_var(--scroll-duration)_var(--scroll-direction)_linear_infinite]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          // Mobile optimizations
          'px-4 sm:px-6 md:px-8'
        )}
      >
        {images.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              'flex-shrink-0 relative overflow-hidden group',
              'h-full aspect-video', // Maintains 16:9 aspect ratio
              getRoundedClasses(),
              shadow && 'shadow-md hover:shadow-lg',
              'transition-all duration-300',
              getHoverEffectClasses()
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={imageWidth}
              height={imageHeight}
              className={cn(
                'w-full h-full object-cover',
                getRoundedClasses(),
                'transition-transform duration-300',
                imageClassName
              )}
              priority={idx < 3}
            />
            
            {/* Optional overlay effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
