import anime from "../../node_modules/animejs/lib/anime.es.js";

const newAnimeInstance = (params) => {
  const animeParams = {
    loop: false,
    easing: "easeInOutExpo",
    ...params,
  };
  return anime(animeParams);
};

const toggleClass = (element, classname) => element.classList.toggle(classname);

const toggleHiddenAndFlexClasses = (selector, classValues, delay) => {
  const [hidden, flex] = classValues;
  const htmlElement = document.querySelector(selector);
  const isClassHiddenExists = htmlElement.classList.contains(hidden);

  if (isClassHiddenExists) {
    [hidden, flex].forEach((classname) => toggleClass(htmlElement, classname));
  } else {
    setTimeout(() => {
      [hidden, flex].forEach((classname) =>
        toggleClass(htmlElement, classname)
      );
    }, delay);
  }
};

const displayMenuContainer = () => {
  toggleHiddenAndFlexClasses("#menu-container", ["hidden", "flex"], 1000);
};

const animateMenuContainer = (backgroundColor) =>
  newAnimeInstance({
    targets: "#menu-container",
    backgroundColor,
    delay: 300,
    duration: 400,
    loop: false,
  });

const animateMenuContent = (translateX, delayValue) =>
  newAnimeInstance({
    targets: "#menu-content",
    translateX,
    delay: delayValue,
  });

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

const animateListTexts = (parent) => {
  const listText = Array.from(
    document.querySelectorAll(`${parent} + ul li span`)
  );
  listText.forEach((item, i) => {
    newAnimeInstance({
      targets: item,
      opacity: [0, 1],
      duration: 500,
      delay: 500 * i,
    });
  });
};

const animateListIcons = (target) => {
  const listIcons = Array.from(
    document.querySelectorAll(`${target} + ul li img`)
  );

  if (listIcons.length > 0) {
    listIcons.forEach((item, i) => {
      newAnimeInstance({
        targets: item,
        scale: [0, 1],
        rotate: [0, 360],
        duration: 500,
        delay: 500 * i,
      });
    });
  }
};

const rotateArrowIcon = (parent) => {
  const parentElement = document.querySelector(parent);
  const arrowIcon = parentElement.querySelector("img");
  toggleClass(arrowIcon, "rotate-180");
};

const displayUnorderedList = (target) => {
  toggleHiddenAndFlexClasses(`${target} + ul`, ["hidden", "flex"], 500);
  toggleClass(document.querySelector(`${target} + ul`), "opacity-0");
};

const animateUnorderedList = (target, state, heightValue) => {
  const keyframes = returnAnimeKeyframes(state, heightValue);
  newAnimeInstance({
    targets: `${target} + ul`,
    keyframes,
    duration: 500,
  });
};

const runUnorderedListAnimations = (target, state, heightValue) => {
  displayUnorderedList(target);

  animateUnorderedList(target, state, heightValue);

  animateListIcons(target);

  animateListTexts(target);

  rotateArrowIcon(target);
};

export {
  animateMenuContainer,
  displayMenuContainer,
  animateMenuContent,
  runUnorderedListAnimations,
};
