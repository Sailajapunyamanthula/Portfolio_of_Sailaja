import { About } from './components/sections/About';
import { Achievements } from './components/sections/Achievements';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/sections/Navbar';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { BackToTop } from './components/ui/BackToTop';
import { Toaster } from './components/ui/Toaster';
import { Background } from './components/visual/Background';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Background />
      <div className="relative z-10">
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Certifications />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
      <BackToTop />
      <Toaster />
    </>
  );
}
