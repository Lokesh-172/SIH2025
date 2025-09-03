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
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  maskGradient?: boolean;
  imageClassName?: string;
  containerHeight?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'scale' | 'brightness' | 'zoom' | 'lift' | 'glow' | 'none';
  imageWidth?: number;
  imageHeight?: number;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
  borderStyle?: 'none' | 'subtle' | 'accent' | 'gradient';
  animationStyle?: 'smooth' | 'elastic' | 'bounce';
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
  rounded = 'xl',
  shadow = 'lg',
  hoverEffect = 'lift',
  imageWidth = 400,
  imageHeight = 225,
  showOverlay = true,
  overlayContent,
  borderStyle = 'subtle',
  animationStyle = 'smooth',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

      // Create enough duplicates for seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Add one more set for ultra-smooth scrolling
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
      const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s';
      containerRef.current.style.setProperty('--scroll-duration', duration);
    }
  };

  const getGapClasses = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2 sm:gap-3 md:gap-4';
      case 'lg':
        return 'gap-6 sm:gap-8 md:gap-10 lg:gap-12';
      case 'xl':
        return 'gap-8 sm:gap-10 md:gap-12 lg:gap-16';
      default:
        return 'gap-4 sm:gap-6 md:gap-8 lg:gap-10';
    }
  };

  const getContainerHeightClasses = () => {
    switch (containerHeight) {
      case 'sm':
        return 'h-32 sm:h-40 md:h-48';
      case 'lg':
        return 'h-48 sm:h-64 md:h-80 lg:h-96';
      case 'xl':
        return 'h-64 sm:h-80 md:h-96 lg:h-[28rem]';
      case '2xl':
        return 'h-80 sm:h-96 md:h-[28rem] lg:h-[32rem]';
      default:
        return 'h-40 sm:h-48 md:h-64 lg:h-80';
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
      case '2xl':
        return 'rounded-2xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-xl';
    }
  };

  const getShadowClasses = () => {
    switch (shadow) {
      case 'none':
        return '';
      case 'sm':
        return 'shadow-sm hover:shadow-md';
      case 'md':
        return 'shadow-md hover:shadow-lg';
      case 'lg':
        return 'shadow-lg hover:shadow-xl';
      case 'xl':
        return 'shadow-xl hover:shadow-2xl';
      default:
        return 'shadow-lg hover:shadow-xl';
    }
  };

  const getBorderClasses = () => {
    switch (borderStyle) {
      case 'none':
        return '';
      case 'subtle':
        return 'border border-gray-200/50 hover:border-gray-300/70';
      case 'accent':
        return 'border border-orange-200/50 hover:border-orange-300/70';
      case 'gradient':
        return 'border border-transparent bg-gradient-to-r from-gray-200/50 to-orange-200/50 hover:from-gray-300/70 hover:to-orange-300/70';
      default:
        return 'border border-gray-200/50 hover:border-gray-300/70';
    }
  };

  const getHoverEffectClasses = () => {
    const baseTransition = 'transition-all duration-500 ease-out';
    
    switch (hoverEffect) {
      case 'scale':
        return `${baseTransition} hover:scale-105`;
      case 'brightness':
        return `${baseTransition} hover:brightness-110`;
      case 'zoom':
        return `${baseTransition} hover:scale-110`;
      case 'lift':
        return `${baseTransition} hover:scale-105 hover:-translate-y-2`;
      case 'glow':
        return `${baseTransition} hover:scale-105 hover:ring-2 hover:ring-orange-200/50 hover:ring-offset-2`;
      case 'none':
        return baseTransition;
      default:
        return `${baseTransition} hover:scale-105 hover:-translate-y-2`;
    }
  };

  const getAnimationClasses = () => {
    switch (animationStyle) {
      case 'elastic':
        return 'animate-[scroll_var(--scroll-duration)_var(--scroll-direction)_cubic-bezier(0.25,0.46,0.45,0.94)_infinite]';
      case 'bounce':
        return 'animate-[scroll_var(--scroll-duration)_var(--scroll-direction)_cubic-bezier(0.68,-0.55,0.265,1.55)_infinite]';
      default:
        return 'animate-[scroll_var(--scroll-duration)_var(--scroll-direction)_linear_infinite]';
    }
  };

  // Custom CSS for the scroll animation
  const scrollAnimation = `
    @keyframes scroll {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-100%, 0, 0);
      }
    }
  `;

  return (
    <>
      <style jsx>{scrollAnimation}</style>
      <div
        ref={containerRef}
        className={cn(
          // Base container styles with enhanced design
          'relative w-full overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent',
          getContainerHeightClasses(),
          // Enhanced mask gradient
          maskGradient && 'mask-image-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
          // Subtle background pattern
          'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] before:bg-[length:20px_20px] before:pointer-events-none',
          className
        )}
        style={
          {
            '--scroll-direction': direction === 'left' ? 'normal' : 'reverse',
            '--scroll-duration': speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s',
            maskImage: maskGradient ? 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)' : undefined,
          } as React.CSSProperties
        }
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div
          ref={scrollerRef}
          className={cn(
            // Enhanced flexbox layout
            'flex min-w-full shrink-0 flex-nowrap w-max h-full items-center',
            // Dynamic gaps
            getGapClasses(),
            // Enhanced animation with better easing
            start && getAnimationClasses(),
            pauseOnHover && isPaused && '[animation-play-state:paused]',
            // Responsive padding
            'px-4 sm:px-6 md:px-8 lg:px-12',
            // Performance optimizations
            'will-change-transform backface-visibility-hidden'
          )}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className={cn(
                'flex-shrink-0 relative overflow-hidden group cursor-pointer',
                'h-full aspect-video', // Maintains 16:9 aspect ratio
                getRoundedClasses(),
                getShadowClasses(),
                getBorderClasses(),
                getHoverEffectClasses(),
                // Enhanced positioning and z-index for layering effects
                'relative z-10',
                // Subtle background for loading state
                'bg-gray-100'
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
                  'transition-all duration-500 ease-out',
                  // Enhanced image effects
                  'group-hover:scale-110 group-hover:brightness-105',
                  imageClassName
                )}
                priority={idx < 4}
                loading={idx < 4 ? 'eager' : 'lazy'}
              />
              
              {/* Enhanced overlay with gradient */}
              {showOverlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              )}

              {/* Optional content overlay */}
              {overlayContent && (
                <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    {overlayContent}
                  </div>
                </div>
              )}

              {/* Shimmer loading effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Optional scroll indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </>
  );
};

export default ImageScroller;