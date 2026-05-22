import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Aurora } from './Aurora';


const ProjectCard = ({ project, smoothZ, setSelectedProject }: { project: any, smoothZ: any, setSelectedProject: any }) => {
  const isLeft = project.side === 'left';
  const rotateYVal = isLeft ? 35 : -35;

  // Track relative Z position of this card to the camera plane
  const cardZ = useTransform(smoothZ, (latestZ: number) => latestZ + project.zOffset);

  // Keep cards visible and clickable in the background, only fade and disable when behind the camera
  const opacity = useTransform(cardZ, [-3000, -2000, 0, 80], [0.2, 1, 1, 0]);
  
  // Hide cards completely when they pass the camera to prevent invisible hit-testing blocks
  const visibility = useTransform(cardZ, (z: number) => z > 80 ? 'hidden' : 'visible');

  // We position cards directly in 2D layout (left) instead of 3D translating them horizontally.
  // This completely prevents their click bounding boxes from overlapping and blocking each other!
  const leftPos = isLeft ? 'calc(50% - 470px)' : 'calc(50% + 210px)';

  return (
    <motion.div
      onClick={() => setSelectedProject(project)}
      className="absolute cursor-pointer rounded-[4px] bg-zinc-950/90 border border-white/5 overflow-hidden group select-none"
      style={{
        width: '260px',
        height: '380px',
        left: leftPos,
        top: '27%',
        transformStyle: 'preserve-3d',
        z: cardZ,
        rotateY: `${rotateYVal}deg`,
        boxShadow: '0 4px 60px rgba(0,0,0,0.9)',
        opacity,
        visibility,
        transition: 'filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        willChange: 'transform, filter, box-shadow'
      }}
      whileHover={{
        filter: 'brightness(1.35)',
        boxShadow: '0 0 40px rgba(124,58,237,0.15)',
        borderColor: 'rgba(124,58,237,0.3)'
      }}
    >
      <div className="relative w-full h-full flex flex-col justify-between p-6">
        <div className="flex justify-between items-center z-10">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00D4AA]">
            {project.category}
          </span>
        </div>

        <div className="absolute inset-0 w-full h-full p-8 flex items-center justify-center">
          <motion.img
            src={project.img}
            alt={project.title}
            className="max-w-full max-h-full object-contain opacity-85 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>

        <div className="z-10 mt-auto pt-4 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
          <h3 className="text-xl text-white font-light font-gambetta tracking-wide leading-tight group-hover:text-[#7C3AED] transition-colors">
            {project.title}
          </h3>
          <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest font-general">
            Explore Case Study ➔
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function PortfolioPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to Z translation (0px to 7500px)
  // We have 10 pairs spaced every 700px. Z offsets go down to -6300px.
  // Translating from 0 to 7500px allows us to walk past the last pair.
  const zTranslation = useTransform(scrollYProgress, [0, 1], [0, 7500]);

  // Smooth spring for that premium heavy physical feel
  const smoothZ = useSpring(zTranslation, {
    damping: 35,
    stiffness: 120,
    mass: 1.5
  });

  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    {
      id: '1',
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A premium luxury e-commerce experience showcasing high-end digital design and conversion optimization.",
      img: "/images/projects/luxify/luxify-1.png",
      gallery: ["/images/projects/luxify/luxify-2.png", "/images/projects/luxify/luxify-3.png"],
      zOffset: 0,
      side: 'left',
      color: "#7C3AED",
    },
    {
      id: '2',
      title: "Elegant",
      category: "Graphic Design",
      description: "Elegant and minimalist brand identity developed for an exclusive modest boutique fashion house.",
      img: "/images/projects/abayas/abaya-2.png",
      gallery: ["/images/projects/abayas/abaya-1.jpg", "/images/projects/abayas/abaya-3.jpg", "/images/projects/abayas/abaya-4.jpg", "/images/projects/abayas/abaya-5.jpg"],
      zOffset: 0,
      side: 'right',
      color: "#00D4AA",
    },
    {
      id: '3',
      title: "Social Campaign",
      category: "Social Media",
      description: "A high-performance organic and paid advertising social strategy focused on community building and viral reach.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -700,
      side: 'left',
      color: "#3B82F6",
    },
    {
      id: '4',
      title: "Customer AI Bot",
      category: "AI Chatbot",
      description: "Custom intelligent chatbot workflow putting client operations on complete autopilot for massive time savings.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -700,
      side: 'right',
      color: "#7C3AED",
    },
    {
      id: '5',
      title: "SaaS Dashboard",
      category: "Web Development",
      description: "A high-speed corporate analytics panel utilizing modern technologies for seamless and instant global updates.",
      img: "/images/projects/saas/saas-1.png",
      gallery: ["/images/projects/saas/saas-1.png", "/images/projects/saas/saas-2.png"],
      zOffset: -1400,
      side: 'left',
      color: "#3B82F6",
    },
    {
      id: '6',
      title: "Smart Automation",
      category: "AI Agent Development",
      description: "Connecting internet of things devices with automated workflow scripts for zero-friction property management.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -1400,
      side: 'right',
      color: "#00D4AA",
    },
    {
      id: '7',
      title: "Corporate Portal",
      category: "Web Development",
      description: "A modern, responsive corporate website with advanced content management capabilities tailored for enterprise use.",
      img: "/images/projects/luxify/luxify-1.png",
      gallery: ["/images/projects/luxify/luxify-2.png", "/images/projects/luxify/luxify-3.png"],
      zOffset: -2100,
      side: 'left',
      color: "#7C3AED",
    },
    {
      id: '8',
      title: "Autonomous Worker",
      category: "AI Agent Development",
      description: "An intelligent autonomous agent designed to scrape, analyze, and summarize complex market data streams.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -2100,
      side: 'right',
      color: "#3B82F6",
    },
    {
      id: '9',
      title: "Brand Identity Refresh",
      category: "Graphic Design",
      description: "Comprehensive brand ecosystem including logo, typography, and captivating marketing materials.",
      img: "/images/projects/abayas/abaya-2.png",
      gallery: ["/images/projects/abayas/abaya-1.jpg", "/images/projects/abayas/abaya-3.jpg", "/images/projects/abayas/abaya-4.jpg"],
      zOffset: -2800,
      side: 'left',
      color: "#00D4AA",
    },
    {
      id: '10',
      title: "Smart Support Bot",
      category: "AI Chatbot",
      description: "Custom-trained LLM integration for automated 24/7 customer support and organic lead generation.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -2800,
      side: 'right',
      color: "#7C3AED",
    },
    {
      id: '11',
      title: "Cloud ERP System",
      category: "Enterprise Solutions",
      description: "Scalable enterprise resource planning software integrated with predictive AI analytics.",
      img: "/images/projects/saas/saas-1.png",
      gallery: ["/images/projects/saas/saas-1.png", "/images/projects/saas/saas-2.png"],
      zOffset: -3500,
      side: 'left',
      color: "#3B82F6",
    },
    {
      id: '12',
      title: "Viral Ad Campaign",
      category: "Social Media",
      description: "A high-performance organic and paid advertising social strategy designed for hyper-growth.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -3500,
      side: 'right',
      color: "#00D4AA",
    },
    {
      id: '13',
      title: "HealthTech Portal",
      category: "Web Development",
      description: "A secure and compliant patient management portal bridging the gap between doctors and patients.",
      img: "/images/projects/luxify/luxify-1.png",
      gallery: ["/images/projects/luxify/luxify-2.png", "/images/projects/luxify/luxify-3.png"],
      zOffset: -4200,
      side: 'left',
      color: "#7C3AED",
    },
    {
      id: '14',
      title: "Trading AI Agent",
      category: "AI Agent Development",
      description: "High-frequency algorithmic trading agent leveraging real-time sentiment analysis.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -4200,
      side: 'right',
      color: "#3B82F6",
    },
    {
      id: '15',
      title: "Event Branding",
      category: "Graphic Design",
      description: "End-to-end event branding, from large scale banners to social media promotional graphics.",
      img: "/images/projects/abayas/abaya-2.png",
      gallery: ["/images/projects/abayas/abaya-1.jpg", "/images/projects/abayas/abaya-3.jpg", "/images/projects/abayas/abaya-4.jpg"],
      zOffset: -4900,
      side: 'left',
      color: "#00D4AA",
    },
    {
      id: '16',
      title: "Lead Gen Chatbot",
      category: "AI Chatbot",
      description: "Conversational bot specifically trained to qualify leads and seamlessly book calendar appointments.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -4900,
      side: 'right',
      color: "#7C3AED",
    },
    {
      id: '17',
      title: "Enterprise CRM",
      category: "Enterprise Solutions",
      description: "A custom-built CRM with robust data visualization and multi-tier user access control.",
      img: "/images/projects/saas/saas-1.png",
      gallery: ["/images/projects/saas/saas-1.png", "/images/projects/saas/saas-2.png"],
      zOffset: -5600,
      side: 'left',
      color: "#3B82F6",
    },
    {
      id: '18',
      title: "Community Growth",
      category: "Social Media",
      description: "Scaling a niche community from 0 to 50k active members using targeted content strategies.",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -5600,
      side: 'right',
      color: "#00D4AA",
    },
    {
      id: '19',
      title: "Web3 Dashboard",
      category: "Web Development",
      description: "A decentralized application interface for seamless blockchain interactions and portfolio tracking.",
      img: "/images/projects/luxify/luxify-1.png",
      gallery: ["/images/projects/luxify/luxify-2.png", "/images/projects/luxify/luxify-3.png"],
      zOffset: -6300,
      side: 'left',
      color: "#7C3AED",
    },
    {
      id: '20',
      title: "Data Scraping Agent",
      category: "AI Agent Development",
      description: "A highly resilient data extraction agent capable of navigating dynamic web structures.",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&h=400&auto=format&fit=crop"],
      zOffset: -6300,
      side: 'right',
      color: "#3B82F6",
    }
  ];

  const particles = useMemo(() => {
    const colors = ['#00D4AA', '#7C3AED', '#3B82F6', '#FFFFFF'];
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 1000 - 500,
      z: Math.random() * -3000,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.15 + 0.05
    }));
  }, []);

  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen bg-[#050508] font-general overflow-x-hidden pt-32 pb-24 select-none">
        <style>{`
          @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=gambetta@400,500,600,700&display=swap');
          
          .font-gambetta {
            font-family: 'Gambetta', Georgia, serif;
          }
          .font-general {
            font-family: 'General Sans', -apple-system, sans-serif;
          }
        `}</style>

        {/* Aurora WebGL Background */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          <Aurora
            colorStops={["#00D4AA", "#7C3AED", "#3B82F6"]}
            blend={0.6}
            amplitude={1.2}
            speed={0.4}
          />
        </div>
        <div className="fixed inset-0 bg-gradient-to-b from-[#050508]/90 via-transparent to-[#050508] z-5 pointer-events-none" />

        {/* Header Title */}
        <div className="relative z-10 text-center px-6 mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] mb-3">
            TrioInfraHub // Selected Works
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight font-gambetta">
            Visual <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent font-black">Hallway</span>
          </h1>
          <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.25em] font-general">
            Tap on any case study to explore
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer rounded-2xl bg-zinc-950/90 border border-white/5 overflow-hidden flex flex-col justify-between p-8 h-[280px] relative group"
              style={{
                boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />

              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00D4AA]">
                  {project.category}
                </span>
              </div>

              <div className="absolute inset-0 w-full h-full p-8 flex items-center justify-center opacity-30 pointer-events-none">
                <img
                  src={project.img}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-2xl text-white font-light font-gambetta tracking-wide mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-general flex items-center gap-2">
                  Explore Case Study <span className="text-[#7C3AED]">➔</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Information Modal (PIP Window) */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop with extreme blur and dark tint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Modal Body Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800/60 rounded-3xl overflow-hidden shadow-[0_4px_60px_rgba(0,0,0,0.9)] z-10 max-h-[85vh] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer group z-20"
                >
                  <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
                </button>

                <div className="p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Category Journey Badge */}
                    <div className="inline-block px-3 py-1 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-semibold uppercase tracking-widest mb-6">
                      {selectedProject.category} // {selectedProject.year}
                    </div>

                    {/* Serif Title */}
                    <h2 className="text-4xl md:text-5xl font-light text-white font-gambetta mb-4 leading-tight">
                      {selectedProject.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-general">
                      {selectedProject.description}
                    </p>

                    {/* 2-Column image gallery */}
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED] mb-6 font-general">
                      Project Gallery
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {selectedProject.gallery.map((imgSrc: string, idx: number) => (
                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center p-4">
                          <img
                            src={imgSrc}
                            alt={`${selectedProject.title} detail ${idx + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p className="text-xs text-gray-500 font-medium font-general">
                      Interested in starting a custom design or digital agency project?
                    </p>
                    <Link to="/contact" className="w-full sm:w-auto" onClick={() => setSelectedProject(null)}>
                      <button
                        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer shadow-lg"
                      >
                        Start Project
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[1000vh] bg-black font-general overflow-visible select-none">
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=gambetta@400,500,600,700&display=swap');
        
        .font-gambetta {
          font-family: 'Gambetta', Georgia, serif;
        }
        .font-general {
          font-family: 'General Sans', -apple-system, sans-serif;
        }
      `}</style>

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]">
        {/* Aurora WebGL Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Aurora
            colorStops={["#00D4AA", "#7C3AED", "#3B82F6"]}
            blend={0.6}
            amplitude={1.2}
            speed={0.4}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/90 via-transparent to-[#050508] z-5 pointer-events-none" />
        {/* Floor Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#7C3AED]/10 to-transparent pointer-events-none z-10" />

        {/* Ambient Overlay Header */}
        <div className="absolute top-24 left-0 right-0 z-20 text-center pointer-events-none px-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] mb-3">
            TrioInfraHub // Selected Works
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight font-gambetta">
            Visual <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent font-black">Hallway</span>
          </h1>
          <p className="text-[9px] text-gray-500 mt-2 uppercase tracking-[0.25em] font-general">
            Scroll to walk through our gallery
          </p>
        </div>

        {/* 3D Viewport Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: '2400px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          {/* Particles Track - Moves with scroll but cannot block clicks */}
          <motion.div
            className="absolute w-full h-full pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              z: smoothZ
            }}
          >
            {/* Ambient particles flying past */}
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  transformStyle: 'preserve-3d',
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`
                }}
              />
            ))}
          </motion.div>

          {/* Hallway Track - Static in 3D so browser hit-testing never breaks. Cards move themselves. */}
          <div
            className="absolute w-full h-full"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Art Frames */}
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                smoothZ={smoothZ}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* Scroll Progress indicator bar */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="w-40 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6]"
              style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
            />
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">
            Scroll Depth
          </span>
        </div>
      </div>

      {/* Information Modal (PIP Window) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with extreme blur and dark tint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800/60 rounded-3xl overflow-hidden shadow-[0_4px_60px_rgba(0,0,0,0.9)] z-10 max-h-[85vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer group z-20"
              >
                <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
              </button>

              <div className="p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                <div>
                  {/* Category Journey Badge */}
                  <div className="inline-block px-3 py-1 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] text-xs font-semibold uppercase tracking-widest mb-6">
                    {selectedProject.category} // {selectedProject.year}
                  </div>

                  {/* Serif Title */}
                  <h2 className="text-4xl md:text-5xl font-light text-white font-gambetta mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-general">
                    {selectedProject.description}
                  </p>

                  {/* 2-Column image gallery */}
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#7C3AED] mb-6 font-general">
                    Project Gallery
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {selectedProject.gallery.map((imgSrc: string, idx: number) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center p-4">
                        <img
                          src={imgSrc}
                          alt={`${selectedProject.title} detail ${idx + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-xs text-gray-500 font-medium font-general">
                    Interested in starting a custom design or digital agency project?
                  </p>
                  <Link to="/contact" className="w-full sm:w-auto" onClick={() => setSelectedProject(null)}>
                    <button
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer shadow-lg"
                    >
                      Start Project
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
