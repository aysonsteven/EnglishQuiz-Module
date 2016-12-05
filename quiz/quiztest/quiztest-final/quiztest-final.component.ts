import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service'


@Component({
  selector: 'app-quiztest-final',
  templateUrl: './quiztest-final.component.html',
  styleUrls: [ './quiztest-final.component.scss' ]
})
export class QuiztestFinalComponent implements OnInit {
  playerstats = <POST_DATA>{};
  playerInfo={
    score:'',
    name: '',
    state: '',
    total: '',
  }
  constructor( private router: Router, private question: Quiz ) { 

    
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
      // this.postStat();
    }else this.router.navigate( [ 'game' ] )
  }

  onClickPlayAgain(){
    localStorage.setItem( 'playername', this.playerInfo.name );
    this.router.navigate( [ 'game' ] );
  }
  onClickChangeName(){
    this.router.navigate( [ 'home' ] )
  }

  postStat(){
    if( ! this.playerInfo.name ) return ;
    this.playerstats.post_id = 'job';
    this.playerstats.session_id = 
    this.playerstats.subject = 'highscores';
    this.playerstats.category = 'playerstats';
    this.question.add( this.playerstats, data =>{
      console.log( 'player stat posted susccessfull: ' + JSON.stringify( data ) );
    }, err =>{
      console.log( 'error posting player stat ', err );
    })
  }

}
