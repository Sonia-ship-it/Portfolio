import React, { useState, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitize = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // CONFIGURATION: Using Vite environment variables
    // Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env.local
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxxx';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxx';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS is not fully configured. Please set the environment variables in .env.local');
    }

    try {
      const templateParams = {
        from_name: sanitize(formData.name),
        reply_to: formData.email,
        subject: sanitize(formData.subject),
        message: sanitize(formData.message),
        to_name: 'Sonia', // Recipient name
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      // If service is not configured yet, provide a helpful message
      const errorMsg = err.text === 'The user_id parameter is required'
        ? 'EmailJS Public Key is missing. Check setup guide.'
        : (err.text || 'Submission failed');
      setErrors(prev => ({ ...prev, submit: errorMsg }));
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-[#0ED9D9] font-bold tracking-widest uppercase text-sm mb-4">Contact</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's work together.</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-[#0ED9D9]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#0ED9D9]/10 rounded-xl flex items-center justify-center text-[#0ED9D9] group-hover:bg-[#0ED9D9] group-hover:text-slate-900 transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-lg font-bold text-white">{PERSONAL_INFO.email}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-[#0ED9D9]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#0ED9D9]/10 rounded-xl flex items-center justify-center text-[#0ED9D9] group-hover:bg-[#0ED9D9] group-hover:text-slate-900 transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-lg font-bold text-white">{PERSONAL_INFO.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-white/5 relative shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Send size={120} className="text-[#0ED9D9] -rotate-12" />
            </div>

            <form ref={formRef} className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your names"
                    className={`w-full bg-slate-800/50 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0ED9D9] transition-colors`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0ED9D9] transition-colors`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Project Inquiry"
                  className={`w-full bg-slate-800/50 border ${errors.subject ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0ED9D9] transition-colors`}
                />
                {errors.subject && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.subject}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message here..."
                  className={`w-full bg-slate-800/50 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0ED9D9] transition-colors resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.message}</p>}
              </div>

              <motion.button
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(14,217,217,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 ${status === 'submitting' ? 'bg-slate-700 cursor-not-allowed' : 'bg-[#0ED9D9] hover:bg-[#09B3B3]'} text-slate-900 rounded-xl font-bold transition-all shadow-lg shadow-[#0ED9D9]/20 flex items-center justify-center gap-2`}
              >
                {status === 'submitting' ? (
                  <>Sending... <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-[#0ED9D9] bg-[#0ED9D9]/10 p-4 rounded-xl border border-[#0ED9D9]/20"
                  >
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Message sent successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-1 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} />
                      <span className="text-xs font-bold uppercase tracking-wider">Submission Failed</span>
                    </div>
                    {errors.submit && <p className="text-[10px] font-medium ml-7">{errors.submit}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
