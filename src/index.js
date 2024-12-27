import anime from "../node_modules/animejs/lib/anime.es.js";

document.addEventListener("click", (e) => {
  if (e.target.id === "menu-toggle") {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.classList.remove("hidden");
    menuContainer.classList.add("flex");

    anime({
      targets: "#menu-container",
      backgroundColor: ["transparent", "hsla(0, 0%, 8%, 0.8)"],
      delay: function (el, i) {
        return i * 100;
      },
      duration: 400,
      easing: "easeOutElastic(1, .8)",
      loop: false,
    });

    anime({
      targets: "#menu-content",
      translateX: [250, 0],
      delay: function (el, i) {
        return i * 500;
      },
    });
  }

  if (e.target.id === "close-menu") {
    anime({
      targets: "#menu-content",
      translateX: [0, 250],
    });

    anime({
      targets: "#menu-container",
      backgroundColor: "transparent!important",
      duration: 400,
      easing: "easeOutElastic(1, .8)",
      delay: function (el, i) {
        return i * 500;
      },
      loop: false,
    });
  }
});
