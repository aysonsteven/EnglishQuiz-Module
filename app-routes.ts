import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { QuiztestComponent } from './quiz/quiztest/quiztest-game/quiztest.component';
import { QuizbuilderComponent } from './quiz/quizbuilder/questionform/quizbuilder-form.component';
import { QuiztestHomeComponent } from './quiz/quiztest/quiztest-home/quiztest-home.component';
import { QuiztestFinalComponent } from './quiz/quiztest/quiztest-final/quiztest-final.component';
import { QuizLogComponent } from './quiz/quiz-log/quiz-log.component';
import { QuestionListComponent } from './quiz/quizbuilder/question-list/question-list.component';
const link: Routes = [
    { path: '', redirectTo:'/adminhome', pathMatch: 'full' },
    { path: 'home', component: QuiztestHomeComponent },
    { path: 'adminhome', component: QuestionListComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: AuthenticationComponent },
    { path: 'add', component: QuizbuilderComponent },
    { path: 'edit/:idx', component: QuizbuilderComponent },
    { path: 'game' , component: QuiztestComponent },
    { path: 'game/:id' , component: QuiztestComponent },
    { path: 'final', component: QuiztestFinalComponent },
    { path: 'final/:id', component: QuiztestFinalComponent },
    { path: 'logs', component: QuizLogComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot( link ) ],
    exports: [ RouterModule ]
})

export class RoutesModule {}