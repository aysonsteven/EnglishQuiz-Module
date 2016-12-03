import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../quiz-module/services/quiz.service';
import { POSTS, POST_DATA, PAGE_DATA } from '../../../quiz-module/interfaces/quiz-module.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiztest',
  templateUrl: './quiztest.component.html',
  styleUrls: ['./quiztest.component.scss']
})
export class QuiztestComponent implements OnInit {
  test;
  loading:boolean = true;
  currentQuestion;
  ctr: number = 0;
  ctrRandom:number;
  keys;
  questionsList =<POSTS>{};
  playerName: string;
  constructor( private questions: Quiz, private router: Router ) { 
    this.ctrRandom = null;
    this.getQuestions();

    // console.log( 'check this : ' + this.questionsList )

    // console.log('check val() ' + this.questionsList )
  }

  ngOnInit() {
    this.playerName = localStorage.getItem('playername');
    if( this.playerName ) localStorage.removeItem('playername');
    else this.router.navigate(['']);
    this.currentQuestion = {};
  }

  showQuiz(){
      this.ctrRandom = Math.floor( Math.random() * ( this.test.length - 1 + 1 )) + 0;
      this.currentQuestion = this.test[this.ctrRandom];
      if( this.ctrRandom ) this.loading = false;
  }

  onClickProceed(){
    this.randomizedQuestions();
  }

  getQuestions(){
    let body = <PAGE_DATA> {
      post_id: 'job',
      page_no: 1
    }
    this.questions.page( body, res=>{
      // this.questionsList = res;
      this.test = res.posts;
      this.showQuiz();
    }, e=>{
    console.error (e)
    })
  }

  randomizedQuestions(){
    this.ctrRandom = Math.floor( Math.random() * ( this.test.length - 1 + 1 )) + 0;
    this.currentQuestion = this.test[this.ctrRandom];
    this.test.splice( this.ctrRandom, 1 );
  }

}
