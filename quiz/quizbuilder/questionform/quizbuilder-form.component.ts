import { Component, OnInit } from '@angular/core';
import { Quiz, POST_DATA} from '../../../quiz-module/services/quiz.service';
import { Data, FILE_UPLOAD_RESPONSE, FILE_UPLOAD_DATA, POST_RESPONSE } from '../../../quiz-module/data'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthsessionService } from './../../../services/auth-session.service';


@Component({
  selector: 'app-quizbuilderform',
  templateUrl: './quizbuilder-form.component.html',
  styleUrls: ['./quizbuilder-form.component.scss']
})
export class QuizbuilderComponent implements OnInit {
  files: Array<FILE_UPLOAD_DATA> = <Array<FILE_UPLOAD_DATA>>[];
  switch:boolean =true;
  loading:boolean = false;
  idx;
  formStatus = {};
  enableBtn:boolean = true;
  isValid:boolean;
  questionForm: POST_DATA = <POST_DATA> {};

  category:string;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private question: Quiz, 
    private routes: Router, 
    private route: ActivatedRoute,
    public sessionSrvc: AuthsessionService,
    private data: Data 
    ) { 
    this.sessionSrvc.adminData();
    this.sessionSrvc.checkLoginData();      
    this.questionForm.gid = data.uniqid();
    this.idx = this.route.snapshot.params['idx'];
    
    // this.idx = localStorage.getItem('question-idx');
      this.getQustion();
  }

  ngOnInit(): void {

  }

  onChangeFile( event ){
    this.loading = true;
    this.data.uploadPostFile( this.questionForm.gid, event, (re: FILE_UPLOAD_RESPONSE) =>{
      this.files.push( re.data );
      this.loading = false;
    }, err=>{this.loading = false;}, 
    complete=>{
      console.log( 'completed', complete )
    },
     percentage=>{
       console.log('uploaded' , percentage)
    } )
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


