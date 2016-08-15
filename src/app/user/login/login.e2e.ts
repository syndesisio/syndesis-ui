describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/login');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Sign In';
    expect(subject).toEqual(result);
  });

  it('should have `Sign In` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Sign In';
    expect(subject).toEqual(result);
  });


});
