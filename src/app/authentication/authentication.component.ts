import { Component, OnInit } from '@angular/core';
import { User, User_Data, LOGIN_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';
import { AuthsessionService } from '../services/auth-session.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  status : { loader?; error?; success?; } = {};
  loading:boolean = true;
  loginForm: LOGIN_DATA = <LOGIN_DATA> {};
  constructor(
    private user: User,
    private routes: Router,
    private sessionSrvc: AuthsessionService
  ) { }

  ngOnInit() {
  }

  onClickLogin(){
    this.status = { 'loader' : true };
    console.log('onClickLogin()')
    this.user.login( this.loginForm , res=> {
      console.log('login success: ', res );
      this.status = { 'success': 'login success' }
      this.routes.navigate(['home'])
    }, error=>{
      this.status.loader = false; 
      console.log( "login error "+ error );
    },()=>{
      this.status.loader = false; 
    })
  }

  onClickReset(){
    this.loginForm =  <LOGIN_DATA> {};
  }
}
