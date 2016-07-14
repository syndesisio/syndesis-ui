describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/reset');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Reset Password';
    expect(subject).toEqual(result);
  });

  it('should have `Reset Password` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Reset Password';
    expect(subject).toEqual(result);
  });


});
