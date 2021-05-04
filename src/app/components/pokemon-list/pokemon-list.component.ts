import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})

export class PokemonListComponent implements OnInit {

  pokemons: any[] = []; // Pokemons
  searchTerm: string = ''; // Usado para a busca de Pokemons
  infoError = false; // Exibe ou não o erro customizado
  showAlert = false; // Exibe ou não o alerta ao usuário que tentar pesquisar sem informar um nome

  headerDict: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  };

  constructor(private dataService: DataService, private http: HttpClient) {}

  // Obtendo Pokemon por nome
  listPokemonsByName(name: string) {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    // Se for nome for vazio, mostra alerta ao usuário
    if(name === '' || name === null){
       this.showAlert = true;
       return false;
    }

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, requestOptions)
      .subscribe(
        (response: any) => {
        console.log(response.status);
        this.pokemons = [];
        this.pokemons.push(response);
        this.infoError = false;
      },
      error => {
        if(error.status === 404){
          this.pokemons = [];
          this.infoError = true;
          this.showAlert = false;
        }
        console.log('oops', error)
      });
  }

  // Lista de Pokemons - Limite de 10
  listPokemons() {
    this.dataService.getPokeomons().subscribe((response: any) => {
      response.results.forEach((result: { name: string }) => {
        this.dataService
          .getMoreData(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemons.push(uniqResponse);
          });
      });
    });
  }

  // Carregar mais Pokemons - De 12 em 12
  loadMore() {
    this.pokemons;

    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

    let addPage = this.pokemons.length + 12;

    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${addPage}`, requestOptions)
      .subscribe((response: any) => {
        this.pokemons = [];
        response.results.forEach((result: { name: string }) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              this.showAlert = false;
            });
        });
      });
  }

  // Recarrega a página
  reloadPage() {
    window.location.reload();
  }

  ngOnInit(): void {
    this.listPokemons();
  }
}
