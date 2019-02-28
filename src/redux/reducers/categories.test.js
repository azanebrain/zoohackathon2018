import * as actions from '../actions/actions';

describe('Post Actions', () => {

  const description = 'Description of why Palm Oil\'s bad';
  const id = 3;
  const link = 'https://2018zoohackathon.ajzane.com/category/palm-oil/';
  const name = 'Palm Oil';
  const parent = 0;
  const slug = 'palm-oil';

  it('should create an action to add a post with isActive: true', () => {

    const expectedAction = {
      type: actions.ADD_CATEGORY,
      description,
      id,
      link,
      name,
      parent,
      slug,
    };

    expect(
      actions.addCategory(
        description,
        id,
        link,
        name,
        parent,
        slug,
      )
    ).toEqual(expectedAction)
  });
});