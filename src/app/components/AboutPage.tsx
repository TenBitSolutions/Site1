import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { Heart, Target, Zap, Users, ArrowRight, Rocket, Award, TrendingUp } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="relative pt-16 min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <AnimatedJourneyTimeline />
      <TeamSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            About
            <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent"> TrioInfraHub</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            We're a team of digital enthusiasts who believe great work should be fun, innovative, and impactful
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">
            Our Story
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-400 leading-relaxed mb-6 font-medium">
              TrioInfraHub officially began its journey in 2025. What started as a passion for excellence in 
              University projects quickly evolved into a full-scale digital agency. We realized that the 
              innovation we brought to academic challenges could be scaled to solve real-world business problems.
            </p>

            <p className="text-xl text-gray-400 leading-relaxed mb-6 font-medium">
              After a series of successful campus-led initiatives, we transitioned into the online commercial 
              space, taking on diverse projects from web development to advanced automation. Today, we focus 
              on turning complex ideas into digital success stories for clients worldwide.
            </p>

            <p className="text-xl text-gray-400 leading-relaxed font-medium">
              Today, we help businesses transform their digital presence. From startups finding
              their voice to established companies reinventing themselves, we bring creativity, technical
              expertise, and a genuine passion for helping our clients succeed.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Heart,
      title: "Client-First Always",
      description: "Your success is our success. We're not happy until you're thrilled with the results.",
      color: "#00D4AA"
    },
    {
      icon: Zap,
      title: "Innovation & Speed",
      description: "We stay ahead of trends and move fast without cutting corners. Quick delivery, lasting quality.",
      color: "#7C3AED"
    },
    {
      icon: Target,
      title: "Results That Matter",
      description: "Pretty designs are great, but we're obsessed with ROI, conversions, and measurable impact.",
      color: "#3B82F6"
    },
    {
      icon: Users,
      title: "Collaboration & Fun",
      description: "Work doesn't have to be stuffy. We believe the best results come from genuine partnerships.",
      color: "#00D4AA"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            What We Stand For
          </h2>
          <p className="text-xl text-gray-400 font-medium">
            Our core values guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value, index, isInView }: { value: any, index: number, isInView: boolean }) {
  const Icon = value.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="p-6 bg-card rounded-2xl shadow-lg border border-white/5 hover:border-white/10 transition-all text-center"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 bg-white/5"
      >
        <Icon className="w-8 h-8" style={{ color: value.color }} />
      </motion.div>

      <h3 className="text-xl font-black text-white mb-3">
        {value.title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-medium">
        {value.description}
      </p>
    </motion.div>
  );
}

function AnimatedJourneyTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const milestones = [
    {
      year: "2023",
      icon: Rocket,
      title: "University Projects",
      description: "Started as a passion for excellence in University projects, bringing innovation to academic challenges.",
      color: "#7C3AED",
      position: { x: 100, y: 70 }
    },
    {
      year: "2024",
      icon: Award,
      title: "Campus Initiatives",
      description: "Delivered successful campus-led initiatives, preparing to transition to the commercial space.",
      color: "#3B82F6",
      position: { x: 400, y: 210 }
    },
    {
      year: "2025",
      icon: Zap,
      title: "TrioInfraHub Born",
      description: "Officially began our journey in 2025, evolving into a full-scale commercial digital agency.",
      color: "#00D4AA",
      position: { x: 700, y: 105 }
    },
    {
      year: "2026",
      icon: TrendingUp,
      title: "Global Scaling",
      description: "Helping businesses transform their digital presence and achieve success globally.",
      color: "#7C3AED",
      position: { x: 1000, y: 245 }
    }
  ];

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white mb-4">
            The Journey
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            A visual timeline of our evolution and the milestones that shaped us
          </p>
        </motion.div>

        {/* Journey SVG Container */}
        <div className="relative h-[460px] mb-12 hidden xl:block">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1100 460">
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#00D4AA" />
              </linearGradient>
              
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Path (Dashed) */}
            <path
              d="M 100 70 C 250 70, 250 210, 400 210 C 550 210, 550 105, 700 105 C 850 105, 850 245, 1000 245"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />

            {/* Animated Progress Path */}
            <motion.path
              d="M 100 70 C 250 70, 250 210, 400 210 C 550 210, 550 105, 700 105 C 850 105, 850 245, 1000 245"
              stroke="url(#journeyGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                pathLength: pathLength
              }}
            />

            {/* Milestone Markers */}
            {milestones.map((milestone, index) => (
              <MilestoneMarker 
                key={index} 
                milestone={milestone} 
                index={index} 
                scrollProgress={scrollYProgress}
              />
            ))}
          </svg>
        </div>

        {/* Mobile/Tablet Milestone List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:hidden">
          {milestones.map((milestone, index) => (
            <TimelineMilestone key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MilestoneMarker({ milestone, index, scrollProgress }: { milestone: any, index: number, scrollProgress: any }) {
  const threshold = index / 4;
  const opacity = useTransform(scrollProgress, [threshold, threshold + 0.1], [0, 1]);
  const scale = useTransform(scrollProgress, [threshold, threshold + 0.1], [0.5, 1]);
  
  const Icon = milestone.icon;

  return (
    <motion.g style={{ opacity, scale }}>
      <circle
        cx={milestone.position.x}
        cy={milestone.position.y}
        r="40"
        fill="#1a2133"
        stroke={milestone.color}
        strokeWidth="4"
        className="shadow-xl"
      />
      <foreignObject
        x={milestone.position.x - 20}
        y={milestone.position.y - 20}
        width="40"
        height="40"
      >
        <div className="w-full h-full flex items-center justify-center">
          <Icon className="w-6 h-6" style={{ color: milestone.color }} />
        </div>
      </foreignObject>
      
      {/* Tooltip Content */}
      <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
        <rect
          x={milestone.position.x - 110}
          y={milestone.position.y + 60}
          width="220"
          height="140"
          rx="16"
          fill="#161B2A"
          className="shadow-2xl"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <text
          x={milestone.position.x}
          y={milestone.position.y + 85}
          textAnchor="middle"
          className="text-lg font-black fill-white"
        >
          {milestone.year}
        </text>
        <text
          x={milestone.position.x}
          y={milestone.position.y + 105}
          textAnchor="middle"
          className="text-xs font-bold fill-gray-400 uppercase tracking-widest"
          style={{ fill: milestone.color }}
        >
          {milestone.title}
        </text>
        <foreignObject
          x={milestone.position.x - 100}
          y={milestone.position.y + 115}
          width="200"
          height="75"
        >
          <div className="text-[10px] text-gray-400 font-medium text-center leading-normal px-2">
            {milestone.description}
          </div>
        </foreignObject>
      </motion.g>
    </motion.g>
  );
}

function TimelineMilestone({ milestone, index }: { milestone: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = milestone.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl border border-white/5 transition-all"
    >
      {/* Decorative SVG background */}
      <svg className="absolute top-0 right-0 w-32 h-32 opacity-5" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill={milestone.color} />
        <path d="M 20 50 Q 50 20, 80 50 T 80 80" stroke={milestone.color} strokeWidth="2" fill="none" />
      </svg>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: milestone.color }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <div className="text-4xl font-bold" style={{ color: milestone.color }}>
            {milestone.year}
          </div>
        </div>

        <h3 className="text-2xl font-black text-white mb-3">
          {milestone.title}
        </h3>
        <p className="text-gray-400 leading-relaxed font-medium">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium">
            We're a diverse group of designers, developers, marketers, and strategists united by
            our passion for creating exceptional digital experiences. Every project benefits from
            our combined expertise and genuine enthusiasm for solving problems creatively.
          </p>
          <p className="text-lg text-gray-300 italic font-medium">
            "We don't just work together—we collaborate, challenge each other, and celebrate wins
            as a team. That energy shows in everything we create."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background for about CTA */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6] rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Want to Work With Us?
        </h2>
        <p className="text-xl text-gray-400 mb-10 font-medium">
          Let's create something amazing together
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white text-xl rounded-lg shadow-lg hover:shadow-2xl transition-shadow inline-flex items-center gap-3"
          >
            Get In Touch
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
