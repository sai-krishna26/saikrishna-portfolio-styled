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
      return "Saikrishna has strong skills in Core Java, Python, C, OOP concepts, Collections Framework, HTML/CSS/JavaScript, Django, Flask, React, MySQL, MongoDB, Git, GitHub, and AWS basics. He's particularly interested in Full-Stack Development, Machine Learning, and Cloud Computing! 🚀";
    }
    
    if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      return "Saikrishna has worked on several exciting projects: 1) 🤖 AI-Powered Resume Screening System (Flask, MongoDB, React, NLP), 2) 🧠 Abnormal Brain Tumor Classification using ResNet50 (Python, TensorFlow), and 3) 🏡 Homestay Management System (HTML, CSS, JavaScript, MySQL). All projects are available on his GitHub!";
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('internship') || lowerQuery.includes('background')) {
      return "Saikrishna is currently working as a Java Full Stack Intern at X-workz, Bengaluru (Feb 2026 – Present). He's a Computer Science student (2022-2026) at Adichunchanagiri Institute of Technology with CGPA 8.44. He has experience coordinating HACKABHiGNA 2025 hackathon, volunteering at IEEE conferences, and has earned certifications in Java (Elite), Big Data Computing (Elite with Silver), Machine Learning, and Frontend Development. Quite impressive, right? 😊";
    }
    
    if (lowerQuery.includes('publication') || lowerQuery.includes('research') || lowerQuery.includes('paper')) {
      return "Saikrishna published a research paper titled 'Automated Abnormal Brain Tumor Diagnosis Leveraging ResNet50 Deep Convolutional Architecture' in IEEE 4th International Conference for Advancement in Technology (ICONAT 2025). It's available on IEEE Xplore! 📝";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('linkedin') || lowerQuery.includes('phone')) {
      return "You can contact Saikrishna at vishwakarmasaikrishna@gmail.com or +91-6363326263. Connect on LinkedIn (linkedin.com/in/saikrishna-badiger-063a9a314) or check out his GitHub (github.com/sai-krishna26). He's always open to opportunities and meaningful conversations! 📧";
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
              {['Bio', 'About', 'Skills', 'Experience', 'Projects', 'Publication', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
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
            {['Bio', 'About', 'Skills', 'Experience', 'Projects', 'Publication', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
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
                  Java Full Stack Developer | Machine Learning | Web Development
                </p>
                <p className="text-lg text-gray-300">
                  B.E. Computer Science | CGPA: 8.44 (7th Semester)
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
                    href={`${process.env.PUBLIC_URL}/Jdeveloper_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/70 transition-all duration-300 transform hover:scale-105 text-base"
                  >
                    👁️ View Resume
                  </a>
          <a
            href={`${process.env.PUBLIC_URL}/Jdeveloper_Resume.pdf`}
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
              Computer Science undergraduate with strong foundation in Core Java, Object-Oriented Programming, and Data Structures. Experienced in backend application development with database integration and REST-based systems.
            </p>
      
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              Passionate about building scalable software solutions and writing clean, efficient code. Currently working as a <span className="text-yellow-400 font-medium">Java Full Stack Intern</span> at X-workz, Bengaluru, gaining hands-on experience in full-stack development.
            </p>
      
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              I enjoy building real-world software, solving complex problems, and constantly learning new technologies — especially in the fields of <span className="text-yellow-400 font-medium">Full-Stack Development</span>, <span className="text-yellow-400 font-medium">Machine Learning</span>, and <span className="text-yellow-400 font-medium">Cloud Computing</span>.
            </p>

            <p className="text-yellow-400 italic text-sm sm:text-base">
            What sets me apart is my curiosity-driven learning, hands-on experience building end-to-end projects, and passion for creating impactful software solutions.
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
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Core Java, Python, C</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">OOP, Collections Framework</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Exception Handling, Multithreading</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">HTML, CSS, JavaScript</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Django, Flask, React</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">MySQL, MongoDB</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">Git, GitHub</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">AWS (basics)</li>
                <li className="bg-neutral-900 p-3 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">DSA, DBMS, OS</li>
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

        {/* 🔹 Experience Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">Internship Experience</h2>
            <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Java Full Stack Intern</h3>
              <p className="text-gray-300 mb-2 font-medium">X-workz, Bengaluru</p>
              <p className="text-sm text-yellow-400 mb-4">Feb 2026 – Present</p>
              <ul className="list-disc ml-5 text-gray-200 space-y-2 text-sm sm:text-base">
                <li>Currently undergoing project-based training focused on Core Java and full-stack development.</li>
                <li>Working on implementing OOP concepts including classes, methods, constructors, and encapsulation.</li>
                <li>Developing structured Java programs involving control flow, arrays, and method interactions.</li>
                <li>Gaining hands-on exposure to real-time coding practices and debugging techniques.</li>
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
                <h3 className="text-xl font-bold text-yellow-400 mb-2">🤖 AI-Powered Resume Screening System</h3>
                <p className="text-gray-200 mb-2">Developed a full-stack application to automate resume evaluation and candidate ranking. Implemented backend APIs for text processing and similarity scoring using TF-IDF and cosine similarity. Designed MongoDB schemas and performed CRUD operations for candidate data management.</p>
                <p className="text-sm text-yellow-400 mb-2">Flask, MongoDB, React, NLP</p>
                <a href="https://github.com/sai-krishna26" target="_blank" rel="noreferrer" className="text-amber-500 underline text-sm hover:text-amber-400 transition-colors">GitHub</a>
                <p className="text-sm text-green-400 mt-2">📌 Status: Completed</p>
            </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">🧠 Abnormal Brain Tumor Classification Using ResNet50</h3>
                <p className="text-gray-200 mb-2">Built deep learning model using ResNet50 on 1,304 MRI images for multi-class tumor classification. Implemented preprocessing, training, and evaluation using precision, recall, and F1-score metrics.</p>
                <p className="text-sm text-yellow-400 mb-2">Python, TensorFlow</p>
                <a href="https://github.com/sai-krishna26" target="_blank" rel="noreferrer" className="text-amber-500 underline text-sm hover:text-amber-400 transition-colors">GitHub</a>
                <p className="text-sm text-green-400 mt-2">📌 Status: Completed</p>
            </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">🏡 Homestay Management System</h3>
                <p className="text-gray-200 mb-2">Developed booking system with user registration and admin management modules. Designed relational database schema and implemented SQL queries for data handling.</p>
                <p className="text-sm text-yellow-400 mb-2">HTML, CSS, JavaScript, MySQL</p>
                <p className="text-sm text-green-400 mt-2">📌 Status: Completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🔹 Publication Slide */}
        <section className="min-w-full h-full snap-start flex justify-center items-center p-10 bg-black">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">Publication</h2>
            <div className="bg-neutral-900 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Automated Abnormal Brain Tumor Diagnosis Leveraging ResNet50 Deep Convolutional Architecture</h3>
              <p className="text-gray-300 mb-2"><strong className="text-yellow-400">Author:</strong> Saikrishna Badiger</p>
              <p className="text-gray-200 mb-4">Published in <strong className="text-yellow-400">IEEE 4th International Conference for Advancement in Technology (ICONAT 2025)</strong>.</p>
              <p className="text-sm text-gray-400 mb-4">Available on IEEE Xplore</p>
              <a 
                href="https://ieeexplore.ieee.org" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block text-amber-500 underline text-sm hover:text-amber-400 transition-colors"
              >
                View Publication →
              </a>
            </div>
          </div>
        </section>

        {/* 🔹 Certifications Slide */}
        <section className="min-w-full h-full snap-start flex flex-col justify-center p-10 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6">Certifications</h2>
            <ul className="list-disc ml-5 mb-6 text-gray-200 space-y-2">
              <li>NPTEL – Programming in Java (Elite)</li>
              <li>NPTEL – Big Data Computing (Elite with Silver)</li>
              <li>NPTEL – Machine Learning</li>
              <li>Front-End Development – Great Learning</li>
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
        📱 Phone:{" "}
        <a
          href="tel:+916363326263"
          className="text-yellow-400 hover:text-amber-500 transition-colors duration-300 underline"
        >
          +91-6363326263
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
                📝 Published research paper: <strong className="text-yellow-400">"Automated Abnormal Brain Tumor Diagnosis Leveraging ResNet50 Deep Convolutional Architecture"</strong> in IEEE 4th International Conference for Advancement in Technology (ICONAT 2025), available on IEEE Xplore.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🎯 Currently working as <strong className="text-yellow-400">Java Full Stack Intern</strong> at X-workz, Bengaluru (Feb 2026 – Present), gaining hands-on experience in Core Java and full-stack development.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🏆 Coordinator – <strong className="text-yellow-400">HACKABHiGNA 2025</strong> (National Hackathon organized by Dept. of CSE, AIT).
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🤝 Conference Volunteer – <strong className="text-yellow-400">IEEE International Conference 2025</strong>, assisting with event coordination and tech support.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🧠 Participated in <strong className="text-yellow-400">3 Hackathons</strong> and contributed to innovative project ideas and team collaboration.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                📜 Earned certifications in <strong className="text-yellow-400">Java (Elite), Big Data Computing (Elite with Silver), Machine Learning, and Frontend Development</strong> from NPTEL and Great Learning.
            </li>
              <li className="bg-neutral-900 p-4 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-amber-500/40">
                🎓 Maintaining <strong className="text-yellow-400">CGPA: 8.44</strong> (7th semester) in B.E. Computer Science and Engineering.
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
          onClick={() => scrollToSection(Math.min(8, currentSection + 1))}
          disabled={currentSection === 8}
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
              {['Bio', 'About', 'Skills', 'Experience', 'Projects', 'Publication', 'Certifications', 'Contact', 'Achievements'].map((section, index) => (
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
