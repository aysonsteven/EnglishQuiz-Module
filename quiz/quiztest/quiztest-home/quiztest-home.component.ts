import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthsessionService } from './../../../services/auth-session.service';

@Component({
  selector: 'app-quiztest-home',
  templateUrl: './quiztest-home.component.html',
  styleUrls: ['./quiztest-home.component.scss']
})
export class QuiztestHomeComponent implements OnInit {
  inputErrorCheck:string;
  constructor( private router: Router, public authSrvc: AuthsessionService ) { }
  ngOnInit() {
  }

  onClickProceed( val? ){    

    this.router.navigate(['game', val ]);
    
  }

  onClickShowScore(){
    this.router.navigate(['logs']);
  }

}
