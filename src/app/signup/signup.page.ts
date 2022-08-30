import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(){ 

  }

  ngOnInit() {
  }

  signupUser(){
    console.log("Entrou no submit form!!");
  }

  updateCidades(){
    
  }
}