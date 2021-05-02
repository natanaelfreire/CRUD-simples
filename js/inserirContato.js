function criarContato(event) {
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

    var inputs = document.querySelectorAll('input');
    Array.from(inputs).find((element) => element.value.length == 0).focus();

    setTimeout(() => {
      mensagem.removeAttribute('class');
      mensagem.innerHTML = '';
    }, 2000);

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
    }, 2000);

    return;
  }

  if (selectStatus == 1) 
    ativo = true;
  else 
    ativo = false;

  var url = 'https://api.box3.work/api/Contato';

  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhttp.onreadystatechange = () => { 
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var mensagem = document.querySelector('#mensagem');
      mensagem.innerHTML = 'Criado com sucesso!';
      mensagem.setAttribute('class', 'alert alert-success');
      
      setTimeout(() => {
        window.location.reload();
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
