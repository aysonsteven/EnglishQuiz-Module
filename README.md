# EnglishQuiz-Module
English Quiz Module


#Installation
    npm install @types/lodash --save
    npm install --save @ng-bootstrap/ng-bootstrap
    copy or add as submodule EnglishQuiz-Module
    @index.html link the bootstrap.min.css and also the js files.
    <link rel="stylesheet" href="./assets/bootstrap.min.css">
    <script src="./assets/jquery-3.1.1.min.js"></script> 
    <script src="./assets/bootstrap.min.js"></script>

    then copy the css and js module's assets to your assets folder

    on app.module import ngb Module it should be like this:
    import ngBootstrap to the main module : mport {NgbModule} from '@ng-bootstrap/ng-bootstrap';
    imports: [NgbModule.forRoot(), ...]

##After installation you can now use the English Quiz Module
###Just import the quiz module
####import { QuizModule } from './quizmodule/quiz.module';
####imports: [ QuizModule ]
###After importing quiz module you can now use all the components from quizmodule

#for admin routing:
    id: aysonsteven
    pw: mypassword

https://quizbuilder-7c420.firebaseapp.com

#backup and testing.
    englishquizsample.esy.es