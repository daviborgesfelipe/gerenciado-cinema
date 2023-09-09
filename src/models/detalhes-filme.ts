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
    this.urlPoster = `https://image.tmdb.org/t/p/original${urlPoster}`;
    this.urlSlide = `https://image.tmdb.org/t/p/original${urlSlide}`;
    this.mediaNota = mediaNota;
    this.contageVotos = contageVotos;
    this.genero = genero;     

    console.log(this.genero)
    console.log(genero)
  }
}