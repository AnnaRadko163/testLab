function questions() {

  if(document.querySelector('.questions__item')) {
    const questionsItem = document.getElementsByClassName("questions__item");
    for (let i = 0; i < questionsItem.length; i++) {
      questionsItem[i].onclick = function(e) {
        const questionsItemNext = this.children[1];
        const questionsItembottom = document.getElementsByClassName("questions__item_descr");
        const questionsItemActive = document.getElementsByClassName("questions__item active");
        if (questionsItemNext.style.maxHeight) {
          questionsItemNext.style.maxHeight = null;
          this.classList.remove("active");
        } else {
          for (let q = 0; q < questionsItemActive.length; q++) {
            questionsItemActive[q].classList.remove("active");
            questionsItembottom[q].classList.remove("active");
          }
          for (let p = 0; p < questionsItembottom.length; p++) {
            this.classList.remove("active");
            questionsItembottom[p].classList.remove("active");
            questionsItembottom[p].style.maxHeight = null;
          }
          questionsItemNext.style.maxHeight = questionsItemNext.scrollHeight + "px";
          this.classList.add("active");
        }
      };
    }
  }
}
export default questions;