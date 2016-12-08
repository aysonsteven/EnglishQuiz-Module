import { Component, OnInit } from '@angular/core';
import { User, MEMBER_LOGIN_DATA } from '../quiz-module/services/user.service';
import { AuthsessionService } from '../services/auth-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private sessionSrvc: AuthsessionService, private user: User ) {
    
    // console.log('home checkadminroute',this.sessionSrvc.adminroute.id)
   }

  ngOnInit() {
  }

}
