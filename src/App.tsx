// src/App.tsx
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Experience from './experience/Experience';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ArmyProjectsPage from './pages/ArmyProjectsPage';
import TourinPage from './pages/TourinPage';
import ContactPage from './pages/ContactPage';
import { useResponsive } from './hooks/useResponsive';

export type DeviceQuality = 'high' | 'medium' | 'low';

export interface ExperienceContextProps {
  scrollProgress: number;
  deviceQuality: DeviceQuality;
  reducedMotion: boolean;
}

export const ExperienceContext = createContext<ExperienceContextProps>({
  scrollProgress: 0,
  deviceQuality: 'high',
  reducedMotion: false,
});

const AppShell: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      {/* Global Persistent 3D WebGL Spatial Canvas */}
      <Experience pathname={location.pathname} />

      {/* Global Consistent Navbar */}
      <Navbar />

      {/* Multipage Routing */}
      <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh', width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/army-projects" element={<ArmyProjectsPage />} />
          <Route path="/tourin" element={<TourinPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Consistent Footer */}
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isMobile, isTablet, reducedMotion } = useResponsive();

  const deviceQuality: DeviceQuality = isMobile ? 'low' : isTablet ? 'medium' : 'high';

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      setScrollProgress(progress);
    };

    lenisInstance.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ExperienceContext.Provider value={{ scrollProgress, deviceQuality, reducedMotion }}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ExperienceContext.Provider>
  );
};

export default App;
