document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrambleTextPlugin,
    ScrollToPlugin
  );

  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  const coordinates = document.getElementById("coordinates");
  const cursor = document.getElementById("cursor");

  window.addEventListener("mousemove", (e) => {
    coordinates.textContent = `X:${e.clientX}, Y:${e.clientY}`;
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
    });
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
