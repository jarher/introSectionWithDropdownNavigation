import {
  displayMenuContainer,
  animateMenuContainer,
  animateMenuContent,
  runUnorderedListAnimations,
} from "./animations.js";

let isOpenFeaturesMenu = false;
let isOpenCompanyMenu = false;

document.addEventListener("click", (e) => {
  if (e.target.id === "menu-toggle") {
    displayMenuContainer();
    animateMenuContainer(["rgba(0, 0, 0, 0)", "hsla(0, 0%, 8%, 0.8)"]);
    animateMenuContent([425, 0], 500);
  }

  if (e.target.id === "close-menu") {
    displayMenuContainer();
    animateMenuContainer(["hsla(0, 0%, 8%, 0.8)", "rgba(0, 0, 0, 0)"]);
    animateMenuContent([0, 425], 0);
  }

  if (e.target.id === "features" || e.target.parentNode.id === "features") {
    runUnorderedListAnimations("#features", isOpenFeaturesMenu, 120);
    !isOpenFeaturesMenu;
  }

  if (e.target.id === "company" || e.target.parentNode.id === "company") {
    runUnorderedListAnimations("#company", isOpenCompanyMenu, 100);
    !isOpenCompanyMenu;
  }
});
