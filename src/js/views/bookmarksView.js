import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'We could not find any Bookmarks. Please find some nice recipes and bookmark them';
  _message = '';

  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTML() {
    const markup = this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    return markup;
  }
}
export default new BookmarksView();
