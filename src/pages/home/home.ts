import { ItemPage } from './../item/item';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  culltivosDb;

  constructor(
    public navCtrl: NavController,
    public http: Http
    ) {
      this.culltivosDb = [];
  }

  ionViewDidLoad() {
    this.pegarDadosFirebase();
  }

  pegarDadosFirebase() {
    this.http.get('https://cultivando-83064.firebaseio.com/cultivos.json')
    .map(res => res.json())
    .subscribe(data => {
      if(data !== null && data !== undefined) {
        this.trataDados(data);
      }
    })
  }

  trataDados(dados) {
    this.culltivosDb = Object.keys(dados).map(i => dados[i]);
  }

  btnItem(cultivo){
    this.navCtrl.push(ItemPage, {cultivo : cultivo});
  }

}
