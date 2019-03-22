import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;



  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public firebaseauth: AngularFireAuth,
              public Storage: Storage) {
      firebaseauth.user.subscribe((data) => {
        this.user = data;
      });     
  }

  ionViewDidLoad() {
    this.Storage.get('usuário')
    .then((resolve)=>{
      console.log(resolve);
      if(resolve){
        this.navCtrl.setRoot(HomePage)
      }
    });

  }

  public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
        this.gravarStorange('usuário', this.email.value);
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
      this.gravarStorange('usuário', this.email.value);
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({duration: 3000, position: 'botton'});
    toast.setMessage(mensagem);
    toast.present();
  }
  
  public gravarStorange(key: string, value: any) {
    this.Storage.set(key, value)
    .then(()=>this.navCtrl.setRoot(HomePage))
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

}
