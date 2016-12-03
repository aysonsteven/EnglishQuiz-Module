import { Component, OnInit } from '@angular/core';
import { AuthsessionService } from '../services/auth-session.service';
import { User, MEMBER_DATA } from '../quiz-module/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor( 
    private sessionSrvc: AuthsessionService, 
    private user: User ,
    private route: Router
    ) { }

  ngOnInit() {
  }

  onClickLogout(){
    this.user.logout();
    this.sessionSrvc.isLogged = false;
    this.sessionSrvc.sessionData = null;
    this.route.navigate(['home']);
  }

}
