import {
  displayMenuContainer,
  animateMenuContainer,
  animateMenuContent,
  runUnorderedListAnimations,
} from "./animations.js";

let isOpenFeaturesMenu = false;
let isOpenCompanyMenu = false;

const getTargetId = (e) => {
  return e.target.id || e.target.parentNode.id;
};

const isTargetId = (e, id) => getTargetId(e) === id;

const toggleMenuState = (value) => !value;

const switchMenuToggle = (e) => {
  const openMenuToggleParameter = ["rgba(0, 0, 0, 0)", "hsla(0, 0%, 8%, 0.8)"];
  const closeMenuToggleParameter = ["hsla(0, 0%, 8%, 0.8)", "rgba(0, 0, 0, 0)"];

  const openAnimateMenuContentParameter = [[425, 0], 500];
  const closeAnimateMenuContenParameter = [[0, 425], 0];

  const animateMenuContainerParameter =
    getTargetId(e) === "menu-toggle"
      ? openMenuToggleParameter
      : closeMenuToggleParameter;

  const animateMenuContentParameter =
    getTargetId(e) === "menu-toggle"
      ? openAnimateMenuContentParameter
      : closeAnimateMenuContenParameter;

  animateMenuContainer(animateMenuContainerParameter);

  animateMenuContent(animateMenuContentParameter);

  displayMenuContainer();
};

const switchUnorderedListAnimation = (e) => {
  const target = getTargetId(e) === "company";
  const id = target ? "#company" : "#features";
  const state = target ? isOpenCompanyMenu : isOpenFeaturesMenu;
  const heightValue = target ? 100 : 120;

  const unorderedListAnimationParameter = {
    id,
    state,
    heightValue,
  };

  runUnorderedListAnimations(unorderedListAnimationParameter);

  if (getTargetId(e) === "company") {
    isOpenCompanyMenu = toggleMenuState(isOpenCompanyMenu);
    return;
  }

  isOpenFeaturesMenu = toggleMenuState(isOpenFeaturesMenu);
};

document.addEventListener("click", (e) => {
  if (isTargetId(e, "menu-toggle") || isTargetId(e, "close-menu")) {
    switchMenuToggle(e);
  }

  if (isTargetId(e, "features") || isTargetId(e, "company")) {
    switchUnorderedListAnimation(e);
  }
});
