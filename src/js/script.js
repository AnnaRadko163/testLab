import "../index.html";
import '../sass/style.sass';
import burger from "./modules/burger";
import slider from "./modules/slider";
import form from './modules/form';
import questions from "./modules/questions";

window.addEventListener('DOMContentLoaded', () => {
  burger()
  slider()
  questions()
  form()
})
