import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ChevronDown, Menu, X, ExternalLink, 
  Zap, Globe, BookOpen, Users, Code, Award, Calendar
} from 'lucide-react';

const FuturisticHomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionsRef = useRef({});
  
  // Handle page loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine which section is in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      Object.entries(sectionsRef.current).forEach(([section, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition && 
            ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Register section refs
  const registerSection = (id, element) => {
    if (element && !sectionsRef.current[id]) {
      sectionsRef.current[id] = element;
    }
  };

  // Navigation items
  const navItems = [
    {name: 'Home', link: '#home', icon: <Globe className="w-4 h-4 mr-2" />},
    {name: 'About', link: '#about', icon: <Users className="w-4 h-4 mr-2" />},
    {name: 'Projects', link: '#projects', icon: <Code className="w-4 h-4 mr-2" />},
    {name: 'Events', link: '#events', icon: <Calendar className="w-4 h-4 mr-2" />},
    {name: 'Members', link: '#members', icon: <BookOpen className="w-4 h-4 mr-2" />},
    {name: 'Contact', link: '#contact', icon: <ExternalLink className="w-4 h-4 mr-2" />}
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Custom cursor */}
      <div
        className="fixed w-8 h-8 rounded-full border-2 border-amber-500 pointer-events-none z-50 hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out, opacity 0.3s ease',
          opacity: isLoaded ? 1 : 0,
        }}
      ></div>
      
      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(rgba(120,120,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Loading screen */}
      <div 
        className={`fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">
          SES<span className="animate-ping text-amber-500">_</span>
        </div>
      </div>
      
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          isScrolled ? 'bg-gray-900/80 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center group">
            <div className="relative overflow-hidden">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">
                SES
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-sky-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </div>
            <span className="h-6 w-0.5 bg-sky-500 mx-3"></span>
            <div className="overflow-hidden">
              <div className="text-sm text-gray-400 hidden sm:inline-block transform hover:translate-y-[-100%] transition-transform hover:duration-300 cursor-default">
                <div>SOCIETY OF ENGINEERING STUDENTS</div>
                <div className="text-sky-400">INNOVATING THE FUTURE</div>
              </div>
              <div className="text-sm text-gray-400 sm:hidden">JKUAT</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.link} 
                className={`group flex items-center transition-colors relative overflow-hidden ${
                  activeSection === item.link.substring(1) 
                    ? 'text-amber-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.name}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform ${
                  activeSection === item.link.substring(1)
                    ? 'translate-x-0'
                    : 'translate-x-[-100%] group-hover:translate-x-0'
                } transition-transform duration-300`}></span>
              </a>
            ))}
            <a 
              href="#join-us" 
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all transform hover:translate-y-[-2px]"
            >
              <span className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Join Us
              </span>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-400 hover:text-amber-500 transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-500 ease-in-out fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-6 py-20">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.link} 
                  className={`text-2xl font-bold flex items-center ${
                    activeSection === item.link.substring(1) 
                      ? 'text-amber-500' 
                      : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
              <a 
                href="#join-us" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium text-center rounded-sm shadow-lg shadow-amber-500/20 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Join Us
                </span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section 
        id="home" 
        ref={(el) => registerSection('home', el)}
        className="min-h-screen flex items-center relative pt-20 overflow-hidden"
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl top-1/4 -left-48 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-sky-500/10 rounded-full blur-3xl bottom-1/4 -right-48 animate-blob animation-delay-2000"></div>
          <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl top-3/4 left-1/3 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
          {/* Left content */}
          <div className="md:w-1/2 mb-16 md:mb-0 md:pr-10">
            {/* Animated decorative line */}
            <div className="flex items-center mb-8 overflow-hidden">
              <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-sky-500 mr-4"></div>
              <p className="text-gray-400 text-sm transform translate-y-0 animate-slide-up animation-delay-300">JOMO KENYATTA UNIVERSITY OF AGRICULTURE AND TECHNOLOGY</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 overflow-hidden">
              <div className="transform translate-y-0 animate-slide-up">
                Society of
              </div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500 transform translate-y-0 animate-slide-up animation-delay-150">
                Engineering Students
              </div>
            </h1>
            
            <div className="overflow-hidden mb-8">
              <p className="text-gray-400 max-w-md text-lg transform translate-y-0 animate-slide-up animation-delay-300">
                Bridging the gap between academic learning and industry practice with 
                <span className="text-amber-500"> cutting-edge innovation </span> 
                and 
                <span className="text-sky-500"> future-ready </span> 
                engineering solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 overflow-hidden">
              <div className="transform translate-y-0 animate-slide-up animation-delay-450">
                <a 
                  href="#about" 
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all transform hover:translate-y-[-2px] flex items-center group"
                >
                  <span>Explore</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              
              <div className="transform translate-y-0 animate-slide-up animation-delay-600">
                <a 
                  href="#projects" 
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center border border-gray-700 rounded-sm hover:border-amber-500 group"
                >
                  <svg className="w-5 h-5 mr-2 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                  </svg>
                  <span>Our Projects</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right image with futuristic overlay effects */}
          <div className="md:w-1/2 relative transform translate-y-0 animate-slide-up animation-delay-750">
            <div className="relative rounded-sm overflow-hidden border border-gray-800 shadow-2xl shadow-amber-500/10">
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-900/40 to-purple-900/40 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-sky-500/20 mix-blend-color-dodge"></div>
              
              {/* Static/noise effect */}
              <div className="absolute inset-0 opacity-10 bg-noise-pattern mix-blend-overlay pointer-events-none"></div>
              
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-scan-line opacity-10 pointer-events-none"></div>
              
              <img 
                src="/api/placeholder/800/600" 
                alt="JKUAT Engineering students" 
                className="rounded-sm object-cover w-full h-auto filter saturate-50"
              />
              
              {/* Futuristic overlay elements */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm border border-amber-500/30 rounded-sm text-amber-500 text-xs font-mono">
                ENGINEERING.JKUAT.2025
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div>
                  <p className="text-xs font-mono text-gray-300">DEVELOPING FUTURE ENGINEERS // INNOVATING TOMORROW</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-sky-500/30 -z-10 rounded-sm"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-amber-500/30 -z-10 rounded-sm"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 opacity-20 blur-lg rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Hero scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="text-amber-500 text-sm font-medium mb-2">Scroll to discover</p>
          <ChevronDown className="w-6 h-6 text-amber-500" />
        </div>
      </section>
      
      {/* About Section */}
      <section 
        id="about" 
        ref={(el) => registerSection('about', el)}
        className="py-24 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-amber-500/5 to-transparent transform rotate-12 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-sky-500/5 to-transparent transform -rotate-12 blur-3xl"></div>
        
        <div className="container mx-auto px-6">
          <div className="mb-16 overflow-hidden">
            <div className="transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-150 observer-element">
              <div className="flex items-center mb-3">
                <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-sky-500 mr-4"></div>
                <p className="text-amber-500 font-medium text-sm">ABOUT OUR SOCIETY</p>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-8">Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">future</span></h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left side - text content */}
            <div className="space-y-6 transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-300 observer-element">
              <p className="text-gray-300 leading-relaxed">
                Founded in 1995, the Society of Engineering Students at Jomo Kenyatta University of Agriculture and Technology 
                is pioneering the next generation of engineering excellence. We represent students across all engineering disciplines, 
                from Mechanical and Electrical to Civil and Computer Engineering.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Our mission extends beyond traditional education—we're creating a hub where innovation meets practical application. 
                Through cutting-edge projects, industry partnerships, and a forward-thinking approach, we're preparing engineers 
                who don't just adapt to the future—they create it.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  'Artificial Intelligence',
                  'Renewable Energy',
                  'Smart Infrastructure',
                  'Quantum Computing',
                  'Biomedical Engineering',
                  'Robotic Systems'
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-2 h-2 mt-1.5 mr-2 bg-amber-500 rounded-full group-hover:animate-ping"></div>
                    <span className="text-gray-400 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <a 
                  href="#objectives" 
                  className="inline-flex items-center text-amber-500 hover:text-amber-400 font-medium transition-colors group"
                >
                  <span>Discover our objectives</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            
            {/* Right side - visual element */}
            <div className="relative transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-450 observer-element">
              <div className="relative h-96 border border-gray-800 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-purple-900/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-30 bg-noise-pattern mix-blend-overlay"></div>
                
                <img 
                  src="/api/placeholder/600/800" 
                  alt="Engineering students at work" 
                  className="w-full h-full object-cover filter group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Tech overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div>
                        <span className="text-xs text-amber-500 font-mono">INNOVATION LAB</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">ID.259-A</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">Pushing Boundaries</h3>
                    <p className="text-gray-400 text-sm">Our members engage in cutting-edge research and development, creating solutions for real-world engineering challenges.</p>
                    
                    <div className="pt-2 flex space-x-2">
                      {['AI', 'Robotics', 'Sustainable'].map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 text-xs rounded-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-sky-500/20 -z-10 rounded-sm"></div>
              <div className="absolute top-50 -left-4 w-16 h-16 border border-amber-500/20 -z-10 rounded-sm"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Objectives Section */}
      <section 
        id="objectives" 
        ref={(el) => registerSection('objectives', el)}
        className="py-24 bg-gray-950 relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 overflow-hidden">
            <div className="transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
              <span className="text-amber-500 font-medium inline-block mb-3">OUR MISSION</span>
              <h2 className="text-4xl font-bold text-white mb-6">Driving Innovation Forward</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The Society of Engineering Students at JKUAT is redefining engineering education through 
                a forward-thinking approach that combines academic excellence with practical innovation.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Skill Development',
                description: 'Cutting-edge workshops and training in emerging technologies from AI to quantum computing',
                icon: (
                  <svg className="w-16 h-16 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L16.0001 5M18 9L16 7M12 19V13L18 7M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                delay: 150
              },
              {
                title: 'Future Industry Connections',
                description: 'Strategic partnerships with cutting-edge tech companies and innovation labs worldwide',
                icon: (
                  <svg className="w-16 h-16 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21M3 21H21M9 7H15M9 11H15M9 15H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                delay: 300
              },
              {
                title: 'Research Excellence',
                description: 'Student-led innovation labs creating real-world solutions to engineering challenges',
                icon: (
                  <svg className="w-16 h-16 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                delay: 450
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group hover:bg-gray-900/50 p-8 rounded-sm border border-gray-800 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 transform translate-y-20 opacity-0 animate-fade-in-up observer-element"
                style={{animationDelay: `${feature.delay}ms`}}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform group-hover:text-amber-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                
                {/* Bottom indicator line that grows on hover */}
                <div className="mt-6 h-0.5 w-12 bg-gray-800 group-hover:bg-amber-500 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-purple-500/5 to-sky-500/5 animate-gradient-x"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gray-900/40 backdrop-blur-lg rounded-sm shadow-2xl border border-gray-800 overflow-hidden transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
            {/* Tech pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_15%,transparent_30%)] animate-scan"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4">
              {[
                { number: '500+', label: 'Student Members', color: 'from-amber-500 to-amber-300' },
                { number: '35+', label: 'Tech Projects', color: 'from-rose-500 to-amber-500' },
                { number: '12+', label: 'Industry Partners', color: 'from-sky-500 to-purple-500' },
                { number: '24+', label: 'Annual Events', color: 'from-purple-500 to-sky-500' }
              ].map((stat, index) => (
                <div key={index} className="p-10 group relative overflow-hidden">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>
                  
                  <div className="relative z-10 text-center group-hover:transform group-hover:scale-110 transition-transform duration-300">
                    <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>{stat.number}</div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section 
        id="projects" 
        ref={(el) => registerSection('projects', el)}
        className="py-24 bg-gray-950 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 overflow-hidden">
            <div className="transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
              <span className="text-amber-500 font-medium inline-block mb-3">INNOVATION LAB</span>
              <h2 className="text-4xl font-bold text-white mb-6">Cutting-Edge Projects</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore the revolutionary engineering solutions developed by our members,
                pushing the boundaries of what's possible in technology and design.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quantum Neural Networks',
                category: 'AI & Quantum Computing',
                image: '/project1.jpg',
                description: 'Pioneering research combining quantum computing principles with neural network architectures',
                delay: 150
              },
              {
                title: 'Biomedical Nanorobots',
                category: 'Biotechnology',
                image: '/project2.jpg',
                description: 'Microscopic robotic systems designed for targeted drug delivery and cellular repair',
                delay: 300
              },
              {
                title: 'Smart City Infrastructure',
                category: 'Civil Engineering',
                image: '/project3.jpg',
                description: 'Integrated urban systems with adaptive AI for optimal resource management',
                delay: 450
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-900/30 backdrop-blur-sm rounded-sm overflow-hidden border border-gray-800 group hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-500 transform translate-y-20 opacity-0 animate-fade-in-up observer-element"
                style={{animationDelay: `${project.delay}ms`}}
              >
                <div className="h-48 relative overflow-hidden">
                  {/* Tech overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"></div>
                  <div className="absolute inset-0 bg-noise-pattern opacity-30 mix-blend-overlay z-20"></div>
                  
                  <img 
                    src="/api/placeholder/600/400" 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter saturate-50 group-hover:saturate-100"
                  />
                  
                  <div className="absolute top-4 left-4 z-30">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-sm border border-amber-500/30 text-amber-500 text-xs font-mono rounded-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Tech readouts */}
                  <div className="absolute bottom-0 right-0 p-3 z-30">
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1 h-5 bg-amber-500/50 animate-equalizer" style={{animationDelay: `${i * 200}ms`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  {/* Animated highlight line */}
                  <div className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 to-sky-500 group-hover:w-full transition-all duration-700"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300">{project.description}</p>
                  
                  <a 
                    href={`#project-${index}`}
                    className="inline-flex items-center text-amber-500 font-medium group"
                  >
                    <span className="relative">
                      Explore Project
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-600 observer-element">
            <a 
              href="#all-projects"
              className="inline-block px-8 py-4 bg-gray-900/40 backdrop-blur-sm text-white font-medium rounded-sm border border-gray-800 hover:border-amber-500 transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section 
        id="events" 
        ref={(el) => registerSection('events', el)}
        className="py-24 relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 overflow-hidden">
            <div className="transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
              <span className="text-amber-500 font-medium inline-block mb-3">UPCOMING</span>
              <h2 className="text-4xl font-bold text-white mb-6">Next-Gen Events</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Join us for these cutting-edge events designed to expand your engineering horizons 
                and connect you with the future of technology.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quantum Computing Symposium',
                date: 'March 15, 2025',
                location: 'Advanced Tech Hub, JKUAT',
                description: 'Exploring the revolutionary potential of quantum systems in solving complex engineering problems',
                delay: 150,
                tags: ['Quantum', 'AI', 'Computing']
              },
              {
                title: 'Sustainable Tech Hackathon',
                date: 'April 2, 2025',
                location: 'Innovation Lab 3B',
                description: 'A 48-hour challenge to develop next-gen solutions for environmental sustainability',
                delay: 300,
                tags: ['Green Tech', 'Innovation', 'Competition']
              },
              {
                title: 'Robotics & Automation Expo',
                date: 'April 18, 2025',
                location: 'Central Engineering Complex',
                description: 'Showcase of cutting-edge robotics systems and autonomous technologies',
                delay: 450,
                tags: ['Robotics', 'AI', 'Automation']
              }
            ].map((event, index) => (
              <div 
                key={index} 
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-sm overflow-hidden hover:shadow-lg hover:shadow-amber-500/10 group transition-all transform translate-y-20 opacity-0 animate-fade-in-up observer-element"
                style={{animationDelay: `${event.delay}ms`}}
              >
                {/* Top gradient line */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-sky-500"></div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{event.title}</h3>
                    
                    {/* Futuristic date badge */}
                    <div className="px-3 py-1 bg-gray-800 rounded-sm border border-gray-700 text-xs text-gray-400 font-mono">
                      {event.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4 text-gray-400">
                    <svg className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300">{event.description}</p>
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-sm border border-gray-700 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href="#register" 
                    className="inline-block px-4 py-2 bg-gray-800 text-amber-500 font-medium rounded-sm hover:bg-amber-500 hover:text-white transition-colors group/btn w-full text-center"
                  >
                    <span className="flex items-center justify-center">
                      <span>Register Now</span>
                      <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transform translate-x-0 group-hover/btn:translate-x-1 transition-all" />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-600 observer-element">
            <a 
              href="#all-events"
              className="inline-flex items-center text-amber-500 font-medium hover:text-amber-400 transition-colors group"
            >
              <span className="relative">
                View all upcoming events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </span>
              <ArrowRight className="ml-2 w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        id="join-us"
        className="py-24 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-sky-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_25%)]"></div>
        
        {/* Tech lines animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-scan"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-scan animation-delay-1000"></div>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent animate-scan-vertical"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sky-500 to-transparent animate-scan-vertical animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto p-12 backdrop-blur-lg bg-gray-900/40 rounded-sm border border-gray-800 shadow-2xl transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
            {/* Animated gradient text */}
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500 animate-gradient-x">
                Engineer Your Future
              </span>
            </h2>
            
            <p className="text-gray-300 text-xl mb-10 text-center leading-relaxed">
              Join the Society of Engineering Students at JKUAT and be part of a community 
              that's creating the technologies of tomorrow, today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="#membership-form"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all transform hover:translate-y-[-2px] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Apply for Membership
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              </a>
              
              <a 
                href="#learn-more"
                className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white font-semibold rounded-sm hover:border-amber-500 transition-colors group"
              >
                <span className="flex items-center justify-center">
                  Learn About Benefits
                  <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Members Section */}
      <section 
        id="members" 
        ref={(el) => registerSection('members', el)}
        className="py-24 bg-gray-950 relative overflow-hidden"
      >
        {/* Background effect */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 overflow-hidden">
            <div className="transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
              <span className="text-amber-500 font-medium inline-block mb-3">THE INNOVATORS</span>
              <h2 className="text-4xl font-bold text-white mb-6">Meet Our Members</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The brilliant minds behind our innovative projects, pushing the boundaries of what's possible in engineering.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Kamau",
                role: "Quantum Computing Lead",
                image: "/student1.jpg",
                quote: "We're not just learning engineering; we're reinventing it for the future.",
                delay: 150
              },
              {
                name: "Mercy Wanjiru",
                role: "AI & Neural Networks",
                image: "/student2.jpg",
                quote: "SES creates a space where imagination meets technical expertise to solve real-world problems.",
                delay: 300
              },
              {
                name: "Ibrahim Omar",
                role: "Smart Infrastructure Design",
                image: "/student3.jpg",
                quote: "The collaborative environment at SES helped me develop technologies I never thought possible as a student.",
                delay: 450
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="group relative transform translate-y-20 opacity-0 animate-fade-in-up observer-element"
                style={{animationDelay: `${member.delay}ms`}}
              >
                <div className="h-96 relative overflow-hidden rounded-sm border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
                  {/* Static overlay */}
                  <div className="absolute inset-0 bg-noise-pattern opacity-30 mix-blend-overlay z-10"></div>
                  
                  {/* Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="/api/placeholder/600/800" 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-20"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    {/* Tech readout */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div>
                        <p className="text-xs font-mono text-amber-500">MEMBER PROFILE</p>
                      </div>
                      <p className="text-xs font-mono text-gray-500">{`ID.${index + 100}`}</p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-amber-500 text-sm mb-4">{member.role}</p>
                    
                    <blockquote className="text-gray-400 italic text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      "{member.quote}"
                    </blockquote>
                    
                    {/* Social links */}
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {['github', 'linkedin', 'twitter'].map((social) => (
                        <a 
                          key={social} 
                          href={`#${social}-${index}`} 
                          className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors"
                          aria-label={`${member.name}'s ${social}`}
                        >
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {social === 'github' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>}
                            {social === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>}
                            {social === 'linkedin' && <rect x="2" y="9" width="4" height="12"></rect>}
                            {social === 'linkedin' && <circle cx="4" cy="4" r="2"></circle>}
                            {social === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>}
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-600 observer-element">
            <a 
              href="#all-members"
              className="inline-block px-8 py-4 bg-gray-900/40 backdrop-blur-sm text-white font-medium rounded-sm border border-gray-800 hover:border-amber-500 transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Meet All Members
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        id="contact" 
        ref={(el) => registerSection('contact', el)}
        className="py-24 relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/10 to-amber-900/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left side content */}
            <div className="md:w-1/2 transform translate-y-20 opacity-0 animate-fade-in-up observer-element">
              <div className="flex items-center mb-3">
                <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-sky-500 mr-4"></div>
                <p className="text-amber-500 font-medium text-sm">CONNECT WITH US</p>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
              
              <p className="text-gray-400 mb-10 leading-relaxed">
                Have questions about the Society of Engineering Students or interested in collaborating on a project?
                Our team is ready to answer your queries and explore innovative partnerships.
              </p>
              
              <div className="space-y-8">
                {[
                  {
                    icon: <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>,
                    title: 'Innovation Hub',
                    content: <>
                      Engineering Students Center<br />
                      School of Engineering, JKUAT<br />
                      Juja, Kenya
                    </>
                  },
                  {
                    icon: <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>,
                    title: 'Digital Communications',
                    content: <span className="font-mono text-amber-500/80">ses@students.jkuat.ac.ke</span>
                  },
                  {
                    icon: <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>,
                    title: 'Direct Line',
                    content: <span className="font-mono">+254 711 123 456</span>
                  },
                  {
                    icon: <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>,
                    title: 'Office Hours',
                    content: <>
                      Monday - Friday<br />
                      <span className="font-mono text-amber-500/80">09:00 - 17:00</span>
                    </>
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start group hover:bg-gray-900/30 p-4 rounded-sm transition-colors">
                    <div className="mr-4 p-3 bg-gray-800 rounded-sm group-hover:bg-amber-500/20 border border-gray-700 group-hover:border-amber-500/50 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social links */}
              <div className="mt-12">
                <p className="text-white font-medium mb-4">Connect with us</p>
                <div className="flex space-x-4">
                  {[
                    { name: 'github', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> },
                    { name: 'twitter', icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
                    { name: 'instagram', icon: <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 19.5h9a2 2 0 002-2v-9a2 2 0 00-2-2h-9a2 2 0 00-2 2v9a2 2 0 002 2z" /> },
                    { name: 'linkedin', icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" /> }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href={`#${social.name}`}
                      className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors shadow-sm group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - contact form */}
            <div className="md:w-1/2 transform translate-y-20 opacity-0 animate-fade-in-up animation-delay-300 observer-element">
              <form className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-sm border border-gray-800 shadow-lg relative overflow-hidden">
                {/* Tech overlay */}
                <div className="absolute inset-0 bg-noise-pattern opacity-30 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-sky-500"></div>
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                    <select 
                      id="subject" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
                    >
                      <option value="" className="bg-gray-800">Select a subject</option>
                      <option value="membership" className="bg-gray-800">Membership Inquiry</option>
                      <option value="projects" className="bg-gray-800">Project Collaboration</option>
                      <option value="events" className="bg-gray-800">Event Information</option>
                      <option value="sponsorship" className="bg-gray-800">Partnership Opportunities</option>
                      <option value="other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex justify-center items-center group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                    <span className="relative z-10 flex items-center">
                      <span>Send Message</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center mb-5">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">SES</span>
                <span className="h-8 w-0.5 bg-amber-500 mx-3"></span>
                <span className="text-sm text-gray-500">JKUAT</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering the next generation of engineers through innovation, 
                collaboration, and future-focused technologies at Jomo Kenyatta 
                University of Agriculture and Technology.
              </p>
              
              <div className="flex space-x-4">
                {[
                  { name: 'facebook', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
                  { name: 'twitter', icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
                  { name: 'instagram', icon: <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 19.5h9a2 2 0 002-2v-9a2 2 0 00-2-2h-9a2 2 0 00-2 2v9a2 2 0 002 2z" /> },
                  { name: 'linkedin', icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" /> }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href={`#${social.name}`}
                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors shadow-sm group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">Navigation</h3>
              <ul className="space-y-3">
                {navItems.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.link} 
                      className="text-gray-400 hover:text-amber-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 mr-0 group-hover:mr-2 transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">Future Tech</h3>
              <ul className="space-y-3">
                {[
                  'Quantum Computing',
                  'Neural Interfaces',
                  'Nanomaterials',
                  'Fusion Energy',
                  'Autonomous Systems',
                  'Biotechnology'
                ].map((program, index) => (
                  <li key={index}>
                    <a 
                      href={`#${program.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-amber-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-amber-500 mr-0 group-hover:mr-2 transition-all"></span>
                      {program}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sky-500">Stay Connected</h3>
              <p className="text-gray-400 mb-5">
                Subscribe to our newsletter for the latest innovations, events, and engineering breakthroughs.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700"
                  />
                  <div className="absolute right-3 top-3 w-2 h-2 bg-amber-500 animate-pulse rounded-full"></div>
                </div>
                <button 
                  type="submit" 
                  className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-sm hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center group"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Society of Engineering Students - JKUAT. <span className="text-amber-500">Innovating the Future.</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Utility CSS classes for animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5%, 5%) scale(1.1); }
          50% { transform: translate(0, 10%) scale(1); }
          75% { transform: translate(-5%, 5%) scale(0.9); }
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes equalizer {
          0%, 100% { height: 5px; }
          50% { height: 15px; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        
        .animate-scan {
          animation: scan 3s infinite linear;
        }
        
        .animate-scan-vertical {
          animation: scan-vertical 3s infinite linear;
        }
        
        .animate-equalizer {
          animation: equalizer 1s infinite ease-in-out;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s infinite linear;
          background-size: 200% 200%;
        }
        
        .animate-slide-up {
          animation: slide-up 0.7s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-450 {
          animation-delay: 450ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
        
        .bg-noise-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        /* Complete the circuit pattern SVG path */
.bg-circuit-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%23ffffff' fill-opacity='0.4' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 0 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1a5 5 0 0 1-9.8 0h2.07a3 3 0 0 0 5.66 0h2.07zM142.1 0H143v16h-1v-16zm25.8 0h2.91v16h-2.91v-16zM320 0h1.31v16H320v-16zm-1.61 16h-2.09v-16h2.09v16zm1.61 48h-1v-32h1v32zm-25.69 16c-.92 0-1.78-.19-2.57-.58l.58-1.92c.55.28 1.13.43 1.73.43H305v-2.02c0-1.21-.96-2.02-2.13-2.02h-1.04v-2.01h1.04c1.76 0 3.03-.52 3.97-1.6l1.59 1.24c-.89 1.14-1.98 1.9-3.27 2.3.45.74.69 1.63.69 2.69v.4zm-23.89 0h-8.92v-16h6.93c1.86 0 3.69.5 5.12 1.57l-1.07 1.74c-1.11-.78-2.45-1.19-3.85-1.19h-3.01v10.76h5.14c1 0 1.95-.22 2.83-.66l.88 1.82c-1.19.5-2.43.76-3.71.76h-8.26v-11.73h6.21c.15 0 .3.01.46.02l.59.06-.09 2.12c-.13-.01-.26-.02-.38-.02h-2.67v5.43h3.01c.24 0 .47-.03.7-.08z'/%3E%3C/svg%3E");
}

.bg-scan-line {
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.05) 2px,
    rgba(255, 255, 255, 0.05) 4px
  );
}

.observer-element {
  opacity: 0;
  transform: translateY(20px);
}
      `}</style>
    </div>
  );
};

export default FuturisticHomePage;