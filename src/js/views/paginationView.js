import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const nextPage = Number(btn.dataset.goto);
      handler(nextPage);
    });
  }

  _generateHTML() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page no is 1, and no other pages
    if (numPages === 1 && currPage === 1) {
      return '';
    }

    //page no is 1, there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateHTMLNxtBtn(currPage);
    }

    // last page
    if (currPage === numPages && currPage > 1) {
      return this._generateHTMLPervBtn(currPage);
    }

    // any other page
    if (currPage > 1 && currPage < numPages) {
      return `
      ${this._generateHTMLPervBtn(currPage)}
      ${this._generateHTMLNxtBtn(currPage)}
        `;
    }
  }

  _generateHTMLPervBtn(currPage) {
    return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
    <span>Page ${currPage - 1}</span>
    </button>
    `;
  }

  _generateHTMLNxtBtn(currPage) {
    return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}

export default new PaginationView();
