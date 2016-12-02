import { Component, OnInit } from '@angular/core';
import { User, MEMBER_DATA, MEMBER_LOGIN_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';
import { AuthsessionService } from '../services/auth-session.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  blnk: string = " ";
  error = {}
  formStatuspword = {};
  formStatusuid = {};
  status : { loader?; error?; success?; } = {};
  loading:boolean = true;
  loginForm: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA> {};
  isValid;
  constructor(
    private user: User,
    private routes: Router,
    private sessionSrvc: AuthsessionService
  ) { }

  ngOnInit() {
    this.isValid = true;
    this.formStatuspword = {}
    this.formStatusuid = {}
  }

  onClickLogin(){
    ///validations
    this.isValid = true;
    this.formStatusuid = {};
    this.formStatuspword = {};
    this.validateForm();
    if( this.isValid == false ) return;
    ///end of validation

    this.status = { 'loader' : true };
    console.log('onClickLogin()')
    this.user.login( this.loginForm , res=> {
      console.log('login success: ', res );
      this.status = { 'success': 'login success' }
      this.routes.navigate(['home'])
    }, error=>{
      this.status.loader = false; 
      console.log( "login error "+ error );
      this.error = { error: error}
    },()=>{
      this.status.loader = false; 
    })
  }

  onClickReset(){
    this.loginForm =  <MEMBER_LOGIN_DATA> {};
    this.formStatuspword = {};
    this.formStatusuid = {};
  }

  validateForm(){
    if( this.loginForm.id == null || this.loginForm.id == '' ){
      this.formStatusuid = { userid : 'insert UserID' }
      this.isValid = false;
    }
    else if( this.loginForm.id.length <=3 ){
      this.formStatusuid = { userid: 'UserID must consist atleast 3 characters' };
      this.isValid = false;
    }
    if( this.loginForm.password == null || this.loginForm.password == '' ){
      this.formStatuspword = { pword : 'insert password'}
      this.isValid = false;
    }
    else if( this.loginForm.password.length <=5 ){
      this.formStatuspword = { pword : 'password must be 6 or more'}
      this.isValid = false;
    }
  }

  
}
