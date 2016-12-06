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
    name: this.authSrvc.sessionData.id ,
    state: '',
    total: null,
  }
  test;
  constructor( private router: Router, private question: Quiz, private route: ActivatedRoute, private authSrvc: AuthsessionService ) { 

    
  }

  ngOnInit() {
    this.route.params.forEach( ( params: Params ) =>{
      this.playerInfo.score = +params['score'];
      this.playerInfo.total = +params['total'];
    }) 

    if( this.playerInfo.name ){

      this.postStat();
    }else this.router.navigate( [ 'game' ] )
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
