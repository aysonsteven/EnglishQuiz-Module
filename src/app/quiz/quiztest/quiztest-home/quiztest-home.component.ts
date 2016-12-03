import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiztest-home',
  templateUrl: './quiztest-home.component.html',
  styleUrls: ['./quiztest-home.component.scss']
})
export class QuiztestHomeComponent implements OnInit {

  inputErrorCheck:string;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  onClickProceed(val){
    console.log( val )
    if( this.validateForm( val ) == false ) return;
    this.router.navigate(['game']);
    localStorage.setItem('playername', val)
  }

  validateForm( val ){
    if( val == '' || val == null ){
      this.inputErrorCheck = 'please provide a name';
      return false;
    }
    if( val.length <= 4 ){
      this.inputErrorCheck = 'invalid name';
      return false;
    }
    return true;
  }

}
