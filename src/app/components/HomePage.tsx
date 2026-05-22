import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Code, Share2, Palette, Bot, ArrowRight, Star, Quote, Mail, Phone, MapPin, Sparkles, Heart, Users, Zap, Facebook, Instagram, Brain, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Aurora } from './Aurora';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  return (
    <div className="relative pt-16 bg-background text-foreground">
      <HorizontalScrollHero />
      <ServicesSection />
      <ExpertiseSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

function HorizontalScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    // Calculate total scroll distance
    const totalWidth = scrollContent.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDist = totalWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContent, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const TickerItem = ({ text, color = "white", gradient = false }: { text: string, color?: string, gradient?: boolean }) => (
    <span className={`text-[16vw] md:text-[12vw] lg:text-[9vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap px-3 md:px-4 inline-flex items-center align-middle ${gradient ? 'bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent' : ''}`} style={{ color: gradient ? undefined : color }}>
      {text}
    </span>
  );

  const CurveSVG = ({ color = "#7C3AED" }) => (
    <div className="flex-shrink-0 px-4 md:px-8 flex items-center justify-center align-middle self-center">
      <svg width="200" height="100" viewBox="0 0 200 100" className="w-[20vw] md:w-[15vw] h-auto block">
        <motion.path
          d="M 0 50 Q 50 0, 100 50 T 200 50"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );

  const IconSVG = ({ color = "#3B82F6", type = "circle" }: { color?: string, type?: string }) => (
    <div className="flex-shrink-0 px-4 md:px-8 flex items-center justify-center align-middle self-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="w-[12vw] md:w-[8vw] h-auto block">
        {type === "circle" && (
          <motion.circle
            cx="50" cy="50" r="40"
            stroke={color}
            strokeWidth="4"
            fill="none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
        {type === "star" && (
          <motion.path
            d="M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z"
            fill={color}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
        {type === "rect" && (
          <motion.rect
            x="20" y="20" width="60" height="60" rx="12"
            stroke={color}
            strokeWidth="4"
            fill="none"
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background flex items-center">
      {/* Aurora WebGL Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Aurora
          colorStops={["#00D4AA", "#7C3AED", "#3B82F6"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.4}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-5 pointer-events-none" />

      <div ref={scrollRef} className="relative z-10 flex items-center h-full will-change-transform">
        <div className="flex items-center">
          <TickerItem text="TrioInfraHub" gradient />
          <CurveSVG color="#00D4AA" />
          <TickerItem text="—" />
          <TickerItem text="Turning" />
          <CurveSVG color="#3B82F6" />
          <TickerItem text="Ideas" />
          <TickerItem text="into" />
          <TickerItem text="Digital" gradient />
          <IconSVG type="circle" color="#7C3AED" />
          <TickerItem text="Success" />
          <IconSVG type="circle" color="#3B82F6" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4">
        <div className="w-24 h-[2px] bg-gray-200 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-black"
            style={{
              width: "100%",
              scaleX: useTransform(useScroll({ target: containerRef }).scrollYProgress, [0, 1], [0, 1]),
              transformOrigin: "left"
            }}
          />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400"></span>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web apps that actually work (and look amazing while doing it)",
      color: "#7C3AED"
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description: "We'll make your brand so engaging, even your competitors will hit follow",
      color: "#3B82F6"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Designs so good, you'll want to frame them (some clients actually have)",
      color: "#00D4AA"
    },
    {
      icon: Bot,
      title: "AI Automation",
      description: "Let robots do the boring stuff while you focus on world domination",
      color: "#7C3AED"
    },
    {
      icon: Brain,
      title: "AI Agent Development",
      description: "Intelligent autonomous agents tailored to streamline your complex workflows",
      color: "#3B82F6"
    },
    {
      icon: Briefcase,
      title: "Enterprise Solutions",
      description: "Robust ERP, CRM, and HR systems designed to scale with your organization",
      color: "#00D4AA"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What We Do Best
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Six services, infinite possibilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, isInView }: { service: any, index: number, isInView: boolean }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="p-6 bg-card rounded-2xl border border-white/5 shadow-md hover:shadow-2xl transition-all cursor-pointer group"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-white/5"
      >
        <Icon className="w-8 h-8" style={{ color: service.color }} />
      </motion.div>

      <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#7C3AED] transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-medium">
        {service.description}
      </p>
    </motion.div>
  );
}

function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The Numbers Don't Lie
          </h2>
          <p className="text-xl text-gray-400 font-medium">
            But they do look impressive
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCounter end={150} label="Projects Completed" suffix="+" isInView={isInView} delay={0} />
          <StatCounter end={120} label="Happy Clients" suffix="+" isInView={isInView} delay={0.1} />
          <StatCounter end={98} label="Client Satisfaction" suffix="%" isInView={isInView} delay={0.2} />
        </div>
      </div>
    </section>
  );
}

function StatCounter({ end, label, suffix, isInView, delay }: { end: number, label: string, suffix: string, isInView: boolean, delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-8 bg-card rounded-2xl shadow-xl border border-white/5"
    >
      <div className="text-5xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-lg font-bold">{label}</div>
    </motion.div>
  );
}

// Vector Illustration Components for Portfolio
const WebVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.rect x="40" y="60" width="120" height="80" rx="8" stroke={color} strokeWidth="2" fill="none" animate={{ y: [60, 55, 60] }} transition={{ duration: 4, repeat: Infinity }} />
    <motion.path d="M 40 80 L 160 80" stroke={color} strokeWidth="2" />
    <circle cx="55" cy="70" r="3" fill={color} />
    <circle cx="70" cy="70" r="3" fill={color} />
    <motion.path d="M 80 100 L 120 100 M 80 115 L 100 115" stroke={color} strokeWidth="2" strokeLinecap="round" animate={{ pathLength: [0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.rect x="130" y="100" width="15" height="25" rx="2" fill={color} opacity="0.3" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);

const DesignVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.circle cx="100" cy="100" r="60" stroke={color} strokeWidth="1" fill="none" />
    <motion.path d="M 100 40 L 100 160 M 40 100 L 160 100" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <motion.path d="M 70 70 L 130 130 M 130 70 L 70 130" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <motion.path
      d="M 60 100 Q 100 20, 140 100 T 60 100"
      stroke={color} strokeWidth="3" fill="none"
      animate={{ d: ["M 60 100 Q 100 20, 140 100 T 60 100", "M 60 100 Q 100 180, 140 100 T 60 100", "M 60 100 Q 100 20, 140 100 T 60 100"] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
    <rect x="95" y="35" width="10" height="10" fill={color} />
    <rect x="95" y="155" width="10" height="10" fill={color} />
  </svg>
);

const SocialVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.circle cx="100" cy="70" r="25" stroke={color} strokeWidth="2" fill="none" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.path d="M 60 140 Q 100 110, 140 140" stroke={color} strokeWidth="2" fill="none" />
    <motion.path d="M 100 95 L 100 115" stroke={color} strokeWidth="2" opacity="0.5" />
    <motion.path d="M 150 60 L 170 40" stroke={color} strokeWidth="2" animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.circle cx="40" cy="50" r="8" fill={color} opacity="0.4" />
    <motion.path d="M 30 150 L 50 170" stroke={color} strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
  </svg>
);

const AIVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.rect x="60" y="60" width="80" height="80" rx="20" stroke={color} strokeWidth="2" fill="none" />
    <motion.circle cx="85" cy="90" r="8" fill={color} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
    <motion.circle cx="115" cy="90" r="8" fill={color} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
    <motion.path d="M 85 120 Q 100 130, 115 120" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <motion.path d="M 100 60 L 100 40" stroke={color} strokeWidth="2" />
    <motion.circle cx="100" cy="35" r="5" fill={color} animate={{ r: [3, 7, 3] }} transition={{ duration: 1, repeat: Infinity }} />
    <motion.path d="M 140 100 L 160 100 M 40 100 L 60 100" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
);

const AppVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.rect x="65" y="40" width="70" height="120" rx="15" stroke={color} strokeWidth="2" fill="none" />
    <motion.rect x="75" y="55" width="50" height="80" rx="5" fill={color} opacity="0.1" />
    <motion.circle cx="100" cy="145" r="6" stroke={color} strokeWidth="1" fill="none" />
    <motion.path d="M 85 70 L 115 70" stroke={color} strokeWidth="1" opacity="0.5" />
    <motion.rect x="80" y="85" width="15" height="15" rx="3" fill={color} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.rect x="105" y="85" width="15" height="15" rx="3" fill={color} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity }} />
    <motion.rect x="80" y="110" width="15" height="15" rx="3" fill={color} animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} />
  </svg>
);

const MarketingVector = ({ color }: { color: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
    <motion.path d="M 40 160 L 40 120 M 80 160 L 80 80 M 120 160 L 120 40 M 160 160 L 160 100" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.2" />
    <motion.path
      d="M 40 160 L 80 120 L 120 140 L 160 60"
      stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle cx="160" cy="60" r="8" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.path d="M 40 40 L 60 60 M 30 70 L 50 90" stroke={color} strokeWidth="2" opacity="0.3" animate={{ rotate: -45 }} />
  </svg>
);

function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      client: "TechStyle Co",
      category: "Web Development",
      description: "A high-performance e-commerce solution with real-time inventory and AI-powered recommendations.",
      color: "#7C3AED",
      vector: WebVector,
      video: "/videos/ecommerce.mp4"
    },
    {
      title: "Elegant",
      client: "GreenLeaf Organics",
      category: "Graphic Design",
      description: "Full brand ecosystem including logo, typography, and sustainable packaging guidelines.",
      color: "#00D4AA",
      vector: DesignVector,
      video: "/videos/brand-identity.mp4"
    },
    {
      title: "AI Chatbot",
      client: "CustomerFirst",
      category: "AI Automation",
      description: "Custom-trained LLM integration for automated customer support and lead generation.",
      color: "#7C3AED",
      vector: AIVector,
      video: "/videos/custom-chatbot.mp4"
    },
    {
      title: "AI Automation",
      client: "GlobalCorp",
      category: "AI Automation",
      description: "A fully autonomous AI agent network handling customer queries, data analysis, and workflow automation 24/7.",
      color: "#3B82F6",
      images: [
        "/images/ai-agent-workflow.jpg"
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logic to detect which project is in view
      const projectItems = document.querySelectorAll('.project-scroll-item');

      projectItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 relative">
          {/* Left Side - Sticky Content */}
          <div className="w-full lg:w-2/5 sticky top-20 lg:top-32 h-[45vh] lg:h-[calc(100vh-160px)] flex flex-col justify-center z-20 bg-background/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-b border-white/5 lg:border-none pb-8 lg:pb-0">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div
                className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
                style={{ backgroundColor: `${projects[activeIndex].color}20`, color: projects[activeIndex].color }}
              >
                {projects[activeIndex].category}
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-8 leading-tight">
                {projects[activeIndex].title}
              </h2>

              <p className="text-base md:text-xl text-gray-400 mb-6 lg:mb-10 leading-relaxed font-medium">
                {projects[activeIndex].description}
              </p>

              <div className="flex items-center gap-6">
                <div className="h-[1px] w-12 bg-white/20" />
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Client: {projects[activeIndex].client}
                </span>
              </div>
            </motion.div>

            {/* Pagination / Progress */}
            <div className="mt-8 lg:mt-16 flex gap-3">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-[#7C3AED]' : 'w-4 bg-white/10'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Scrolling Visuals */}
          <div className="w-full lg:w-3/5 space-y-16 lg:space-y-32 mt-4 lg:mt-0">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-scroll-item aspect-[4/3] relative rounded-[2.5rem] overflow-hidden group cursor-default"
                style={{ backgroundColor: `${project.color}15` }}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                  />
                ) : project.images ? (
                  <ImageSlideshow images={project.images} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <motion.div
                      animate={activeIndex === index ? { scale: 1.1, rotate: [0, 5, -5, 0] } : { scale: 1 }}
                      transition={{ duration: 0.8 }}
                      className="w-48 h-48 rounded-3xl bg-[#1a2133] border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden"
                    >
                      {/* Animated Vector background inside the image card */}
                      <svg className="absolute inset-0 opacity-10" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke={project.color} strokeWidth="0.5" fill="none" />
                        <path d="M 0 50 Q 50 0, 100 50 T 200 50" stroke={project.color} strokeWidth="0.5" fill="none" />
                      </svg>
                      <project.vector color={project.color} />
                    </motion.div>
                  </div>
                )}

                {/* Overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                    <p className="text-white font-black text-lg">{project.title}</p>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ project, index, isInView }: { project: any, index: number, isInView: boolean }) {
  const colors = ['#7C3AED', '#00D4AA', '#3B82F6'];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
    >
      <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: `${bgColor}20` }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: `${bgColor}30` }}
        >
          <div className="text-6xl font-bold opacity-20" style={{ color: bgColor }}>
            {project.title.charAt(0)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6"
        >
          <div className="text-white">
            <p className="text-sm mb-1">{project.client}</p>
            <p className="text-xs opacity-80">{project.category}</p>
          </div>
        </motion.div>
      </div>

      <div className="p-6 bg-card">
        <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#7C3AED] transition-colors">
          {project.title}
        </h3>
        <div className="inline-block px-3 py-1 bg-white/5 text-[#7C3AED] text-sm rounded-full font-bold">
          {project.category}
        </div>
      </div>
    </motion.div>
  );
}

function ImageSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-85 transition-opacity duration-500">
      {images.map((src, index) => (
        <motion.img
          key={src}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Nimrah Amjad",
      company: "TechStyle Co",
      role: "CEO",
      text: "Working with this team was an absolute game-changer. They took our vague ideas and turned them into a stunning website that our customers love!",
      rating: 5
    },
    {
      name: "Zia Ur Rehman",
      company: "FoodieHub",
      role: "Founder",
      text: "I've worked with many agencies, but none have matched their creativity and professionalism. They truly understand modern digital experiences.",
      rating: 5
    },
    {
      name: "Nadeem Asghar",
      company: "GreenLeaf Organics",
      role: "Marketing Director",
      text: "The social media strategy they created tripled our engagement in just 3 months. Plus, they're actually fun to work with!",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Quote className="w-16 h-16 mx-auto mb-6 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl opacity-90">
            Don't just take our word for it
          </p>
        </motion.div>

        <div className="relative">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                x: index === activeIndex ? 0 : 100,
                display: index === activeIndex ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#00D4AA] text-[#00D4AA]" />
                ))}
              </div>
              <p className="text-2xl mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-bold text-xl">{testimonial.name}</p>
                <p className="opacity-80">{testimonial.role} at {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00D4AA] via-[#7C3AED] to-[#3B82F6]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Ready to Create Something
          <br />
          <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
            Extraordinary?
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 font-medium">
          Let's turn your vision into reality (and have some fun doing it)
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-xl rounded-lg shadow-lg hover:shadow-2xl transition-shadow inline-flex items-center gap-3"
          >
            Start Your Project
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}


