import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  MessageSquare, 
  Star, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Send,
  Menu,
  X,
  Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateEventConcept, searchTrendingThemes, generateConceptImage } from './lib/gemini';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Historias', href: '#success-stories' },
    { name: 'Metodología', href: '#methodology' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Testimonios', href: '#success-stories' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-headline italic text-primary">Elizabeth Elles</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="editorial-caps text-on-surface/70 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/573152684203" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-2.5 rounded-md editorial-caps hover:bg-primary/90 transition-all text-center"
          >
            Consultar Ahora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-on-surface" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-t border-outline-variant/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="editorial-caps text-on-surface/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/573152684203" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white w-full py-4 rounded-md editorial-caps text-center"
            >
              Consultar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="w-full h-full object-cover"
      >
        <source src="/Weddingaltared.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <span className="editorial-caps text-secondary mb-4 block">Bucaramanga, Santander</span>
        <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl italic tracking-tight text-on-surface leading-[1.1] mb-8">
          Planificación de <br className="hidden sm:block" /> Eventos Exclusivos
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-12">
          Cada momento merece ser perfecto. Creamos experiencias que trascienden el tiempo con elegancia y sofisticación.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          <a 
            href="https://wa.me/573152684203" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-colors editorial-caps shadow-lg shadow-primary/10 text-center"
          >
            Solicita tu consulta gratis
          </a>
          <a href="#services" className="text-secondary border-b border-secondary/30 pb-1 editorial-caps hover:border-secondary transition-all">
            Ver Servicios
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto" id="about">
    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-[4/5] overflow-hidden rounded-lg">
          <img 
            alt="Elizabeth Elles Portrait" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujnujNrPMoarEPxpZULi7_So8mjSH8VNYcubVcrnm-fjjFNb2820ACR_93VhM9vb7YA2wqQxPGM16T9rtR_inR_Or9R37_srIzhTfOEJ1cjFppl77gBFOQG0z1J_MK5KpEd2jjposKU_6TDfam8uyCeekqiBCBp_o-ar16Zr8YdVo2hezjhGe6x8iafG3H0CIpslbuZHrwzOt3cdwKrXvBU1KrM7cU_vbNBt31lT9t9_QszCui0WbNGwik3aN_3kKRsTKkMQRgA-_4"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-12 -right-12 bg-surface-container-lowest p-12 max-w-xs ambient-glow hidden lg:block">
          <p className="italic font-headline text-secondary text-lg">"Nuestra misión es que tu única preocupación sea celebrar el amor."</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="editorial-caps text-secondary mb-6">Sobre Nosotros</h2>
        <h3 className="font-headline text-5xl mb-8 leading-tight italic">El Arte de Celebrar la Vida</h3>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
          En el corazón de Bucaramanga, transformamos sueños en realidades tangibles. Nuestra filosofía se centra en reducir el estrés de nuestros clientes mediante una logística impecable y una creatividad sin límites.
        </p>
        <ul className="space-y-6">
          {[
            { icon: <Sparkles className="w-5 h-5 text-secondary" />, text: "Atención personalizada" },
            { icon: <Palette className="w-5 h-5 text-secondary" />, text: "Diseño de concepto" },
            { icon: <CheckCircle2 className="w-5 h-5 text-secondary" />, text: "Coordinación impecable" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4">
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [mode, setMode] = useState<'concept' | 'trends'>('concept');

  const handleGenerate = async () => {
    if (!prompt && mode === 'concept') return;
    setLoading(true);
    setResult(null);
    setGeneratedImage(null);
    try {
      const output = mode === 'concept' 
        ? await generateEventConcept(prompt)
        : await searchTrendingThemes();
      setResult(output);
      
      // Auto-generate image if we have a prompt
      if (output.imagePrompt) {
        setImageLoading(true);
        const img = await generateConceptImage(output.imagePrompt);
        setGeneratedImage(img);
        setImageLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-surface-container-low">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="editorial-caps text-secondary mb-4">Inspiración Instantánea</h2>
          <h3 className="font-headline text-3xl md:text-5xl italic">Lluvia de Ideas</h3>
          <p className="text-on-surface-variant mt-4 text-sm md:text-base">Visualiza posibilidades concretas para tu evento y descubre por qué la planificación profesional es la clave del éxito.</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-8 ambient-glow border border-outline-variant/10">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
            <button 
              onClick={() => setMode('concept')}
              className={`flex-1 py-3 rounded-md editorial-caps transition-all text-[10px] md:text-[11px] ${mode === 'concept' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}
            >
              Generador de Ideas
            </button>
            <button 
              onClick={() => setMode('trends')}
              className={`flex-1 py-3 rounded-md editorial-caps transition-all text-[10px] md:text-[11px] ${mode === 'trends' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}
            >
              Tendencias Flash
            </button>
          </div>

          {mode === 'concept' ? (
            <div className="space-y-4">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="¿Qué tienes en mente? (ej: Boda campestre, cena de gala, aniversario íntimo)..."
                className="w-full bg-surface-container border-none rounded-xl p-6 focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
              />
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-secondary text-white py-4 rounded-xl editorial-caps font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Obtener Lluvia de Ideas
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-on-surface-variant text-center py-4">Descubre qué es tendencia en Bucaramanga en este preciso momento.</p>
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-secondary text-white py-4 rounded-xl editorial-caps font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search className="w-4 h-4" />}
                Ver Tendencias Clave
              </button>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 pt-12 border-t border-outline-variant/10"
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="order-2 md:order-1 space-y-6 md:space-y-8">
                    <div>
                      <h4 className="font-headline text-3xl md:text-4xl italic text-primary mb-2">{result.nombre}</h4>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {result.paleta?.map((color: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-[9px] md:text-[10px] editorial-caps rounded-full border border-secondary/20 whitespace-nowrap">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="editorial-caps text-[10px] md:text-xs text-on-surface-variant">Elementos Clave</h5>
                      <ul className="grid grid-cols-1 gap-3">
                        {result.elementos?.map((el: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></div>
                            <span className="leading-tight">{el}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 md:p-6 bg-surface-container rounded-xl border-l-4 border-secondary italic text-on-surface-variant text-sm">
                      "{result.tip}"
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10">
                      <p className="text-primary font-headline italic text-base md:text-lg">{result.mensajePlanner}</p>
                    </div>
                  </div>

                  <div className="order-1 md:order-2 relative aspect-video rounded-2xl overflow-hidden bg-surface-container flex items-center justify-center ambient-glow">
                    {imageLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                        <p className="editorial-caps text-[10px] text-on-surface-variant animate-pulse">Materializando tu visión...</p>
                      </div>
                    ) : generatedImage ? (
                      <motion.img 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={generatedImage} 
                        alt="Concept Visualization" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-on-surface-variant/30 flex flex-col items-center gap-2">
                        <Sparkles className="w-12 h-12" />
                        <span className="editorial-caps text-[10px]">Esperando inspiración</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <section className="py-20 md:py-32 bg-surface" id="services">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
        <h2 className="editorial-caps text-secondary mb-4">Portafolio</h2>
        <h3 className="font-headline text-3xl md:text-5xl italic">Experiencias creadas a tu medida</h3>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {[
          {
            title: "Bodas de Ensueño",
            desc: "Planificación integral y coordinación del gran día con atención a cada detalle.",
            img: "/bodas_ensueno_new.jpg"
          },
          {
            title: "Eventos con Estilo",
            desc: "Curaduría visual y estilismo que refleja tu esencia personal.",
            img: "/eventos_estilo.jpg"
          },
          {
            title: "Eventos de Destino",
            desc: "Coordinación logística para locaciones espectaculares y únicas.",
            img: "/eventos_destino.jpg"
          }
        ].map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
              <img 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={service.img}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h4 className="font-headline text-2xl italic mb-2">{service.title}</h4>
            <p className="text-on-surface-variant text-sm mb-4">{service.desc}</p>
            <span className="text-secondary editorial-caps text-[10px] font-bold border-b border-secondary/20 pb-1">Ver Detalles</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-container py-16 md:py-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
      <div className="col-span-1 sm:col-span-2">
        <div className="font-headline text-2xl md:text-3xl italic text-primary mb-6">Elizabeth Elles</div>
        <p className="text-on-surface-variant text-xs md:text-sm max-w-md leading-relaxed">
          Especialista en planificación de eventos de alta gama en Bucaramanga. Convertimos tus momentos especiales en legados de elegancia.
        </p>
      </div>
      <div>
        <h6 className="editorial-caps text-on-surface mb-6 md:mb-8">Explora</h6>
        <ul className="space-y-3 md:space-y-4">
          <li><a href="https://wa.me/573152684203" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm">WhatsApp</a></li>
          <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm">Instagram</a></li>
          <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm">Pinterest</a></li>
        </ul>
      </div>
      <div>
        <h6 className="editorial-caps text-on-surface mb-6 md:mb-8">Legal</h6>
        <ul className="space-y-3 md:space-y-4">
          <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm">Contacto</a></li>
          <li><a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs md:text-sm">Aviso Legal</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-outline-variant/10 mt-16 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-on-surface-variant text-[10px] md:text-xs text-center md:text-left">© 2024 Elizabeth Elles. El Arte de Celebrar la Vida. Todos los derechos reservados.</p>
      <div className="flex gap-6 text-on-surface-variant/50">
        <Instagram className="w-5 h-5" />
        <Facebook className="w-5 h-5" />
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      <main>
        <Hero />
        <About />
        
        {/* Methodology Section */}
        <section className="bg-surface-container py-20 md:py-32" id="methodology">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="font-headline text-3xl md:text-5xl italic mb-12">Tu única preocupación será disfrutar</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              {[
                { step: "01", title: "Descubrimiento", desc: "Escuchamos tus deseos más profundos para sentar las bases de tu celebración única." },
                { step: "02", title: "Curaduría", desc: "Seleccionamos a los mejores aliados y diseñamos cada detalle visual y logístico." },
                { step: "03", title: "Ejecución", desc: "Nuestro equipo gestiona cada segundo del evento para que vivas el presente." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-surface-container-lowest rounded-lg ambient-glow"
                >
                  <div className="text-secondary font-headline text-4xl mb-4 italic">{item.step}.</div>
                  <h4 className="editorial-caps mb-4">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AIAssistant />
        <Services />

        {/* Gallery Section */}
        <section className="py-20 md:py-32 bg-surface" id="gallery">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h3 className="font-headline text-3xl md:text-5xl italic mb-12 md:mb-16 text-center">Galería de Memorias</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
              <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-lg">
                <img 
                  alt="Main Event" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhwLET3Rc4CfTRcDvjjZIkU35HXHAw3hSGaCX6FzGlAn37C42grItuHKy2YuOk9ukxSkIKQ6ABQzWcI3E4yFZChzxmcidGZYeX1Zq5333zV0Q-svyMz_khZmjX0-4dSv1Wl-mBukfWqOMSECAbWCVEB9lVvMLF5loJpuGyCL4bk8pv4Rny-Xz4uhQvU6XhFRwyd_FUvvE0AvlWpHu3Ovi5NH_AAT0HniESUStbroVAFaOPPKI3ZBJkSfJh2MLMmlgO6q_Yiv0SiYf0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-on-surface/40 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="editorial-caps text-white font-bold">Atmósfera Única</span>
                </div>
              </div>
              {[
                "https://lh3.googleusercontent.com/aida/ADBb0ugQ42iV3R8XafIU334Nhm8KZIFa5uukfuNf7tIMs_6o6t4e9cdE2Stpn9FdCZQeB13bswoe6BY0BYoziwEClhoE8U00iBw2SScJ53Sg9uGMpJEEeXsf4ef3mjgDSN4J7sOPXqUVDXGjppotBcYdoX61GHQA_RW03uGtnhUmiWfMq5SuRHVTNirI8lFpVqunc8ONHJzB_MnS-ZXE_iBpTEM6OBiNiyTxtPSf-zuSkbt8St3YWUpTGa3CrEKvXoKWOxbtsiDhgWC3tQ",
                "https://lh3.googleusercontent.com/aida/ADBb0uh1y2rdP380r2kiqGrGZmNOPBk2jhMtNOGIscm2b_g0czX2s_yP0iHjYcUbzTsysyHH6hmOpv2Zrs26hVSwq7u5qLo-b8h6Q2KohJlLmkkqjqxGfNYAvbhKrV74F71ssbVzNQzr23nPWqPVMAqB_AplANZTJRh8dESg2iS7tZDUy7cGsT05XozGNKfc7zIhmGbMC-ksQr9BklNQlgJXEilf7eTXuIy4E7_Drzxf1fa_Ejp_JrSCY-6TyZCc46azQGT1YfxgVrxXLg",
                "https://lh3.googleusercontent.com/aida/ADBb0ujJ3rGI93tje6LV9jmXFcobXGmdJwfg13ZrtSe-E6v0Iq7NjUbRxJRH4l8WIuCZG-IXIYvRdQNWw5kl6X8Dvv96QtUm-YKbs_2tl_WD92mP9ATjeHGUR0vyASGra36757OxqKYYrt7siGC2i1njWFEFtJ_tpd3QcjAV0JV_0HpTiS4hqrKZCnJwwm0ATsnmU6iQEdeigMNKBhqaicqx7SL3JFLUe4vMPyfZToizcKrl99AFAbGYzgZhuA_cCNnrE8YtRuhqM6kFvQU",
                "https://lh3.googleusercontent.com/aida/ADBb0ugDg0z0bEP3ptOm1chzlofVTbC1oINERKeGL08xvfeg5VK_8tD76GJgMJZz1kYtaFYsEbLJsVecgayI1RrSm0ncIligbZjhx29luc-G1Jqt-6F2hTolo26HCSyxH7-QmhJnNRgg4_P83_PyBman8WSZaRX1HW3knKsVvnryjDUtTBc33hhHqKHoFgrugsHGrNZcnGO8L96N8zISTsv_MK5nchK2ChPkgG4jc-b_1LinIt_C-TLwQoMFjPnVZM4_WeVboN5gO54nIus"
              ].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg">
                  <img 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={img}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8" id="success-stories">
          <h3 className="font-headline text-3xl md:text-5xl italic mb-12 md:mb-20 text-center">Historias de Éxito</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: "Camila Rodríguez", role: "Novia Felíz", text: "Elizabeth capturó cada detalle que soñamos para nuestra boda. Su amor por lo que hace se nota en cada rincón del evento.", initial: "CR" },
              { name: "Familia Martínez", role: "Padres", text: "Los 15 años de mi hija fueron espectaculares. La organización fue impecable, pudimos disfrutar cada minuto sin preocupaciones.", initial: "FM" },
              { name: "Grupo Empresarial Sol", role: "Aliado Corporativo", text: "Elizabeth es nuestra aliada corporativa en Bucaramanga. Su capacidad para manejar eventos de alto perfil es insuperable.", initial: "GE" },
            ].map((testi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-container-lowest p-10 rounded-lg ambient-glow"
              >
                <div className="flex gap-1 text-secondary mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary" />)}
                </div>
                <p className="italic text-on-surface-variant mb-8 leading-relaxed">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">{testi.initial}</div>
                  <div>
                    <h5 className="font-bold text-sm">{testi.name}</h5>
                    <span className="editorial-caps text-[10px] text-secondary">{testi.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 md:py-32 bg-surface-container" id="contact">
          <div className="max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="font-headline text-3xl md:text-5xl italic mb-8">Hablemos de tu gran día</h3>
              <p className="text-on-surface-variant mb-12 text-sm md:text-base">Estamos listos para hacer de tu evento una experiencia inolvidable. Completa el formulario o contáctanos directamente.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                  <div>
                    <h6 className="font-bold text-sm md:text-base">Ubicación</h6>
                    <p className="text-on-surface-variant text-xs md:text-sm">Bucaramanga, Santander</p>
                  </div>
                </div>
                <a href="https://wa.me/573152684203" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10 hover:border-primary/50 transition-colors">
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-secondary group-hover:scale-110 transition-transform" />
                  <div>
                    <h6 className="font-bold text-sm md:text-base">Consultas Rápidas</h6>
                    <p className="text-secondary text-xs md:text-sm group-hover:underline">Chatea directamente por WhatsApp</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-12 rounded-lg ambient-glow">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input className="w-full border-b border-outline-variant/30 bg-transparent py-4 focus:ring-0 focus:border-secondary transition-all outline-none peer" id="name" placeholder=" " type="text"/>
                  <label className="absolute left-0 top-4 text-on-surface-variant editorial-caps pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="name">Nombre Completo</label>
                </div>
                <div className="relative">
                  <input className="w-full border-b border-outline-variant/30 bg-transparent py-4 focus:ring-0 focus:border-secondary transition-all outline-none peer" id="email" placeholder=" " type="email"/>
                  <label className="absolute left-0 top-4 text-on-surface-variant editorial-caps pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="email">Email</label>
                </div>
                <div className="relative">
                  <textarea className="w-full border-b border-outline-variant/30 bg-transparent py-4 focus:ring-0 focus:border-secondary transition-all outline-none peer resize-none" id="message" placeholder=" " rows={4}></textarea>
                  <label className="absolute left-0 top-4 text-on-surface-variant editorial-caps pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-secondary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]" htmlFor="message">Cuéntanos sobre tu evento</label>
                </div>
                <button className="w-full bg-primary text-white py-5 rounded-md editorial-caps font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Enviar Mensaje <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
