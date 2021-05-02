var search_url = window.location.href;
var url = new URL(search_url);
var search_params = url.searchParams;
var id = search_params.get('id');

var api = 'https://api.box3.work/api/Contato/' + String(id);

var xhttp = new XMLHttpRequest();
xhttp.open('GET', api, true);

xhttp.onreadystatechange = () => {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var contato = JSON.parse(xhttp.response);
    console.log(contato);
    var nome = document.querySelector('#inputName');
    var email = document.querySelector('#inputEmail');
    var telefone = document.querySelector('#inputPhone');
    var dataNascimento = document.querySelector('#inputDate');
    var selectStatus = document.querySelector('#selectStatus');

    nome.value = contato.nome;
    email.value = contato.email;
    telefone.value = contato.telefone;
    dataNascimento.value = contato.dataNascimento.split('T')[0];
    
    if (contato.ativo) 
      selectStatus.value = '1';
    else
      selectStatus.value = '2';

  }
}

xhttp.send();