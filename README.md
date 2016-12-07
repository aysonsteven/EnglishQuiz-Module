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
#### import the quiz module
#####import { QuizModule } from './quizmodule/quiz.module';
#####imports: [ QuizModule ]
#####After installation you can now use the English Quiz Module





###UPDATE:
####Dec 1, 2016 4:00PM Questions CRUD
####Dec 4, 2016 09:AM Routing
####Dec 4, 2016 10:AM randomizing quiz without repeat
####Dec 4, 2016 10:AM form Validations
####Dec 6, 2016 3:00PM posting registered user's stats
####Dec 7, 2016 3:30AM Let non registered user to take quiz
####Dec 7, 2016 10:40AM Searching/filtering

###TODOs
####Secure Admin routing
####Prevent user to edit parameters score or hide it
####Provide APK

###Admin:
    id: aysonsteven
    pw: mypassword

https://quizbuilder-7c420.firebaseapp.com

###backup and testing.
    englishquizsample.esy.es