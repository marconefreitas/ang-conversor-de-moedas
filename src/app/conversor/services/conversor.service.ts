import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversao } from '../models/Conversao';
import { ConversaoResponse } from '../models/ConversaoResponse';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {


  //Api key : 5bc459edcf4cbf240239
  //https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=5bc459edcf4cbf240239
  //{"USD_BRL":5.219999}
  private readonly BASE_URL = "https://free.currconv.com/api/v7/convert";
  constructor(private http: HttpClient) {}

  example :string  = '{"USD_BRL":5.219999}';

  converter(conversao: Conversao): Observable<ConversaoResponse> {
    let params = `?q=${conversao.moedaDe}_${conversao.moedaPara}&compact=ultra&apiKey=5bc459edcf4cbf240239`;
    return this.http.get<ConversaoResponse>(this.BASE_URL + params);
  }

  converter2(conversao: Conversao): ConversaoResponse {
    let params = `?q=${conversao.moedaDe}_${conversao.moedaPara}&compact=ultra&apiKey=5bc459edcf4cbf240239`;
    let cr :ConversaoResponse = JSON.parse(this.example);
    return cr;
    //  return this.http.get<ConversaoResponse>(this.BASE_URL + params);
  }

  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.rates[conversao.moedaPara];
  }

  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
    if (conversaoResponse === undefined) {
      return '0';
    }

    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
  }


  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.date;
  }



}
