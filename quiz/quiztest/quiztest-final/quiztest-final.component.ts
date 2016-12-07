import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service'
import { AuthsessionService } from '../../../services/auth-session.service';
import { PlayerStatsService } from './../../../services/player-stats.service';

@Component({
  selector: 'app-quiztest-final',
  templateUrl: './quiztest-final.component.html',
  styleUrls: [ './quiztest-final.component.scss' ]
})
export class QuiztestFinalComponent implements OnInit {
  playerstats = <POST_DATA>{};
  playerInfo={
    score: null,
    name: null ,
    state: '',
    total: null,
  }
  test;
  constructor( 
    private router: Router, 
    private question: Quiz, 
    private route: ActivatedRoute, 
    private authSrvc: AuthsessionService ,
    private playerStatsSrvc: PlayerStatsService
    ) { 

    
  }

  ngOnInit() {
    if( this.authSrvc.sessionData ){
      this.playerstats.id = this.authSrvc.sessionData.id;
      this.playerstats.varchar_1 = this.playerStatsSrvc.playerStats.score.toString();
      this.playerstats.varchar_2 = this.playerStatsSrvc.playerStats.total;
      this.playerstats.post_id = 'job';
      this.playerstats.content = this.authSrvc.sessionData.id + "'s stat"
      this.playerstats.subject = 'highscores';
      this.playerstats.category = 'playerstats';
      console.log( 'check this score', this.playerInfo.score )

    }
    if( !this.authSrvc.sessionData){
      console.log("TEST")
      this.playerstats.id = this.playerStatsSrvc.playerStats.name;
    }
  }

  onClickPlayAgain(){
    this.router.navigate( [ 'game' ] );
  }
  onClickChangeName(){
    this.router.navigate( [ 'home' ] )
  }

  postStat(){
    if( ! this.playerInfo.name ) return ;

    this.question.add( this.playerstats, data =>{
      console.log( 'player stat posted susccessfull: ' + JSON.stringify( data ) );
    }, err =>{
      console.log( 'error posting player stat ', err );
    })
  }
}
