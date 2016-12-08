import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../quiz-module/services/quiz.service';
import { POSTS, POST_DATA, PAGE_DATA, SEARCH_QUERY_DATA } from '../../../quiz-module/interfaces/quiz-module.interface';
import { AuthsessionService } from '../../../services/auth-session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerStatsService } from './../../../services/player-stats.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/RX';

@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: [ './quiztest.component.scss' ]
})
export class QuiztestComponent implements OnInit {
  ticks:number = 0;
  keyIndex:number = 0;
  choices = [];
  loaderMessage:string;
  validate: string;
  loading:boolean = true;
  errorCheck:string;
  currentQuestion;
  questionCount;
  score:number = 0;
  ctr: number = 0;
  ctrRandom:number;
  questionsList;
  playerName:string;
  
  constructor( 
    private questions: Quiz, 
    private router: Router, 
    private authSrvc: AuthsessionService, 
    private route:ActivatedRoute,
    private playerStats: PlayerStatsService,
    private activatedRoute: ActivatedRoute 
    ) { 
    
    this.ctrRandom = null;
    this.getQuestions();
    this.getChoices();

    if( !this.currentQuestion ){
      this.loaderMessage = 'please wait...'
      setTimeout( () => {
        this.loaderMessage = 'no quiz yet.'
      }, 3000);
    }

  }

  timer(){

    let timer = Observable.timer(2000,1000);
    timer.subscribe(time=>{
      this.ticks = time
      if( time == 10){
        this.onClickProceed(time);
        timer = null;
        this.timer();
        return;
      }
    });
  }

  ngOnInit() {
    this.timer();
    if(this.authSrvc.sessionData)this.playerName = this.authSrvc.sessionData.id;
    else {
      this.playerName = this.activatedRoute.snapshot.params['id'];
          
    }
    if(! this.playerName) this.router.navigate( [ '' ] ) 
    this.currentQuestion = {};
    // if(! this.playerName ) this.router.navigate(['']);
  }

  getChoices(){
    
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "varchar_1, varchar_2, varchar_3, varchar_4";
    data.from = "sf_post_data";
    data.where = "post_id='job' AND category='quiz'";
    this.questions.search( data, re=>{
      let choicesObj = re.search[this.ctrRandom]
      let temp = [];
      for ( let key in choicesObj ) {
        this.keyIndex +=1;
        temp.push({key: this.keyIndex, value:choicesObj[key]});
      }
      this.choices = _.shuffle(temp)

        }, err=>{
          console.error('err getting choices', err)
        })
  }
  shuffle( choices ){
    for ( let key in choices ) {
      this.keyIndex +=1;
      this.choices.push( { key: this.keyIndex, value:choices[ key ] } );
    }
    console.log('shuffle', _.shuffle( this.choices ) )
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
    }, error => alert( "error on search: " + error ) );
  }

  showQuiz(){
      this.ctrRandom = Math.floor( Math.random() * ( this.questionsList.search.length - 1 + 1 ) ) + 0;
      this.currentQuestion = this.questionsList.search[ this.ctrRandom ];
      if( this.ctrRandom ) this.loading = false;
  }

  onClickProceed( val? ){
    this.keyIndex = 0;
    this.choices = [];
    this.getChoices();
    if( this.validateQuiz( val ) == false ) return;
    this.validate = '';
    this.ctr+=1;
    if( val == this.currentQuestion.varchar_5 ){
      this.score+= 2;
      console.log( 'check' )
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
