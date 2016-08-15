describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/portal');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'API Portal';
    expect(subject).toEqual(result);
  });

  it('should have `API Portal` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'API Portal';
    expect(subject).toEqual(result);
  });


});
