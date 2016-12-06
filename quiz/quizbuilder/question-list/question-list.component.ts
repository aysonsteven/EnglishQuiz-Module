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
  }

  onClickDelete( idxval ){
    this.questions.delete( idxval, success=>{
      // this.route.navigate(['home']);
      this.getQuestions();
    }, error=>{
      alert('error' + error )
    })
  }

  search(){
    console.log("search()");
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, category";
    data.from = "sf_post_data";
    data.where = "post_id='job' AND category='quiz'"
    this.questions.search( data, re => {
      console.log("search result: ", re);
    }, error => alert("error on search: " + error ) );
  }

  onClickEdit( val ){
    this.route.navigate([ 'edit' , val ]);
  }
  getQuestions(){

    console.log( "LIST()" );
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx, content, varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, category";
    data.from = "sf_post_data";
    data.where = "post_id='job' AND category='quiz'";
    data.orderby = 'idx desc'
    this.questions.search( data, re => {
      this.questionsList = re;
    }, error => alert("error on search: " + error ) );
    
  }
}
