
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setDotPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = () => {
      const updateListeners = () => {
        const hoverables = document.querySelectorAll('a, button, input, textarea, .group, [role="button"]');
        hoverables.forEach((el) => {
          el.addEventListener('mouseenter', (e) => {
            setIsHovering(true);
            const target = e.currentTarget as HTMLElement;
            if (target.closest('header')) setIsNavbar(true);
          });
          el.addEventListener('mouseleave', () => {
            setIsHovering(false);
            setIsNavbar(false);
          });
        });
      };

      updateListeners();
      const interval = setInterval(updateListeners, 2000);
      return () => clearInterval(interval);
    };

    window.addEventListener('mousemove', updatePosition);
    const cleanupHover = handleHover();

    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      cleanupHover();
      document.removeEventListener('mouseleave', () => setIsVisible(false));
      document.removeEventListener('mouseenter', () => setIsVisible(true));
    };
  }, [isVisible]);

  // Snappy movement
  useEffect(() => {
    const followMouse = () => {
      setPosition((prev) => ({
        x: prev.x + (dotPosition.x - prev.x) * 0.8,
        y: prev.y + (dotPosition.y - prev.y) * 0.8,
      }));
      requestRef.current = requestAnimationFrame(followMouse);
    };
    requestRef.current = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(requestRef.current);
  }, [dotPosition]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-[#0ED9D9] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hidden md:block
          ${isHovering ? 'scale-[3] shadow-[0_0_15px_rgba(14,217,217,1)]' : 'scale-100'}
        `}
        style={{ left: dotPosition.x, top: dotPosition.y }}
      />

      {/* Main Aura Circle (Focussed on Hover) */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#0ED9D9]/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hidden md:flex items-center justify-center
          ${isHovering
            ? isNavbar ? 'w-8 h-8 bg-[#0ED9D9]/5' : 'w-10 h-10 bg-[#0ED9D9]/10 backdrop-blur-[1px]'
            : 'w-12 h-12 bg-[#0ED9D9]/5 backdrop-blur-[1.5px]'}
        `}
        style={{
          left: position.x,
          top: position.y,
          boxShadow: isHovering
            ? '0 0 30px rgba(14,217,217,0.25), inset 0 0 15px rgba(14,217,217,0.1)'
            : '0 0 15px rgba(14,217,217,0.05)',
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        {/* Decorative inner pulsing ring */}
        <div className={`absolute inset-0 rounded-full border border-[#0ED9D9]/10 animate-[ping_5s_infinite] ${isHovering ? 'opacity-0' : 'opacity-100'}`} />

        {/* Rotating sweep animation */}
        <div className="absolute inset-0 rounded-full border-t border-[#0ED9D9]/30 animate-spin-slow opacity-60" />
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
