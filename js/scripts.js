class Validator {

  constructor() {
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-only-letters',
      'data-email-validate',
      'data-required',
      'data-date-validate'
    ]
  }

  // inicia a validação de todos os campos
  validate(form) {

    // limpa todas as validações antigas
    let currentValidations = document.querySelectorAll('form .error-validation');

    if(currentValidations.length) {
      this.cleanValidations(currentValidations);
    }

    // pegar todos inputs
    let inputs = form.getElementsByTagName('input');
    // transformar HTMLCollection em arr
    let inputsArray = [...inputs];

    // loop nos inputs e validação mediante aos atributos encontrados
    inputsArray.forEach(function(input, obj) {

      // fazer validação de acordo com o atributo do input
      for(let i = 0; this.validations.length > i; i++) {
        if(input.getAttribute(this.validations[i]) != null) {

          // limpa string para saber o método
          let method = this.validations[i].replace("data-", "").replace("-", "");

          // valor do input
          let value = input.getAttribute(this.validations[i])

          // invoca o método
          this[method](input,value);

        }
      }

    }, this);

  }

  // método para validar se tem um mínimo de caracteres
  minlength(input, minValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar strings que só contem letras
  onlyletters(input) {

    let re = /^[A-Za-z]+$/;;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if(!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar e-mail
  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão biavasconcelos@gmail.com`;

    if(!re.test(email)) {
      this.printMessage(input, errorMessage);
    }

  }

  datevalidate(input) {
    let current = new Date();
    let date = new Date(input.value);
    console.log(date.getDate())

    let now = current.getTime();
    let selected = date.getTime();  

    console.log(current, date)

    let errorMessage = `Data selecionada menor que a atual.`;

    if(selected < now) {
      this.printMessage(input, errorMessage);
    }
  }
  
  // método para exibir inputs que são necessários
  required(input) {

    let inputValue = input.value;

    if(inputValue === '') {
      let errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage);
    }

  }


  // método para imprimir mensagens de erro
  printMessage(input, msg) {
  
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if(errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg;
  
      let inputParent = input.parentNode;
  
      template.classList.remove('template');
  
      inputParent.appendChild(template);
    }

  }

  // remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();

  validator.validate(form);
  order();
});



function order() {
  event.preventDefault();
  let url = "https://jsonplaceholder.typicode.com/posts";
  let cake = document.querySelector('input[name="cake"]:checked').value
  let name = document.getElementById("name").value
  let lastName = document.getElementById("lastname").value
  let deliveryDate = document.getElementById("deliverydate").value
  let phone = document.getElementById("phone").value
  let email = document.getElementById("email").value
  let address = document.getElementById("address").value
  let city = document.getElementById("city").value
  let region = document.getElementById("region").value
  let zipCode = document.getElementById("zipcode").value
  let country = document.getElementById("country").value

  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      mode: "no-cors",
      body: JSON.stringify({
        cake: cake,
        name: name,
        lastName: lastName,
        deliveryDate: deliveryDate,
        phone: phone,
        email: email,
        address: address,
        city: city,
        region: region,
        zipCode: zipCode,
        country: country
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(function(response) {
      console.log(JSON.stringify({
        cake: cake,
        name: name,
        lastName: lastName,
        deliveryDate: deliveryDate,
        phone: phone,
        email: email,
        address: address,
        city: city,
        region: region,
        zipCode: zipCode,
        country: country
      }))
      return response.json();
  })
  .then(function(data) {
      console.log(data)
  })

}

