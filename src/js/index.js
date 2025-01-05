import {
  displayMenuContainer,
  menuContainerAnimations,
  menuContentAnimations,
  animateUnorderedList,
} from "./animations.js";

let unorderedFeaturesListVisible = false;

let unorderedCompanyListVisible = false;

document.addEventListener("click", (e) => {
  if (e.target.id === "menu-toggle") {
    displayMenuContainer();
    menuContainerAnimations(["rgba(0, 0, 0, 0)", "hsla(0, 0%, 8%, 0.8)"]);
    menuContentAnimations([425, 0], 500);
  }

  if (e.target.id === "close-menu") {
    displayMenuContainer();
    menuContainerAnimations(["hsla(0, 0%, 8%, 0.8)", "rgba(0, 0, 0, 0)"]);
    menuContentAnimations([0, 425], 0);
  }

  if (e.target.id === "features" || e.target.parentNode.id === "features") {
    animateUnorderedList("#features", unorderedFeaturesListVisible);

    unorderedFeaturesListVisible = !unorderedFeaturesListVisible;
  }

  if (e.target.id === "company" || e.target.parentNode.id === "company") {
    animateUnorderedList("#company", unorderedCompanyListVisible);

    unorderedCompanyListVisible = !unorderedCompanyListVisible;
  }
});
