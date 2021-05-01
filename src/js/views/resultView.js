import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'We could not find any matching result. Please try another keyword';
  _message = '';

  _generateHTML() {
    const markup = this._data
      .map(result => previewView.render(result, false))
      .join('');
    return markup;
  }
}
export default new ResultView();
