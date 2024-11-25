function form() {
  // start mask phone
  const phone_input = document.querySelector('[data-phone-pattern]');
  if (phone_input) {
    phone_input.addEventListener("mouseover", function () {
      const eventCalllback = function (e) {
        let el = e.target,
          clearVal = el.dataset.phoneClear,
          pattern = el.dataset.phonePattern,
          matrix_def = "+7(___) ___-__-__",
          matrix = pattern ? pattern : matrix_def,
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
          if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            this.parentElement.classList.add('error');
            this.parentElement.classList.remove('success');
            this.nextElementSibling.classList.remove('success');
            return;
          }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
      }
      const phone_inputs = document.querySelectorAll('[data-phone-pattern]');
      for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
        }
      }
    });
  }
  // end mask phone

  const form = document.getElementById('form');

  const formInputs = document.querySelectorAll(".form__input");
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", updateformValue);
  }

  function updateformValue() {
    const firstSibling = this.nextElementSibling;
    firstSibling.nextElementSibling.children[0].textContent = Math.max(0, Math.min(this.getAttribute('maxl'), this.value.length));
    if (this.value.length < this.getAttribute('minl')) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      firstSibling.nextElementSibling.classList.remove('success');
    } else {
      this.parentElement.classList.remove('error');
      this.parentElement.classList.add('success');
      firstSibling.nextElementSibling.classList.add('success');
    }
  }

  function setErrorFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control error';
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control success';
  }

  if(form) {
    const formName = document.getElementById('form__name');
    const formPhone = document.getElementById('form__phone');
    const formCheckbox = document.getElementById('form__checkbox');
    const formNameMin = formName.getAttribute('minl');
    const formNameMax = formName.getAttribute('maxl');
    const formPhoneMin = formPhone.getAttribute('minl');
    const formPhoneMax = formPhone.getAttribute('maxl');
    const formBtn = document.getElementById('form__btn');
    const formControl = document.querySelectorAll('.form__control');
    const formSubmit= document.querySelector('.form__submit');
    const formInput = document.querySelectorAll('.form__input');
    
    formInput.forEach(input => {
      input.setAttribute('placeholder', '');

      input.addEventListener('focus', function() {
        input.setAttribute('placeholder', 'Text');
      });
    
      input.addEventListener('blur', function() {
        if (!input.value) {
          input.setAttribute('placeholder', '');
        }
      });
    })
    
    formName.oninput = function(){
      this.value = this.value.substr(0, formNameMax);
      this.value = this.value.replace(/[0-9]/g, '');
      this.value = this.value.replace(/[()!?•—@:,'";№\-_=« »<>%#~`&\/\$\^\.\*\+\\\{\}\[\]\(\|]$/g, '');
    }

    formPhone.oninput = function(){
      this.value = this.value.substr(0, formPhoneMax);
    }

    formBtn.addEventListener('click', e => {
      e.preventDefault();
      checkformInputs();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      checkformInputs();
    });

    
    function checkformInputs() {
      const formNameValue = formName.value.trim();
      const formPhoneValue = formPhone.value.trim();
      
      if(formNameValue !== '' && formNameValue.length >= formNameMin && formNameValue.length <= formNameMax) {
        setSuccessFor(formName);
      } else {
        setErrorFor(formName);
      }
      if(formPhoneValue !== '' && formPhoneValue.length >= formPhoneMin && formPhoneValue.length <= formPhoneMax) {
        setSuccessFor(formPhone);
      } else {
        setErrorFor(formPhone);
      }
      if(formCheckbox.checked) {
        formCheckbox.nextElementSibling.classList.remove('error');
      } else {
        formCheckbox.nextElementSibling.classList.add('error');
      }
      
      if(
      formNameValue !== '' && formNameValue.length >= formNameMin && formNameValue.length <= formNameMax && 
      formPhoneValue !== '' && formPhoneValue.length >= formPhoneMin && formPhoneValue.length <= formPhoneMax && 
      formCheckbox.checked) {
        fetch('/ajax/', {
          method: 'POST',
          body: JSON.stringify({
            formNameValue: formNameValue,
            formPhoneValue: formPhoneValue,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        })
        .then(() => {
          formName.value = '';
          formPhone.value = '';
          formCheckbox.checked = false;
          formControl.forEach( item => item.classList.remove('success'))
          formSubmit.classList.add('active')
        })
      }
    }
  }
}

export default form;