import React, { useState, useEffect, useRef } from 'react';
import profilePic from './assets/profile.jpg';
import './index.css';

const App = () => {
  const [showCerts, setShowCerts] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mainRef.current) return;
      if (e.key === 'ArrowRight') {
        mainRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        mainRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-sky-900 text-white font-['Poppins'] overflow-hidden">
      <main
        ref={mainRef}
        className="w-screen h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth"
      >

        {/* 🔹 Bio Slide */}
<section className="min-w-full h-full snap-start flex flex-col justify-center items-center text-center px-4 py-8 sm:px-6 bg-sky-900">
  <div className="relative group mb-6">
    <img
      src={profilePic}
      alt="Saikrishna Badiger"
      className="w-40 sm:w-48 h-52 sm:h-60 object-cover rounded-xl shadow-2xl border-4 border-blue-400 group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text drop-shadow-lg">
    Saikrishna Badiger
  </h1>
  <p className="text-base sm:text-xl mt-2 sm:mt-3 text-blue-200">Aspiring Data Analyst | Cloud | DevOps | Web</p>
  <p className="mt-3 text-xs sm:text-sm text-blue-300 animate-pulse">👉 Swipe or use ⬅️➡️ keys</p>

  <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-medium">
    <a href="mailto:vishwakarmasaikrishna@gmail.com" className="text-blue-300 hover:underline">Email</a>
    <a href="https://github.com/sai-krishna26" className="text-blue-300 hover:underline" target="_blank" rel="noreferrer">GitHub</a>
    <a href="https://linkedin.com/in/saikrishna-badiger-063a9a314" className="text-blue-300 hover:underline" target="_blank" rel="noreferrer">LinkedIn</a>
  </div>

  <a
    href="/resume.pdf"
    download
    className="mt-5 inline-block bg-blue-400 hover:bg-blue-500 text-black font-semibold px-6 py-2 rounded shadow transition text-sm sm:text-base"
  >
    📄 Download Resume
  </a>
</section>


        {/* 🔹 About */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-sky-900">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-semibold border-b border-blue-300 pb-1 mb-4 text-blue-300">About Me</h2>
            <p className="leading-relaxed">
              I'm a Computer Science student at Adichunchanagiri Institute of Technology (2022–2026),
              with strong foundations in programming, web development, and DevOps.
              I love building impactful software and learning through real-world projects.
            </p>
          </div>
        </section>

        {/* 🔹 Skills */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-sky-900">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold border-b border-blue-300 pb-1 mb-4 text-blue-300">Skills</h2>
           <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-disc list-inside text-blue-100 text-sm sm:text-base">
            
              <li>Java, Python, C++, C</li>
              <li>DSA</li>
              <li>HTML, CSS, JavaScript</li>
              <li>MySQL</li>
              <li>OpenStack, GCP</li>
              <li>GitHub, Linux</li>
              <li>VS Code, LaTeX</li>
            </ul>
          </div>
        </section>

        {/* 🔹 Projects */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-sky-900">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold border-b border-blue-300 pb-1 mb-4 text-blue-300">Projects</h2>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-blue-200">🧠 Brain Tumor Classification</h3>
              <p>A ResNet50-based model classifying MRI images into Glioma, Meningioma, Pituitary, and No Tumor.</p>
              <p className="text-sm text-blue-300">Python, TensorFlow, OpenCV</p>
              <a href="https://github.com/sai-krishna26" target="_blank" rel="noreferrer" className="text-white underline text-sm">GitHub</a>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-blue-200">🏡 Homestay Management System</h3>
              <p>Eco-friendly homestay booking system.</p>
              <p className="text-sm text-blue-300">HTML, CSS, JS, MySQL (XAMPP)</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-200">📚 Quiz Web Application</h3>
              <p>Quiz platform with learning and part-time job features.</p>
              <p className="text-sm text-blue-300">HTML, CSS, JavaScript, Python (Django)</p>
            </div>
          </div>
        </section>

        {/* 🔹 Certifications */}
        <section className="min-w-full h-full snap-start flex flex-col justify-center p-10 bg-sky-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold border-b border-blue-300 pb-1 mb-4 text-blue-300">Certifications</h2>
            <ul className="list-disc ml-5 mb-4 text-blue-100">
              <li>Programming in Java Certification by NPTEL - 2025</li>
              <li>Machine Learning, ML Certification by NPTEL – 2025</li>
              <li>Frontend Developer Certification – Great Learning – 2024</li>
              <li>Hackathon Participation – 2024–2025</li>
              <li>IEEE Conference Volunteer Certificate – 2024</li>
            </ul>
            <button
              onClick={() => setShowCerts(!showCerts)}
              className="bg-blue-400 hover:bg-blue-500 text-black px-4 py-2 rounded shadow transition"
            >
              {showCerts ? "Hide Certificates" : "See Certificates"}
            </button>

            {showCerts && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[55vh] overflow-y-auto pb-4">
                <img src="/certifications/ieee-volunteer.jpg" alt="IEEE Volunteer" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
                <img src="/certifications/nptel-java.jpg" alt="NPTEL Java" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
                <img src="/certifications/nptel-ml.jpg" alt="NPTEL ML" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
                <img src="/certifications/hackathon-ait.jpg" alt="Hackathon AIT" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
                <img src="/certifications/hackathon-team-vortex.jpg" alt="Hackathon Team Vortex" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
                <img src="/certifications/frontend-css.jpg" alt="Frontend CSS" className="rounded shadow-md w-full h-64 object-contain bg-white p-2" />
              </div>
            )}
          </div>
        </section>

        {/* 🔹 Contact */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-sky-900">
          <div className="text-center">
            <h2 className="text-3xl font-semibold border-b border-blue-300 pb-1 mb-4 text-blue-300">Contact</h2>
            <p>📧 Email: <a className="underline text-white" href="mailto:vishwakarmasaikrishna@gmail.com">vishwakarmasaikrishna@gmail.com</a></p>
            <p>🔗 GitHub: <a className="underline text-white" href="https://github.com/sai-krishna26">github.com/sai-krishna26</a></p>
            <p>🔗 LinkedIn: <a className="underline text-white" href="https://linkedin.com/in/saikrishna-badiger-063a9a314">linkedin.com/in/saikrishna-badiger-063a9a314</a></p>
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-blue-300 mt-6">
        &copy; 2025 Saikrishna Badiger. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
