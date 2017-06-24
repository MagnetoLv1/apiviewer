import { ApiviewerPage } from './app.po';

describe('apiviewer App', () => {
  let page: ApiviewerPage;

  beforeEach(() => {
    page = new ApiviewerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
