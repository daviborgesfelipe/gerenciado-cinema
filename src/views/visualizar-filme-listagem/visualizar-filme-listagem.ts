import './visualizar-filme-listagem.css';
import "bootstrap";

import { Filme } from "../../models/listagem-filme";
import { FilmeService } from '../../services/filme.service';

export class VisualizarListagemFilmes {
  
  pnlConteudo: HTMLDivElement;
  filmeService: FilmeService

  constructor(){
    this.filmeService = new FilmeService()
    this.registrarElementos();
    this.filmeService.selecionarFilmePorPopularidade()
    .then(filmes => this.exibirFilmesPorPopularidade(filmes))
  }

  private exibirFilmesPorPopularidade(filmes: Filme[]): void{
    console.log("exibirFilmesPorPopilaridade", filmes)
    const lbSessaoPagina = document.createElement("h2")
    lbSessaoPagina.textContent = "Filmes em Alta";
    lbSessaoPagina.classList.add(
      "fs-1", 
      "fw-bold",
      "text-warning",
      "pt-4"
    )

    const linhasCard = document.createElement("div")
    linhasCard.classList.add(
      "row",
      "g-3",
      "border-bottom",
      "border-warning-subtle",
      "pb-5" 
    )
    linhasCard.appendChild(lbSessaoPagina)

    for(let filme of filmes){
      const coluna = document.createElement("div");
      coluna.classList.add(
        "app-coluna-poster",
        "col-6",
        "col-md-4",
        "col-lg-2"
      )
      coluna.classList.add("text-center");
      coluna.addEventListener("click", () => {
        window.location.href = filme.urlDetalhes
      })

      const card = document.createElement("div");
      card.classList.add("d-grid", "gap-2");

      const imgFilme = document.createElement("img");
      imgFilme.classList.add("img-fluid", "rounded-3")
      imgFilme.src = `https://image.tmdb.org/t/p/original${filme.urlPoster}`;
      console.log("IMAGEM FILME",imgFilme.src)

      const lbTituloFilme = document.createElement("a");
      lbTituloFilme.classList.add(
        "fs-5",
        "link-warning",
        "fw-bold",
        "text-decoration-none"
      );
      lbTituloFilme.textContent = filme.titulo;
      lbTituloFilme.href = filme.urlDetalhes;

      card.appendChild(imgFilme);
      card.appendChild(lbTituloFilme);
      coluna.appendChild(card);
      linhasCard.appendChild(coluna);
    }
    this.pnlConteudo.appendChild(linhasCard)
  }

  registrarElementos(): void {
    this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
  }

}

window.addEventListener('load', () => new VisualizarListagemFilmes)