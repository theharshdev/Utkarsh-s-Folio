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
      id: 1,
      name: "AI Resume Analyzer",
      description:
        "An AI-powered resume screening platform that extracts skills, experience, and education from resumes and ranks candidates based on job descriptions using NLP and machine learning techniques.",
      liveLink: "https://example.com/ai-resume-analyzer",
    },
    {
      id: 2,
      name: "E-Commerce Recommendation Engine",
      description:
        "A personalized recommendation system that analyzes user behavior, browsing history, and purchase patterns to deliver relevant product suggestions using collaborative and content-based filtering.",
      liveLink: "https://example.com/ecommerce-recommendation",
    },
    {
      id: 3,
      name: "Smart Attendance System",
      description:
        "A real-time attendance management system using face recognition and computer vision to automatically identify users, prevent proxy attendance, and generate detailed attendance reports.",
      liveLink: "https://example.com/smart-attendance",
    },
    {
      id: 4,
      name: "Customer Support Chatbot",
      description:
        "An intelligent chatbot that understands user intent using NLP, provides instant responses to common queries, automates support workflows, and escalates complex issues to human agents.",
      liveLink: "https://example.com/support-chatbot",
    },
    {
      id: 5,
      name: "Real-Time Stock Price Tracker",
      description:
        "A responsive web application that displays live stock prices, historical trends, and interactive charts using real-time APIs to help users analyze market movements effectively.",
      liveLink: "https://example.com/stock-tracker",
    },
    {
      id: 6,
      name: "Online Learning Management System",
      description:
        "A scalable learning platform that supports course creation, video streaming, quizzes, progress tracking, and role-based access for students, instructors, and administrators.",
      liveLink: "https://example.com/learning-management-system",
    },
  ];

  let data = "";

  for (let i = 0; i < projectsData.length; i++) {
    data += `<div class="flex justify-between gap-6 w-full text-start bg-violet-950 h-44 hover:h-full group transition-all duration-500 hover:pb-4 overflow-hidden projectist translate-x-full opacity-0 pt-4 border-b border-amber-100"><div class="flex gap-6"><img src="./src/img/prroject-img-0${
      i + 1
    }.jpg" alt="" class="lg:w-lg object-cover rounded-lg aspect-video h-80 group-hover:h-full projectImg"/><div><h3 class="text-5xl uppercase font-bold projectTitle">${
      projectsData[i].name
    }</h3><p class="text-2xl leading-6 max-w-lg mt-4 projectPara opacity-0 group-hover:opacity-100 transition duration-500">${
      projectsData[i].description
    }</p></div></div><button type="button" class="bg-transparent cursor-pointer p-0 outline-0 border-0 h-fit overflow-hidden w-16 flex justify-center items-center aspect-square relative group projectButton hover:text-violet-500 transition duration-500"><i class="bi bi-arrow-up-right text-6xl inline-block absolute top-0 left-0 -translate-x-full translate-y-full group-hover:translate-0 duration-500 transition"></i><i class="bi bi-arrow-up-right text-6xl inline-block absolute top-0 left-0 group-hover:-translate-y-full group-hover:translate-x-full transition duration-500"></i></button></div>`;
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
    .to(".projectist", { x: 0, stagger: 0.1, opacity: 1 })
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
    .to(".contactLink", { opacity: 1 });

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
  const projectTitles = document.querySelectorAll(".projectTitle");
  const projectParas = document.querySelectorAll(".projectPara");
  const projectists = document.querySelectorAll(".projectist");

  const projectPopupContentBox = document.getElementById(
    "projectPopupContentBox"
  );
  const projectPopupBox = document.getElementById("projectPopupBox");
  const projectPopupCloseBtn = document.getElementById("projectPopupCloseBtn");
  const projectPopupLink = document.getElementById("projectPopupLink");
  const projectPopupPara = document.getElementById("projectPopupPara");
  const projectPopupTitle = document.getElementById("projectPopupTitle");
  const projectImgContainer = document.getElementById("projectImgContainer");
  const projectPopupBGimg = document.getElementById("projectPopupBGimg");
  const projectLiveLink = document.getElementById("projectLiveLink");

  const openProjectsTimeline = gsap.timeline({ paused: true });

  openProjectsTimeline
    .to(closeProjects, { y: -300, opacity: 0 })
    .to(projectBox, { opacity: 0 })
    .to(".projectist", { x: 200, stagger: 0.1, opacity: 0 })
    .to("#mainSection", { opacity: 0, duration: 1 })
    .to(projectPopupBox, { display: "flex" })
    .from(projectPopupTitle, { y: 100, opacity: 0, duration: 1 }, "popup")
    .from(projectPopupPara, { y: 200, opacity: 0 }, "popup")
    .from(projectPopupLink, { y: 200, opacity: 0, ease: "none" }, "popup")
    .from(projectPopupContentBox, { x: "200%", opacity: 0 }, "popup")
    .from(projectImgContainer, { opacity: 0 })
    .from(projectPopupBGimg, { opacity: 0 });

  projectButtons.forEach((projectButton, i) => {
    projectButton.addEventListener("click", () => {
      projectPopupTitle.textContent = projectsData[i].name;
      projectPopupPara.textContent = projectsData[i].description;
      projectLiveLink.setAttribute("href", `${projectsData[i].liveLink}`);

      const imgPath = projectImgs[i].getAttribute("src");
      projectImgContainer.setAttribute("src", `${imgPath}`);
      projectPopupBGimg.setAttribute("src", `${imgPath}`);
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
