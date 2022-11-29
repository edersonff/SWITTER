const colorList = [
  "2F4F4F",
  "696969",
  "708090",
  "778899",
  "BEBEBE",
  "D3D3D3",
  "191970",
  "000080",
  "6495ED",
  "483D8B",
  "0000CD",
  "4169E1",
  "0000FF",
  "1E90FF",
  "00BFFF",
  "87CEEB",
  "87CEFA",
  "4682B4",
  "B0C4DE",
  "BA55D3",
  "FF69B4",
  "F08080",
  "E9967A",
  "F5F5DC",
  "FFFF00",
  "4169E1",
  "000080",
  "708090",
  "F0F8FF",
  "F0FFF0",
  "FFEBCD",
  "F8F8FF",
  "00FA9A",
  "B22222",
  "483D8B",
  "FFDAB9",
];

const CONST = {
  BaseUrl: 'http://localhost:8080',
  colorList: colorList
}

function api(route = "/api", method = "GET", body) {
  return new Promise((resolve, reject) => {
    fetch(CONST.BaseUrl + route, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    }).then((res) => {
      res.json()
        .then((data) => {
          return resolve(data);
        })
        .catch(reject)
    })
      .catch(reject);
  });
};

function cadastrar() {
  const body = {};
  body.nome = document.getElementById('nome').value;
  body.email = document.getElementById('email').value;
  body.senha = document.getElementById('senha').value;

  if (!document.getElementById('checkbox').checked) {
    alert('Concorde com os termos de serviço!');
    return
  }

  if (!body.nome || !body.email || !body.senha) {
    alert('Informações Incompletas!');
    return;
  }

  if (body.email.split('@')[1] !== 'gmail.com') {
    alert('Use um email válido!');
  }

  api('/api/usuario/', 'POST', body)
    .then(data => {
      delete data.senha;
      localStorage.setItem('usuario', JSON.stringify(data));
      alert('Sucesso');
      window.location.href = '/';
    }).catch(() => alert('Algo Deu Errado, Tente Novamente'));
}

function logout() {
  localStorage.setItem('usuario', '');
  window.location.href = '/login';
}

function logar() {
  const body = {};
  body.email = document.getElementById('email').value;
  body.senha = document.getElementById('senha').value;

  if (!body.email || !body.senha) {
    alert('Informações Incompletas!');
    return;
  }

  api('/api/usuario/', 'GET')
    .then(data => {
      let aproovedUser = null;

      data.map((user) => {
        if (user.email == body.email && user.senha == body.senha) {
          aproovedUser = user;
        }
      });

      if (aproovedUser) {
        localStorage.setItem('usuario', JSON.stringify(aproovedUser));
        window.location.href = '/';
      } else {
        alert("Usuário ou Senha não encontrado!");
      }
    })
    .catch(() => alert('Algo Deu Errado, Tente Novamente'));

}

function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem('usuario'));
    return user;
  } catch {
    return null
  }
}

function createMessage() {
  const user = getUser();
  const body = {};

  body.body = document.getElementById('feed-input').value;
  body.dataCriacao = new Date();
  body.chat = { id: 1 };
  body.autor = { id: user.id };

  if (!body.body) {
    return;
  }

  api('/api/mensagem', 'POST', body).then((res) => { console.log(res); init() });
}

function init() {
  const user = getUser();
  if (!user && window.location.href === 'http://localhost:4000/') {
    window.location.href = '/login';
    return;
  }

  api('/api/chat/1', 'GET')
    .then(console.log)
    .catch(() => {
      api('/api/chat/', 'POST', { dataCriacao: new Date() });
    });

  if (window.location.href !== 'http://localhost:4000/') {
    return;
  }

  api('/api/mensagem/', 'GET').then((res) => {
    console.log(res);

    let HTML = `
    <div class="usuario">
    <div class="informacoes">
        <div class="informacoes-usuario">
            <div class="foto">
                <img src="https://avatars.githubusercontent.com/u/97001424?v=4" alt="">
            </div>
            <div class="nome-usuario">
                <p class="nome">Vitor Da Clinicorp 🍊</p>
                <p class="arroba">@vitor</p>
            </div>
        </div>
        <p class="horario">33/02/2025 49:92:10</p>

    </div>
    <div class="publicacao">
        <p>
        Este é o chat geral conhecido como Feed! Aqui nós podemos conversar com todos do servidor! Peço por gentileza
        que mantenham o caos instaurado neste lugar, a fim de demonstrarmos respeito com os aqui presentes!
        .
        </p>
    </div>

    <div class="reacoes">
        <div class="emojis">
            <div class="emoji">😋 <p>1</p>
            </div>

            <div class="emoji">🐸 <p>1</p>
            </div>

            <div class="add">+
            </div>
        </div>

        <div class="comportamentos">
            <div class="resweetar">
                <span class="material-symbols-outlined">
                    keyboard_return
                </span>
            </div>
            <div class="comentar">
                <span class="material-symbols-outlined">
                    chat_bubble
                </span>
            </div>
        </div>
    </div>
</div>
    `;

    res.map((item) => {
      HTML += `
      <div class="usuario">
      <div class="informacoes">
          <div class="informacoes-usuario">
              <div class="foto" style="background-color: #${CONST.colorList[item.autor.id]};">
              </div>
              <div class="nome-usuario">
                  <p class="nome">${item.autor.nome}</p>
                  <p class="arroba">@${item.autor.nome}</p>
              </div>
          </div>
          <p class="horario">${new Date(item.dataCriacao).toLocaleString()}</p>

      </div>
      <div class="publicacao">
          <p>${item.body}</p>
      </div>

      <div class="reacoes">
          <div class="emojis">
              <div class="emoji">😋 <p>${(Math.random() * 1000).toFixed(0)}</p>
              </div>

              <div class="emoji">🐸 <p>${(Math.random() * 1000).toFixed(0)}</p>
              </div>

              <div class="add">+
              </div>
          </div>

          <div class="comportamentos">
              <div class="resweetar">
                  <span class="material-symbols-outlined">
                      keyboard_return
                  </span>
              </div>
              <div class="comentar">
                  <span class="material-symbols-outlined">
                      chat_bubble
                  </span>
              </div>
          </div>
      </div>
  </div>
      `;
    });

    document.getElementById('feed-mensagem-area').innerHTML = HTML;
  });
}


init()