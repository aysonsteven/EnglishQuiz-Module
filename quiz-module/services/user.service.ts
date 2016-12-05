import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MEMBER_DATA, MEMBER_LOGIN_DATA,  } from '../interfaces/quiz-module.interface';
import { API, PHILGO_MEMBER_LOGIN } from '../server';
export * from '../interfaces/quiz-module.interface';
import * as _ from 'lodash';

@Injectable()
export class User extends API{
    
    constructor(  http: Http ){
        super( http );
    }

    getLoginBody( loginData: MEMBER_LOGIN_DATA ){
        loginData['action'] = 'login';
        return loginData;
    }
    setLoginData( data ) : void {
        let login = { id: data.id, session_id: data.session_id };
        let str = JSON.stringify( login );
        localStorage.setItem( PHILGO_MEMBER_LOGIN, str );
    }

    login( loginData: MEMBER_LOGIN_DATA, success: ( login: MEMBER_LOGIN_DATA ) => void, error: ( error: string ) => void, complete?: () => void){
        let body = this.getLoginBody( loginData );
        this.write( body, data =>{
            console.log( 'login(): data : ' + data );
            let login: MEMBER_LOGIN_DATA = {
                id: data.user_id,
                session_id: data.session_id
            };
            this.setLoginData( login );
            success( login );
        }, error,
         complete);
    }

    register( userData: MEMBER_DATA, success: ( login: MEMBER_LOGIN_DATA) => void, error: ( error: string ) => void, complete?: ()=> void){
        userData['action'] = 'member_register_submit';
        userData['login'] = 'pass';
        this.write( userData, res=>{
            this.setLoginData( res );
            success( res );
        }, error, 
        complete);
    }

    logout(){
        localStorage.removeItem( PHILGO_MEMBER_LOGIN );
    }

    logged(){
        return this.getLoginData();
    }

    getUrl( qs: string = '' ) {
        return this.url + "?module=ajax&submit=1&action=" + qs;
    }

    data( success: ( data: MEMBER_DATA ) => void, error?: ( e: string ) => void, complete?: ()=> void){
        let login = this.logged();
        if( login ){
            let url = this.getUrl( 'version&user_extra=1&id=' + login.id + '&session_id=' + login.session_id );
            console.log( 'member.data() url: ' + url );
            this.get( url, success, error, complete );
        }
        else return error ( 'not logged in' );
    }
}