/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface GalaxyStar {
  armIndex: number;
  theta: number; // orbital angle
  dist: number; // distance from galactic center
  speed: number;
  size: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  zOffset: number; // vertical thickness of galactic disc
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FrameworkNode {
  name: string;
  code: string;
  color: string;
  baseRadiusRatio: number;
  angleOffset: number;
  speed: number;
  size: number;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for 3D galactic tilt and gravitational drag
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetTiltX = (e.clientX / width - 0.5) * 0.45;
      targetTiltY = (e.clientY / height - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Build the Spiral Galaxy (Milky Way Architecture)
    const armCount = 4;
    const starCount = Math.min(Math.floor((width * height) / 1100), 2200);
    const maxRadius = Math.max(width, height) * 0.72;
    const stars: GalaxyStar[] = [];

    // Distinct galactic star colors matching spectral classes O, B, A, F, G
    const starColors = [
      '#ffffff', // Core white
      '#e0f2fe', // Bright blue-white (Class B)
      '#38bdf8', // Cyan plasma (Class O)
      '#c084fc', // Violet stellar flare
      '#818cf8', // Indigo nebula star
      '#fef08a', // Core golden dwarf
    ];

    for (let i = 0; i < starCount; i++) {
      const arm = i % armCount;
      const distRatio = Math.pow(Math.random(), 1.7);
      const dist = 30 + distRatio * maxRadius;

      // Logarithmic spiral formula
      const armOffset = (arm * (Math.PI * 2)) / armCount;
      const spiralTheta = armOffset + 1.8 * Math.log(dist / 25 + 1);
      const scatter = (Math.random() - 0.5) * (0.35 + distRatio * 0.4);
      const theta = spiralTheta + scatter;

      const speed = (0.0004 + (1 - distRatio) * 0.0012) * (arm % 2 === 0 ? 1 : 1.02);

      let color = starColors[0];
      if (dist < 90) {
        color = Math.random() > 0.4 ? '#fffbeb' : '#38bdf8';
      } else if (dist < 280) {
        color = starColors[Math.floor(Math.random() * starColors.length)];
      } else {
        color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
      }

      stars.push({
        armIndex: arm,
        theta,
        dist,
        speed,
        size: Math.random() < 0.05 ? Math.random() * 2 + 1.4 : Math.random() * 1.2 + 0.4,
        color,
        baseAlpha: Math.random() * 0.6 + 0.35,
        alpha: 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        zOffset: (Math.random() - 0.5) * 85 * (1 - distRatio * 0.5),
      });
    }

    // Occasional cosmic shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length >= 2 || Math.random() > 0.35) return;
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 90 + 50,
        speed: Math.random() * 8 + 7,
        angle,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 45 + 30,
      });
    };

    // 5 FRAMEWORK-INCLUSIVE NODES: Representing the 5 Wings of ORION
    // Technical, I&E, Cultural, Media, Discipline
    const frameworkNodes: FrameworkNode[] = [
      { name: 'Technical Wing', code: 'TECH', color: '#22d3ee', baseRadiusRatio: 0.42, angleOffset: 0, speed: 0.00035, size: 5 },
      { name: 'I&E Affairs', code: 'I&E', color: '#38bdf8', baseRadiusRatio: 0.52, angleOffset: (Math.PI * 2) / 5, speed: 0.00032, size: 4.8 },
      { name: 'Cultural Wing', code: 'CULT', color: '#c084fc', baseRadiusRatio: 0.46, angleOffset: ((Math.PI * 2) / 5) * 2, speed: 0.00034, size: 5 },
      { name: 'Media & PR', code: 'MEDIA', color: '#fbbf24', baseRadiusRatio: 0.56, angleOffset: ((Math.PI * 2) / 5) * 3, speed: 0.0003, size: 4.8 },
      { name: 'Discipline Wing', code: 'DISC', color: '#ef4444', baseRadiusRatio: 0.38, angleOffset: ((Math.PI * 2) / 5) * 4, speed: 0.00038, size: 5.2 },
    ];

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth camera tilt towards mouse
      currentTiltX += (targetTiltX - currentTiltX) * 0.04;
      currentTiltY += (targetTiltY - currentTiltY) * 0.04;

      // Deep galactic space canvas background
      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5 + currentTiltX * 80;
      const centerY = height * 0.42 + currentTiltY * 60;

      // 1. Draw Massive Milky Way Core & Ambient Nebular Dust
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Golden Warm Supermassive Core Bulge
      const coreBulge = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 260);
      coreBulge.addColorStop(0, 'rgba(255, 245, 210, 0.42)');
      coreBulge.addColorStop(0.2, 'rgba(56, 189, 248, 0.22)');
      coreBulge.addColorStop(0.5, 'rgba(129, 140, 248, 0.12)');
      coreBulge.addColorStop(0.8, 'rgba(147, 51, 234, 0.04)');
      coreBulge.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreBulge;
      ctx.fillRect(0, 0, width, height);

      // Vast Galactic Elliptical Dust Cloud
      const discGrad = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, maxRadius * 0.85);
      discGrad.addColorStop(0, 'rgba(14, 165, 233, 0.09)');
      discGrad.addColorStop(0.4, 'rgba(88, 28, 135, 0.05)');
      discGrad.addColorStop(0.8, 'rgba(30, 58, 138, 0.02)');
      discGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = discGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2. Render Rotating Spiral Galaxy Stars
      const cosTilt = Math.cos(0.55 + currentTiltY);
      const sinTilt = Math.sin(currentTiltX * 0.4);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.theta += star.speed;
        star.pulsePhase += 0.03;
        star.alpha = star.baseAlpha + Math.sin(star.pulsePhase) * 0.25;

        const rawX = Math.cos(star.theta) * star.dist;
        const rawY = Math.sin(star.theta) * star.dist;

        const rotX = rawX * Math.cos(sinTilt) - rawY * Math.sin(sinTilt);
        const rotY = rawX * Math.sin(sinTilt) + rawY * Math.cos(sinTilt);

        const screenX = centerX + rotX;
        const screenY = centerY + rotY * cosTilt + star.zOffset;

        if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
          continue;
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(star.alpha, 0.95));
        ctx.fill();
      }

      // 3. FRAMEWORK-INCLUSIVE CONSTELLATION WEB (ORION 5 WINGS)
      // Connect the 5 wing framework anchors in 3D orbit
      const computedNodes: { x: number; y: number; node: FrameworkNode }[] = [];

      for (let i = 0; i < frameworkNodes.length; i++) {
        const fn = frameworkNodes[i];
        const currentAngle = fn.angleOffset + tick * fn.speed;
        const radius = fn.baseRadiusRatio * Math.min(width, height) * 0.9;

        const rawX = Math.cos(currentAngle) * radius;
        const rawY = Math.sin(currentAngle) * radius;

        const rotX = rawX * Math.cos(sinTilt) - rawY * Math.sin(sinTilt);
        const rotY = rawX * Math.sin(sinTilt) + rawY * Math.cos(sinTilt);

        const nodeX = centerX + rotX;
        const nodeY = centerY + rotY * cosTilt;

        computedNodes.push({ x: nodeX, y: nodeY, node: fn });
      }

      // Draw subtle multidisciplinary harmonic filaments connecting the 5 framework nodes
      ctx.save();
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 6]);

      for (let i = 0; i < computedNodes.length; i++) {
        const nextIdx = (i + 1) % computedNodes.length;
        const crossIdx = (i + 2) % computedNodes.length;
        const p1 = computedNodes[i];
        const p2 = computedNodes[nextIdx];
        const p3 = computedNodes[crossIdx];

        // Perimeter pentagon filament
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `${p1.node.color}35`);
        grad.addColorStop(1, `${p2.node.color}35`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Cross-constellation filament
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.stroke();
      }
      ctx.restore();

      // Draw the 5 Framework Anchors with Glowing Halos & Labels
      for (let i = 0; i < computedNodes.length; i++) {
        const { x, y, node } = computedNodes[i];
        const pulse = 1 + Math.sin(tick * 0.05 + i) * 0.25;

        // Outer glow
        const glow = ctx.createRadialGradient(x, y, 1, x, y, 18 * pulse);
        glow.addColorStop(0, `${node.color}80`);
        glow.addColorStop(0.5, `${node.color}25`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 18 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(x, y, node.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fill();

        // Subtle coordinate reticle ring
        ctx.save();
        ctx.strokeStyle = `${node.color}60`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Update and Draw Shooting Stars
      if (Math.random() < 0.035) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        s.alpha = Math.sin(progress * Math.PI) * 0.85;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const shootGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        shootGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shootGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.4)');
        shootGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = shootGrad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ background: '#05070e' }}
    />
  );
};
