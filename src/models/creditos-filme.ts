export class CreditosFilme {
  ordem: number;
  nome: string;
  departamento: string;
  caminho_imagem: string;
  personagem: string

  constructor
  (
    ordem: number,
    nome: string,
    personagem: string,
    departamento: string,
    caminho_imagem: string
  ) {
    this.ordem = ordem;
    this.nome = nome;
    this.personagem = personagem; 
    this.departamento = departamento;
    this.caminho_imagem = caminho_imagem;
  }
}