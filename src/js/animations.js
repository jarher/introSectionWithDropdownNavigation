import anime from "../../node_modules/animejs/lib/anime.es.js";

let menuVisible = false;

const menuContainerAnimations = (backgroundColor) =>
  anime({
    targets: "#menu-container",
    backgroundColor,
    delay: 300,
    duration: 400,
    easing: "easeOutElastic(1, .8)",
    loop: false,
  });

const displayMenuContainer = () => {
  const menuContainer = document.getElementById("menu-container");
  menuVisible = !menuVisible;

  const exec = menuVisible
    ? () => {
        menuContainer.classList.toggle("hidden");
        menuContainer.classList.add("flex");
      }
    : () =>
        setTimeout(() => {
          menuContainer.classList.toggle("hidden");
          menuContainer.classList.remove("flex");
        }, 1000);

  exec();
};

const menuContentAnimations = (translateX, delayValue) =>
  anime({
    targets: "#menu-content",
    translateX,
    delay: delayValue,
  });

const returnAnimeKeyframes = (booleanValue) =>
  booleanValue
    ? [
        { maxHeight: "150px", opacity: 0, marginTop: "1rem" },
        { maxHeight: "0", opacity: 0, marginTop: 0 },
      ]
    : [
        { maxHeight: "0", opacity: 0, marginTop: 0 },
        { maxHeight: "150px", opacity: 1, marginTop: "1rem" },
      ];

const animateListTexts = (parent) => {
  const listText = Array.from(
    document.querySelectorAll(`${parent} + ul li span`)
  );
  listText.forEach((item, i) => {
    anime({
      targets: item,
      opacity: [0, 1],
      duration: 500,
      delay: 500 * i,
      easing: "easeInOutQuad",
    });
  });
};

const animateListIcons = (icons) => {
  icons.forEach((item, i) => {
    anime({
      targets: item,
      scale: [0, 1],
      rotate: [0, 360],
      duration: 500,
      delay: 500 * i,
      easing: "easeInOutQuad",
    });
  });
};

const rotateArrowIcon = (parent, booleanValue) => {
  anime({
    targets: `${parent} > img`,
    keyframes: [
      { rotate: booleanValue ? 0 : 180 },
      { rotate: booleanValue ? 180 : 0 },
    ],
    duration: 300,
    easing: "easeOutElastic(1, .8)",
    loop: false,
  });
};

const animateUnorderedList = (target, unorderListVisible) => {
  const keyframes = returnAnimeKeyframes(unorderListVisible);

  const listIcons = Array.from(
    document.querySelectorAll(`${target} + ul li img`)
  );

  anime({
    targets: `${target} + ul`,
    keyframes,
    duration: 500,
    easing: "easeInOutQuad",
  });

  if (listIcons.length > 0) {
    animateListIcons(listIcons);
  }

  animateListTexts(target);

  rotateArrowIcon(target, !unorderListVisible);
};

export {
  menuContainerAnimations,
  displayMenuContainer,
  menuContentAnimations,
  animateUnorderedList,
};
