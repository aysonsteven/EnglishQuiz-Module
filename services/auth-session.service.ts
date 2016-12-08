import { Injectable } from '@angular/core';
import { User } from '../quiz-module/services/user.service';
import { Router } from '@angular/router'
import { MEMBER_LOGIN_DATA , SEARCH_QUERY_DATA } from './../quiz-module/interfaces/quiz-module.interface';

@Injectable()
export class AuthsessionService {

  isLogged: boolean;
  sessionData = <MEMBER_LOGIN_DATA> {};
  adminroute :MEMBER_LOGIN_DATA;

  constructor( private router: Router, public user: User ) { 
    this.adminData(); 
    this.sessionData = this.user.logged();
    // this.checkLoginData();
    // console.log('session: this ' , this.sessionData.session_id)
    
   }
  checkLoginData(){
    console.info( ' session service checklogin(()) ** ' );
    if(! this.sessionData || ( this.sessionData.session_id != '00f9f98f9b41f684afabbe3c77e63eb7' || this.sessionData.id != 'aysonsteven' ) ) {
        this.router.navigate(['home']);
        return;
    }
  }
  adminData(){
     let data = <SEARCH_QUERY_DATA> {};
     data.fields = "id, name";
     data.from = "sf_member";
     data.where = "stamp='1480649472'"
     this.user.search( data, res=>{
       this.adminroute = res.search[0];
     }, e=>{
       alert("error on search: " + e )
     })
    }
}