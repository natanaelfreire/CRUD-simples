function mascara_tel() {
  var inputTelefone = document.getElementById('inputPhone');

  if (inputTelefone.value.length == 0)
    inputTelefone.value = '(';
  
  if (inputTelefone.value.length == 3)
    inputTelefone.value += ') ';

  if (inputTelefone.value.length == 9)
    inputTelefone.value += '-';
}

function iniciar_tel() {
  var inputTelefone = document.getElementById('inputPhone'); 

  if (inputTelefone.value.length == 0)
    inputTelefone.value = '(';
}