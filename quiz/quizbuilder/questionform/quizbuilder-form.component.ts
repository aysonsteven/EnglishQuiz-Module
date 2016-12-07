import { Component, OnInit } from '@angular/core';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthsessionService } from './../../../services/auth-session.service'


@Component({
  selector: 'app-quizbuilderform',
  templateUrl: './quizbuilder-form.component.html',
  styleUrls: ['./quizbuilder-form.component.scss']
})
export class QuizbuilderComponent implements OnInit {

  idx;
  formStatus = {};
  enableBtn:boolean = true;
  isValid:boolean;
  questionForm: POST_DATA = <POST_DATA> {};

  category:string;
  constructor( 
    private question: Quiz, 
    private routes: Router, 
    private route: ActivatedRoute,
    public sessionSrvc: AuthsessionService 
    ) { 
      if ( this.sessionSrvc.sessionData.session_id != '00f9f98f9b41f684afabbe3c77e63eb7' && this.sessionSrvc.sessionData.id == 'aysonsteven' ) {
        console.log('session: ', this.sessionSrvc.sessionData.session_id)
        this.routes.navigate(['']);
        return;
      }
    this.route.params.forEach( ( params: Params ) =>{
      this.idx = +params['idx'];
    })
    // this.idx = localStorage.getItem('question-idx');
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
        alert( e )
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
    this.questionForm.category = 'quiz';
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


