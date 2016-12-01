import { Component, OnInit } from '@angular/core';
import { Quiz, POST_DATA} from '../quiz-module/services/quiz.service'

@Component({
  selector: 'app-quizbuilder',
  templateUrl: './quizbuilder.component.html',
  styleUrls: ['./quizbuilder.component.scss']
})
export class QuizbuilderComponent implements OnInit {

  questionForm: POST_DATA = <POST_DATA> {};

  category:string;
  constructor(private question: Quiz) { }

  ngOnInit() {
  }

  onClickCreate(){
    this.questionForm.post_id = 'questions';
    this.questionForm.subject = 'questions';
    
    this.question.add( this.questionForm, data=>{
      console.log( 'question add susccessfullu: ' + data );

    }, error => {
      alert ( error );
    })
  }

}
