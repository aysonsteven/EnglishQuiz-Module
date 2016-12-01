import { Component, OnInit } from '@angular/core';
import { Quiz, QUESTION_DATA} from '../../quiz-module/services/quiz.service'

@Component({
  selector: 'app-quizbuilderform',
  templateUrl: './quizbuilder-form.component.html',
  styleUrls: ['./quizbuilder-form.component.scss']
})
export class QuizbuilderComponent implements OnInit {

  formStatus = {};
  
  isValid:boolean;
  questionForm: QUESTION_DATA = <QUESTION_DATA> {};

  category:string;
  constructor(private question: Quiz) { }

  ngOnInit() {
  }

  onClickCreate(){

    // if( this.validateForm() == false) return;
    
    // this.questionForm.post_id = 'job';
    // this.questionForm.subject = 'questions';
    
    // this.question.write( this.questionForm, data=>{
    //   console.log( 'question add susccessfull: ' + JSON.stringify( data ) );
    //   this.onCLickReset();

    // }, error => {
    //   alert ( error );
    // })
    console.info( 'check form(()):: ' + JSON.stringify(this.questionForm) )
  }


  onCLickReset(){
    this.questionForm = <QUESTION_DATA>{};
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
