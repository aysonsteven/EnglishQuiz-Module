import { Component, OnInit } from '@angular/core';
import { AuthsessionService } from '../services/auth-session.service';
import { User, MEMBER_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  constructor( 
    private sessionSrvc: AuthsessionService, 
    private user: User ,
    private route: Router
    ) { }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    setTimeout( ()=>{ 
      this.successMessage = null }, 
      10000);
  }

  onClickLogout(){
    this.user.logout();
    this.sessionSrvc.isLogged = false;
    this.sessionSrvc.sessionData = null;
    this.route.navigate(['home']);
  }

}
