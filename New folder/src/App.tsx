import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { ParallaxSection } from './components/ParallaxSection';
import { PetalGame } from './components/PetalGame';

const App = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const events = [
    {
      title: "Mehndi Ceremony",
      date: "October 24, 2025",
      time: "11:00 AM",
      location: "The Royal Gardens",
      image: "https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      symbol: "🌿"
    },
    {
      title: "Sangeet Night",
      date: "October 24, 2025",
      time: "7:00 PM",
      location: "Grand Ballroom",
      image: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      symbol: "💃"
    },
    {
      title: "The Wedding",
      date: "October 25, 2025",
      time: "10:00 AM",
      location: "Sacred Mandap",
      image: "https://images.pexels.com/photos/2060241/pexels-photo-2060241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      symbol: "🔥"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" style={{ scaleX }} />

      {/* Audio Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-8 right-8 z-50 p-4 glass rounded-full hover:scale-110 transition-transform"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-primary" />}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-[url('https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Shubh Vivah</span>
            <h1 className="text-6xl md:text-9xl font-serif mb-6">
              Arjun <span className="text-accent">&</span> Diya
            </h1>
            <p className="text-xl md:text-2xl text-textSecondary font-light tracking-widest">
              OCTOBER 24-25, 2025 • UDAIPUR
            </p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white/30" />
          </motion.div>
        </div>

        {/* Floating Mandalas */}
        <ParallaxSection offset={100} className="absolute top-20 left-10 opacity-20">
          <div className="w-64 h-64 border border-primary/30 rounded-full animate-spin-slow flex items-center justify-center">
            <div className="w-48 h-48 border border-accent/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </ParallaxSection>
      </section>

      {/* The Story */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Heart className="w-12 h-12 text-accent mx-auto mb-8 animate-pulse-slow" />
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Two Souls, One Journey</h2>
            <p className="text-lg md:text-xl text-textSecondary leading-relaxed font-light">
              "In the dance of the universe, our paths crossed like two stars destined to align. 
              With the blessings of our elders and the warmth of our traditions, 
              we invite you to witness the beginning of our forever."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minigame Section */}
      <section className="py-20 px-4 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">A Traditional Blessing</h2>
            <p className="text-textSecondary">Unlock the sacred details with your love</p>
          </div>
          <PetalGame onComplete={() => setGameComplete(true)} />
        </div>
      </section>

      {/* Events Section - Revealed after game */}
      <AnimatePresence>
        {gameComplete && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-serif text-center mb-20">The Celebrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative h-[500px] rounded-3xl overflow-hidden glass"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-4xl mb-4">{event.symbol}</span>
                      <h3 className="text-3xl font-serif mb-4">{event.title}</h3>
                      <div className="space-y-2 text-textSecondary">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <button className="mt-8 py-3 px-6 rounded-full border border-primary/30 hover:bg-primary/10 transition-colors text-sm tracking-widest uppercase">
                        View Map
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* RSVP Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-2xl mx-auto glass p-12 rounded-[2rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-serif text-center mb-8">Will You Join Us?</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm text-textSecondary uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-textSecondary uppercase tracking-widest">Guests</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors">
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-textSecondary uppercase tracking-widest">Attending</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors">
                    <option>Yes, I'll be there</option>
                    <option>Regretfully, no</option>
                  </select>
                </div>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-lg hover:shadow-[0_0_30px_rgba(158,127,255,0.3)] transition-all active:scale-[0.98]">
                Send RSVP
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5">
        <div className="mb-8">
          <h3 className="text-2xl font-serif mb-2">Arjun & Diya</h3>
          <p className="text-textSecondary">#TheEternalUnion2025</p>
        </div>
        <div className="flex justify-center gap-6 mb-12">
          <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer"><Heart className="w-6 h-6 text-accent" /></motion.div>
        </div>
        <p className="text-xs text-white/20 uppercase tracking-[0.5em]">With Love • Udaipur • 2025</p>
      </footer>
    </div>
  );
};

export default App;
