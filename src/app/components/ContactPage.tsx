import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="relative pt-16 min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <ContactSection />
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
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Let's
            <span className="bg-gradient-to-r from-[#00D4AA] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent"> Create Together</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Have a project in mind? We'd love to hear about it. Drop us a line and let's make magic happen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Put your Web3Forms Access Key here.
    // Get a free key from https://web3forms.com by entering your email.
    const WEB3FORMS_ACCESS_KEY = "852d604a-07c8-4076-98a6-122cf985c134";

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      setSubmitError('Web3Forms Access Key is missing. Please add your access key in the code.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          subject: "New Contact Form Submission - TrioInfraHub",
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', budget: '', message: '' });
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black text-white mb-8">Get In Touch</h2>

            <div className="space-y-6 mb-12">
              <ContactInfo
                icon={Mail}
                title="Email Us"
                info="trioinfrahub@gmail.com"
                color="#7C3AED"
                link="https://mail.google.com/mail/?view=cm&fs=1&to=trioinfrahub@gmail.com"
              />
              <ContactInfo
                icon={Phone}
                title="Call Us"
                info="+92 342 8656277"
                color="#3B82F6"
                link="https://wa.me/923428656277"
              />
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <SocialIcon icon={Facebook} color="#3B82F6" link="https://web.facebook.com/people/Trio-Infra-Hub/" />
                <SocialIcon icon={Instagram} color="#7C3AED" link="https://www.instagram.com/trioinfrahub/" />
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-black text-white mb-3">Quick Response Guarantee</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                We typically respond to all inquiries within 24 hours (often much faster!).
                If you need urgent assistance, please mention it in your message.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-card p-8 rounded-3xl shadow-2xl border border-white/5"
              >
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all font-medium"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all font-medium"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-white mb-2 font-bold">
                      Service Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all font-medium"
                    >
                      <option value="" className="bg-[#0B0F1A]">Select a service</option>
                      <option value="web-dev" className="bg-[#0B0F1A]">Web Development</option>
                      <option value="social-media" className="bg-[#0B0F1A]">Social Media Management</option>
                      <option value="graphic-design" className="bg-[#0B0F1A]">Graphic Design</option>
                      <option value="ai-automation" className="bg-[#0B0F1A]">AI Automation</option>
                      <option value="multiple" className="bg-[#0B0F1A]">Multiple Services</option>
                      <option value="other" className="bg-[#0B0F1A]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-white mb-2 font-bold">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all font-medium"
                    >
                      <option value="" className="bg-[#0B0F1A]">Select a range</option>
                      <option value="under-5k" className="bg-[#0B0F1A]">Under 5,000</option>
                      <option value="5k-10k" className="bg-[#0B0F1A]">5,000 - 10,000</option>
                      <option value="10k-25k" className="bg-[#0B0F1A]">10,000 - 25,000</option>
                      <option value="25k-50k" className="bg-[#0B0F1A]">25,000 - 50,000</option>
                      <option value="50k-plus" className="bg-[#0B0F1A]">50,000+</option>
                      <option value="flexible" className="bg-[#0B0F1A]">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white mb-2 font-bold">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all resize-none font-medium"
                      placeholder="Tell us about your project, goals, timeline, or any questions you have..."
                    />
                  </div>

                  {submitError && (
                    <div className="text-red-500 font-bold text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/10 text-center">
                      {submitError}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            ) : (
              <SuccessMessage />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon: Icon, title, info, color, link }: { icon: any, title: string, info: string, color: string, link?: string }) {
  return (
    <motion.a
      href={link}
      whileHover={{ x: 10 }}
      className="flex items-start gap-4 cursor-pointer group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <h3 className="font-black text-white mb-1">{title}</h3>
        <p className="text-gray-400 font-medium group-hover:text-white transition-colors">{info}</p>
      </div>
    </motion.a>
  );
}

function SocialIcon({ icon: Icon, color, link }: { icon: any, color: string, link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all border border-white/5"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-6 h-6" style={{ color }} />
    </motion.a>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="bg-card p-12 rounded-[2.5rem] shadow-2xl text-center border border-white/5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#00D4AA] to-[#3B82F6] flex items-center justify-center shadow-lg"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-black text-white mb-4"
      >
        Successfully submit your form!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-400 mb-8 font-medium"
      >
        Thank you for reaching out! We've received your request and it has been sent directly to our email.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00D4AA] to-[#7C3AED]"
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-[#374151] mt-6 italic"
      >
        This form will reset automatically in a few seconds...
      </motion.p>
    </motion.div>
  );
}
