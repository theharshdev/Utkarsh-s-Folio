document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrambleTextPlugin,
    ScrollToPlugin,
    Flip,
    TextPlugin
  );

  // ScrollSmoother.create({
  //   smooth: 2,
  //   effects: true,
  // });

  const coordinates = document.getElementById("coordinates");
  const cursor = document.getElementById("cursor");

  window.addEventListener("mousemove", (e) => {
    coordinates.textContent = `X:${e.clientX}, Y:${e.clientY}`;
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      duration: 0.8,
    });
  });

  window.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      opacity: 0,
    });
  });

  const navLinks = document.querySelectorAll(".navLinks");

  navLinks.forEach((navLink) => {
    let navLinktext = navLink.textContent;
    navLink.addEventListener("mouseover", () => {
      gsap.to(navLink, {
        duration: 1,
        scrambleText: {
          text: `${navLinktext}`,
          chars: "/",
          revealDelay: 0.3,
          speed: 0.3,
        },
      });
    });
  });

  const stackBtn = document.getElementById("stackBtn");
  const heroBox = document.getElementById("heroBox");
  const scrollerContainer = document.getElementById("scrollerContainer");
  const aboutme = document.getElementById("aboutme");
  const aboutTitle = document.getElementById("aboutTitle");
  const aboutPara = document.getElementById("aboutPara");
  const aboutLink = document.getElementById("aboutLink");
  const threeDmodel = document.getElementById("3dmodel");

  let stackTimelineTrue = true;
  let stackTimeline = gsap.timeline();
  const splitTitle = new SplitText(aboutTitle, { type: "chars" });

  stackBtn.addEventListener("click", () => {
    aboutme.classList.toggle("pointer-events-none");
    scrollerContainer.classList.toggle("pointer-events-none");
    heroBox.classList.toggle("pointer-events-none");
    if (stackTimelineTrue) {
      stackTimeline.play();
      stackTimeline.to(
        heroBox,
        {
          scale: 2,
          opacity: 0,
        },
        "stack"
      );
      stackTimeline.to(
        scrollerContainer,
        {
          scale: 0.4,
          opacity: 0,
        },
        "stack"
      );
      stackTimeline.to(
        stackBtn,
        {
          text: "Close",
        },
        "stack"
      );
      stackTimeline.to(threeDmodel, {
        y: "100%",
      });
      stackTimeline.to(aboutme, {
        opacity: 1,
      });
      stackTimeline.from(splitTitle.chars, {
        opacity: 0,
        x: 20,
        stagger: 0.03,
      });
      stackTimeline.to(aboutPara, {
        opacity: 1,
      });
      stackTimeline.to(aboutLink, {
        opacity: 1,
      });

      stackTimelineTrue = false;
    } else {
      stackTimeline.reverse();
      stackTimelineTrue = true;
    }
  });
});

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

  const dayName = days[now.getDay()];

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  datePara.textContent = `${dayName}, ${hours}:${minutes}:${seconds} ${ampm}`;
}

// run once
updateDateTime();

// update every second
setInterval(updateDateTime, 1000);
