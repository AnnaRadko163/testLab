import "../index.html";
import '../sass/style.sass';
import burger from "./modules/burger";
import slider from "./modules/slider";
import questions from "./modules/questions";
import form from './modules/form';

window.addEventListener('DOMContentLoaded', () => {
  burger()
  slider()
  questions()
  form()
  window.onload = function () {
    window.setTimeout(function () {
      document.body.classList.add('loaded_hiding');
      window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 0);
    }, 300);
  };
})
