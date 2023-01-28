import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "vTCPCODGphd08aDaHPUKoN3AMc34mVal";
  private _historial: string[] = [];

  resultados: any[] = [];

  constructor(private http: HttpClient) { }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) this._historial.unshift(query);

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=vTCPCODGphd08aDaHPUKoN3AMc34mVal&q=${query}&limit=10`)
      .subscribe((response: any) => this.resultados = response.data);
  }
}
