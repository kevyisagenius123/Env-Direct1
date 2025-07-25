// 🎬 CINEMATIC HERO SECTION - 4K Environmental Storytelling
// Apple News+ sophistication meets Netflix documentary production values

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import Lottie from 'lottie-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 🌊 PARTICLE EFFECTS COMPONENT
const ParticleField = () => (
  <Canvas className="absolute inset-0 pointer-events-none">
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]} />
    <Sphere args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#006f4f"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  </Canvas>
);

// 🎥 SCROLL-BASED STORYTELLING ENGINE
const StorylineSequence = ({ currentScene, totalScenes }) => {
  const storyData = useMemo(() => [
    {
      scene: 1,
      title: "The Arctic is Disappearing",
      subtitle: "2.3 million km² lost in 2024",
      visual: "arctic-melt-4k.mp4",
      data: { temp: "+2.8°C", ice: "-23%", timeline: "1979-2024" }
    },
    {
      scene: 2,
      title: "Coral Reefs Under Siege", 
      subtitle: "50% bleached globally",
      visual: "coral-bleaching-4k.mp4",
      data: { bleached: "50%", temp: "+1.5°C", recovery: "12 years" }
    },
    {
      scene: 3,
      title: "Amazon Deforestation Accelerates",
      subtitle: "11,568 km² cleared in 2024",
      visual: "amazon-deforestation-4k.mp4",
      data: { cleared: "11,568 km²", species: "-2,847", carbon: "+890M tons" }
    }
  ], []);

  return (
    <div className="absolute inset-0 z-10">
      {storyData.map((story, index) => (
        <motion.div
          key={story.scene}
          className={`absolute inset-0 ${currentScene === story.scene ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: currentScene === story.scene ? 1 : 0,
            scale: currentScene === story.scene ? 1 : 1.1 
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* 4K Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={`/videos/environmental/${story.visual}`} type="video/mp4" />
          </video>
          
          {/* Data Overlay */}
          <div className="absolute bottom-20 left-0 right-0 px-6">
            <div className="container mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 max-w-2xl"
              >
                <h2 className="text-4xl font-bold text-white mb-4">{story.title}</h2>
                <p className="text-envGreen-300 text-xl mb-6">{story.subtitle}</p>
                
                {/* Live Data Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(story.data).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-mono text-red-400">{value}</div>
                      <div className="text-sm text-white/70 uppercase">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// 🎭 MAIN CINEMATIC HERO COMPONENT
const CinematicHero = ({ onViewportEnter }) => {
  const heroRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(1);
  const [liveMetrics, setLiveMetrics] = useState({
    co2: 421.78,
    temp: +1.23,
    species: 8734,
    readers: 2.3
  });

  const isInView = useInView(heroRef, { threshold: 0.3 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // 🎬 PARALLAX TRANSFORMS
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // 🔄 SCENE PROGRESSION
  useEffect(() => {
    if (isInView && onViewportEnter) {
      onViewportEnter();
    }
  }, [isInView, onViewportEnter]);

  // 🎯 GSAP SCROLL ANIMATIONS
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(".hero-title", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      },
      y: -100,
      opacity: 0.5,
      duration: 2
    });
  }, []);

  // ⏰ LIVE DATA UPDATES
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        co2: prev.co2 + (Math.random() - 0.5) * 0.1,
        temp: prev.temp + (Math.random() - 0.5) * 0.01,
        species: prev.species - Math.floor(Math.random() * 3),
        readers: prev.readers + (Math.random() - 0.5) * 0.1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🎭 SCENE ROTATION
  useEffect(() => {
    const sceneTimer = setInterval(() => {
      setCurrentScene(prev => prev >= 3 ? 1 : prev + 1);
    }, 12000);

    return () => clearInterval(sceneTimer);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* 🌊 3D PARTICLE BACKGROUND */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <ParticleField />
      </motion.div>

      {/* 🎬 STORY SEQUENCE OVERLAY */}
      <motion.div style={{ y, opacity }}>
        <StorylineSequence currentScene={currentScene} totalScenes={3} />
      </motion.div>

      {/* 📊 LIVE CLIMATE DATA HUD */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl rounded-lg p-4 border border-envGreen-500/30"
      >
        <div className="text-white text-sm space-y-2">
          <div className="flex justify-between">
            <span>CO₂ PPM:</span>
            <span className="text-red-400 font-mono">{liveMetrics.co2.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Temp Anomaly:</span>
            <span className="text-orange-400 font-mono">+{liveMetrics.temp.toFixed(2)}°C</span>
          </div>
          <div className="flex justify-between">
            <span>Species Lost:</span>
            <span className="text-yellow-400 font-mono">{liveMetrics.species.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Readers:</span>
            <span className="text-envGreen-400 font-mono">{liveMetrics.readers.toFixed(1)}M</span>
          </div>
        </div>
      </motion.div>

      {/* 🎭 MAIN TITLE OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          className="hero-title text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <h1 className="text-7xl lg:text-9xl font-bold mb-6">
            <span className="text-white">Green</span>
            <br />
            <span className="text-envGreen-400">Atlas</span>
          </h1>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            The world's most comprehensive environmental intelligence platform
          </p>
        </motion.div>
      </div>

      {/* 🔽 SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1 h-16 bg-gradient-to-b from-white to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};

export default CinematicHero;
