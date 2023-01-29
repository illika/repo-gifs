import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = "https://api.giphy.com/v1/gifs";
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

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "10")
      .set("q", query);

    this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem("Resultados", JSON.stringify(this.resultados));
      });
  }
}
