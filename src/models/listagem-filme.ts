export class Filme {
  id: number;
  titulo: string;
  visaoGeral: string;
  urlPoster: string;

  fav: boolean

  readonly urlDetalhes: string;

  constructor(id: number, titulo: string, visaoGeral: string, urlPoster: string) {
    this.id = id;
    this.titulo = titulo;
    this.visaoGeral = visaoGeral;
    this.urlPoster = urlPoster;
    this.urlDetalhes = `detalhes.html?id=${this.id}`;
  }
}