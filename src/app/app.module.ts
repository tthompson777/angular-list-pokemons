import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
