import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#0B0F1A] text-white py-24 border-t border-white/5 overflow-hidden">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="text-[40vw] font-black whitespace-nowrap uppercase tracking-tighter"
        >
          TrioInfraHub TrioInfraHub TrioInfraHub TrioInfraHub
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-black bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent mb-4">
              TrioInfraHub
            </div>
            <p className="text-gray-400 mb-6 font-medium">
              Turning Ideas into Digital Success through Web, Automation & Social Media.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://web.facebook.com/people/Trio-Infra-Hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#3B82F6] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                href="https://www.instagram.com/trioinfrahub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#7C3AED] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-[#00D4AA] transition-colors font-medium">Home</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-[#00D4AA] transition-colors font-medium">Portfolio</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#00D4AA] transition-colors font-medium">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#00D4AA] transition-colors font-medium">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#00D4AA] transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 font-medium">
              <li>Web Development</li>
              <li>Social Media</li>
              <li>Graphic Design</li>
              <li>AI Automation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=trioinfrahub@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors font-medium cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-[#00D4AA]" />
                  trioinfrahub@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923428656277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors font-medium cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-[#00D4AA]" />
                  +92 342 8656277
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              © 2026 TrioInfraHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400 font-medium">
              <a href="#" className="hover:text-[#00D4AA] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#00D4AA] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
