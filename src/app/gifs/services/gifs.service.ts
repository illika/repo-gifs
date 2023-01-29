import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "vTCPCODGphd08aDaHPUKoN3AMc34mVal";
  private _historial: string[] = [];

  resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem("Historial") !== null) {
      this._historial = JSON.parse(localStorage.getItem("Historial")!);
    }
    this.resultados = JSON.parse(localStorage.getItem("Resultados")!) ?? [];
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      localStorage.setItem("Historial", JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem("Resultados", JSON.stringify(this.resultados));
      });
  }
}
