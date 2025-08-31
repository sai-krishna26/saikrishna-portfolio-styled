import React, { useState, useEffect, useRef } from 'react';
import profilePic from './assets/port profile.jpg';
import './index.css';

const App = () => {
  const [showCerts, setShowCerts] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello there! 👋 I'm your friendly AI assistant for Saikrishna's portfolio. Feel free to say hi, ask me anything about his skills, projects, experience, or just have a casual chat! 😊", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
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

  // Chat functionality
  const processUserQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // General greetings and casual conversation
    if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey') || lowerQuery.includes('hlo') || lowerQuery.includes('hii')) {
      const greetings = [
        "Hello there! 👋 How can I help you today?",
        "Hi! 😊 Great to see you! What would you like to know about Saikrishna?",
        "Hey! 👋 Welcome to Saikrishna's portfolio! How can I assist you?",
        "Hello! 🌟 Nice to meet you! Feel free to ask me anything about Saikrishna's work and experience."
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (lowerQuery.includes('good morning') || lowerQuery.includes('good afternoon') || lowerQuery.includes('good evening') || lowerQuery.includes('good night')) {
      const timeGreetings = [
        "Good morning! ☀️ Hope you're having a wonderful day! How can I help you?",
        "Good afternoon! 🌤️ Thanks for stopping by! What would you like to know?",
        "Good evening! 🌙 Great to see you here! How can I assist you today?",
        "Good night! 🌙 Sweet dreams! Feel free to ask me anything about Saikrishna's portfolio."
      ];
      return timeGreetings[Math.floor(Math.random() * greetings.length)];
    }
    
    if (lowerQuery.includes('how are you') || lowerQuery.includes('how r u') || lowerQuery.includes('how do you do')) {
      return "I'm doing great, thank you! 😊 I'm excited to help you learn more about Saikrishna's amazing portfolio. What interests you most?";
    }
    
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks') || lowerQuery.includes('thx')) {
      return "You're very welcome! 😊 I'm here to help. Is there anything else you'd like to know about Saikrishna?";
    }
    
    if (lowerQuery.includes('bye') || lowerQuery.includes('goodbye') || lowerQuery.includes('see you') || lowerQuery.includes('take care')) {
      return "Goodbye! 👋 It was great chatting with you! Feel free to come back anytime if you have more questions about Saikrishna's portfolio. Have a wonderful day! ✨";
    }
    
    if (lowerQuery.includes('who are you') || lowerQuery.includes('what are you') || lowerQuery.includes('tell me about yourself')) {
      return "I'm Saikrishna's AI Portfolio Assistant! 🤖✨ I'm here to help visitors learn about his skills, projects, experience, and help them connect with him. I'm knowledgeable about everything in his portfolio and love having conversations!";
    }
    
    if (lowerQuery.includes('nice') || lowerQuery.includes('cool') || lowerQuery.includes('awesome') || lowerQuery.includes('amazing')) {
      return "Thank you! 😊 I'm glad you think so! Saikrishna has put a lot of effort into creating this portfolio. Is there something specific you'd like to explore?";
    }
    
    // Portfolio-specific queries
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming')) {
      return "Saikrishna has strong skills in Java, Python, C++, HTML/CSS/JavaScript, MySQL, OpenStack, GCP, GitHub, Linux, and VS Code. He's particularly interested in Cloud, DevOps, and Machine Learning! 🚀";
    }
    
    if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      return "Saikrishna has worked on several exciting projects: 1) 🧠 Brain Tumor Classification using ResNet50 (in progress), 2) 🏡 Homestay Management System (completed), and 3) 📚 Quiz Web Application with Django (completed). All projects are available on his GitHub!";
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('background')) {
      return "Saikrishna is a passionate Computer Science student (2022-2026) at Adichunchanagiri Institute of Technology. He has experience in hackathons, IEEE conference volunteering, and has earned certifications in Java, Machine Learning, and Frontend Development. Quite impressive, right? 😊";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin')) {
      return "You can contact Saikrishna at vishwakarmasaikrishna@gmail.com, connect on LinkedIn (linkedin.com/in/saikrishna-badiger-063a9a314), or check out his GitHub (github.com/sai-krishna26). He's always open to opportunities and meaningful conversations! 📧";
    }
    
    if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
      return "Saikrishna's resume is available for download on his portfolio! 📄 Click the 'Download Resume' button to get his latest CV with all his skills, projects, and experience. It's quite comprehensive!";
    }
    
    // Default response for unrecognized queries
    const defaultResponses = [
      "That's an interesting question! 🤔 While I'm primarily designed to help with Saikrishna's portfolio, I'd be happy to chat about his skills, projects, experience, or help you connect with him. What would you like to know?",
      "I'm not quite sure about that, but I'd love to tell you about Saikrishna's amazing work! 😊 You can ask me about his skills, projects, experience, or how to contact him.",
      "Interesting! 🤔 I'm here to help you learn about Saikrishna's portfolio. Feel free to ask about his skills, projects, experience, or contact information!",
      "That's a great question! 🌟 While I'm focused on helping with Saikrishna's portfolio, I'd be happy to chat about his work, skills, or help you connect with him. What interests you most?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = { id: Date.now(), text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = processUserQuery(inputMessage);
      const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Navigation functions
  const scrollToSection = (sectionIndex) => {
    if (mainRef.current) {
      const sectionWidth = window.innerWidth;
      mainRef.current.scrollTo({
        left: sectionWidth * sectionIndex,
        behavior: 'smooth'
      });
      setCurrentSection(sectionIndex);
    }
  };

  const handleScroll = () => {
    if (mainRef.current) {
      const scrollLeft = mainRef.current.scrollLeft;
      const sectionWidth = window.innerWidth;
      const currentIndex = Math.round(scrollLeft / sectionWidth);
      setCurrentSection(currentIndex);
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', handleScroll);
      return () => mainRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins'] overflow-hidden">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">SB</span>
              </div>
              <span className="text-yellow-400 font-bold text-lg">Saikrishna Badiger</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['Bio', 'About', 'Skills', 'Projects', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(index)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-yellow-400 ${
                    currentSection === index ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Table of Contents Button */}
            <button
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              className="md:hidden bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-3 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-amber-700 transition-all duration-300"
            >
              ☰ Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Section Indicators (Progress Bar) */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {['Bio', 'About', 'Skills', 'Projects', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(index)}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-600' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                title={`Go to ${section}`}
              />
            ))}
          </div>
        </div>
      </div>

      <main
        ref={mainRef}
        className="w-screen h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth pt-16"
      >
        {/* 🔹 Bio Slide */}
        <section className="min-w-full h-full snap-start flex items-center px-4 py-8 sm:px-6 bg-black">
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Modern Profile Display */}
            <div className="order-1 flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                <div className="relative">
          <img
            src={profilePic}
            alt="Saikrishna Badiger"
                    className="w-72 sm:w-96 h-72 sm:h-96 object-cover rounded-3xl shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-yellow-400/50"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Profile & Info */}
            <div className="space-y-6 order-2">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Saikrishna Badiger
          </h1>
                <p className="text-lg sm:text-xl text-gray-200 italic">
            "Turning data into decisions | Code into creations"
          </p>
                <p className="text-xl sm:text-2xl text-gray-200 font-medium">
                  Aspiring Data Analyst | Cloud | DevOps | Web
                </p>
              </div>

              <div className="space-y-4">
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold px-6 py-3 rounded-xl text-base shadow-lg hover:shadow-yellow-400/70 transition-all duration-300 transform hover:scale-105">
            🚀 Open to Work & Internships
          </span>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=vishwakarmasaikrishna@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Saikrishna,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0D%0A%0D%0ABest%20regards,"
  target="_blank"
  rel="noreferrer"
  className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 hover:underline flex items-center gap-2 cursor-pointer"
>
  📧 Email
</a>


  <a
    href="https://github.com/sai-krishna26"
    className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 hover:underline flex items-center gap-2"
    target="_blank"
    rel="noreferrer"
  >
    🐙 GitHub
  </a>
  <a
    href="https://linkedin.com/in/saikrishna-badiger-063a9a314"
    className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 hover:underline flex items-center gap-2"
    target="_blank"
    rel="noreferrer"
  >
    💼 LinkedIn
  </a>
</div>



                <p className="text-sm text-gray-400 italic max-w-md">
                  📩 Click on the Email button to connect directly — I'm always open to opportunities and meaningful conversations!
                </p>
                <p className="text-sm text-gray-400 italic max-w-md">
                  📄 Choose to view my resume online or download it for offline review!
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`${process.env.PUBLIC_URL}/SKB resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/70 transition-all duration-300 transform hover:scale-105 text-base"
                  >
                    👁️ View Resume
                  </a>
          <a
            href={`${process.env.PUBLIC_URL}/SKB resume.pdf`}
            download
                    className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/70 transition-all duration-300 transform hover:scale-105 text-base"
          >
                    📥 Download Resume
          </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🔹 About Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
          <div className="max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-semibold border-b border-yellow-400 pb-2 mb-6 bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">About Me</h2>
      
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              I'm a passionate Computer Science student (2022–2026) at Adichunchanagiri Institute of Technology with strong foundations in Java, Python, Data Structures, and Web Development.
            </p>
      
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              I enjoy building real-world software, solving complex problems, and constantly learning new tools — especially in the fields of <span className="text-yellow-400 font-medium">Cloud</span>, <span className="text-yellow-400 font-medium">DevOps</span>, and <span className="text-yellow-400 font-medium">Machine Learning</span>.
            </p>
      
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              I'm seeking exciting opportunities where I can grow as a <span className="text-yellow-400 font-medium">Data Analyst or Software Developer</span>, contribute to impactful projects, and collaborate in dynamic teams.
            </p>

            <p className="text-yellow-400 italic text-sm sm:text-base">
            What sets me apart is my curiosity-driven learning and hands-on experience building end-to-end projects.
          </p>
          </div>
        </section>


        {/* 🔹 Skills Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
  <div className="max-w-4xl w-full">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-8 text-center">Skills</h2>

    {/* Technical Skills */}
    <div className="mb-8">
              <h3 className="text-xl text-yellow-400 mb-4">Technical Skills</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-200 text-sm sm:text-base">
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Java, Python, C++, C</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">DSA</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">HTML, CSS, JavaScript</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">MySQL</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">OpenStack, GCP</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">GitHub, Linux</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">VS Code, LaTeX</li>
      </ul>
    </div>

    {/* Soft Skills */}
    <div>
              <h3 className="text-xl text-yellow-400 mb-4">Soft Skills</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-200 text-sm sm:text-base">
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Communication</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Teamwork</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Problem-Solving</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Adaptability</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Time Management</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Presentation Skills</li>
      </ul>
    </div>
  </div>
</section>


        {/* 🔹 Projects Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">Projects</h2>
            <div className="space-y-6">
              <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">🧠 Brain Tumor Classification</h3>
                <p className="text-gray-200 mb-2">ResNet50-based classification of MRI images.</p>
                <p className="text-sm text-yellow-400 mb-2">Python, TensorFlow, OpenCV</p>
                <a href="https://github.com/sai-krishna26" target="_blank" rel="noreferrer" className="text-amber-500 underline text-sm hover:text-amber-400 transition-colors">GitHub</a>
                <p className="text-sm text-yellow-400 mt-2">📌 Status: In Progress</p>
            </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">🏡 Homestay Management System</h3>
                <p className="text-gray-200 mb-2">Eco-friendly homestay booking system.</p>
                <p className="text-sm text-yellow-400 mb-2">HTML, CSS, JS, MySQL (XAMPP)</p>
                <p className="text-sm text-green-400 mt-2">📌 Status: Completed</p>
            </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">📚 Quiz Web Application</h3>
                <p className="text-gray-200 mb-2">Quiz platform with learning and part-time job features.</p>
                <p className="text-sm text-yellow-400 mb-2">HTML, CSS, JavaScript, Python (Django)</p>
                <p className="text-sm text-green-400 mt-2">📌 Status: Completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🔹 Certifications Slide */}
        <section className="min-w-full h-full snap-start flex flex-col justify-center p-10 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">Certifications</h2>
            <ul className="list-disc ml-5 mb-6 text-gray-200 space-y-2">
              <li>Programming in Java Certification by NPTEL - 2025</li>
              <li>Machine Learning Certification by NPTEL – 2025</li>
              <li>Frontend Developer Certification – Great Learning – 2024</li>
              <li>Hackathon Participation – 2024–2025</li>
              <li>IEEE Conference Volunteer Certificate – 2024</li>
            </ul>
            <button
              onClick={() => setShowCerts(!showCerts)}
              className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/70 transition-all duration-300 transform hover:scale-105"
            >
              {showCerts ? "Hide Certificates" : "See Certificates"}
            </button>

            {showCerts && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[55vh] overflow-y-auto pb-4">
                {[
                  'ieee-volunteer.jpg',
                  'nptel-java.jpg',
                  'nptel-ml.jpg',
                  'hackathon-ait.jpg',
                  'hackathon-team-vortex.jpg',
                  'frontend-css.jpg'
                ].map((img, i) => (
                  <img
                    key={i}
                    src={`${process.env.PUBLIC_URL}/certifications/${img}`}
                    alt={`Certificate ${i + 1}`}
                    onClick={() => setZoomImage(`${process.env.PUBLIC_URL}/certifications/${img}`)}
                    className="cursor-zoom-in rounded-xl shadow-lg w-full h-64 object-contain bg-neutral-900 p-4 border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 🔹 Contact Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
  <div className="text-center">
    <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">
      Contact
    </h2>
    <div className="space-y-4">
      
      <p className="text-gray-200">
        📧 Email:{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=vishwakarmasaikrishna@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Saikrishna,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0D%0A%0D%0ABest%20regards,"
          target="_blank"
          rel="noreferrer"
          className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 underline"
        >
          vishwakarmasaikrishna@gmail.com
        </a>
      </p>

      <p className="text-gray-200">
        🔗 GitHub:{" "}
        <a
          className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 underline"
          href="https://github.com/sai-krishna26"
        >
          github.com/sai-krishna26
        </a>
      </p>

      <p className="text-gray-200">
        🔗 LinkedIn:{" "}
        <a
          className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 underline"
          href="https://linkedin.com/in/saikrishna-badiger-063a9a314"
        >
          linkedin.com/in/saikrishna-badiger-063a9a314
        </a>
      </p>
    </div>
  </div>
</section>

    
        {/* achievements section */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-8">Achievements</h2>
            <ul className="list-disc text-left text-gray-200 space-y-4 px-6 sm:px-10 text-sm sm:text-base">
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🏆 Successfully built and presented a deep learning project on <strong className="text-yellow-400">Brain Tumor Classification using ResNet50</strong> as part of final year academic work.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🧠 Participated in inter-college <strong className="text-yellow-400">Hackathons</strong> and contributed to innovative project ideas and team collaboration.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🤝 Volunteered at <strong className="text-yellow-400">IEEE International Conference 2024</strong>, assisting with event coordination and tech support.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                📜 Earned certifications in <strong className="text-yellow-400">Java, Machine Learning, and Frontend Development</strong> from NPTEL and Great Learning.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🌐 Developed and deployed a <strong className="text-yellow-400">portfolio website</strong> showcasing skills, projects, and certifications using React and GitHub Pages.
            </li>
          </ul>
          </div>
        </section>

</main>

      {/* 🔍 Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoomed Certificate"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-yellow-400"
          />
        </div>
      )}

      {/* 🚀 Quick Jump Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex space-x-2">
        <button
          onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 disabled:from-gray-500 disabled:to-gray-600 text-black w-12 h-12 rounded-full shadow-lg hover:shadow-yellow-400/70 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:scale-100"
          title="Previous Section"
        >
          ←
        </button>
        <button
          onClick={() => scrollToSection(Math.min(6, currentSection + 1))}
          disabled={currentSection === 6}
          className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 disabled:from-gray-500 disabled:to-gray-600 text-black w-12 h-12 rounded-full shadow-lg hover:shadow-yellow-400/70 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed disabled:scale-100"
          title="Next Section"
        >
          →
        </button>
      </div>

      {/* 💬 Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black w-16 h-16 rounded-full shadow-lg hover:shadow-yellow-400/70 flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/20"
          title="Chat with Portfolio AI Assistant"
        >
          <div className="flex flex-col items-center space-y-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span className="text-xs font-bold">CHAT</span>
          </div>
        </button>
      </div>

      {/* 📚 Table of Contents Overlay */}
      {showTableOfContents && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-neutral-900 border border-yellow-500/50 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                📚 Table of Contents
              </h3>
              <button
                onClick={() => setShowTableOfContents(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {['Bio', 'About', 'Skills', 'Projects', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(index);
                    setShowTableOfContents(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    currentSection === index
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-medium'
                      : 'bg-neutral-800 text-gray-200 hover:bg-neutral-700 hover:text-yellow-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{section}</span>
                    {currentSection === index && <span>📍</span>}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-yellow-500/30 text-center text-sm text-gray-400">
              💡 Tip: Use arrow keys or swipe to navigate
            </div>
          </div>
        </div>
      )}

      {/* 💬 Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-neutral-900 border border-yellow-500/50 rounded-xl shadow-2xl z-50 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black p-3 rounded-t-xl font-bold flex justify-between items-center">
            <span>💬 Portfolio AI Assistant</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-black hover:text-gray-800 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-neutral-800 text-gray-200 border border-yellow-500/30'
                      : 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 text-gray-200 p-3 rounded-lg border border-yellow-500/30">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="p-3 border-t border-yellow-500/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Saikrishna's portfolio..."
                className="flex-1 bg-neutral-800 text-white border border-yellow-500/30 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500/60"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 disabled:from-gray-500 disabled:to-gray-600 text-black px-4 py-2 rounded-lg font-bold transition-all duration-300 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-sm text-gray-400 mt-6">
        &copy; 2025 Saikrishna Badiger. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
