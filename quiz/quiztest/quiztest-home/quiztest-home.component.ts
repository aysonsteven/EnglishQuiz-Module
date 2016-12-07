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

  onClickProceed( name? ){    
    if( name ){
      if( this.validate ( name ) == false ) return;
    }
    this.router.navigate(['game', name ]);
    
  }
  onChangeInput( name? ){
    if( this.validate ( name ) == false ) return;
    this.inputErrorCheck = null;
  }

  onClickShowScore(){
    this.router.navigate(['logs']);
  }

  validate( name? ){
    if( name == '' || name == null){
      this.inputErrorCheck = 'Input name';
      console.log(this.inputErrorCheck)
      return false;
    }
    if( name.length <= 2 ){
      this.inputErrorCheck = 'must consist atleast 3 characters';
      console.log(this.inputErrorCheck)      
      return false;
    }
    return true;
  }

}
