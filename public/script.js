const projetos = document.getElementById("projetos");

const createId = (items) => {
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute("id", i);
  }
};

const getIdsProject = (arr) => {
  const idArr = [];
  return arr.map((curr) => idArr.push(curr.id));
};

const saveIds = (ids) => {
  const idsToJson = JSON.stringify(ids);
  localStorage.setItem("ids", idsToJson);
};

const clone = (url) => {
  const input = document.createElement("input");
  input.value = url;
  input.id = "input";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
};

const setaHref = (link, targ) => {
  targ.setAttribute("href", link);
};

const settaImagem = (curr, card) => {
  /* background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.8; */
  switch (curr.language) {
    case "C":
      card.setAttribute("class", "card-style-bg-c-img");
      break;
    case "HTML":
      card.setAttribute("class", "card-style-bg-html-img");
      break;
    case "Go":
      card.setAttribute("class", "card-style-go-bg-img");
      break;
    case "JavaScript":
      card.setAttribute("class", "card-style-bg-js-img");
      break;
    case "CSS":
      card.setAttribute("class", "card-style-bg-css-img");
      break;
    default:
      card.setAttribute("class", "card-style-bg-no-image-img");
      break;
  }
};

const criaCards = (arr, fatherElement) => {
  return arr.map((curr) => {
    const div = document.createElement("div");
    div.setAttribute("class", "card");
    const span = document.createElement("span");
    span.innerText = curr.name;
    fatherElement.appendChild(div);
    div.appendChild(span);
    settaImagem(curr, div);
    // Fazer imgs, e dinamizar

    // links da div
    const l1 = document.createElement("a");
    l1.textContent = "LINK";
    setaHref(curr.html_url, l1);

    const l2 = document.createElement("a");
    l2.setAttribute("class", "link-clone");
    l2.textContent = "CLONE";
    const aurl = curr.html_url;
    l2.addEventListener("click", (url) => {
      url = aurl;
      const input = document.createElement("input");
      input.value = "git clone " + url;
      input.id = "input";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    });

    const l3 = document.createElement("a");
    l3.textContent = "MAIS INFORMAÇÕES";
    l3.setAttribute("class", "mais-info");
    l3.setAttribute("href", "./sobre.html");
    div.appendChild(l1);
    div.appendChild(l2);
    div.appendChild(l3);
  });
};

const getAndSaveids = (res) => {
  projetos.addEventListener("click", (e) => {
    const ids = [];
    const target = e.target;
    // Por que vai apenas um elemento no array quando dou push...
    // Descobri, é por que quando eu clico, eu recrio a variável ids e dou um push nela
    // Se eu quiser todos os ids coloco ela fora do addEventListenner :D
    if (typeof target.id !== "undefined" && target.id !== "") {
      ids.push(target.id);
    }
    saveIds(ids);
    console.log(ids);
  });
};

const maisInfo = document.getElementsByClassName("mais-info");

const url = "https://api.github.com/users/Saul97-arch/repos";

const req = new XMLHttpRequest();

req.open("GET", url, true);

req.onload = () => {
  const res = JSON.parse(req.response);
  getAndSaveids(res);
  criaCards(res, projetos);
  createId(maisInfo);
};

req.send();
