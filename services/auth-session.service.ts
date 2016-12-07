import { Injectable } from '@angular/core';
import { User } from '../quiz-module/services/user.service';
import { Router } from '@angular/router'
import { MEMBER_LOGIN_DATA } from './../quiz-module/interfaces/quiz-module.interface';

@Injectable()
export class AuthsessionService {

  isLogged: boolean;
  sessionData = <MEMBER_LOGIN_DATA> {};

  constructor( private router: Router, private quiz: User ) { 
    this.sessionData = this.quiz.logged();
    this.checkLoginData();

    // console.log('session: this ' , this.sessionData.session_id)
   }

  checkLoginData(){
    console.info( ' session service checklogin(()) ** ' );
    if(! this.sessionData ) this.router.navigate(['']);
  }

}