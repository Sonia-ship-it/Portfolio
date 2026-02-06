
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { Message } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Nova 🤖. I know everything about Sonia's work. Ask me for her contact info or project details!", timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithGemini(text, history);

    setMessages(prev => [...prev, {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    }]);
    setIsLoading(false);
  };

  const quickPrompts = ["Contact Info?", "Top Skills?", "Work Experience?"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0ED9D9] hover:bg-[#09B3B3] text-slate-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,217,217,0.5)] transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-slate-900/95 backdrop-blur-xl border border-[#0ED9D9]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0ED9D9]/10 to-purple-600/10 border-b border-[#0ED9D9]/20 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0ED9D9] flex items-center justify-center shadow-lg shadow-[#0ED9D9]/20">
                <Bot size={20} className="text-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Nova AI <Sparkles size={12} className="text-[#0ED9D9]" />
                </h3>
                <p className="text-[10px] text-[#0ED9D9] font-medium uppercase tracking-wider">Online & Ready</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-[#0ED9D9]/20 border border-[#0ED9D9]/50'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-[#0ED9D9]" />}
                    </div>
                    <div>
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                          ? 'bg-[#0ED9D9] text-slate-900 font-bold rounded-tr-none shadow-[0_0_15px_rgba(14,217,217,0.3)]'
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 block px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                    <Loader2 size={14} className="animate-spin text-[#0ED9D9]" />
                    <span className="text-[10px] text-slate-400">Nova is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {quickPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 text-[10px] text-[#0ED9D9] hover:bg-[#0ED9D9] hover:text-slate-900 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#0ED9D9]/20 bg-slate-900/80">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about projects..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-[#0ED9D9] transition-colors text-white placeholder:text-slate-600"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#0ED9D9] hover:bg-[#0ED9D9]/10 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
