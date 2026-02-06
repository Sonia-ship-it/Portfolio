
import React, { useEffect, useRef } from 'react';

const PrismaticFlow: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let time = 0;
        let mouseX = width / 2;
        let mouseY = height / 2;

        // Space Entity: Planet
        const planet = {
            x: width * 0.8,
            y: height * 0.3,
            radius: 120,
            rotation: 0
        };

        // Space Entity: Shooting Stars
        let shootingStars: { x: number, y: number, length: number, speed: number, opacity: number }[] = [];

        // Stars & Data Dust
        const stars: { x: number, y: number, size: number, opacity: number, blink: number, color: string }[] = [];
        for (let i = 0; i < 400; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.2,
                opacity: Math.random(),
                blink: Math.random() * 0.02 + 0.01,
                color: Math.random() > 0.8 ? '#0ED9D9' : '#ffffff'
            });
        }

        // Flow Nodes (Cosmic Clouds)
        const nodes: { x: number, y: number, vx: number, vy: number, color: string }[] = [
            { x: width * 0.2, y: height * 0.2, vx: 0.2, vy: 0.1, color: '#0ED9D9' },
            { x: width * 0.7, y: height * 0.8, vx: -0.1, vy: 0.2, color: '#a855f7' },
            { x: width * 0.5, y: height * 0.5, vx: 0.1, vy: -0.15, color: '#3b82f6' }
        ];

        const animate = () => {
            time += 0.005;
            planet.rotation += 0.002;

            // Background Fill (Deep Cinematic Black)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            // 1. Draw Nebula Clouds (Deep Moody Layers)
            nodes.forEach((node, i) => {
                node.x += node.vx + Math.sin(time + i) * 0.2;
                node.y += node.vy + Math.cos(time + i) * 0.2;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, width * 0.6);
                grad.addColorStop(0, `${node.color}10`);
                grad.addColorStop(0.5, `${node.color}02`);
                grad.addColorStop(1, 'transparent');

                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            });

            // 2. Draw Shooting Stars
            if (Math.random() < 0.012) {
                shootingStars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 80 + 20,
                    speed: Math.random() * 12 + 8,
                    opacity: 1
                });
            }

            ctx.globalCompositeOperation = 'source-over';
            shootingStars = shootingStars.filter(ss => {
                ss.x += ss.speed;
                ss.y += ss.speed * 0.5;
                ss.opacity -= 0.025;

                if (ss.opacity <= 0) return false;

                ctx.beginPath();
                const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.length * 0.5);
                grad.addColorStop(0, `rgba(14, 217, 217, ${ss.opacity})`);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.2;
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x - ss.length, ss.y - ss.length * 0.5);
                ctx.stroke();
                return true;
            });

            // 3. Draw Twinkling Stars
            stars.forEach(star => {
                star.opacity += star.blink;
                if (star.opacity > 1 || star.opacity < 0.2) star.blink *= -1;

                const dx = star.x - mouseX;
                const dy = star.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const drift = dist < 200 ? (1 - dist / 200) * 10 : 0;

                ctx.beginPath();
                ctx.arc(star.x + drift * 0.1, star.y + drift * 0.1, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color === '#ffffff' ? `rgba(255, 255, 255, ${star.opacity * 0.5})` : `rgba(14, 217, 217, ${star.opacity * 0.3})`;
                ctx.fill();
            });

            // 4. Draw 3D-effect Planet (Cinematic Lighting)
            const pX = planet.x + Math.sin(time * 0.3) * 15;
            const pY = planet.y + Math.cos(time * 0.3) * 15;

            // Planet Glow
            const pGlow = ctx.createRadialGradient(pX, pY, planet.radius * 0.8, pX, pY, planet.radius * 2.5);
            pGlow.addColorStop(0, 'rgba(14, 217, 217, 0.1)');
            pGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = pGlow;
            ctx.fillRect(pX - planet.radius * 2.5, pY - planet.radius * 2.5, planet.radius * 5, planet.radius * 5);

            // Planet Body (Darker Base)
            const pGrad = ctx.createRadialGradient(pX - 45, pY - 45, 5, pX, pY, planet.radius);
            pGrad.addColorStop(0, '#111827');
            pGrad.addColorStop(1, '#000000');
            ctx.beginPath();
            ctx.arc(pX, pY, planet.radius, 0, Math.PI * 2);
            ctx.fillStyle = pGrad;
            ctx.fill();

            // Planet Atmosphere / Rim Light
            ctx.beginPath();
            ctx.arc(pX, pY, planet.radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(14, 217, 217, 0.25)';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            planet.x = width * 0.8;
            planet.y = height * 0.3;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#02040a]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-100"
            />
            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
};

export default PrismaticFlow;
