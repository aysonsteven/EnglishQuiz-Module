import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiztest-final',
  templateUrl: './quiztest-final.component.html',
  styleUrls: [ './quiztest-final.component.scss' ]
})
export class QuiztestFinalComponent implements OnInit {
  playerInfo={
    score:'',
    name: '',
    state: '',
    total: '',
  }
  constructor( private router: Router) { 

    
  }

  ngOnInit() {
    this.playerInfo.name = localStorage.getItem( 'name' ); 
    this.playerInfo.score = localStorage.getItem( 'score' );
    this.playerInfo.state = localStorage.getItem( 'state' );
    this.playerInfo.total = localStorage.getItem( 'total' );    
    if( this.playerInfo.name ){
      localStorage.removeItem( 'name' );
      localStorage.removeItem('score' );
      localStorage.removeItem('state' );
      localStorage.removeItem('total' );
    }else this.router.navigate( [ 'game' ] )
  }

  onClickPlayAgain(){
    localStorage.setItem( 'playername', this.playerInfo.name );
    this.router.navigate( [ 'game' ] );
  }
  onClickChangeName(){
    this.router.navigate( [ 'home' ] )
  }

}
