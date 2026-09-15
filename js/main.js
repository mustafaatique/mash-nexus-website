const burger = document.querySelector(".burger");
const navLinks = document.querySelector("nav.links");
if (burger) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

(function initNetwork() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, nodes;
  const NODE_COUNT = 46;
  const MAX_DIST = 140;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < MAX_DIST * devicePixelRatio) {
          ctx.strokeStyle = `rgba(245,138,31,${0.12 * (1 - d / (MAX_DIST * devicePixelRatio))})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = "rgba(245,138,31,0.55)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  resize();
  makeNodes();
  window.addEventListener("resize", () => {
    resize();
    makeNodes();
  });
  if (!reduceMotion) requestAnimationFrame(step);
})();

(function markActive() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();

const heroServices = [
  {
    title: "Web Development",

    description:
      "Fast, responsive websites built for performance, usability and growth.",
  },

  {
    title: "Website Design",

    description:
      "Modern, engaging designs that make your brand stand out and connect with users.",
  },

  {
    title: "Graphic Design",

    description:
      "Creative visuals and brand assets that give your business a strong identity.",
  },

  {
    title: "Digital Marketing",

    description:
      "Smart digital strategies designed to reach the right audience and drive growth.",
  },

  {
    title: "Video Editing",

    description:
      "Engaging, polished videos created to capture attention and tell your story.",
  },

  {
    title: "Ebook Design",

    description:
      "Professional ebook layouts that make your content look polished and easy to read.",
  },
];

const heroCard = document.getElementById("heroServiceCard");

const heroTitle = document.getElementById("heroServiceTitle");

const heroDescription = document.getElementById("heroServiceDescription");

if (heroCard && heroTitle && heroDescription) {
  let heroCurrentService = 0;

  function updateHeroService() {
    heroCard.classList.remove("card-enter");

    heroCard.classList.add("card-exit");

    setTimeout(() => {
      heroCurrentService++;

      if (heroCurrentService >= heroServices.length) {
        heroCurrentService = 0;
      }

      const service = heroServices[heroCurrentService];

      heroTitle.textContent = service.title;

      heroDescription.textContent = service.description;

      heroCard.classList.remove("card-exit");

      heroCard.classList.add("card-enter");
    }, 450);
  }

  setInterval(updateHeroService, 2500);
}
