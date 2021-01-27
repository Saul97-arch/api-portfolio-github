let ids = JSON.parse(localStorage.getItem("ids"));

if (ids === null) {
  ids = [];
}

const id = ids[0];
const h1 = document.createElement("h1");
const idProjeto = document.getElementById("id-projeto");
idProjeto.appendChild(h1);

const main = document.querySelector(".flex-container");
const foto = document.createElement("img");
main.appendChild(foto);

const linguagem = document.createElement("p");
main.appendChild(linguagem);

const commit = document.createElement("a");
main.appendChild(commit);

const seguidores = document.querySelector(".seguidores");

const url = "https://api.github.com/users/Saul97-arch/repos";

const req = new XMLHttpRequest();

req.open("GET", url, true);

req.onload = () => {
  const res = JSON.parse(req.response);
  h1.innerText = "Id do projeto: " + res[id].id;
  linguagem.innerText = "Linguagem do projeto: " + res[id].language;

  commit.setAttribute("href", res[id].commits_url);
  commit.innerText = "Link dos commits";

  const imagemLinguagem = document.createElement("img");
  switch (res[id].language) {
    case "C":
      imagemLinguagem.setAttribute("src", "img/c-logo.webp");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
    case "HTML":
      imagemLinguagem.setAttribute("src", "img/html-logo.png");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
    case "Go":
      imagemLinguagem.setAttribute("src", "img/go-logo.png");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
    case "JavaScript":
      imagemLinguagem.setAttribute("src", "img/js-logo.png");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
    case "CSS":
      imagemLinguagem.setAttribute("src", "img/css-logo.png");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
    default:
      imagemLinguagem.setAttribute("src", "img/no-image.png");
      imagemLinguagem.setAttribute("class", "imagem-linguagem");
      main.appendChild(imagemLinguagem);
      break;
  }

  foto.setAttribute(
    "src",
    "https://avatars.githubusercontent.com/u/55132010?v=4"
  );
  foto.setAttribute("class", "foto-perfil");
};

req.send();

/* 
Requisição para pegar os seguidores, ao que parece é um JSON separado, não consigo acessar do corpo de uma request só 
*/

// Usando fetch

fetch("https://api.github.com/users/Saul97-arch/followers")
  .then((res) => res.json())
  .then((followers) => {
    console.log(followers);
  });
