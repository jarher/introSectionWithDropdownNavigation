import anime from "../../node_modules/animejs/lib/anime.es.js";

// creates a new animation instance
const newAnimeInstance = (params) => {
  const finalParams = Object.assign(
    { loop: false, easing: "easeInOutExpo" },
    params
  );
  return anime(finalParams);
};

const toggleClass = (element, classname) => element.classList.toggle(classname);

const classListToToggle = (selector, classValues, delay) => {
  const [hidden, flex] = classValues;
  const htmlElement = document.querySelector(selector);
  const isHidden = htmlElement.classList.contains(hidden);

  const assignClass = () =>
    [hidden, flex].forEach((classname) => toggleClass(htmlElement, classname));

  if (isHidden) {
    assignClass();
    return;
  }
  setTimeout(() => {
    assignClass();
  }, delay);
};

const displayMenuContainer = () => {
  classListToToggle("#menu-container", ["hidden", "flex"], 1000);
};

const animateMenuContainer = (backgroundColor) =>
  newAnimeInstance({
    targets: "#menu-container",
    backgroundColor,
    delay: 300,
    duration: 400,
    loop: false,
  });

const animateMenuContent = ([translateX, delayValue]) =>
  newAnimeInstance({
    targets: "#menu-content",
    translateX,
    delay: delayValue,
  });

// Iterates over a list of elements, applying an animation to each of them sequentially.
// The 'params' parameters are merged with a delay based on the element index.
const animateItemsSequentially = (arrayList, params) =>
  arrayList.forEach((item, i) => {
    const newParams = Object.assign(params, { targets: item, delay: 500 * i });
    newAnimeInstance(newParams);
  });

const animateListTexts = (parent) => {
  const listText = Array.from(
    document.querySelectorAll(`${parent} + ul li span`)
  );

  animateItemsSequentially(listText, {
    opacity: [0, 1],
    duration: 500,
  });
};

const animateListIcons = (target) => {
  const listIcons = Array.from(
    document.querySelectorAll(`${target} + ul li img`)
  );

  animateItemsSequentially(listIcons, {
    scale: [0, 1],
    rotate: [0, 360],
    duration: 500,
  });
};

const rotateArrowIcon = (parent) => {
  const parentElement = document.querySelector(parent);
  const arrowIcon = parentElement.querySelector("img");
  toggleClass(arrowIcon, "rotate-180");
};

const displayUnorderedList = (target) => {
  classListToToggle(`${target} + ul`, ["hidden", "flex"], 500);
  toggleClass(document.querySelector(`${target} + ul`), "opacity-0");
};

const returnAnimeKeyframes = (state, heightValue) => {
  let matchMedia = window.matchMedia("(min-width: 1024px)");
  if (state) {
    return [
      {
        height: matchMedia.matches ? "fit-content" : heightValue,
        marginTop: "1rem",
      },
      { height: matchMedia.matches ? "none" : 0, marginTop: 0 },
    ];
  }
  return [
    { height: matchMedia.matches ? "none" : 0, marginTop: 0 },
    {
      height: matchMedia.matches ? "fit-content" : heightValue,
      marginTop: "1rem",
    },
  ];
};

const animateUnorderedList = (target, state, heightValue) => {
  const keyframes = returnAnimeKeyframes(state, heightValue);
  newAnimeInstance({
    targets: `${target} + ul`,
    keyframes,
    duration: 500,
  });
};

const runUnorderedListAnimations = ({ id, state, heightValue }) => {
  displayUnorderedList(id);

  animateUnorderedList(id, state, heightValue);

  animateListIcons(id);

  animateListTexts(id);

  rotateArrowIcon(id);
};

export {
  animateMenuContainer,
  displayMenuContainer,
  animateMenuContent,
  runUnorderedListAnimations,
};
