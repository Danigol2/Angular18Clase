import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router=inject (Router)
  userData: any=null;
  $isLoggedIn: WritableSignal<boolean> = signal(false)

  constructor(private auth: AngularFireAuth) { 
    //comprobar si el usuario esta logueado automaticamente
    this.auth.authState.subscribe(data => {
      if(data){
        //Estoy logueado
        this.userData=data;
        this.$isLoggedIn.set(true);
      }else{
        //No estoy logueado
        this.userData=null;
        this.$isLoggedIn.set(false);
        this.router.navigate(['login']);
      }
    })
  }

  async login(){
    try{
      let user=await this.auth.signInWithPopup(new GoogleAuthProvider());
      console.log(user);
      return user;
    }catch(error){
      console.log(error);
      return error;
    }
  }

  logout(){
    this.auth.signOut();
  }

}
