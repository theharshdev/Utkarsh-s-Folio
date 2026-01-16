document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    ScrambleTextPlugin,
    Flip,
    TextPlugin
  );

  /* ELEMENT REFERENCES */
  const namaste = document.getElementById("namaste");
  const cursor = document.getElementById("cursor");
  const coordinates = document.getElementById("coordinates");
  const navLinks = document.querySelectorAll(".navLinks");
  const stackBtn = document.getElementById("stackBtn");
  const projectBtn = document.getElementById("projectBtn");
  const heroBox = document.getElementById("heroBox");
  const scrollerContainer = document.getElementById("scrollerContainer");
  const aboutme = document.getElementById("aboutme");
  const projectBox = document.getElementById("projectBox");
  const aboutTitle = document.getElementById("aboutTitle");
  const aboutPara = document.getElementById("aboutPara");
  const aboutLink = document.getElementById("aboutLink");
  const threeDmodel = document.getElementById("3dmodel");
  const closeProjects = document.getElementById("closeProjects");
  const resumeBtn = document.getElementById("resumeBtn");

  /* Project Data */
  const projectsData = [
    {
      name: "AI Resume Analyzer",
      overview:
        "The AI Resume Analyzer is a web-based application designed to automate and streamline the recruitment screening process. The platform analyzes resumes submitted in various formats, extracts relevant information such as skills, experience, and education, and intelligently compares them against job descriptions.",
      challenges:
        "One of the most significant challenges was processing resumes that were highly unstructured and inconsistent in format, layout, and language. Candidates used different fonts, templates, file formats, and naming conventions for similar skills, which made reliable information extraction extremely difficult. Another major challenge was avoiding simple keyword-based matching, as it often failed to capture contextual relevance and transferable skills. Additionally, ensuring fairness and reducing bias in automated resume screening required careful handling of training data, evaluation logic, and scoring mechanisms. The system also needed to scale efficiently while processing a large volume of resumes without performance degradation.",
      solution:
        "To address these challenges, a comprehensive NLP-driven processing pipeline was implemented to clean, normalize, and structure resume content. Advanced text parsing and entity recognition techniques were used to accurately extract skills, experience, and educational background. Machine learning models were trained to analyze semantic similarity between resumes and job descriptions rather than relying on keyword matches alone. The solution was designed with modular components, making it easy to adapt to different job roles and update scoring logic as hiring requirements evolved. Performance optimizations ensured fast processing even at scale.",
      impact:
        "The final solution significantly reduced manual resume screening time and improved the consistency and accuracy of candidate shortlisting. Recruiters were able to focus on high-quality candidates more quickly, leading to faster hiring decisions and reduced recruitment costs. The system improved transparency and fairness in the hiring process while increasing overall recruiter productivity. Over time, the platform demonstrated measurable improvements in hiring efficiency and candidate satisfaction.",
      techStack:
        "JavaScript, Python, Natural Language Processing, Machine Learning",
      liveLink: "https://example.com/ai-resume-analyzer",
    },
    {
      name: "E-Commerce Recommendation Engine",
      overview:
        "The E-Commerce Recommendation Engine was built to enhance online shopping experiences by delivering personalized product recommendations based on user behavior and preferences.",
      challenges:
        "One of the primary challenges was solving the cold-start problem for new users and newly added products with limited interaction data. Processing large volumes of user behavior data such as clicks, searches, and purchases in real time introduced performance and scalability concerns. Maintaining recommendation relevance while keeping response times low was difficult as the product catalog and user base continued to grow. Additionally, preventing repetitive or irrelevant recommendations required constant tuning of recommendation logic.",
      solution:
        "A hybrid recommendation system was developed by combining collaborative filtering and content-based approaches. This allowed the engine to provide meaningful recommendations even when historical data was limited. Efficient data pipelines and caching strategies were implemented to support real-time processing without performance bottlenecks. Recommendation algorithms were continuously refined using user feedback and interaction data to improve relevance and diversity. The architecture was designed to scale seamlessly as traffic increased.",
      impact:
        "The recommendation engine significantly improved product discoverability and increased average session duration. Users engaged more deeply with the platform due to personalized suggestions tailored to their interests. The system contributed to higher conversion rates, increased sales, and improved customer retention. Overall, it enhanced the shopping experience while delivering measurable business value.",
      techStack: "JavaScript, Python, Data Analysis, Recommendation Algorithms",
      liveLink: "https://example.com/ecommerce-recommendation",
    },
    {
      name: "Smart Attendance System",
      overview:
        "The Smart Attendance System is an automated solution that uses face recognition and computer vision to accurately record attendance in real time.",
      challenges:
        "Achieving reliable face recognition accuracy in real-world environments was a major challenge due to varying lighting conditions, camera quality, and facial orientations. Handling multiple faces simultaneously without introducing latency required significant optimization. Ensuring data privacy and preventing false positives or duplicate attendance entries were also critical challenges. The system needed to operate consistently across different environments such as classrooms and offices.",
      solution:
        "Image preprocessing techniques were applied to normalize lighting and enhance facial features before recognition. Optimized computer vision and face recognition models were implemented to balance accuracy and performance. The system was thoroughly tested under different environmental conditions to ensure reliability. Careful tuning and validation helped minimize recognition errors while maintaining real-time responsiveness.",
      impact:
        "The system successfully eliminated proxy attendance and reduced manual administrative workload. Attendance records became more accurate, secure, and reliable. Institutions benefited from improved operational efficiency and reduced errors in attendance tracking. The solution also increased trust in automated systems among administrators and users.",
      techStack: "Python, OpenCV, Computer Vision, Face Recognition",
      liveLink: "https://example.com/smart-attendance",
    },
    {
      name: "Customer Support Chatbot",
      overview:
        "The Customer Support Chatbot automates customer interactions by understanding natural language queries and providing instant responses.",
      challenges:
        "Understanding diverse user phrasing, slang, and ambiguous queries was a major challenge. Designing a chatbot that could handle unsupported questions gracefully without frustrating users required careful planning. Maintaining conversational flow while ensuring accurate intent recognition was complex. Additionally, integrating seamless escalation to human support agents without breaking the user experience was essential.",
      solution:
        "An NLP-based intent classification model was implemented to accurately detect user needs. The chatbot combined rule-based flows with AI-driven responses to handle common queries efficiently. Fallback mechanisms and escalation paths were carefully designed to transfer complex issues to human agents. Continuous training and monitoring improved conversational accuracy over time.",
      impact:
        "The chatbot significantly reduced response times and provided 24/7 customer support. It lowered the workload on human support teams and improved operational efficiency. Customer satisfaction increased due to faster resolutions and consistent service quality. The chatbot became a scalable solution for handling high volumes of support requests.",
      techStack: "JavaScript, NLP, AI, Chatbot Frameworks",
      liveLink: "https://example.com/support-chatbot",
    },
    {
      name: "Real-Time Stock Price Tracker",
      overview:
        "The Real-Time Stock Price Tracker delivers live stock prices and interactive charts for market analysis.",
      challenges:
        "Managing continuous real-time data streams without performance degradation was a significant challenge. Ensuring accurate data synchronization while updating charts frequently required optimized state management. Handling API rate limits, network latency, and potential data inconsistencies added further complexity. The application needed to remain responsive even during high market activity.",
      solution:
        "The application integrated real-time market APIs with optimized data handling strategies. State updates were carefully managed to prevent unnecessary re-renders. Data throttling and batching techniques were applied to improve performance. Interactive charts were implemented to provide smooth and responsive visualizations without compromising accuracy.",
      impact:
        "Users gained access to timely and reliable market data, enabling better investment decisions. The platform increased user engagement through real-time updates and intuitive data visualization. It provided a dependable tool for tracking market trends and analyzing historical data efficiently.",
      techStack: "JavaScript, APIs, Data Visualization, Charts",
      liveLink: "https://example.com/stock-tracker",
    },
    {
      name: "Online Learning Management System",
      overview:
        "The Online Learning Management System (LMS) is a scalable platform designed to manage digital learning content, users, and progress tracking.",
      challenges:
        "Designing a secure role-based access system for students, instructors, and administrators was a major challenge. Delivering video and learning content efficiently at scale required careful backend architecture planning. Maintaining consistent performance while supporting multiple concurrent users added complexity. Ensuring a smooth user experience across different roles was also critical.",
      solution:
        "A modular architecture was implemented with clearly defined roles and permissions. Secure authentication and authorization mechanisms were integrated to protect user data. Backend APIs were optimized for content delivery and user interactions. Progress tracking and analytics were added to support both learners and instructors effectively.",
      impact:
        "The LMS improved accessibility to educational resources and simplified course management workflows. Learners benefited from structured content and progress visibility, while instructors gained better control over course delivery. The platform supported scalable digital learning and improved overall engagement and efficiency.",
      techStack: "JavaScript, Backend APIs, Authentication, LMS Architecture",
      liveLink: "https://example.com/learning-management-system",
    },
  ];

  let data = "";

  for (let i = 0; i < projectsData.length; i++) {
    data += `<div class="flex justify-between gap-6 w-full text-start bg-white h-44 hover:h-full group transition-all duration-500 hover:pb-4 overflow-hidden projectist translate-x-full opacity-0 pt-4 border-b border-orange-500"><div class="flex gap-6"><img src="./src/img/prroject-img-0${i + 1}.jpg" alt="" class="lg:w-lg object-cover rounded-lg aspect-video h-80 group-hover:h-full projectImg"/><div><h3 class="text-5xl uppercase font-bold projectTitle">
    ${projectsData[i].name}
    </h3><p class="text-2xl leading-6 max-w-lg mt-4 projectPara opacity-0 group-hover:opacity-100 transition duration-500">
    ${projectsData[i].overview}
    </p></div></div><button type="button" class="bg-transparent cursor-pointer p-0 outline-0 border-0 h-fit overflow-hidden w-16 flex justify-center items-center aspect-square relative group projectButton hover:text-orange-500 transition duration-500"><i class="bi bi-arrow-up-right text-6xl inline-block absolute top-0 left-0 -translate-x-full translate-y-full group-hover:translate-0 duration-500 transition"></i><i class="bi bi-arrow-up-right text-6xl inline-block absolute top-0 left-0 group-hover:-translate-y-full group-hover:translate-x-full transition duration-500"></i></button></div>`;
  }

  projectBox.innerHTML = data;

  /* LOADING ANIMATION */
  const loadingTimeline = gsap.timeline({ paused: true });

  window.addEventListener("load", () => {
    namaste.classList.add("pointer-events-none");

    loadingTimeline
      .to(namaste, { opacity: 0, duration: 1 }, "+=4")
      .from(threeDmodel, { opacity: 0, scale: 2 })
      .from(navLinks, { y: -80, opacity: 0, stagger: 0.1 })
      .from(scrollerContainer, { y: 200, opacity: 0 }, "<")
      .from(heroBox, { scale: 3, opacity: 0 }, "<")
      .from(stackBtn, { y: 200 }, "name")
      .from("#absoluteText", { y: 200, opacity: 0 }, "name")
      .from("#hireMeTxt", { y: -200, opacity: 0 }, "name")
      .from("#myNameTxt", { y: 200, opacity: 0 }, "name");

    loadingTimeline.play();
  });

  /* CURSOR + PARALLAX (PERF) */
  const cursorX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
  const cursorY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

  const winX = gsap.quickTo(".windowMove", "x", { duration: 0.4 });
  const winY = gsap.quickTo(".windowMove", "y", { duration: 0.4 });

  let lastCoordUpdate = 0;

  window.addEventListener("mousemove", (e) => {
    cursorX(e.clientX);
    cursorY(e.clientY);
    gsap.to(cursor, { opacity: 1, duration: 0.2 });

    const x = (e.clientX / innerWidth - 0.5) * 10;
    const y = (e.clientY / innerHeight - 0.5) * 10;
    winX(x);
    winY(y);

    const now = performance.now();
    if (now - lastCoordUpdate > 100) {
      coordinates.textContent = `X:${e.clientX}, Y:${e.clientY}`;
      lastCoordUpdate = now;
    }
  });

  window.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
  });

  /* NAV SCRAMBLE TEXT */
  navLinks.forEach((link) => {
    const text = link.textContent;
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        duration: 0.3,
        scrambleText: {
          text,
          chars: "/",
          revealDelay: 0.1,
          speed: 0.1,
        },
      });
    });
  });

  /* ABOUT SECTION TIMELINE */
  const splitTitle = new SplitText(aboutTitle, { type: "chars" });
  const masterTimeline = gsap.timeline({ paused: true });
  const homeTimeline = gsap.timeline();
  const aboutTimeline = gsap.timeline();

  let aboutOpen = false;

  homeTimeline
    .to("#navbar", { y: -200, opacity: 0 })
    .to(heroBox, { scale: 2, opacity: 0 }, "stack")
    .to(scrollerContainer, { scale: 0.4, opacity: 0 }, "stack")
    .to(stackBtn, { text: "Close" }, "stack")
    .to("#absoluteText", { text: "About Me" }, "stack")
    .to(threeDmodel, { y: "100%" })
    .to("#hireMeTxt", { y: -100 }, "stack")
    .to("#myNameTxt", { y: 100 }, "stack");

  aboutTimeline
    .to(aboutme, { opacity: 1 })
    .from(splitTitle.chars, {
      opacity: 0,
      x: 20,
      stagger: 0.03,
    })
    .from(".aboutSkills", { x: 50, opacity: 0, stagger: 0.03 })
    .from(aboutPara, { y: 100, opacity: 0 }, "about")
    .from(aboutLink, { y: 100, opacity: 0 }, "about")
    .from("#aboutImg", { x: 100, opacity: 0 }, "about");

  masterTimeline.add(homeTimeline).add(aboutTimeline);

  stackBtn.addEventListener("click", () => {
    aboutme.style.display = "block";
    if (!aboutOpen) {
      aboutme.classList.remove("pointer-events-none");
      heroBox.classList.add("pointer-events-none");
      projectBox.style.display = "none";
      masterTimeline.play();
    } else {
      aboutme.classList.add("pointer-events-none");
      heroBox.classList.remove("pointer-events-none");
      masterTimeline.reverse();
    }
    aboutOpen = !aboutOpen;
  });

  /* PROJECT SECTION TIMELINE */
  const projectTimeline = gsap.timeline({ paused: true });

  projectTimeline
    .to("#navbar", { y: -200, opacity: 0 })
    .to(heroBox, { scale: 2, opacity: 0 }, "stack")
    .to(scrollerContainer, { scale: 0.4, opacity: 0 }, "stack")
    .to(stackBtn, { y: 200, opacity: 0 }, "stack")
    .to("#absoluteText", { opacity: 0 }, "stack")
    .to(threeDmodel, { y: "100%" }, "stack")
    .to("#hireMeTxt", { x: -300 }, "stack")
    .to("#myNameTxt", { x: 300 }, "stack")
    .to(aboutme, { opacity: 0, duration: 1 }, "stack")
    .to(projectBox, { opacity: 1 }, "stack")
    .fromTo(
      ".projectist",
      { x: "100%", opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1 }
    )
    .to(closeProjects, { y: 0, x: 0, opacity: 1 });

  projectBtn.addEventListener("click", () => {
    projectBox.style.display = "flex";
    projectBox.classList.remove("pointer-events-none");
    heroBox.classList.add("pointer-events-none");
    projectTimeline.play();
  });

  closeProjects.addEventListener("click", () => {
    projectBox.classList.add("pointer-events-none");
    heroBox.classList.remove("pointer-events-none");
    projectTimeline.reverse();
  });

  const resumeTimeline = gsap.timeline({ paused: true });

  resumeTimeline
    .to(heroBox, { scale: 0.3, opacity: 0 })
    .to(stackBtn, { y: 200, opacity: 0 })
    .to("#navbar", { y: -200, opacity: 0 })
    .to("#resumeBox", { scale: 1, opacity: 1 });

  document.getElementById("resumeBtn").addEventListener("click", () => {
    resumeTimeline.play();
  });
  document.getElementById("closeResume").addEventListener("click", () => {
    resumeTimeline.reverse();
  });

  const hiremeBtn = document.getElementById("hiremeBtn");
  const contactSection = document.getElementById("contactSection");
  const closeContact = document.getElementById("closeContact");
  const hireTimeline = gsap.timeline({ paused: true });

  hireTimeline
    .to("#navbar", { y: -200, opacity: 0 }, "hire")
    .to(heroBox, { scale: 2, opacity: 0 }, "hire")
    .to(scrollerContainer, { scale: 0.4, opacity: 0 }, "hire")
    .to(stackBtn, { y: 200, opacity: 0 }, "hire")
    .to("#absoluteText", { opacity: 0 }, "hire")
    .to(threeDmodel, { y: "100%", opacity: 0 }, "hire")
    .to("#hireMeTxt", { x: -300 }, "hire")
    .to("#myNameTxt", { x: 300 }, "hire")
    .to("#contactSection", { opacity: 1, scale: 1 }, "hire")
    .to("#contactTitle", { y: 0, opacity: 1 })
    .to(".contactPara", { y: 0, opacity: 1, stagger: 0.3 })
    .to(".contactLink", { opacity: 1 })
    .from(closeContact, { x: 200, opacity: 1 });

  hiremeBtn.addEventListener("click", () => {
    contactSection.classList.remove("pointer-events-none");
    hireTimeline.play();
  });
  closeContact.addEventListener("click", () => {
    contactSection.classList.add("pointer-events-none");
    hireTimeline.reverse();
  });

  const projectButtons = document.querySelectorAll(".projectButton");
  const projectImgs = document.querySelectorAll(".projectImg");
  const projectPopupCBox = document.getElementById("projectPopupContentBox");
  const projectPopupBox = document.getElementById("projectPopupBox");
  const projectPopupCloseBtn = document.getElementById("projectPopupCloseBtn");
  const projectPopupLink = document.getElementById("projectPopupLink");
  const projectPopupPara = document.getElementById("projectPopupPara");
  const projectPopupTitle = document.getElementById("projectPopupTitle");
  const projectImgContainer = document.getElementById("projectImgContainer");
  const projectLiveLink = document.getElementById("projectLiveLink");
  const openProjectsTimeline = gsap.timeline({ paused: true });

  openProjectsTimeline
    .to(closeProjects, { y: -300, opacity: 0 })
    .to(projectBox, { opacity: 0 })
    .to(".projectist", { x: 320, stagger: 0.1, opacity: 0 })
    .to("#mainSection", { opacity: 0, duration: 1 })
    .to(projectPopupBox, { display: "flex" })
    .from(projectPopupTitle, { y: 200, opacity: 0 }, "popup")
    .from(projectPopupPara, { y: 200, opacity: 0 }, "popup")
    .from(projectPopupLink, { y: 200, opacity: 0 }, "popup")
    .from(projectPopupCBox, { x: "200%", opacity: 0 }, "popup")
    .from(projectImgContainer, { opacity: 0 });

  projectButtons.forEach((projectButton, i) => {
    projectButton.addEventListener("click", () => {
      projectPopupTitle.textContent = projectsData[i].name;
      projectPopupPara.textContent = projectsData[i].overview;
      projectLiveLink.setAttribute("href", `${projectsData[i].liveLink}`);
      document.getElementById("techStack").textContent =
        projectsData[i].techStack;
      document.getElementById("impact").textContent = projectsData[i].impact;
      document.getElementById("solution").textContent =
        projectsData[i].solution;
      document.getElementById("challenges").textContent =
        projectsData[i].challenges;

      const imgPath = projectImgs[i].getAttribute("src");
      projectImgContainer.setAttribute("src", `${imgPath}`);
      openProjectsTimeline.play();
    });
  });

  projectPopupCloseBtn.addEventListener("click", () => {
    openProjectsTimeline.reverse();
  });
});

/* DATE & TIME */
const datePara = document.getElementById("dateTime");
function updateDateTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  datePara.textContent = `${
    days[now.getDay()]
  }, ${hours}:${minutes}:${seconds} ${ampm}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);
