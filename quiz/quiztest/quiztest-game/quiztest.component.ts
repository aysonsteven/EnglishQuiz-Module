import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../quiz-module/services/quiz.service';
import { POSTS, POST_DATA, PAGE_DATA, SEARCH_QUERY_DATA } from '../../../quiz-module/interfaces/quiz-module.interface';
import { AuthsessionService } from '../../../services/auth-session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerStatsService } from './../../../services/player-stats.service';

@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: [ './quiztest.component.scss' ]
})
export class QuiztestComponent implements OnInit {
  loaderMessage:string;
  validate: string;
  loading:boolean = true;
  errorCheck:string;
  currentQuestion;
  questionCount;
  score:number = 0;
  ctr: number = 0;
  ctrRandom:number;
  keys;
  questionsList;
  playerName:string;
  constructor( 
    private questions: Quiz, 
    private router: Router, 
    private authSrvc: AuthsessionService, 
    private route:ActivatedRoute,
    private playerStats: PlayerStatsService 
    ) { 
    
    this.ctrRandom = null;
    this.getQuestions();

    if( !this.currentQuestion ){
      this.loaderMessage = 'please wait...'
      setTimeout( () => {
        this.loaderMessage = 'no quiz yet.'
      }, 3000);
    }

  }

  ngOnInit() {
    if(this.authSrvc.sessionData)this.playerName = this.authSrvc.sessionData.id;
    else {
      this.route.params.forEach( ( params: Params ) =>{
             this.playerName = params[ 'id' ]
            
          })
          
    }
    if(! this.playerName) this.router.navigate( [ '' ] ) 
    this.currentQuestion = {};
    // if(! this.playerName ) this.router.navigate(['']);
  }

  getQuestions(){
    console.log( "LIST()" );
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, category";
    data.from = "sf_post_data";
    data.where = "post_id='job' AND category='quiz'";
    this.questions.search( data, re => {
      this.questionsList = re;
      this.questionCount = JSON.parse(JSON.stringify( re ) );

      console.log( 'this is re' , this.questionsList )
      this.showQuiz();
    }, error => alert("error on search: " + error ) );
  }
  showQuiz(){
      this.ctrRandom = Math.floor( Math.random() * ( this.questionsList.search.length - 1 + 1 ) ) + 0;
      this.currentQuestion = this.questionsList.search[this.ctrRandom];
      if( this.ctrRandom ) this.loading = false;
  }

  onClickProceed( val ){
    if( this.validateQuiz( val ) == false ) return;
    this.validate = '';
    this.ctr+=1;
    if( val == this.currentQuestion.varchar_5 ){
      this.score+= 2;
      console.log('check')
    }
    this.randomizedQuestions();
  }

  randomizedQuestions(){
      
    if( ! this.authSrvc.sessionData ) {  
      this.playerStats.playerStats.name = this.playerName;
      console.info( 'name', this.playerName, ' ', this.playerStats.playerStats.name )
    }
    if ( this.ctr >= this.questionCount.search.length ){
      console.log( 'end' );
      this.router.navigate( [ 'final' ] );
      this.playerStats.playerStats.score = this.score;
      this.playerStats.playerStats.total = this.questionCount.search.length;
  }

    this.questionsList.search.splice( this.ctrRandom, 1 );    
    this.ctrRandom = Math.floor( Math.random() * ( this.questionsList.search.length - 1 + 1 ) );
    this.currentQuestion = this.questionsList.search[ this.ctrRandom ];
  }

  validateQuiz( val ){
    if( val == null ){
      this.validate = 'No answer selected'
      console.log( this.validate );
      return false;
    }
    this.validate = '';
    return true;
  }

}
