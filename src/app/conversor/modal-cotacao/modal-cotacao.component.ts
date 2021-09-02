import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conversao } from '../models/Conversao';
import { ConversaoResponse } from '../models/ConversaoResponse';
import { ConversorService } from '../services/conversor.service';

@Component({
  selector: 'app-modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {

  @Input() id:string;
  @Input() conversaoResponse : ConversaoResponse;
  @Input() conversao : Conversao = new Conversao();
  @Output() onConfirm : EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService : ConversorService) { }

  ngOnInit(): void {
  }

  novaConsulta(){
    this.onConfirm.emit();
  }

  get valorConvertido() : string{
    if (this.conversaoResponse === undefined){
      return '0';
    }
    //return (this.conversao.valor * this.conversaoResponse.rates[this.conversao.moedaDe + '_' + this.conversao.moedaPara]).toFixed(2);
    return (this.conversao.valor * this.conversaoResponse.rates[this.conversao.moedaDe]).toFixed(2);
  }

  get dataCotacao() : string{
    let data =  new Date();
    let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;
    return dataFormatada;
  }

  get cotacaoDe() : string{
    return this.conversorService.cotacaoDe(this.conversaoResponse, this.conversao);
  }
  get cotacaoPara() : number{
    return this.conversorService.cotacaoPara(this.conversaoResponse, this.conversao);

  }


}
