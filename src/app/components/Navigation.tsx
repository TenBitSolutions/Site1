import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const megaMenuServices = [
    { title: "Web Development", img: "/images/services/web_dev.png", desc: "Corporate Portals & Custom Apps" },
    { title: "AI Agent Development", img: "/images/services/ai_agent.png", desc: "Autonomous AI Workers" },
    { title: "Graphic Design", img: "/images/services/graphic.png", desc: "Brand Identity & UI/UX" },
    { title: "AI Chatbot", img: "/images/services/chatbot.png", desc: "24/7 Smart Support Bots" },
    { title: "Enterprise Solutions", img: "/images/services/enterprise.png", desc: "Cloud ERP & Scalable Systems" },
    { title: "Social Media", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop", desc: "Viral Ad Campaigns" }
  ];

  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [activeMegaMenuImg, setActiveMegaMenuImg] = useState(megaMenuServices[0].img);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      <nav className="w-full max-w-6xl bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-3xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <motion.img 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
                src="/images/logo.png" 
                alt="TrioInfraHub Logo" 
                className="w-12 h-12 object-contain filter drop-shadow-lg"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-sm"
              >
                TrioInfraHub
              </motion.div>
            </Link>

            <div className="hidden md:flex space-x-10 items-center">
              {links.map((link) => (
                <div 
                  key={link.path} 
                  className="relative h-20 flex items-center"
                  onMouseEnter={() => link.label === 'Services' && setIsServicesHovered(true)}
                  onMouseLeave={() => link.label === 'Services' && setIsServicesHovered(false)}
                >
                  <Link
                    to={link.path}
                    className="relative group py-2"
                  >
                    <span className={`${isActive(link.path) ? 'text-[#7C3AED]' : 'text-gray-200'} hover:text-[#7C3AED] transition-colors font-bold text-sm tracking-wide`}>
                      {link.label}
                    </span>
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00D4AA] to-[#7C3AED] rounded-full"
                      />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.label === 'Services' && (
                    <AnimatePresence>
                      {isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[75px] -left-32 w-[650px] bg-[#0a0e1a]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-3xl p-6 flex gap-6 z-50 cursor-default"
                        >
                          {/* Left List */}
                          <div className="w-1/2 flex flex-col gap-2">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#00D4AA] mb-2 px-3">
                              Our Expertise
                            </h4>
                            {megaMenuServices.map((service, idx) => (
                              <Link 
                                key={idx} 
                                to="/services"
                                onMouseEnter={() => setActiveMegaMenuImg(service.img)}
                                className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                <span className="text-sm font-bold text-gray-200 group-hover:text-[#7C3AED] transition-colors">
                                  {service.title}
                                </span>
                                <span className="text-[10px] text-gray-500 font-medium">
                                  {service.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Right Image */}
                          <div className="w-1/2 relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                            <motion.img
                              key={activeMegaMenuImg}
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              src={activeMegaMenuImg}
                              alt="Service visualization"
                              className="w-full h-full object-cover"
                            />
                            {/* Inner dark gradient for premium feel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/10 backdrop-blur-3xl border-t border-white/10"
          >
            <div className="px-6 py-8 space-y-5">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-black text-lg tracking-tight ${isActive(link.path) ? 'text-[#7C3AED]' : 'text-gray-100'} hover:text-[#7C3AED]`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </div>
  );
}
