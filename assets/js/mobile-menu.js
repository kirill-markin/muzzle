document.addEventListener("DOMContentLoaded", function () {
  const mobileButton = document.querySelector(".header-mobile-button");
  const mobileMenu = document.querySelector(".header-mobile-menu-open");

  mobileButton.addEventListener("click", function () {
    const isMenuVisible = mobileMenu.classList.toggle("visible");

    // If menu is visible, remove 'closed' class to show open state
    // If menu is hidden, add 'closed' class to show closed state
    if (isMenuVisible) {
      mobileButton.classList.remove("closed");
      mobileButton.classList.add("open");
    } else {
      mobileButton.classList.remove("open");
      mobileButton.classList.add("closed");
    }
  });
});
