import { Filme } from "../models/listagem-filme";

export class LocalStorageService {
  listaFavoritos: Filme[] = [];
  endereco: string = 'termo-ts:historico@1.0.0'

  salvarDados(dados: Filme): void {
    this.listaFavoritos.push(dados)
    const jsonString = JSON.stringify(this.listaFavoritos)
    localStorage.setItem(this.endereco, jsonString)
  }

  carregarDados(): Filme[] {
    const dadosJson = localStorage.getItem(this.endereco);
    
    if (dadosJson)
      return JSON.parse(dadosJson) as Filme[];

    return this.listaFavoritos
  }
}