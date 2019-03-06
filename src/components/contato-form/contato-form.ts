import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the ContatoFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contato-form',
  templateUrl: 'contato-form.html'
})
export class ContatoFormComponent {

  @Output() formSalvo = new EventEmitter();

  cultivoForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    public http: Http,
    public db: AngularFireDatabase
    ) {
    this.cultivoForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(1)]],
      clima: [null, [Validators.required, Validators.maxLength(200)]],
      solo: [null, [Validators.required, Validators.maxLength(200)]],
      irrigacao: [null, [Validators.required, Validators.maxLength(200)]],
      detalhePlantio: [null, [Validators.required, Validators.maxLength(200)]],
      colheita: [null, [Validators.required, Validators.maxLength(200)]]
    })
  }

  cadastraCultivo() {
    this.db.database.ref('/cultivos').push(this.cultivoForm.value)
    .then(() => {
      console.log('salvou');
      this.formSalvo.emit();
      this.cultivoForm.reset();
    })
  }

}
