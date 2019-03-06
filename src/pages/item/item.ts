import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  cultivo = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const cultivoParms = navParams.get('cultivo');
    this.cultivo = cultivoParms;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

}
