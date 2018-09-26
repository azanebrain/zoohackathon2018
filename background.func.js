

const hotDog = 'https://www.amazon.com/NongShim-Ramyun-Noodle-Gourmet-Spicy/dp/B00778B90S';
const notHotDog = 'https://www.amazon.com/fortnite';
describe(`pages should highlight when keywords occur`, () => {
  it('NongShim-Ramyun has palm oil!', () => {
    return browser.url(hotDog).then(()=>{
      return browser.getText('mark').then((actualContent) => {
        return actualContent.length > 0 ? true : false;
      })
    });
  });

  it('Fortnite does not have palm oil.', () => {
    return browser.url(notHotDog).then(()=>{
      return browser.getText('mark').then((actualContent) => {
        return false;
      })
      .catch((err) => { // if getText was not found return true.
        return true;
      })
    });
  });
});
