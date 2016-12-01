import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './app-routes.module';

import { AuthsessionService } from './services/auth-session.service';
import { User } from './quiz-module/services/user.service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { QuiztestComponent } from './quiztest/quiztest.component';
import { QuizbuilderComponent } from './quizbuilder/quizbuilder.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthenticationComponent,
    HomeComponent,
    RegistrationComponent,
    QuiztestComponent,
    QuizbuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule
  ],
  providers: [ AuthsessionService, User ],
  bootstrap: [AppComponent]
})
export class AppModule { }
