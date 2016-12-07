import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service'
import { AuthsessionService } from '../../../services/auth-session.service';


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
    private authSrvc: AuthsessionService 
    ) { 

    
  }

  ngOnInit() {
    if(! this.playerInfo.score ) {
      this.router.navigate( [ '' ] );
      return;
    }else{ this.postStat() }
    this.route.params.forEach( ( params: Params ) =>{
      if( ! this.authSrvc.sessionData ){ this.playerInfo.name = +params['name']}
      this.playerInfo.score = +params['score'];
      this.playerInfo.total = +params['total'];
    }) 
    if( this.authSrvc.sessionData ) this.playerInfo.name = this.authSrvc.sessionData.id;


  }

  checkPlayer(){

  }

  onClickPlayAgain(){
    this.router.navigate( [ 'game' ] );
  }
  onClickChangeName(){
    this.router.navigate( [ 'home' ] )
  }

  postStat(){
    if( ! this.playerInfo.name ) return ;
    this.playerstats.post_id = 'job';
    this.playerstats.content = this.authSrvc.sessionData.id + "'s stat"
    this.playerstats.subject = 'highscores';
    this.playerstats.category = 'playerstats';
    this.question.add( this.playerstats, data =>{
      console.log( 'player stat posted susccessfull: ' + JSON.stringify( data ) );
    }, err =>{
      console.log( 'error posting player stat ', err );
    })
  }

}
