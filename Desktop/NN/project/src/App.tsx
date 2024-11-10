import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, Menu, X } from 'lucide-react';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = ['about', 'experience', 'skills', 'projects', 'contact'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-800">
      <nav className="fixed top-0 left-0 right-0 bg-blue-200/80 dark:bg-blue-900/80 backdrop-blur-md z-50 border-b border-blue-300 dark:border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-900 dark:text-white">Nurhussein Ahmed</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`${
                    activeSection === section
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500'
                  } capitalize transition-colors duration-200`}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-100 dark:bg-blue-900">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`${
                    activeSection === section
                      ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                      : 'text-blue-600 dark:text-blue-300'
                  } block px-3 py-2 rounded-md text-base font-medium w-full text-left capitalize hover:bg-blue-200 dark:hover:bg-blue-800`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-4">Nurhussein Ahmed</h1>
            <p className="text-xl text-blue-700 dark:text-blue-300 mb-8">Full Stack Developer</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="mailto:nurhussein2003@yahoo.com"
                className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white"
              >
                <Mail size={24} />
              </a>
              <a
                href="/resume.pdf"
                className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full shadow-lg overflow-hidden">
              {/* الإطار المتوهج المتحرك */}
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 opacity-70"></div>
              {/* الإطار الخلفي المتدرج */}
              <div className="absolute inset-1 bg-white rounded-full"></div>
              {/* صورة البروفايل */}
              <img
                src="https://i.imgur.com/9Uq4djY.png"
                alt="Nurhussein Ahmed"
                className="relative w-full h-full rounded-full border-4 border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          {activeSection === 'about' && <About />}
          {activeSection === 'experience' && <Experience />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'contact' && <Contact />}
        </div>
      </main>

      <footer className="bg-blue-200 dark:bg-blue-900 border-t border-blue-300 dark:border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-blue-700 dark:text-blue-300">
            © {new Date().getFullYear()} Nurhussein Ahmed. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
