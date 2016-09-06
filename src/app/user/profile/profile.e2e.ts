describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/profile');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Profile';
    expect(subject).toEqual(result);
  });

  it('should have `Profile` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Profile';
    expect(subject).toEqual(result);
  });


});
