import './visualizar-filme-listagem.css';
import "bootstrap";

import { Filme } from "../../models/listagem-filme";
import { FilmeService } from '../../services/filme.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmesFavoritos } from '../../models/listagem-favoritos-filmes';
import { DetalhesFilme } from '../../models/detalhes-filme';

export class VisualizarListagemFilmes {
  
  pnlConteudo: HTMLDivElement;
  filmeService: FilmeService
  listaFilmesFav: FilmesFavoritos
  localStorageService: LocalStorageService
  constructor(){
    this.localStorageService = new LocalStorageService();
    this.listaFilmesFav = this.localStorageService.carregarDados();

    this.filmeService = new FilmeService()

    this.registrarElementos();
    this.registraChamada(this.listaFilmesFav.ids)
  }

  registraChamada(ids: number[]){
    this.filmeService.selecionarFilmePorPopularidade()
    .then(filmes => this.exibirFilmesPorPopularidade(filmes))

    if(this.listaFilmesFav.ids.length > 0){
      this.filmeService.selecionarFilmesPorIds(ids)
      .then(filmes => this.exibirFilmesFavoritos(filmes))
    }
  }

  private exibirFilmesFavoritos(filmes: DetalhesFilme[]): void{
    const lbSessaoPagina = document.createElement("h2")
    lbSessaoPagina.textContent = "Filmes em Favoritos";
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
        window.location.href = `detalhes.html?id=${filme.id}`;
      })

      const card = document.createElement("div");
      card.classList.add("d-grid", "gap-2");

      const imgFilme = document.createElement("img");
      imgFilme.classList.add("img-fluid", "rounded-3")
      imgFilme.src = `https://image.tmdb.org/t/p/original${filme.urlPoster}`;

      const lbTituloFilme = document.createElement("a");
      lbTituloFilme.classList.add(
        "fs-5",
        "link-warning",
        "fw-bold",
        "text-decoration-none"
      );
      lbTituloFilme.textContent = filme.titulo;
      lbTituloFilme.href = `detalhes.html?id=${filme.id}`;

      card.appendChild(imgFilme);
      card.appendChild(lbTituloFilme);
      coluna.appendChild(card);
      linhasCard.appendChild(coluna);
    }
    this.pnlConteudo.appendChild(linhasCard)
  }

  private exibirFilmesPorPopularidade(filmes: Filme[]): void{
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