import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_DATA, POSTS, SEARCH_QUERY_DATA } from '../../quiz-module/interfaces/quiz-module.interface'
import { Quiz } from '../../quiz-module/services/quiz.service';

@Component({
  selector: 'app-quiz-log',
  templateUrl: './quiz-log.component.html',
  styleUrls: ['./quiz-log.component.scss']
})
export class QuizLogComponent implements OnInit {

  quizLogs = <POSTS>{};

  constructor( private router: Router, private questions: Quiz ) { 
    this.getQuizLogs();
  }

  ngOnInit() {
  }

  getQuizLogs(){

    console.log( "LIST()" );
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx, user_name, post_id, content,  varchar_1, varchar_2, varchar_3, varchar_4, varchar_5, category";
    data.from = "sf_post_data";
    data.where = "post_id='job' AND category='playerstats'";
    data.orderby = 'idx desc'
    this.questions.search( data, re => {
      this.quizLogs = re;
    }, error => alert("error on search: " + error ) );
    
  }

}
