import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ChatBot from './components/ChatBot'
import Philosophy from './components/Philosophy'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CircuitBackground from './components/CircuitBackground'

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Accessible skip link */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-biotech-blue focus:text-white focus:rounded-lg focus:font-medium focus:outline-none"
      >
        Skip to projects
      </a>

      {/* Animated circuit background */}
      <CircuitBackground />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Philosophy />
        <ChatBot />
        <Footer />
      </div>
    </div>
  )
}

export default App
