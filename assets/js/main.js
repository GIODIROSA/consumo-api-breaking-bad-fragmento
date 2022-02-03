//CURSOR
const cursor_circle = document.querySelector(".cursor-circle"),
  cursor = document.querySelectorAll(".cursor"),
  elements = document.querySelectorAll(".getHover");
// BANNER
let timeline = gsap.timeline({
  defaults: {
    duration: 1.3,
    ease: "power3.inOut",
  },
});

timeline
  .to(".image-wrap", {
    height: "550px",
    backgroundSize: "100%",
    duration: 1.5,
    ease: "power4.inOut",
  })
  .to(
    ".image-wrap",
    {
      height: "250px",
      backgroundPosition: "50% 58%",
      duration: 1.3,
      y: "0",
      ease: "power3.inOut",
    },
    1.5
  )
  .from(
    ".big-name",
    {
      y: getYDistance(".big-name"),
    },
    1.5
  )
  .from(
    ".hide",
    {
      opacity: "0",
    },
    1.5
  );

function getYDistance(el) {
  return (
    window.innerHeight - document.querySelector(el).getBoundingClientRect().top
  );
}

window.addEventListener("mousemove", (e) => {
  let xPosition = e.clientX;
  let yPosition = e.clientY;
  cursor.forEach((el) => {
    el.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
    el.style.opacity = "1";
  });
});

elements.forEach((el) => {
  el.addEventListener("mouseover", () => {
    cursor_circle.classList.add("biggerCursor");
  });
  el.addEventListener("mouseout", () => {
    cursor_circle.classList.remove("biggerCursor");
  });
});

// GRID BREAKING BAD
const breakingBadAsync = async () => {
  try {
    const urlAPI = "https://www.breakingbadapi.com/api/characters/";
    const resAPI = await fetch(urlAPI);
    const data = await resAPI.json();
    console.log(data);

    const $cards = document.querySelector(".cards"),
      $template = document.getElementById("template-card").content,
      $fragment = document.createDocumentFragment();

    data.forEach((el) => {
      // se guarda en variable los datos que se requieren
      let name = el.name;
      let nickname = el.nickname;
      let img = el.img;
      let category = el.category;
      let id = el.char_id;

      // set a template
      $template.querySelector("img").setAttribute("src", img);
      $template.querySelector("img").setAttribute("alt", name);
      $template.querySelector("figcaption").textContent = name;

      // clona el template para la iteración y true para toda la estructura interna
      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $cards.appendChild($fragment);
  } catch (error) {
    console.log("Wooop!", error);
  }
};
breakingBadAsync();

// const urlMarvel =
//   "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a697638ebb3356c35924bd19724f3797&hash=d7e87ed25567e6dff64ca8c2c24781c5";

// fetch(urlMarvel)
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json.data.results[0].name);
//   });
