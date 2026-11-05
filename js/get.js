//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-herois");
const modelo = document.querySelector("#modelo-heroi");

const apiKey="cv_bYL6bJ3UTOHrBHj_3sY6kGdw5H71hFdcN-qHtfOehBx8ptSFOO4QgvSWnTMHx0nM";
const apiUrl="https://api-ds.codeverse.dev.br/api/atletas";

//Funcao que busca todos os herois da API

async function buscarHerois() {
  resposta.textContent = "Carregando atletas..."

  try {
    //Fazer uma requisicao GET para buscar os herois
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os herois")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os herois e montar o heroi.

    for (const heroi of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = heroi.title;
      card.querySelector(".poder").textContent = heroi.poder;
      card.querySelector(".universo").textContent = heroi.universo;
      card.querySelector(".fraqueza").textContent = heroi.fraqueza;

      const imagem = card.querySelector("img");

      if(heroi.imageUrl){
        imagem.src = heroi.imageUrl;
        imagem.alt =  heroi.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os herois. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarHerois();