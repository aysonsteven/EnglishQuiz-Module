import { QuizModulePage } from './app.po';

describe('quiz-module App', function() {
  let page: QuizModulePage;

  beforeEach(() => {
    page = new QuizModulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
