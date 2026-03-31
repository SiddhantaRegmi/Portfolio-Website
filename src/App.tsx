import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone, 
  ChevronRight,
  Menu,
  X,
  Terminal,
  Layers
} from 'lucide-react';

// Project Components
import SnakeGame from './projects/SnakeGame';
import TicTacToe from './projects/TicTacToe';
import LoginPage from './projects/LoginPage';
import TodoList from './projects/TodoList';
import Calculator from './projects/Calculator';

type Section = 'home' | 'about' | 'projects' | 'contact';

const PROJECTS = [
  {
    id: 'snake',
    title: 'Snake Game',
    description: 'A classic arcade game built with React hooks and state management.',
    component: <SnakeGame />,
    tags: ['React', 'Game Dev', 'Logic']
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'A clean, interactive version of the timeless strategy game.',
    component: <TicTacToe />,
    tags: ['React', 'State', 'UI/UX']
  },
  {
    id: 'login',
    title: 'Modern Login',
    description: 'A high-fidelity authentication interface with social login options.',
    component: <LoginPage />,
    tags: ['UI Design', 'Forms', 'Tailwind']
  },
  {
    id: 'todo',
    title: 'Task Master',
    description: 'A productivity-focused to-do list with local storage persistence.',
    component: <TodoList />,
    tags: ['CRUD', 'Local Storage', 'Productivity']
  },
  {
    id: 'calculator',
    title: 'Precision Calc',
    description: 'A sleek, functional calculator with history tracking.',
    component: <Calculator />,
    tags: ['Math', 'Logic', 'Glassmorphism']
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selectedProjectObj = selectedProject ? PROJECTS.find(project => project.id === selectedProject) : null;

  const navItems: { label: string; id: Section }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id as Section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-display font-bold text-xl italic">
              S
            </div>
            <span className="text-white font-display font-bold tracking-tight hidden sm:block">SIDDHANTA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-mono uppercase tracking-widest transition-colors ${
                  activeSection === item.id ? 'text-accent' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#0a0a0a] border-b border-zinc-800 p-6 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-lg font-display font-bold text-left ${
                      activeSection === item.id ? 'text-accent' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-6">
              <Terminal size={14} />
              Available for projects
            </div>
            <h1 className="text-6xl sm:text-8xl font-display font-bold text-white leading-[0.9] mb-8 italic">
              CRAFTING <br />
              <span className="text-accent">DIGITAL</span> <br />
              EXPERIENCES
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
              I am Siddhanta Regmi, a web developer based in Nepal. I build modern, high-performance web solutions that push the boundaries of what's possible online.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-accent text-white font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
              >
                VIEW PROJECTS
                <ChevronRight size={20} />
              </button>
              <div className="flex items-center gap-4 px-4">
                <a href="https://github.com/SiddhantaRegmi" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/siddhanta-regmi-5136b63bb/" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-br from-accent/20 to-transparent absolute -inset-4 blur-3xl" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
              <img 
                src="https://picsum.photos/seed/siddhanta/800/800" 
                alt="Siddhanta Regmi"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-1">Web Developer</div>
                <div className="text-2xl font-display font-bold text-white">Siddhanta Regmi</div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -right-6 top-1/4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl hidden sm:block">
              <div className="text-accent font-display font-bold text-2xl">4+</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Core Skills</div>
            </div>
            <div className="absolute -left-6 bottom-1/4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl hidden sm:block">
              <div className="text-accent font-display font-bold text-2xl">5+</div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="text-accent font-mono text-xs uppercase tracking-[0.5em] mb-4">01. About Me</div>
              <h2 className="text-5xl font-display font-bold text-white mb-8 italic">MY <br /> PHILOSOPHY</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                I believe that every line of code should serve a purpose. My goal is to create digital experiences that are not just visually stunning, but also highly functional and accessible.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 rounded-2xl border border-zinc-800">
                  <Globe className="text-accent mb-3" size={24} />
                  <div className="text-white font-bold text-sm">Global Standards</div>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-zinc-800">
                  <Cpu className="text-accent mb-3" size={24} />
                  <div className="text-white font-bold text-sm">Tech Driven</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                        <Smartphone size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Responsive Design</h3>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Websites that look and feel great on any device, from mobile phones to large desktop monitors.
                    </p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                        <Layers size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Modern Tech Stack</h3>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Utilizing the latest frameworks and libraries like React, Tailwind CSS, and Motion for cutting-edge results.
                    </p>
                  </div>
                </div>

                <div className="p-8 bg-black rounded-3xl border border-zinc-800">
                  <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mb-8">Technical Skills</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'HTML5 / CSS3', level: 95 },
                      { name: 'JavaScript (ES6+)', level: 90 },
                      { name: 'React JS', level: 85 },
                      { name: 'Tailwind CSS', level: 95 },
                      { name: 'Node.js', level: 70 },
                    ].map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs font-mono mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-accent">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="text-accent font-mono text-xs uppercase tracking-[0.5em] mb-4">02. Projects</div>
              <h2 className="text-5xl font-display font-bold text-white italic">FEATURED <br /> WORKS</h2>
            </div>
            <p className="text-zinc-500 max-w-sm">
              A collection of interactive applications and games demonstrating technical proficiency and creative problem-solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="aspect-[4/3] bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center p-4 scale-90 group-hover:scale-95 transition-transform duration-500">
                    <div className="w-full h-full bg-black/40 rounded-2xl border border-zinc-800/50 flex items-center justify-center text-zinc-700">
                      <Code2 size={48} strokeWidth={1} />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-6 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      LAUNCH PROJECT
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-accent border border-accent/30 px-2 py-0.5 rounded-full uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden flex flex-col max-h-full shadow-[0_0_50px_rgba(219,157,107,0.1)]"
            >
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{PROJECTS.find(p => p.id === selectedProject)?.title}</h3>
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Interactive Preview</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-black/20">
                <div className="max-w-4xl mx-auto py-12">
                  {PROJECTS.find(p => p.id === selectedProject)?.component}
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {selectedProjectObj?.tags?.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-mono rounded-full uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-600 font-mono italic">Built with React & Tailwind CSS</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-accent font-mono text-xs uppercase tracking-[0.5em] mb-4">03. Contact</div>
          <h2 className="text-6xl sm:text-8xl font-display font-bold text-white mb-12 italic">LET'S <br /> CONNECT</h2>
          
          <div className="max-w-2xl mx-auto p-12 bg-zinc-900 rounded-[3rem] border border-zinc-800 relative group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
            <p className="text-xl text-zinc-400 mb-12">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 w-2xl ">
              <a 
                href="mailto:siddhantaregmi76@gmail.com"
                className="flex flex-col items-center justify-center gap-3 p-6 bg-black rounded-2xl border border-zinc-800 hover:border-accent transition-colors group/link"
              >
                <Mail className="text-accent group-hover/link:scale-110 transition-transform" />
                <span className="text-white font-bold">Email Me</span>
                <span className="text-xs text-zinc-500 font-mono">siddhantaregmi76@gmail.com</span>
              </a>
              <a 
                href="https://github.com/SiddhantaRegmi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 p-6 bg-black rounded-2xl border border-zinc-800 hover:border-accent transition-colors group/link"
              >
                <Github className="text-accent group-hover/link:scale-110 transition-transform" />
                <span className="text-white font-bold">GitHub</span>
                <span className="text-xs text-zinc-500 font-mono">Siddhanta Regmi</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/siddhanta-regmi-5136b63bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 p-6 bg-black rounded-2xl border border-zinc-800 hover:border-accent transition-colors group/link"
              >
                <Linkedin className="text-accent group-hover/link:scale-110 transition-transform" />
                <span className="text-white font-bold">LinkedIn</span>
                <span className="text-xs text-zinc-500 font-mono">Siddhanta Regmi</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-display font-bold italic">
              S
            </div>
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">© 2026 Siddhanta Regmi</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="https://github.com/SiddhantaRegmi" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/siddhanta-regmi-5136b63bb/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:siddhantaregmi76@gmail.com" className="text-zinc-500 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest hover:text-accent transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}
