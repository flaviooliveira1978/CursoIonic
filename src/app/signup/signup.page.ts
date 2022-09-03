import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {


  profileForm = new FormGroup({
    nome: new FormControl('Joaquim', [Validators.required, Validators.minLength(2),Validators.maxLength(120)]),
    email: new FormControl('joaquim@gmail.com',[Validators.required, Validators.email]),
    tipo: new FormControl('1',[Validators.required]),
    cpfOuCnpj: new FormControl('11111111111',[Validators.required, Validators.minLength(11),Validators.maxLength(14)]),
    senha: new FormControl('123',[Validators.required]),
    logradouro: new FormControl('Av das Americas',[Validators.required]),
    numero: new FormControl('180',[Validators.required]),
    complemento: new FormControl('333'),
    bairro: new FormControl('Barra'),
    cep: new FormControl('027251220',[Validators.required]),
    telefone1: new FormControl('999999999',[Validators.required]),
    telefone2: new FormControl(''),
    telefone3: new FormControl(''),
    estadoId: new FormControl(null,[Validators.required]),
    cidadeId: new FormControl(null, [Validators.required])
  });

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public nav:NavController,
    public cidadeService:CidadeService,
    public estadoService:EstadoService,
    public clienteService:ClienteService,
    public alertCtrl: AlertController){ 

  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.profileForm.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error=> {
      console.log("erro buscando estados: " + error);
    });

  }

  signupUser(){
    this.clienteService.insert(this.profileForm.value).subscribe(response => {
      let alert = this.alertCtrl.create(
        {
        header:'Sucesso',
        message:'Usuário inserido com sucesso!',
        buttons: [{
          text: "OK",
          handler: () =>{
            this.nav.navigateRoot('login');
          }}]
      }
      ).then(res => {
          res.present();
        });

    },
    error=> {
      console.log("erro inserindo cliente: " + error);
    });

  }

  updateCidades(){

    let estado_id = this.profileForm.value.estadoId;

    if(estado_id){ 

      this.cidadeService.findAll(estado_id).subscribe(response => {
        this.cidades = response;
        this.profileForm.controls.cidadeId.setValue(null);
      },
      error=> {
        console.log("erro buscando cidades: " + error);
      });
    }
  }
}
