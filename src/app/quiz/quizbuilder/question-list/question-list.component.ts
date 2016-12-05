import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_DATA, POSTS, SEARCH_QUERY_DATA } from '../../../quiz-module/interfaces/quiz-module.interface'
import { Quiz } from '../../../quiz-module/services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  errorCheck:string;

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

  searchbtn(){
    console.log("search()");
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "name, email";
    data.from = "sf_member";
    this.questions.search( data, re => {
      console.log("search result: ", re);
    }, error => alert("error on search: " + error ) );
  }

  onClickEdit( val ){
    this.route.navigate(['add']);
    localStorage.setItem( "question-idx", val )
    
  }
  getQuestions(){
    let body = <PAGE_DATA> {
      post_id: 'job',
      page_no: 1,
      limit: void 0,
    }
    this.questions.page( body, res=>{
      // this.questionsList = res
      this.questionsList = res;
      
    }, e=>{
    this.errorCheck = 'No Internet Connection or possible that the server is down.';
    })
  }
}
