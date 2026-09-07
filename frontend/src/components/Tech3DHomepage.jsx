import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Lock, 
  Mail, User, Briefcase, Zap, Building2, Globe, Star,
  Compass, Award, Cpu, ChevronRight, Eye, EyeOff, Play,
  TrendingUp, Users, ArrowUpRight, Check
} from 'lucide-react';

const DREAM_MNCS = [
  {
    id: 'google',
    name: 'Google',
    badge: 'AI & Distributed Systems',
    color: '#4285F4',
    glow: 'rgba(66, 133, 244, 0.4)',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
    roles: 'Staff SDE • AI Research • L5 Systems',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    )
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'Azure Cloud & Core OS',
    color: '#00A4EF',
    glow: 'rgba(0, 164, 239, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0369a1 0%, #0f172a 100%)',
    roles: 'Principal Architect • Azure Cloud • SDE-3',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    )
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'AWS & High Scale E-Commerce',
    color: '#FF9900',
    glow: 'rgba(255, 153, 0, 0.4)',
    bgGradient: 'linear-gradient(135deg, #78350f 0%, #1e1b4b 100%)',
    roles: 'SDE-2 / Bar Raiser • AWS Infra • L6 Lead',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M14.07 15.54c-2.45 1.83-6.02 2.81-9.1 2.81-4.32 0-8.21-1.63-11.16-4.36-.23-.21-.02-.5.25-.34 3.19 1.85 7.15 2.96 11.23 2.96 2.73 0 5.72-.61 8.44-1.9.41-.19.75.25.34.83zm1.25-1.57c-.31-.41-2.07-.19-2.86-.1-.24.03-.27-.16-.06-.31 1.36-.96 3.59-.69 3.86-.35.27.34-.07 2.59-1.36 3.63-.2.16-.39.07-.3-.14.3-.67.92-1.92.72-2.73z"/>
      </svg>
    )
  },
  {
    id: 'apple',
    name: 'Apple',
    badge: 'Silicon, iOS & Swift Runtime',
    color: '#A2AAAD',
    glow: 'rgba(255, 255, 255, 0.3)',
    bgGradient: 'linear-gradient(135deg, #334155 0%, #020617 100%)',
    roles: 'Core OS • Metal & ML • Hardware Systems',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.91.04-2.02.61-2.67 1.38-.57.66-1.07 1.76-.94 2.81 1.02.08 2.05-.51 2.67-1.26z"/>
      </svg>
    )
  },
  {
    id: 'meta',
    name: 'Meta',
    badge: 'PyTorch, LLaMA & VR Systems',
    color: '#0668E1',
    glow: 'rgba(6, 104, 225, 0.4)',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b0764 100%)',
    roles: 'E5/E6 Infrastructure • AI Research • React Core',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0668E1">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    )
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    badge: 'CUDA Acceleration & GenAI Silicon',
    color: '#76B900',
    glow: 'rgba(118, 185, 0, 0.4)',
    bgGradient: 'linear-gradient(135deg, #14532d 0%, #022c22 100%)',
    roles: 'GPU Kernel Architect • Deep Learning • LLM Inference',
    logoSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#76B900">
        <path d="M8.7 15.2c-1.4-.4-2.4-1.5-2.7-2.9-.3-1.6.4-3.2 1.7-4.1 1.9-1.2 4.4-.7 5.7 1.1l1.5-1.5c-2.1-2.4-5.7-3.1-8.5-1.5-2.1 1.2-3.4 3.4-3.4 5.9 0 2.2 1.1 4.3 2.9 5.5 2.3 1.6 5.3 1.7 7.7.3l-1.3-1.6c-1.1.7-2.4.9-3.6.8z"/>
      </svg>
    )
  }
];

export const Tech3DHomepage = ({ onEnterApp, initialUser = null }) => {
  const [selectedMncIndex, setSelectedMncIndex] = useState(0);
  const [isDoorsOpen, setIsDoorsOpen] = useState(true);
  const [authTab, setAuthTab] = useState('google'); // 'google', 'signup', 'login'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('SDE-2 (Google / Amazon)');

  const canvasRef = useRef(null);
  const activeMnc = DREAM_MNCS[selectedMncIndex];

  // Auto-cycle through dream MNCs every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMncIndex((prev) => (prev + 1) % DREAM_MNCS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // High-Clarity Milky Way Galaxy Surfing Journey Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    // Generate High-Clarity 4-Arm Logarithmic Spiral Milky Way Stars
    const NUM_GALAXY_STARS = 1400;
    const ARMS = 4;
    const ARM_OFFSET = (Math.PI * 2) / ARMS;
    const GALAXY_RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.9;

    const galaxyStars = Array.from({ length: NUM_GALAXY_STARS }, (_, i) => {
      // Spiral Arm distribution
      const arm = i % ARMS;
      const distRatio = Math.pow(Math.random(), 1.8); // Denser towards core
      const distance = distRatio * GALAXY_RADIUS + 15;
      const angle = distance * 0.007 + arm * ARM_OFFSET + (Math.random() - 0.5) * 0.55;
      
      // Vertical / depth thickness of galactic disk
      const zDispersion = (Math.random() - 0.5) * (80 + (1 - distRatio) * 120);

      // Star palette based on temperature/region (core is gold/white, arms are cyan/indigo/pink)
      let color;
      const randColor = Math.random();
      if (distRatio < 0.15) {
        color = randColor > 0.4 ? '#ffffff' : '#fef08a'; // Warm brilliant core
      } else if (distRatio < 0.5) {
        color = randColor > 0.5 ? '#93c5fd' : randColor > 0.25 ? '#c084fc' : '#38bdf8';
      } else {
        color = randColor > 0.6 ? '#67e8f9' : randColor > 0.3 ? '#f472b6' : '#818cf8';
      }

      return {
        arm,
        distRatio,
        distance,
        angle,
        speed: (0.0022 / (distRatio * 1.5 + 0.4)), // Differential orbital speed
        z: zDispersion,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color
      };
    });

    // Foreground "Surfing" Fast Cosmic Dust & Relativistic Streaks
    const NUM_SURF_DUST = 180;
    const surfDust = Array.from({ length: NUM_SURF_DUST }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth * 2.2,
      y: (Math.random() - 0.5) * window.innerHeight * 2.2,
      z: Math.random() * 1200 + 50,
      baseSpeed: Math.random() * 5 + 3,
      size: Math.random() * 2 + 0.8,
      color: Math.random() > 0.5 ? '#38bdf8' : Math.random() > 0.25 ? '#a855f7' : '#ec4899'
    }));

    // Shooting Meteors
    const meteors = [];
    const spawnMeteor = () => {
      if (meteors.length < 3 && Math.random() < 0.04) {
        meteors.push({
          x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
          y: Math.random() * (window.innerHeight * 0.5),
          len: Math.random() * 120 + 80,
          speed: Math.random() * 14 + 16,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: Math.random() > 0.5 ? '#38bdf8' : '#e0e7ff'
        });
      }
    };

    // Camera Surfing Journey Angles & Time
    let journeyTime = 0;
    let cameraTilt = 0.58; // Inclined perspective view of Milky Way disk
    let cameraYaw = 0.12;

    const render = () => {
      journeyTime += 0.008;

      // Clear with deep cosmic black & dark navy gradient
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.scale(dpr, dpr);

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const centerX = screenW * 0.48 + Math.sin(journeyTime * 0.5) * 35; // Gentle surfing camera sway
      const centerY = screenH * 0.46 + Math.cos(journeyTime * 0.4) * 20;

      // 1. Render Deep Galactic Core & Interstellar Nebula Glows
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, GALAXY_RADIUS * 0.7);
      coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.42)'); // Bright luminous core
      coreGrad.addColorStop(0.12, 'rgba(168, 85, 247, 0.25)'); // Magenta/Violet gas
      coreGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.16)'); // Cyan arm glow
      coreGrad.addColorStop(0.65, 'rgba(30, 27, 75, 0.08)');  // Deep indigo outer rim
      coreGrad.addColorStop(1, 'rgba(2, 4, 10, 0)');
      
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, GALAXY_RADIUS * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Nebula Clouds along Galaxy Journey
      const nebX = centerX + Math.cos(journeyTime * 0.3) * 140;
      const nebY = centerY + Math.sin(journeyTime * 0.3) * 70;
      const nebGrad = ctx.createRadialGradient(nebX, nebY, 0, nebX, nebY, 260);
      nebGrad.addColorStop(0, 'rgba(236, 72, 153, 0.14)');
      nebGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.08)');
      nebGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad;
      ctx.beginPath();
      ctx.arc(nebX, nebY, 260, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render Milky Way Logarithmic Spiral Arm Stars (High Clarity 3D Projection)
      const cosTilt = Math.cos(cameraTilt);
      const sinTilt = Math.sin(cameraTilt);

      galaxyStars.forEach((star) => {
        // Orbit update (Galaxy Rotation)
        star.angle += star.speed;
        star.twinklePhase += star.twinkleSpeed;

        // Galactic coordinates
        const xOrb = Math.cos(star.angle) * star.distance;
        const yOrb = Math.sin(star.angle) * star.distance;
        const zOrb = star.z;

        // 3D Camera tilt & perspective projection
        const projX = xOrb * Math.cos(cameraYaw) - yOrb * Math.sin(cameraYaw);
        const yRot = xOrb * Math.sin(cameraYaw) + yOrb * Math.cos(cameraYaw);
        const projY = yRot * cosTilt - zOrb * sinTilt;
        const projZ = yRot * sinTilt + zOrb * cosTilt;

        // Perspective scale
        const fov = 750;
        const scale = fov / (fov + projZ + 250);

        const screenX = centerX + projX * scale;
        const screenY = centerY + projY * scale;

        if (screenX >= -20 && screenX <= screenW + 20 && screenY >= -20 && screenY <= screenH + 20) {
          const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.3 + 0.4;
          const currentAlpha = Math.min(1, Math.max(0.15, star.alpha * twinkle * scale));
          const currentRadius = Math.max(0.6, star.size * scale * 1.2);

          // Star Core
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, currentRadius, 0, Math.PI * 2);
          ctx.fill();

          // High-luminosity stars get a soft halo
          if (star.size > 1.8 && star.distRatio < 0.4) {
            ctx.globalAlpha = currentAlpha * 0.3;
            ctx.beginPath();
            ctx.arc(screenX, screenY, currentRadius * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      ctx.globalAlpha = 1;

      // 3. Render High-Speed Surfing Cosmic Dust / Relativistic Streaks
      surfDust.forEach((dust) => {
        dust.z -= dust.baseSpeed;
        if (dust.z <= 10) {
          dust.z = 1200;
          dust.x = (Math.random() - 0.5) * screenW * 2.2;
          dust.y = (Math.random() - 0.5) * screenH * 2.2;
        }

        const k = 320 / dust.z;
        const px = dust.x * k + screenW / 2;
        const py = dust.y * k + screenH / 2;

        if (px >= 0 && px <= screenW && py >= 0 && py <= screenH) {
          const prevK = 320 / (dust.z + dust.baseSpeed * 2.5);
          const prevPx = dust.x * prevK + screenW / 2;
          const prevPy = dust.y * prevK + screenH / 2;

          const depthRatio = Math.max(0.05, Math.min(1, 1 - dust.z / 1200));

          // Streak line
          ctx.strokeStyle = dust.color;
          ctx.lineWidth = Math.min(2.2, depthRatio * 2.4);
          ctx.globalAlpha = depthRatio * 0.7;
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Particle Head
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = depthRatio;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.1, dust.size * depthRatio), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 4. Render Shooting Meteors cutting through the Milky Way
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x > screenW + 100 || m.y > screenH + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.len;
        const tailY = m.y - Math.sin(m.angle) * m.len;

        const mGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        mGrad.addColorStop(0, 'transparent');
        mGrad.addColorStop(0.8, m.color);
        mGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2;
        ctx.globalAlpha = m.alpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setSuccessToast('⚡ Connecting with Google Account...');
    setTimeout(() => {
      const user = {
        name: 'Niladri Mukherjee',
        email: 'niladri.candidate@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        provider: 'google',
        targetRole: targetRole || 'SDE-2 at Google / Microsoft',
        signedInAt: new Date().toISOString()
      };
      localStorage.setItem('recruiters_hub_user', JSON.stringify(user));
      setSuccessToast('🚀 Welcome! Train door opened. Entering Recruiters Hub AI...');
      setTimeout(() => {
        onEnterApp(user);
      }, 700);
    }, 900);
  };

  const handleEmailAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please provide your email and password');
      return;
    }
    setIsSubmitting(true);
    setSuccessToast(authTab === 'signup' ? '🎉 Account Created Successfully!' : '⚡ Authenticated Successfully!');

    setTimeout(() => {
      const user = {
        name: fullName || email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        provider: 'email',
        targetRole: targetRole,
        signedInAt: new Date().toISOString()
      };
      localStorage.setItem('recruiters_hub_user', JSON.stringify(user));
      setTimeout(() => {
        onEnterApp(user);
      }, 600);
    }, 800);
  };

  const handleGuestEnter = () => {
    const guestUser = {
      name: 'Guest Explorer',
      email: 'guest@recruitershub.ai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      provider: 'guest',
      targetRole: 'Tier-1 Candidate',
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem('recruiters_hub_user', JSON.stringify(guestUser));
    onEnterApp(guestUser);
  };

  return (
    <div className="tech-3d-root">
      {/* 3D Canvas Background */}
      <canvas ref={canvasRef} className="tech-3d-canvas" />

      {/* Floating Ambient Glowing Lights */}
      <div className="ambient-glow-mesh">
        <div className="orb orb-cyan" />
        <div className="orb orb-magenta" />
        <div className="orb orb-indigo" />
      </div>

      <div className="tech-3d-container">
        {/* Top Floating Navbar */}
        <header className="tech-top-nav">
          <div className="nav-brand">
            <div className="brand-logo-wrap">
              <img 
                src="/recruiters_hub_logo.png" 
                alt="Recruiters Hub Logo" 
                className="brand-logo-img"
              />
            </div>
            <div className="brand-text">
              <span className="brand-title">Recruiters Hub <span className="ai-neon">AI</span></span>
              <span className="brand-sub">Dream MNC Gateway 2026</span>
            </div>
          </div>

          <div className="nav-right-actions">
            <button className="nav-guest-btn" onClick={handleGuestEnter}>
              <span>Explore as Guest</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <main className="tech-hero-grid">
          {/* LEFT: 3D Animated Train & MNC Doors */}
          <section className="hero-train-showcase">
            {/* Ambient Floating Banner Text */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="floating-ambient-badge"
            >
              <div className="pulse-track-dot" />
              <span className="ambient-track-title">THE MNC HYPERLOOP EXPRESS</span>
              <span className="ambient-track-sep">•</span>
              <span className="ambient-track-sub">Opening Your Next Door</span>
            </motion.div>

            {/* CLASSY AMBIENT FLOATING TEXT */}
            <div className="classy-floating-writing-wrap">
              <motion.div 
                className="floating-word-pill word-1"
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Zap size={14} color="#38bdf8" />
                <span>BUILD SKILLS</span>
              </motion.div>

              <motion.div 
                className="floating-word-pill word-2"
                animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <Award size={14} color="#a855f7" />
                <span>GET PLACED</span>
              </motion.div>

              <motion.div 
                className="floating-word-pill word-3"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Users size={14} color="#10b981" />
                <span>CONNECT WITH REAL INDUSTRY RECRUITERS</span>
              </motion.div>
            </div>

            {/* 3D CYBER TRAIN & PNEUMATIC DOOR STAGE */}
            <div className="train-3d-stage">
              <div className="train-cockpit-glow" style={{ boxShadow: `0 0 60px ${activeMnc.glow}` }} />

              {/* Futuristic Train Structure */}
              <div className="futuristic-train-body">
                {/* Top Train Roof & Lights */}
                <div className="train-roof-bar">
                  <div className="train-headlight headlight-left" />
                  <div className="train-destination-ticker">
                    <span className="ticker-live-dot" />
                    <span>NEXT STOP: <strong>{activeMnc.name.toUpperCase()} HQ</strong> ({activeMnc.badge})</span>
                  </div>
                  <div className="train-headlight headlight-right" />
                </div>

                {/* THE 3D OPENING PNEUMATIC DOORS TO DREAM MNC */}
                <div className="train-door-viewport">
                  {/* Left Door Panel */}
                  <motion.div 
                    className="train-door-panel door-left"
                    animate={{ x: isDoorsOpen ? '-88%' : '0%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 80 }}
                  >
                    <div className="door-cyber-lines" />
                    <div className="door-handle-neon" />
                    <div className="door-label">GATE 01-A</div>
                  </motion.div>

                  {/* Right Door Panel */}
                  <motion.div 
                    className="train-door-panel door-right"
                    animate={{ x: isDoorsOpen ? '88%' : '0%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 80 }}
                  >
                    <div className="door-cyber-lines" />
                    <div className="door-handle-neon" />
                    <div className="door-label">GATE 01-B</div>
                  </motion.div>

                  {/* PORTAL INSIDE THE DOORS: Dream MNC Showcase */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeMnc.id}
                      initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                      transition={{ duration: 0.6 }}
                      className="portal-inner-content"
                      style={{ background: activeMnc.bgGradient }}
                    >
                      <div className="portal-hologram-halo" style={{ borderColor: activeMnc.color }} />
                      
                      <div className="mnc-hero-icon-box" style={{ borderColor: activeMnc.color, boxShadow: `0 0 30px ${activeMnc.glow}` }}>
                        {activeMnc.logoSvg}
                      </div>

                      <div className="mnc-hero-info">
                        <div className="mnc-status-tag" style={{ color: activeMnc.color }}>
                          ✦ ACTIVE HIRING & BAR RAISER PREP
                        </div>
                        <h2 className="mnc-hero-title">{activeMnc.name}</h2>
                        <div className="mnc-roles-badge">{activeMnc.roles}</div>
                      </div>

                      <button 
                        className="btn-enter-mnc" 
                        style={{ background: activeMnc.color }}
                        onClick={handleGoogleSignIn}
                      >
                        <span>Step In Through {activeMnc.name} Door</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Train Maglev Tracks & Neon Rail */}
                <div className="train-tracks-base">
                  <div className="maglev-beam-glow" />
                  <div className="rail-glow-bar" />
                </div>
              </div>

              {/* Station Carousel Selector */}
              <div className="mnc-station-selector">
                {DREAM_MNCS.map((mnc, idx) => (
                  <button 
                    key={mnc.id}
                    className={`station-pill ${idx === selectedMncIndex ? 'active' : ''}`}
                    onClick={() => setSelectedMncIndex(idx)}
                    style={{ '--station-color': mnc.color }}
                  >
                    <span className="station-mini-logo">{mnc.logoSvg}</span>
                    <span>{mnc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT: High-Tech Glassmorphic Authentication Card */}
          <section className="hero-auth-card-wrap">
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-auth-box"
            >
              {/* Card Header */}
              <div className="auth-card-header">
                <div className="auth-badge-top">
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Free Candidate & Mentorship Access</span>
                </div>
                <h1 className="auth-card-title">Join Recruiters Hub</h1>
                <p className="auth-card-sub">
                  Direct access to real recruiters, 1:1 live interview mocks & verified job alerts.
                </p>
              </div>

              {/* Success Toast */}
              {successToast && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="auth-success-banner"
                >
                  <CheckCircle2 size={16} />
                  <span>{successToast}</span>
                </motion.div>
              )}

              {/* ONE-CLICK GOOGLE SIGNUP */}
              <button 
                className="google-btn-full"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-separator">
                <span>or continue with email</span>
              </div>

              {/* TAB SELECTOR: Sign Up vs Login */}
              <div className="auth-tab-switch">
                <button 
                  className={`tab-switch-btn ${authTab === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthTab('signup')}
                >
                  Create Account
                </button>
                <button 
                  className={`tab-switch-btn ${authTab === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthTab('login')}
                >
                  Log In
                </button>
              </div>

              {/* EMAIL FORM */}
              <form onSubmit={handleEmailAuthSubmit} className="auth-form-fields">
                {authTab === 'signup' && (
                  <div className="form-input-box">
                    <label>Full Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="field-icon" />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sameer Kulkarni"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="form-input-box">
                  <label>Work or Personal Email</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input 
                      type="email" 
                      required 
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-input-box">
                  <label>Password</label>
                  <div className="input-with-icon">
                    <Lock size={16} className="field-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="eye-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {authTab === 'signup' && (
                  <div className="form-input-box">
                    <label>Target Dream Role / Company</label>
                    <div className="input-with-icon">
                      <Briefcase size={16} className="field-icon" />
                      <input 
                        type="text" 
                        placeholder="e.g. SDE-2 at Google / Staff at Microsoft"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{authTab === 'signup' ? '🚀 Create Free Account & Enter Hub' : '⚡ Log In & Launch Dashboard'}</span>
                  <ChevronRight size={18} />
                </button>
              </form>

              {/* Guest Quick Skip */}
              <div className="auth-card-footer">
                <span>Want to browse first without saving profile?</span>
                <button type="button" className="guest-link-btn" onClick={handleGuestEnter}>
                  Enter as Guest Explorer →
                </button>
              </div>
            </motion.div>
          </section>
        </main>
      </div>

      {/* COMPONENT SCOPED CSS STYLING */}
      <style>{`
        .tech-3d-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: #030712;
          color: #f8fafc;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .tech-3d-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .ambient-glow-mesh {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.35;
        }
        .orb-cyan {
          width: 450px;
          height: 450px;
          background: #06b6d4;
          top: -100px;
          left: -100px;
        }
        .orb-magenta {
          width: 500px;
          height: 500px;
          background: #d946ef;
          bottom: -150px;
          right: -100px;
        }
        .orb-indigo {
          width: 400px;
          height: 400px;
          background: #6366f1;
          top: 30%;
          left: 40%;
        }

        .tech-3d-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.5rem 2rem 4rem 2rem;
        }

        /* Top Navbar */
        .tech-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          margin-bottom: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-logo-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.9);
          border: 1.5px solid rgba(99, 102, 241, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          overflow: hidden;
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.35), inset 0 0 8px rgba(168, 85, 247, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .brand-logo-wrap:hover {
          transform: scale(1.08) rotate(2deg);
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.6), inset 0 0 12px rgba(168, 85, 247, 0.4);
        }
        .brand-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-size: 1.25rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .ai-neon {
          background: linear-gradient(135deg, #38bdf8 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-sub {
          font-size: 0.72rem;
          color: #94a3b8;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .nav-guest-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #e2e8f0;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .nav-guest-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          border-color: #60a5fa;
        }

        /* Hero Grid */
        .tech-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .tech-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        /* Floating Ambient Writing */
        .floating-ambient-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #38bdf8;
          margin-bottom: 1.25rem;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
        }
        .pulse-track-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          animation: pulse 1.8s infinite;
        }
        .ambient-track-sep { color: #475569; }
        .ambient-track-sub { color: #cbd5e1; font-weight: 600; }

        .classy-floating-writing-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 2rem;
        }
        .floating-word-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        .word-1 {
          background: rgba(14, 165, 233, 0.15);
          border: 1.5px solid rgba(56, 189, 248, 0.4);
          color: #e0f2fe;
        }
        .word-2 {
          background: rgba(168, 85, 247, 0.15);
          border: 1.5px solid rgba(192, 132, 252, 0.4);
          color: #f3e8ff;
        }
        .word-3 {
          background: rgba(16, 185, 129, 0.15);
          border: 1.5px solid rgba(52, 211, 153, 0.4);
          color: #d1fae5;
          grid-column: span 2;
        }

        /* 3D Train Stage */
        .train-3d-stage {
          position: relative;
          background: rgba(15, 23, 42, 0.7);
          border: 1.5px solid rgba(99, 102, 241, 0.3);
          border-radius: 28px;
          padding: 1.75rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .train-cockpit-glow {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          pointer-events: none;
          transition: all 0.5s ease;
        }

        .futuristic-train-body {
          position: relative;
          background: #0b0f19;
          border-radius: 20px;
          border: 2px solid #1e293b;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }
        .train-roof-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          background: #020617;
          border-bottom: 1px solid #1e293b;
        }
        .train-headlight {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 15px #38bdf8, 0 0 30px #38bdf8;
        }
        .train-destination-ticker {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }
        .ticker-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .train-destination-ticker strong { color: #ffffff; }

        /* The Door Viewport */
        .train-door-viewport {
          position: relative;
          height: 280px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .train-door-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          border-bottom: 3px solid #38bdf8;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .door-left {
          left: 0;
          border-right: 1.5px solid #38bdf8;
        }
        .door-right {
          right: 0;
          border-left: 1.5px solid #38bdf8;
        }
        .door-cyber-lines {
          position: absolute;
          inset: 12px;
          border: 1px dashed rgba(56, 189, 248, 0.2);
          border-radius: 8px;
        }
        .door-handle-neon {
          width: 6px;
          height: 60px;
          background: #38bdf8;
          border-radius: 4px;
          box-shadow: 0 0 12px #38bdf8;
        }
        .door-label {
          position: absolute;
          bottom: 12px;
          font-size: 0.65rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.1em;
        }

        /* Portal inside door */
        .portal-inner-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
        }
        .portal-hologram-halo {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          filter: blur(1px);
          animation: spin 20s linear infinite;
        }
        .mnc-hero-icon-box {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.8);
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 3;
        }
        .mnc-hero-info {
          position: relative;
          z-index: 3;
          margin-bottom: 1rem;
        }
        .mnc-status-tag {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }
        .mnc-hero-title {
          font-size: 1.9rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }
        .mnc-roles-badge {
          font-size: 0.8rem;
          color: #cbd5e1;
          font-weight: 600;
          background: rgba(0, 0, 0, 0.4);
          padding: 4px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-enter-mnc {
          position: relative;
          z-index: 3;
          border: none;
          color: white;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 8px 18px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.2s;
        }
        .btn-enter-mnc:hover {
          transform: translateY(-2px);
          filter: brightness(1.15);
        }

        .train-tracks-base {
          height: 14px;
          background: #020617;
          border-top: 1px solid #334155;
          position: relative;
          overflow: hidden;
        }
        .maglev-beam-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.6) 50%, transparent 100%);
          animation: scan 2s linear infinite;
        }

        /* Station Carousel */
        .mnc-station-selector {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .station-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .station-pill.active {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border-color: var(--station-color, #38bdf8);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
        }
        .station-mini-logo {
          display: flex;
          align-items: center;
        }
        .station-mini-logo svg {
          width: 14px;
          height: 14px;
        }

        /* Right Auth Card */
        .hero-auth-card-wrap {
          position: relative;
        }
        .glass-auth-box {
          background: rgba(15, 23, 42, 0.75);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          border-radius: 30px;
          padding: 2.25rem;
          backdrop-filter: blur(24px);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15);
        }
        .auth-card-header {
          margin-bottom: 1.5rem;
        }
        .auth-badge-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }
        .auth-card-title {
          font-size: 1.85rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
        }
        .auth-card-sub {
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
        }

        .auth-success-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid #10b981;
          color: #34d399;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        /* Google button */
        .google-btn-full {
          width: 100%;
          background: #ffffff;
          color: #1e293b;
          border: none;
          padding: 12px 16px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.15);
          transition: all 0.2s ease;
        }
        .google-btn-full:hover {
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
        }

        .auth-separator {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.25rem 0;
          color: #64748b;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .auth-separator::before, .auth-separator::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .auth-separator span { padding: 0 10px; }

        /* Tabs */
        .auth-tab-switch {
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 1.25rem;
        }
        .tab-switch-btn {
          flex: 1;
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-switch-btn.active {
          background: #3b82f6;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
        }

        /* Form fields */
        .auth-form-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-input-box label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #cbd5e1;
          margin-bottom: 6px;
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          color: #64748b;
          pointer-events: none;
        }
        .input-with-icon input {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 14px 10px 40px;
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-with-icon input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
          background: rgba(0, 0, 0, 0.6);
        }
        .eye-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
        }
        .eye-toggle-btn:hover { color: #cbd5e1; }

        .auth-submit-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border: none;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 12px;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
          margin-top: 0.5rem;
          transition: all 0.2s;
        }
        .auth-submit-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.5);
        }

        .auth-card-footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          font-size: 0.8rem;
          color: #64748b;
        }
        .guest-link-btn {
          display: block;
          margin: 6px auto 0 auto;
          background: none;
          border: none;
          color: #38bdf8;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .guest-link-btn:hover { text-decoration: underline; }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};
