import { Component, OnInit } from '@angular/core';
import { Quiz, POST_DATA} from '../../quiz-module/services/quiz.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizbuilderform',
  templateUrl: './quizbuilder-form.component.html',
  styleUrls: ['./quizbuilder-form.component.scss']
})
export class QuizbuilderComponent implements OnInit {

  formStatus = {};
  
  isValid:boolean;
  questionForm: POST_DATA = <POST_DATA> {};

  category:string;
  constructor( private question: Quiz, private routes: Router ) { }

  ngOnInit() {
  }

  onClickCreate(){

    if( this.validateForm() == false) return;
    
    this.questionForm.post_id = 'job';
    this.questionForm.subject = 'questions';
    
    this.question.add( this.questionForm, data=>{
      console.log( 'question add susccessfull: ' + JSON.stringify( data ) );
      this.onCLickReset();
      this.routes.navigate(['home']);
    }, error => {
      alert ( error );
    })
    // console.info( 'check form(()):: ' + JSON.stringify(this.questionForm) )
  }


  onCLickReset(){
    this.questionForm = <POST_DATA>{};
  }

  validateForm(){
    if( this.questionForm.content == null || this.questionForm.content == '' ){
      this.formStatus = { question : 'no question' };
      return false;
    }
   else if( this.questionForm.int_1 == null || this.questionForm.int_1 == '' ){
      this.formStatus = { answer: 'no answer' };
      return false;
    }
  }


}
