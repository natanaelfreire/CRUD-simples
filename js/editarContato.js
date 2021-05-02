var search_url = window.location.href;
var url = new URL(search_url);
var search_params = url.searchParams;
var id = search_params.get('id');

var api = 'https://api.box3.work/api/Contato/' + String(id);

function salvarMudancas(event) {
  event.preventDefault();

  var regex = new RegExp('\\([0-9]{2}\\)\\s[0-9]{4}-[0-9]{4}', 'g');
  var nome = document.querySelector('#inputName').value;
  var email = document.querySelector('#inputEmail').value;
  var telefone = document.querySelector('#inputPhone').value;
  var dataNascimento = document.querySelector('#inputDate').value;
  var selectStatus = document.querySelector('#selectStatus').value;
  var ativo;

  if (!nome || !email || !telefone || !dataNascimento) {
    var mensagem = document.querySelector('#mensagem');
    mensagem.innerHTML = 'Falta preencher campos!';
    mensagem.setAttribute('class', 'alert alert-danger');

    setTimeout(() => {
      mensagem.removeAttribute('class');
      mensagem.innerHTML = '';
    }, 1500);

    return;
  }

  if (!regex.test(telefone)) {
    var mensagem = document.querySelector('#mensagem');
    var inputTelefone = document.querySelector('#inputPhone');
    inputTelefone.focus();
    mensagem.innerHTML = 'Telefone em formato diferente!';
    mensagem.setAttribute('class', 'alert alert-danger');

    setTimeout(() => {
      mensagem.removeAttribute('class');
      mensagem.innerHTML = '';
    }, 1500);

    return;
  }

  if (selectStatus == 1) 
    ativo = true;
  else 
    ativo = false;

  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', api, true);
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhttp.onreadystatechange = () => { 
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var mensagem = document.querySelector('#mensagem');
      mensagem.innerHTML = 'Mudanças salvas com sucesso!';
      mensagem.setAttribute('class', 'alert alert-success');
      
      setTimeout(() => {
        window.location = '/index.html';
      }, 1000);
    }
  }

  xhttp.send(JSON.stringify({
    nome,
    telefone,
    email,
    ativo,
    dataNascimento,
  }));
}