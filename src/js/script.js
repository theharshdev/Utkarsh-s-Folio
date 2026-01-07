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

  /* LOADING ANIMATION */
  const loadingTimeline = gsap.timeline({ paused: true });

  window.addEventListener("load", () => {
    namaste.classList.add("pointer-events-none");

    loadingTimeline
      .to(namaste, { opacity: 0, duration: 1 }, "+=4")
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
    .to(aboutPara, { opacity: 1 })
    .to(aboutLink, { opacity: 1 });

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
    .to(heroBox, { scale: 2, opacity: 0 }, "stack")
    .to(scrollerContainer, { scale: 0.4, opacity: 0 }, "stack")
    .to(stackBtn, { y: 200, opacity: 0 }, "stack")
    .to("#absoluteText", { opacity: 0 }, "stack")
    .to(threeDmodel, { y: "100%" }, "stack")
    .to("#hireMeTxt", { x: -300 }, "stack")
    .to("#myNameTxt", { x: 300 }, "stack")
    .to(aboutme, { opacity: 0, duration: 1 }, "stack")
    .to(projectBox, { opacity: 1 }, "stack")
    .to(".projectist", { x: 0, stagger: 0.1, opacity: 1 });

  projectBtn.addEventListener("click", () => {
    projectBox.style.display = "flex";
    closeProjects.style.display = "block";
    projectBox.classList.remove("pointer-events-none");
    heroBox.classList.add("pointer-events-none");
    projectTimeline.play();
  });

  closeProjects.addEventListener("click", () => {
    closeProjects.style.display = "none";
    projectBox.classList.add("pointer-events-none");
    heroBox.classList.remove("pointer-events-none");
    projectTimeline.reverse();
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
