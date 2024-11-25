function burger() {
  const header = document.querySelector('.header');
  const menu = document.querySelector('.header__navigation');
  const burger = document.querySelector('.header__burger');
  const burgerPopup = document.querySelector('.burger_popup');
  const burgerPopupLink = document.querySelectorAll('.burger_popup__link');


  burger.addEventListener('click', function() {
    if (burger.classList.contains("active")) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      header.classList.remove("active");
      burgerPopup.classList.remove("active");
      document.documentElement.classList.remove("noscroll");

    } else {
      menu.classList.add("active");
      burger.classList.add("active");
      header.classList.add("active");
      burgerPopup.classList.add("active");
      document.documentElement.classList.add("noscroll");
    }
  })

  burgerPopupLink.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove("active");
      burger.classList.remove("active");
      header.classList.remove("active");
      burgerPopup.classList.remove("active");
      document.documentElement.classList.remove("noscroll");
    })
  })
}

export default burger;


