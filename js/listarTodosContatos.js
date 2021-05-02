var url = 'https://api.box3.work/api/Contato';

var xhttp = new XMLHttpRequest();
xhttp.open('GET', url, true);

xhttp.onreadystatechange = () => {
  var contactsDisplay = document.querySelector('#contacts-display');
  contactsDisplay.innerHTML = '';

  if (xhttp.readyState == 4 && xhttp.status == 200) {
    JSON.parse(xhttp.response).forEach(contato => {
      var dataFormatada = contato.dataNascimento.split('T')[0].split('-').reverse().join('/');

      contactsDisplay.innerHTML += 
      `<div class="card m-2" style="width: 22rem;">
        <div class="card-body">
          <h4 class="card-title">${contato.nome}</h4>
          <p class="card-text">Telefone: ${contato.telefone}</p>
          <p class="card-text">Email: ${contato.email}</p>
          <p class="card-text">Ativo: ${contato.ativo ? "Sim" : "Não"}</p>
          <p class="card-text">Data de Nascimento: ${dataFormatada}</p>
          <div class="d-flex" style="justify-content: space-between;">
            <a href="/pages/editar-contato.html?id=${contato.id}" class="btn btn-outline-secondary">Editar</a>
            <button class="btn btn-outline-danger" onclick="excluirContato(${contato.id})">Excluir</button>
          </div>
        </div>
      </div>`;
    });
  }
}

xhttp.send();

function excluirContato(id) {
  var retorno = window.confirm('Confirmar exclusão?');

  if (!retorno) return;

  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', url + `/${id}`);
  xhr.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location.reload();
    }
  }
  xhr.send();
}
