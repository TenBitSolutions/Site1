import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Code, Share2, Palette, Bot, Brain, Briefcase, Check, ArrowRight, X } from 'lucide-react';
import { TiltedCard } from './TiltedCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PastelGradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PastelGradientBackground({
  children,
  className,
  ...props
}: PastelGradientBackgroundProps) {
  return (
    <div
      className={cn("relative w-full h-full min-h-screen overflow-hidden", className)}
      style={{
        background: 'linear-gradient(135deg, #0a0e1a, #070a12)'
      }}
      {...props}
    >
      <style>
        {`
          @keyframes rotate {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          @keyframes rotate-reverse {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }
          .pastel-bg-layer-1 {
            background: conic-gradient(
              from 0deg,
              #ff9aa2,
              #ffb7b2,
              #ffdac1,
              #e2f0cb,
              #a2e4ff,
              #c9afff,
              #ffb7b2,
              #ff9aa2
            );
            animation: rotate 24s linear infinite;
          }
          .pastel-bg-layer-2 {
            background: conic-gradient(
              from 0deg,
              #ff9aa2,
              #ffb7b2,
              #ffdac1,
              #e2f0cb,
              #a2e4ff,
              #c9afff,
              #ffb7b2,
              #ff9aa2
            );
            animation: rotate-reverse 30s linear infinite;
          }
        `}
      </style>

      {/* Container Background (Radial dark overlay for perfect contrast) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(10, 14, 26, 0.4), rgba(7, 10, 18, 0.85))'
        }}
      />

      {/* Rotating Layers (Blended into dark theme for a gorgeous shifting tech glow) */}
      <div className="absolute top-1/2 left-1/2 w-[220%] h-[220%] -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden opacity-[0.22] blur-[115px] pastel-bg-layer-1 z-0" />
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden opacity-[0.18] blur-[115px] pastel-bg-layer-2 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export function ServicesPage() {
  return (
    <PastelGradientBackground className="pt-16 min-h-screen text-foreground overflow-hidden">
      <HeroSection />
      <InteractiveGrid />
      <ComparisonSection />
      <CTASection />
    </PastelGradientBackground>
  );
}

function HeroSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 lg:mb-8 tracking-tighter leading-none">
            Services That
            <br />
            <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent"> Actually Deliver</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            No fluff, no jargon—just high-performance results that make your business shine in the digital age.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveGrid() {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      tagline: "Websites that work as hard as you do",
      description: "We build custom websites and web applications that are fast, beautiful, and built to convert.",
      longDescription: "Our custom Web Development service focuses on creating blazingly fast, SEO-optimized, and visually stunning digital products. We don't use generic templates. Instead, we custom-craft every line of code using modern technologies like React, Next.js, Vite, and Tailwind CSS. Whether you need a high-converting landing page, a complex enterprise dashboard, or a scalable e-commerce storefront, we build it with absolute performance and modern security standards in mind.",
      features: ["Custom UI/UX", "E-commerce", "Performance Opt", "API Integration"],
      detailedFeatures: [
        "React & Next.js high-performance architecture",
        "Search Engine Optimization (SEO) & Analytics setup",
        "Fully responsive layouts optimized for all device sizes",
        "Secure Payment Gateways and API integrations",
        "Interactive GSAP and Framer Motion micro-animations",
        "Lightweight codebase with exceptional Core Web Vitals"
      ],
      color: "#7C3AED"
    },
    {
      icon: Share2,
      title: "Social Media Management",
      tagline: "Making your brand the talk of the town",
      description: "We create and execute social media strategies that turn followers into fans and customers.",
      longDescription: "Our Social Media Management service takes the stress out of building an online community. We research your specific audience, analyze your competitors, and construct content plans that stand out in crowded feeds. We handle the graphic creation, copy writing, strategic scheduling, and direct engagement to foster a loyal tribe around your brand. Additionally, our data-backed paid advertising campaigns make sure every dollar of your budget works toward real business growth.",
      features: ["Content Strategy", "Community Mgmt", "Paid Advertising", "Monthly Analytics"],
      detailedFeatures: [
        "Bespoke brand content calendars & aesthetic themes",
        "High-scroll-stopping graphics, carousel designs, and reels",
        "Full-funnel paid ad campaign setups (Meta, Google, LinkedIn)",
        "Daily community engagement and active audience outreach",
        "In-depth monthly performance reports and ROI metrics",
        "Influencer partnerships and brand advocacy management"
      ],
      color: "#3B82F6"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      tagline: "Designs that stop the scroll",
      description: "From logos to full brand identities, we create visual designs that capture attention and trust.",
      longDescription: "Our Graphic Design studio is obsessed with identity and perception. Great design isn't just about aesthetics; it's about conveying values and building immediate trust. We work closely with you to establish custom color systems, elegant typography, unique brand guidelines, and high-end visual elements that define who you are. From sleek digital assets to professional offline print media, our designs ensure your brand communicates premium quality across every touchpoint.",
      features: ["Brand Identity", "Marketing Assets", "Social Graphics", "Brand Guidelines"],
      detailedFeatures: [
        "Unique logo designs and versatile branding systems",
        "Comprehensive brand style books (typography, color palettes)",
        "Premium print designs (brochures, packaging, business cards)",
        "Digital marketing collateral and scroll-stopping ad creatives",
        "Custom vectors, illustrations, and 3D mockups",
        "Cohesive layouts across website assets and newsletters"
      ],
      color: "#00D4AA"
    },
    {
      icon: Bot,
      title: "AI Automation",
      tagline: "Let AI handle the boring stuff",
      description: "We implement AI and automation solutions that save you time, money, and operational friction.",
      longDescription: "Our AI Automation service bridges the gap between complex cutting-edge intelligence and everyday operational productivity. We analyze your team's repetitive tasks, identify operational bottlenecks, and custom-build automated workflows that operate 24/7. From smart AI chatbots that capture and nurture customer leads around the clock to automated email engines, database triggers, and smart data parsing, we put your business operations on autopilot so you can focus on strategy.",
      features: ["Custom Chatbots", "Workflow Auto", "Email Marketing", "Data Processing"],
      detailedFeatures: [
        "Custom NLP Chatbots integrated with WhatsApp, Slack, or Web",
        "Sleek automated data synchronization across your systems",
        "Smart CRM pipelines that automatically qualify and follow up leads",
        "OpenAI API and LLM-powered content/data processing engines",
        "Zero-friction automated workflows using Zapier and custom scripts",
        "Automated customer feedback collection and analysis"
      ],
    },
    {
      icon: Brain,
      title: "AI Agent Development",
      tagline: "Intelligent autonomous workers",
      description: "Custom AI agents that research, analyze, and act on your behalf.",
      longDescription: "Our AI Agent Development service takes artificial intelligence to the next level by creating fully autonomous digital workers. Unlike static scripts, these agents can understand complex instructions, browse the web, aggregate data, and make independent decisions based on your business logic. We leverage cutting-edge frameworks like LangChain and AutoGen to deploy AI that actively scales your workforce without scaling your headcount.",
      features: ["Autonomous Research", "Data Scraping", "Market Analysis", "LLM Integration"],
      detailedFeatures: [
        "Fully autonomous multi-agent systems and networks",
        "Deep integration with GPT-4, Claude, and custom LLMs",
        "Automated market research and competitor tracking",
        "Intelligent document parsing and knowledge extraction",
        "Agentic workflows capable of self-correction and reasoning",
        "Secure deployments with custom memory systems"
      ],
      color: "#00D4AA"
    },
    {
      icon: Briefcase,
      title: "Enterprise Solutions",
      tagline: "Scalable software for growing corporations",
      description: "Robust, secure, and fully customized enterprise software architectures.",
      longDescription: "When off-the-shelf software doesn't fit your scale, our Enterprise Solutions service steps in. We engineer custom Enterprise Resource Planning (ERP), Customer Relationship Management (CRM), and advanced internal dashboards that integrate flawlessly into your existing corporate infrastructure. With a strict focus on data security, cloud scalability, and high-availability architecture, we build the technological foundation your enterprise needs to operate globally.",
      features: ["Custom ERP/CRM", "Cloud Architecture", "Data Security", "API Development"],
      detailedFeatures: [
        "Custom-built ERP and scalable CRM systems",
        "Secure cloud deployments (AWS, Azure, Google Cloud)",
        "Advanced RBAC (Role-Based Access Control) systems",
        "Legacy system migration and digital transformation",
        "Robust REST and GraphQL API architectures",
        "High-availability clusters and load balancing"
      ],
      color: "#3B82F6"
    }
  ];

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
          {services.map((service, idx) => (
            <TiltedCard
              key={idx}
              imageSrc=""
              captionText={`Explore ${service.title}`}
              containerHeight="600px"
              containerWidth="100%"
              imageHeight="550px"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              displayOverlayContent={true}
              overlayContent={
                <div
                  className="w-full h-full text-left flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <div>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10"
                    >
                      <service.icon className="w-8 h-8" style={{ color: service.color }} />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight leading-none">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-400 font-bold italic mb-6">
                      {service.tagline}
                    </p>
                    <p className="text-gray-400 leading-relaxed mb-8 font-medium">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                          <Check className="w-4 h-4" style={{ color: service.color }} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-white/10">
                    <div className="text-xs font-black uppercase tracking-widest text-[#00D4AA] flex items-center gap-1.5">
                      <span>Click to explore</span>
                      <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                      TrioInfraHub
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#070a12]/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#161B2A]/95 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Left Column / Highlight Panel */}
              <div
                className="w-full md:w-2/5 p-8 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedService.color}20, #161B2A)`
                }}
              >
                {/* Glowing sphere inside */}
                <div
                  className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-30"
                  style={{ backgroundColor: selectedService.color }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10"
                  >
                    <selectedService.icon className="w-8 h-8" style={{ color: selectedService.color }} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm font-semibold italic text-gray-400 opacity-90" style={{ color: selectedService.color }}>
                    {selectedService.tagline}
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    TrioInfraHub Service Detail
                  </div>
                </div>
              </div>

              {/* Right Column / Content Scrollable Panel */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[90vh] flex flex-col justify-between bg-[#161B2A] relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer group z-20"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00D4AA] mb-4">
                    Overview & Strategy
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {selectedService.longDescription}
                  </p>

                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00D4AA] mb-4">
                    What We Deliver
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {selectedService.detailedFeatures.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-xs font-bold text-gray-300">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: selectedService.color }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-xs text-gray-400 font-medium text-center sm:text-left">
                    Ready to build your {selectedService.title.toLowerCase()} project?
                  </p>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:shadow-lg text-white text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Start Project <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-400 font-medium">
            We're not like other agencies (and that's a good thing)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-8 bg-white/5 rounded-2xl border border-white/5"
          >
            <h3 className="text-2xl font-black text-gray-300 mb-6">Other Agencies</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 font-medium">
                <span className="text-red-500 text-xl">✗</span>
                <span>Generic templates and cookie-cutter solutions</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 font-medium">
                <span className="text-red-500 text-xl">✗</span>
                <span>Slow response times and unclear communication</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 font-medium">
                <span className="text-red-500 text-xl">✗</span>
                <span>Hidden fees and surprise charges</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 font-medium">
                <span className="text-red-500 text-xl">✗</span>
                <span>One-size-fits-all approach</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-8 bg-gradient-to-br from-[#7C3AED]/20 to-[#3B82F6]/20 rounded-2xl border-2 border-[#7C3AED] shadow-[0_0_50px_rgba(124,58,237,0.2)]"
          >
            <h3 className="text-2xl font-black text-white mb-6">TrioInfraHub</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-200 font-bold">
                <span className="text-[#00D4AA] text-xl">✓</span>
                <span>100% custom solutions tailored to your needs</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200 font-bold">
                <span className="text-[#00D4AA] text-xl">✓</span>
                <span>Fast, friendly communication (we actually reply!)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200 font-bold">
                <span className="text-[#00D4AA] text-xl">✓</span>
                <span>Transparent pricing with no hidden costs</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200 font-bold">
                <span className="text-[#00D4AA] text-xl">✓</span>
                <span>Personalized strategy for your unique goals</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-transparent text-white relative overflow-hidden z-10">
      {/* Decorative SVG background for CTA */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000">
          <circle cx="900" cy="100" r="200" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="100" cy="900" r="300" stroke="white" strokeWidth="1" fill="none" />
          <path d="M 0 500 Q 250 250, 500 500 T 1000 500" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-10 opacity-90">
          Let's discuss which service (or combo!) is perfect for your project
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white text-[#7C3AED] text-xl rounded-lg shadow-lg hover:shadow-2xl transition-shadow inline-flex items-center gap-3 cursor-pointer"
          >
            Get a Free Consultation
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
