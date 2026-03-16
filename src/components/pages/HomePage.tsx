// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Database, Search, MessageSquare, Shield, Terminal, Cpu, Network } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for the hero grid
  const gridY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-textprimary selection:bg-primary selection:text-white font-paragraph overflow-clip">
      <Header />
      
      {/* 
        =========================================
        HERO SECTION: The Wireframe Room
        Replicating the structural layout of the inspiration image.
        =========================================
      */}
      <section className="relative w-full h-[90vh] min-h-[800px] flex flex-col justify-between border-b border-black overflow-hidden bg-background">
        
        {/* 3D Perspective Grid Background */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{ y: gridY, opacity: gridOpacity }}
        >
          <svg viewBox="0 0 1440 800" className="w-full h-full object-cover opacity-40">
            <defs>
              <pattern id="back-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
              <pattern id="floor-grid" width="80" height="40" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Back Wall */}
            <rect x="320" y="160" width="800" height="480" fill="url(#back-grid)" stroke="black" strokeWidth="1" />
            
            {/* Perspective Lines (Corners) */}
            <line x1="0" y1="0" x2="320" y2="160" stroke="black" strokeWidth="1" />
            <line x1="1440" y1="0" x2="1120" y2="160" stroke="black" strokeWidth="1" />
            <line x1="0" y1="800" x2="320" y2="640" stroke="black" strokeWidth="1" />
            <line x1="1440" y1="800" x2="1120" y2="640" stroke="black" strokeWidth="1" />

            {/* Floor/Ceiling/Side Perspective Lines (Simplified for visual effect) */}
            <g stroke="black" strokeWidth="0.5" opacity="0.5">
              {/* Floor lines radiating */}
              <line x1="160" y1="800" x2="420" y2="640" />
              <line x1="480" y1="800" x2="520" y2="640" />
              <line x1="800" y1="800" x2="720" y2="640" />
              <line x1="1120" y1="800" x2="920" y2="640" />
              <line x1="1280" y1="800" x2="1020" y2="640" />
              
              {/* Ceiling lines radiating */}
              <line x1="160" y1="0" x2="420" y2="160" />
              <line x1="480" y1="0" x2="520" y2="160" />
              <line x1="800" y1="0" x2="720" y2="160" />
              <line x1="1120" y1="0" x2="920" y2="160" />
              <line x1="1280" y1="0" x2="1020" y2="160" />

              {/* Horizontal depth lines (Floor) */}
              <line x1="160" y1="720" x2="1280" y2="720" />
              <line x1="80" y1="760" x2="1360" y2="760" />
              
              {/* Horizontal depth lines (Ceiling) */}
              <line x1="160" y1="80" x2="1280" y2="80" />
              <line x1="80" y1="40" x2="1360" y2="40" />
            </g>

            {/* Floating Orange Geometric Blocks */}
            <g fill="#D8400E">
              <motion.rect x="240" y="240" width="40" height="30" initial={{ y: 240 }} animate={{ y: [240, 230, 240] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              <motion.rect x="360" y="320" width="30" height="60" initial={{ y: 320 }} animate={{ y: [320, 335, 320] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
              <motion.rect x="520" y="180" width="60" height="20" initial={{ y: 180 }} animate={{ y: [180, 170, 180] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
              <motion.rect x="560" y="360" width="80" height="40" initial={{ y: 360 }} animate={{ y: [360, 350, 360] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
              <motion.rect x="520" y="400" width="100" height="30" initial={{ y: 400 }} animate={{ y: [400, 415, 400] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
              <motion.rect x="640" y="320" width="60" height="20" initial={{ y: 320 }} animate={{ y: [320, 310, 320] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
              <motion.rect x="760" y="320" width="50" height="20" initial={{ y: 320 }} animate={{ y: [320, 330, 320] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} />
              <motion.rect x="840" y="220" width="80" height="20" initial={{ y: 220 }} animate={{ y: [220, 210, 220] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
              <motion.rect x="1000" y="240" width="30" height="40" initial={{ y: 240 }} animate={{ y: [240, 255, 240] }} transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1.7 }} />
              <motion.rect x="1040" y="280" width="60" height="30" initial={{ y: 280 }} animate={{ y: [280, 270, 280] }} transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
              <motion.rect x="1040" y="310" width="30" height="70" initial={{ y: 310 }} animate={{ y: [310, 325, 310] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 2.1 }} />
              <motion.rect x="760" y="420" width="100" height="20" initial={{ y: 420 }} animate={{ y: [420, 410, 420] }} transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 1.1 }} />
              <motion.rect x="300" y="480" width="60" height="30" initial={{ y: 480 }} animate={{ y: [480, 495, 480] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} />
              <motion.rect x="960" y="500" width="40" height="20" initial={{ y: 500 }} animate={{ y: [500, 490, 500] }} transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 1.6 }} />
            </g>
          </svg>
        </motion.div>

        {/* Spacer to push content to bottom */}
        <div className="flex-grow" />

        {/* Bottom Content Area - Replicating Image Layout */}
        <div className="relative z-10 w-full px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left: Title */}
          <div className="lg:col-span-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter"
            >
              Legislative<br />Intelligence<br />Platform
            </motion.h1>
          </div>

          {/* Middle: Description */}
          <div className="lg:col-span-4 lg:col-start-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base max-w-md leading-relaxed"
            >
              Navigate complex policy landscapes with precision. Access comprehensive legislative data, real-time updates, and AI-powered insights for informed decision-making.
            </motion.p>
          </div>

          {/* Right: CTA */}
          <div className="lg:col-span-3 lg:col-start-10 flex lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/dashboard" className="group inline-flex items-center gap-2 text-primary hover:text-black transition-colors duration-300">
                <span className="text-sm font-bold tracking-widest uppercase">
                  {'{ explore_dashboard }'}
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 
        =========================================
        SECTION 01: DATABASE (Sticky Layout)
        =========================================
      */}
      <section className="relative w-full bg-background border-b border-black">
        <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black p-8 lg:p-16 relative">
            <div className="sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-bold tracking-widest text-sm">{'// 01'}</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tighter">Database</h2>
              </div>
              <p className="text-sm leading-relaxed max-w-sm mb-12">
                Access thousands of policies and schemes across multiple categories. Our platform aggregates legislative data from various sources, providing a centralized hub for research.
              </p>
              
              {/* Decorative Schematic Element */}
              <div className="w-full h-32 border border-black/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-50" />
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[1px] bg-primary"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Feature Row 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 lg:p-16 border-b border-black/20 hover:bg-black/5 transition-colors duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 border border-black bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300">
                  <Database className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Real-Time Updates</h3>
                  <p className="text-sm leading-relaxed max-w-xl">
                    Stay informed with instant notifications on policy changes and new legislation. Our system continuously monitors legislative sources to ensure your data is never obsolete.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Row 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 lg:p-16 border-b border-black/20 hover:bg-black/5 transition-colors duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 border border-black bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Advanced Filtering</h3>
                  <p className="text-sm leading-relaxed max-w-xl">
                    Quickly isolate relevant policies using multi-dimensional filters including category, case type, jurisdiction, and semantic keyword matching.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Row 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 lg:p-16 hover:bg-black/5 transition-colors duration-500 group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="p-4 border border-black bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300">
                  <Network className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Relational Mapping</h3>
                  <p className="text-sm leading-relaxed max-w-xl">
                    Understand the interconnected nature of legislation. View how different policies interact, supersede, or complement one another within specific case contexts.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        =========================================
        SECTION 02: AI GUIDANCE (Dark Mode / Terminal)
        =========================================
      */}
      <section className="relative w-full bg-darkbackground text-white border-b border-white/20 overflow-hidden">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="p-8 lg:p-16 lg:border-r border-white/20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-bold tracking-widest text-sm">{'// 02'}</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tighter">AI Guidance</h2>
              </div>
              <p className="text-sm leading-relaxed max-w-md mb-12 text-white/70">
                Leverage artificial intelligence to navigate complex legislative frameworks. Our engine interprets policy implications and suggests actionable next steps based on your specific case parameters.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-bold mb-2 uppercase tracking-wide">Intelligent Assistance</h3>
                    <p className="text-xs text-white/50 leading-relaxed">Ask natural language questions and receive contextual answers grounded in current, verified legislation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-bold mb-2 uppercase tracking-wide">Compliance Support</h3>
                    <p className="text-xs text-white/50 leading-relaxed">Ensure regulatory adherence with automated policy tracking, risk assessment, and proactive alerts.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Terminal Visual */}
          <div className="p-8 lg:p-16 bg-black relative flex items-center justify-center min-h-[500px]">
            {/* Background Grid for Terminal */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwdjIwaDIwVjIwaC0yMHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] mix-blend-overlay" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg border border-white/20 bg-black/80 backdrop-blur-sm shadow-2xl relative z-10"
            >
              {/* Terminal Header */}
              <div className="border-b border-white/20 p-3 flex items-center justify-between bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Terminal className="w-3 h-3" />
                  <span>ai_engine_v2.sh</span>
                </div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-paragraph text-xs md:text-sm space-y-4 h-[300px] overflow-hidden relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/50"
                >
                  $ init_analysis --case="data_privacy_breach"
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="text-primary flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 animate-pulse" />
                  <span>Processing legislative parameters...</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="border-l-2 border-primary pl-4 space-y-2"
                >
                  <p className="text-white">MATCH FOUND: Policy Directive 402.B</p>
                  <p className="text-white/70">Requirement: Mandatory disclosure within 72 hours.</p>
                  <p className="text-white/70">Suggested Action: Initiate protocol [DP-72].</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.5 }}
                  className="flex items-center gap-2 mt-4"
                >
                  <span className="text-primary">{'>'}</span>
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-4 bg-white inline-block"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        =========================================
        SECTION 03: CTA (Stark & Minimal)
        =========================================
      */}
      <section className="w-full bg-background py-32 px-8 border-b border-black relative overflow-hidden">
        {/* Decorative Background Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg width="100%" height="100%">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8">
              Transform Your<br />Research
            </h2>
            <p className="text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed">
              Join organizations worldwide using our platform to streamline policy analysis and ensure regulatory compliance with mathematical precision.
            </p>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="font-paragraph px-12 py-6 border-2 border-black bg-primary text-white text-sm font-bold tracking-widest uppercase transition-colors duration-300"
              >
                {'{ start_exploring => }'}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}