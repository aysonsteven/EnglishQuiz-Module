import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit() {
  }

  goToQuestionform(){
    this.route.navigate(['add']);
  }

}
