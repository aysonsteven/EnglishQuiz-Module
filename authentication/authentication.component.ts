import { Component, OnInit } from '@angular/core';
import { User, MEMBER_DATA, MEMBER_LOGIN_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';
import { AuthsessionService } from '../services/auth-session.service';
import 'rxjs/add/operator/timeout';
interface status{
  userID?:string;
  userPassword?: string;
  error?:string;
  loader?:string;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  formStatus:status = <status>{};

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
      this.checkUserAndAdmin();
    }, error=>{
      this.formStatus.loader = '';
      this.formStatus.error = 'Server : ' + error;
    },()=>{
      this.formStatus.loader = '';
      console.log('()')
    })
  }

  onClickReset(){
    this.loginForm =  <MEMBER_LOGIN_DATA> {};
    this.resetStatus();
  }
  resetStatus(){
    this.formStatus = { userID: '', userPassword: '', error: '', loader: '' };
  }

  onFocusUserID(){
    this.formStatus.userID = '';
  }

  validateForm(){
    if( this.loginForm.id == null || this.loginForm.password == '' ){
      this.formStatus.userID = 'insert UserID';
      this.isValid = false;
    }else if( this.loginForm.id.length <= 2 ){
      this.formStatus.userID = 'UserID must consist atleast 3 characters';
      this.isValid = false;
    }
    if( this.loginForm.password == null || this.loginForm.password == '' ){
      this.formStatus.userPassword = 'insert password';
      this.isValid = false;
    }else if( this.loginForm.password.length <= 5 ){
      this.formStatus.userPassword = 'password must be 6 or more';
      this.isValid = false;
    }
  }

  checkUserAndAdmin(){
    if( this.session.sessionData.id == this.session.adminroute.id ){
      this.routes.navigate(['adminhome']);
      return;
    }
    this.routes.navigate(['home']);
  }

  
}
