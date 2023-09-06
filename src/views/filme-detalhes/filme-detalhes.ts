import './filme-detalhes.css'
import {API_KEY} from "../../../secrets"

export class DetalheFilme {

constructor() {
  fetch("https://api.themoviedb.org/3/movie/popular?language=pt-br",
    this.obterHeaderAutorizacao())
  .then((res) => res.json())
  .then((obj) => console.log(obj))
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
}
window.addEventListener('load', () => {
  new DetalheFilme()
})