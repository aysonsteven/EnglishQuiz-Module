import { Component, OnInit } from '@angular/core';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-quizbuilderform',
  templateUrl: './quizbuilder-form.component.html',
  styleUrls: ['./quizbuilder-form.component.scss']
})
export class QuizbuilderComponent implements OnInit {

  idx: string;
  formStatus = {};
  enableBtn:boolean = true;
  isValid:boolean;
  questionForm: POST_DATA = <POST_DATA> {};

  category:string;
  constructor( private question: Quiz, private routes: Router ) { 
    this.idx = localStorage.getItem('question-idx');
      this.getQustion();
  }

  ngOnInit(): void {

  }

  public changeSuccessMessage() {

  }

  onClickAddChoices(){}

  getQustion(){
    if( this.idx ){
      this.question.get( this.idx, res =>{
        console.log( "EDIT(): " + res );
        this.questionForm = res.post;
      }, e =>{

      })
    } 
  }

  onClickCreate(){
    if ( this.idx ){
      this.question.edit( this.questionForm, res =>{
        console.log( "successfully updated" + res );
        this.routes.navigate(['home']);
      }, err =>{
        console.log( "error updating" + err )
      })
      return
    }
    
    if( this.validateForm() == false) return;
    
    this.questionForm.post_id = 'job';
    this.questionForm.subject = 'questions';
    
    this.question.add( this.questionForm, data=>{
      console.log( 'question add susccessfull: ' + JSON.stringify( data ) );
      this.onCLickReset();
      this.routes.navigate(['home'])
    }, error => {
      alert ( error );
    })
  }


  onCLickReset(){
    this.questionForm = <POST_DATA>{};
  }

  validateForm(){
    if( this.questionForm.content == null || this.questionForm.content == '' ){
      this.formStatus = { question : 'no question' };
      return false;
    }
   else if( this.questionForm.varchar_5 == null || this.questionForm.varchar_5 == '' ){
      this.formStatus = { answer: 'no answer' };
      return false;
    }
  }
}


