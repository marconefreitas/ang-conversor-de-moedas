import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Conversao } from '../models/Conversao';
import { ConversaoResponse } from '../models/ConversaoResponse';
import { Moeda } from '../models/Moeda';
import { ConversorService } from '../services/conversor.service';
import { MoedaService } from '../services/moeda.service';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  moedas : Moeda[];
  conversao : Conversao;
  possuiErro : boolean;
  conversaoResponse : ConversaoResponse;

  @ViewChild("conversaoForm",{static : true}) conversaoForm : NgForm;

  constructor( private moedaService : MoedaService, private conversorService : ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  init(): void{
    this.conversao = new Conversao('USD', 'BRL', null);
    this.possuiErro = false;
  }


  converter(): void {
    if (this.conversaoForm.form.valid){
      //alert('Convertendo: ' + JSON.stringify(this.conversao));
      /*this.conversorService.converter(this.conversao)
      .subscribe(response => {
            this.conversaoResponse = response;
            console.log(this.conversaoResponse);

            let rates =  new Array();
            this.conversaoResponse;
          },
           error => this.possuiErro = true);*/
         let x =   this.conversorService.converter2(this.conversao)
          x.rates = new Array();
          x.rates[this.conversao.moedaDe] = x[this.conversao.moedaDe + "_" + this.conversao.moedaPara].toFixed(5);
          x.rates[this.conversao.moedaPara] = (1 / x[this.conversao.moedaDe + "_" + this.conversao.moedaPara]).toFixed(5)  ;

          console.log(x);
          this.conversaoResponse = x;

        ;


    }
  }

}


