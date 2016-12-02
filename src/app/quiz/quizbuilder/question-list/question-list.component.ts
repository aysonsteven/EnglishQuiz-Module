import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_DATA, POSTS } from '../../../quiz-module/interfaces/quiz-module.interface'
import { Quiz } from '../../../quiz-module/services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questionsList = <POSTS>{};

  constructor( private route: Router, private questions: Quiz ) { 
    this.getQuestions();
  }

  ngOnInit() {
  }

  goToQuestionform(){
    this.route.navigate(['add']);
    localStorage.removeItem('question-idx')
  }

  onClickDelete( idxval ){
    this.questions.delete( idxval, success=>{
      // this.route.navigate(['home']);
      this.getQuestions();
    }, error=>{
      alert('error' + error )
    })
  }
  onClickEdit( val ){
    this.route.navigate(['add']);
    localStorage.setItem( "question-idx", val )
    
  }
  getQuestions(){
    let body = <PAGE_DATA> {
      post_id: 'job',
      page_no: 1,
      limit: void 0
    }
    this.questions.page( body, res=>{
      // this.questionsList = res
      this.questionsList = res;
      
    }, e=>{
    console.error (e)
    })
  }

  onClickAddChoices(){

  }

}
