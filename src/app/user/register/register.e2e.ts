describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/register');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Register';
    expect(subject).toEqual(result);
  });

  it('should have `Register` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Register';
    expect(subject).toEqual(result);
  });


});
