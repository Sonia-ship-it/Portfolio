import React, { useEffect, useRef } from 'react';

const GlobalEffects: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const spotlight = spotlightRef.current;
        const overlay = overlayRef.current;
        if (!canvas || !spotlight || !overlay) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = -1000;
        let mouseY = -1000;
        let scrollY = window.scrollY;
        let animationFrameId: number;

        class Blob {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            opacity: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 250 + 200;
                this.color = Math.random() > 0.5 ? '14, 217, 217' : '168, 85, 247';
                this.opacity = Math.random() * 0.04 + 0.02; // Even more subtle
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                const margin = this.size;
                if (this.x < -margin) this.x = width + margin;
                if (this.x > width + margin) this.x = -margin;
                if (this.y < -margin) this.y = height + margin;
                if (this.y > height + margin) this.y = -margin;
            }

            draw(weight: number) {
                if (weight <= 0) return;
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, `rgba(${this.color === '14, 217, 217' ? '14, 217, 217' : '168, 85, 247'}, ${this.opacity * weight})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
            }
        }

        let blobs: Blob[] = [];
        const init = () => {
            blobs = [];
            for (let i = 0; i < 8; i++) blobs.push(new Blob());
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Blobs weight
            const blobWeight = Math.min(1, scrollY / 600);

            // Darken background as user scrolls away from Hero
            const overlayOpacity = Math.min(0.85, scrollY / 500);
            overlay.style.backgroundColor = `rgba(3, 5, 10, ${overlayOpacity})`;

            blobs.forEach(b => {
                b.update();
                b.draw(blobWeight);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            spotlight.style.opacity = '1';
            spotlight.style.background = `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 217, 217, 0.05), transparent 80%)`;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleMouseLeave = () => {
            spotlight.style.opacity = '0';
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dynamic Darkening Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-[-1] transition-colors duration-300"
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                style={{ mixBlendMode: 'screen' }}
            />
            <div
                ref={spotlightRef}
                className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none"
                style={{ mixBlendMode: 'plus-lighter' }}
            />
        </div>
    );
};

export default GlobalEffects;
