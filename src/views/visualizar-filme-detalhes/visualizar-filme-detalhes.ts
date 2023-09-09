import './visualizar-filme-detalhes.css'
import {API_KEY} from "../../../secrets"
import { FilmeService } from '../../services/filme.service'
import { Filme } from '../../models/listagem-filme';
import { TrailerFilme } from '../../models/trailer-filme';
import { DetalhesFilme } from '../../models/detalhes-filme';
import { CreditosFilme } from '../../models/creditos-filme';

export class VisualizarDetalhesFilme {
  
  pnlConteudo: HTMLDivElement;
  pnlCabecalho: HTMLDivElement;
  pnlImgVideo: HTMLDivElement;
  pnlPoster: HTMLDivElement;
  pnlTrailer: HTMLDivElement;
  pnlGenero: HTMLDivElement;
  pnlDescricao: HTMLDivElement;
  pnlCredito: HTMLDivElement;

  filmeService: FilmeService

  testeTreiler: TrailerFilme;
  testeDetalhes: DetalhesFilme;
  testeCredito: CreditosFilme;
  testeFilme: Filme;

  id: number;

constructor() {
  this.filmeService = new FilmeService()
  this.registrarElementos();

  const url = new URLSearchParams(window.location.search);
  let idCaminho: number = parseInt(url.get("id") as string) 
  this.id = idCaminho;

  this.filmeService.selecionarCreditosFilmePorId(idCaminho)
  .then((credito: any) => this.testeCredito = credito as CreditosFilme)
  .then((credito: any) => this.exibirCredito(credito))

  this.filmeService.selecionarFilmePorId(idCaminho)
  .then((filme: DetalhesFilme) => this.testeDetalhes = filme as DetalhesFilme)
  .then(filme => this.exibirFilme(filme))

  this.filmeService.selecionarTrailerFilmePorId(idCaminho)
  .then((trailer: any) => this.testeTreiler = trailer as TrailerFilme)
  .then(trailer => this.exibirTreiler(trailer))

  console.log(this.testeDetalhes)
}

registrarElementos(): void {
  this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
  this.pnlCabecalho = document.getElementById("pnlCabecalho") as HTMLDivElement;
  this.pnlImgVideo = document.getElementById("pnlImgVideo") as HTMLDivElement;
  this.pnlPoster = document.getElementById("pnlPoster") as HTMLDivElement;
  this.pnlTrailer = document.getElementById("pnlTrailer") as HTMLDivElement;
  this.pnlGenero = document.getElementById("pnlGenero") as HTMLDivElement;
  this.pnlDescricao = document.getElementById("pnlDescricao") as HTMLDivElement;
  this.pnlCredito = document.getElementById("pnlCredito") as HTMLDivElement;
}


exibirCredito(creditos: CreditosFilme[]): void {
  const creditosPorDepartamento: { [departamento: string]: string[] } = {};
  creditos.forEach((credito) => {
    const departamento = credito.departamento;

    if (!creditosPorDepartamento[departamento]) {
      creditosPorDepartamento[departamento] = [];
    }

    creditosPorDepartamento[departamento].push(credito.nome);
  });

  const tabelaCredito = document.createElement("table");
  tabelaCredito.classList.add(
    "table",
    "table-secondary",
    "fs-5",
    "text-dark",
    "bg-warning",
    "rounded-3",
    "fw-bolder",
    "table-striped"
  );

  const theadCredito = document.createElement("thead");
  const trCabecalho = document.createElement("tr");

  const thDepartamento = document.createElement("th");
  thDepartamento.scope = "col";
  thDepartamento.innerText = "Departamento";

  const thNomes = document.createElement("th");
  thNomes.scope = "col";
  thNomes.innerText = "Nomes";
  thNomes.classList.add("text-end")

  trCabecalho.appendChild(thDepartamento);
  trCabecalho.appendChild(thNomes);
  theadCredito.appendChild(trCabecalho);
  tabelaCredito.appendChild(theadCredito);

  const tbodyCredito = document.createElement("tbody");

  for (const departamento in creditosPorDepartamento) {
    if (creditosPorDepartamento.hasOwnProperty(departamento)) {
      const trDepartamento = document.createElement("tr");

      const tdDepartamento = document.createElement("td");
      tdDepartamento.innerText = departamento;

      trDepartamento.appendChild(tdDepartamento);

      const tdNomes = document.createElement("td");
      tdNomes.innerText = creditosPorDepartamento[departamento].join("- "); // Concatena os nomes
      tdNomes.classList.add("text-end")
      trDepartamento.appendChild(tdNomes);

      tbodyCredito.appendChild(trDepartamento);
    }
  }

  tabelaCredito.appendChild(tbodyCredito);

  this.pnlCredito.classList.add("rounded-3");
  this.pnlCredito.appendChild(tabelaCredito);
}


exibirFilme(filme: DetalhesFilme): any {
  this.exibirDetalhesFilme(filme)
  this.exibirConteudo(filme)
  this.exibirVisalGeralGenero(filme)
}

exibirDetalhesFilme(filme: DetalhesFilme): any {

  const lbTituloFilme = document.createElement("h1");
  lbTituloFilme.textContent = filme.titulo;
  lbTituloFilme.classList.add(
    "fs-1",
    "fw-bold",
    "text-warning",
    "w-100"
  )
  
  const lbNota = document.createElement("p")
  lbNota.textContent= `${filme.mediaNota.toPrecision(3)}/10.0`
  lbNota.classList.add("text-warning")

  const lbVotos = document.createElement("p");
  lbVotos.textContent = `${filme.contageVotos} votos`
  lbVotos.classList.add(
    "text-warning",
    "fs-6"
  )
  
  const iconFavorito = document.createElement("i")
  iconFavorito.classList.add(
    "bi",
    "bi-heart",
    "fs-2",
    "text-warning"
  )
  
  const divFavoritos = document.createElement("div")
  divFavoritos.classList.add(
  "ms-auto",
  "text-end",
  "w-50"
  )
  
  divFavoritos.appendChild(lbNota)
  divFavoritos.appendChild(lbVotos)
  divFavoritos.appendChild(iconFavorito)
  
  const conteudoCabecalho = document.createElement("div")
  conteudoCabecalho.classList.add(
    "d-flex",
    "align-itens-center",
    "w-100",
    "justify-content-between"
  )
  
  conteudoCabecalho.appendChild(lbTituloFilme)
  conteudoCabecalho.appendChild(divFavoritos)

  const smallDataLancamento = document.createElement("small")
  smallDataLancamento.classList.add(
    "fs-5",
    "text-warning"
  )
  smallDataLancamento.innerText = filme.dataLancamento
  
  const cabelhado = document.createElement("div")
  cabelhado.classList.add(
    "row", "justify-content-between"
  )
  
  cabelhado.appendChild(conteudoCabecalho)
    
  this.pnlCabecalho.appendChild(cabelhado)
  this.pnlCabecalho.appendChild(smallDataLancamento)

}
exibirVisalGeralGenero(filme: DetalhesFilme){
  const paragrafoVisaoGeral = document.createElement("p");
  paragrafoVisaoGeral.classList.add(
    "fs-5",
    "text-dark",
    "bg-warning",
    "rounded-3",
    "fw-bolder"
  )
  paragrafoVisaoGeral.innerText = filme.visaoGeral;
  
  for (let contador = 0; contador < filme.genero.length; contador++) {
    const genero =  filme.genero;
    let spanGenero = document.createElement("span")
    spanGenero.classList.add(
      "fs-5",
      "badge",
      "rounded-pill",
      "bg-warning",
      "text-dark",
      "my-2"

    )
    spanGenero.innerText = genero[contador];
    this.pnlGenero.appendChild(spanGenero)
  }
    
  this.pnlDescricao.appendChild(paragrafoVisaoGeral)
}

exibirTreiler(trailer: TrailerFilme): any {
  const iframeVideo = document.createElement("iframe")
  iframeVideo.allowFullscreen = true;
  iframeVideo.src = `https://www.youtube.com/embed/${trailer.sourceUrl}?controls=0`;
  iframeVideo.setAttribute("frameborder", "0");
  iframeVideo.classList.add("rounded-3")

  const divTrailer = document.createElement("div");
  divTrailer.classList.add("ratio", "ratio-21x9", "h-100")
  divTrailer.appendChild(iframeVideo);

  const imgVideo = document.createElement("div")
  imgVideo.classList.add("col-lg")

  imgVideo.appendChild(divTrailer)

  this.pnlImgVideo.appendChild(imgVideo)
}

exibirConteudo(filme: DetalhesFilme) {
  const imagemFilme = document.createElement("img")
  imagemFilme.classList.add("img-fluid", "rounded-3")
  imagemFilme.src = `https://image.tmdb.org/t/p/original${filme.urlPoster}`;
  
  const divImg = document.createElement("div")
  divImg.classList.add("col-lg-3")
  divImg.appendChild(imagemFilme)
  
  this.pnlImgVideo.appendChild(divImg)
}

}

window.addEventListener('load', () => {
  new VisualizarDetalhesFilme()
})

