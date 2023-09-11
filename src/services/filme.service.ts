import { Filme } from "../models/listagem-filme";
import { DetalhesFilme } from "../models/detalhes-filme";
import { TrailerFilme } from "../models/trailer-filme";
import { CreditosFilme } from "../models/creditos-filme";

import {API_KEY} from "../../secrets"
import { LocalStorageService } from "./local-storage.service";

export class FilmeService {
  constructor()
  {
    // fetch(`https://api.themoviedb.org/3/movie/615656/videos`,
    // this.obterHeaderAutorizacao())
    // .then((res) => res.json())
    // .then((obj) => console.log("testeMovieApi", obj.results))
  }

  public selecionarFilmePorPopularidade(): Promise<Filme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br`;
    
    return fetch(url, this.obterHeaderAutorizacao())
    .then((res: Response): Promise<any> => this.processarResposta(res))
    .then((obj: any): Filme[] => this.mapearListaFilmes(obj.results));
  }

  public selecionarFilmes(): Promise<any[]> {
    const url = "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";

    return fetch(url, this.obterHeaderAutorizacao())
    .then((res: Response): Promise<Filme> => this.processarResposta(res))
    .then((obj: any): Filme[] => this.mapearListaFilmes(obj.results));
  }
  
  public selecionarFilmePorId(id: number): Promise<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-br`;

    return fetch(url, this.obterHeaderAutorizacao())
    .then((res): Promise<any> => this.processarResposta(res))
    .then((obj: any): DetalhesFilme => this.mapearDetalheFilme(obj));
  }

  public selecionarTrailerFilmePorId(id: number): Promise<TrailerFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    
    return fetch(url, this.obterHeaderAutorizacao())
    .then((res: Response): Promise<any> => this.processarResposta(res))
    .then((obj: any): TrailerFilme[] => this.mapearTrailerFilmes(obj.results));
  }

  public selecionarCreditosFilmePorId(id: number): Promise<CreditosFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-br`;
    
    return fetch(url, this.obterHeaderAutorizacao())
    .then((res: Response): Promise<any> => this.processarResposta(res))
    .then((obj: any): CreditosFilme[] => this.mapearCreditosFilme(obj.cast));
  }

  public selecionarFilmesPorIds(ids: number[]): Promise<DetalhesFilme[]> {
    const filmes = ids.map(id => this.selecionarFilmePorId(id));
    return Promise.all(filmes);
  } 

  private mapearCreditosFilme(listaCreditos: any): CreditosFilme[] {
    return listaCreditos.map((res: any) => {
      return new CreditosFilme(
        res.id,
        res.name,
        res.character,
        res.known_for_department,
        res.profile_path
      )
    })
  }
  
  private mapearListaFilmes(filmes: any): Filme[] {
    return filmes.map((filme: any) => {
      return new Filme(
        filme.id,
        filme.title,
        filme.overview,
        filme.poster_path
      )
    })
  }
  
  private mapearDetalheFilme(obj: any): DetalhesFilme {
    return new DetalhesFilme (
      obj.id,
      obj.title,
      obj.overview,
      obj.release_date,
      obj.poster_path,
      obj.poster_path,
      obj.vote_average,
      obj.vote_count,
      obj.genres.map((genre: any) => genre.name),
    )
  }
  
  private mapearTrailerFilmes(results: any): TrailerFilme[] {
    return results.map((res: any) => {
      return new TrailerFilme(
        res.id,
        res.key
      )
    })
  }

  private obterHeaderAutorizacao(){
    return     {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
      }
    }
  }

  private processarResposta(resposta: Response): Promise<any> {
    if (resposta.ok)
      return resposta.json();

    throw new Error('Filme não encontrado!');
  }
  
}