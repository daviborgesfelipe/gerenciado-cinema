import { Filme } from "../models/listagem-filme";
import { FilmesFavoritos } from "../models/listagem-favoritos-filmes";

export class LocalStorageService {
  endereco: string = 'code-cine:historico@1.0.1'
  favoritos: FilmesFavoritos;

  salvarDados(dados: FilmesFavoritos): void {
    const jsonString = JSON.stringify(dados)
    localStorage.setItem(this.endereco, jsonString)
  } 

  carregarDados(): FilmesFavoritos {
    const dadosJson = localStorage.getItem(this.endereco);

    if (dadosJson)
      return JSON.parse(dadosJson) as FilmesFavoritos;

    return new FilmesFavoritos();
  }
}