import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  searchTerm: string = ''; // Usado para a busca de Pokemons

  headerDict: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Origin': '*',
  }

  constructor(private http: HttpClient) { }

  // Obtendo lista de Pokemons
  getPokeomons(){

    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=12`, requestOptions)
  }

  // Obtendo nome
  getMoreData(name: string){

    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`, requestOptions)
  }

}
