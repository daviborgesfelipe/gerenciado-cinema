export class DetalhesFilme {
  id: number;
  titulo: string;
  visaoGeral: string;
  dataLancamento: string;

  urlPoster: string;
  urlSlide: string;

  mediaNota: number;
  contageVotos: number;

  genero: string[];

  fav: boolean

  constructor(
    id: number,
    titulo: string,
    visaoGeral: string,
    dataLancamento: string,
    urlPoster: string,
    urlSlide: string,
    mediaNota: number,
    contageVotos: number,
    genero: string[]
    ) {
    this.id = id;
    this.titulo = titulo;
    this.visaoGeral = visaoGeral;
    this.dataLancamento = dataLancamento;
    this.urlPoster = urlPoster;
    this.urlSlide = urlSlide;
    this.mediaNota = mediaNota;
    this.contageVotos = contageVotos;
    this.genero = genero;   
    this.fav = false  
  }
}