import { Component, OnInit } from '@angular/core';
import { User, MEMBER_DATA, MEMBER_LOGIN_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';
import { AuthsessionService } from '../services/auth-session.service';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  formStatus = {
    uid:'',
    pword: '',
    error: '',
    loader: ''
  }

  blnk: string = " ";
  loading:boolean = true;
  loginForm: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA> {};
  isValid;
  constructor(
    private user: User,
    private routes: Router,
    private session: AuthsessionService
  ) { }

  ngOnInit() {
    this.isValid = true;    
  }


  onClickLogin(){
    ///validations
    this.isValid = true;
    this.resetStatus();
    this.validateForm();
    if( this.isValid == false ) return;
    this.formStatus.loader = 'true';
    ///end of validation

    this.user.login( this.loginForm , res=> {
      this.formStatus.loader = '';
      this.session.sessionData = res;
      this.routes.navigate(['']);
    }, error=>{
      this.formStatus.loader = '';
      this.formStatus.error = 'Server : ' + error;
    },()=>{
      this.formStatus.loader = '';
    })
    setTimeout( test => {
      this.formStatus.loader = '';
      this.formStatus.error = 'No Internet Connection or possible that the server is down.'
    }, 9000);
  }

  onClickReset(){
    this.loginForm =  <MEMBER_LOGIN_DATA> {};
    this.resetStatus();
  }
  resetStatus(){
    this.formStatus = { uid: '', pword: '', error: '', loader: '' };
  }

  validateForm(){
    if( this.loginForm.id == null || this.loginForm.password == '' ){
      this.formStatus.uid = 'insert UserID';
      this.isValid = false;
    }else if( this.loginForm.id.length <= 2 ){
      this.formStatus.uid = 'UserID must consist atleast 3 characters';
      this.isValid = false;
    }
    if( this.loginForm.password == null || this.loginForm.password == '' ){
      this.formStatus.pword = 'insert password';
      this.isValid = false;
    }else if( this.loginForm.password.length <= 5 ){
      this.formStatus.pword = 'password must be 6 or more';
      this.isValid = false;
    }
  }

  
}
