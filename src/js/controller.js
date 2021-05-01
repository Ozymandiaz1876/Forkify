import * as model from './model.js';
import { CLOSE_MODAL_SEC } from './config.js';
import recipeView from './views/recipesView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// parcel hot module
if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.loadSpinner();

    // update search result for active selected

    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // get  recipe
    await model.loadRecipe(id);

    // render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearch = async function () {
  try {
    resultView.loadSpinner();

    // get search from query
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    // render the results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlpagination = function (page) {
  //render rew result
  resultView.render(model.getSearchResultsPage(page));
  // render next pagination
  paginationView.render(model.state.search);
};

const controlServing = function (servings) {
  // update serving in state(model.js)
  model.updateServings(servings);
  // update in recipeview
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // load spinner

    recipeView.loadSpinner();

    // upload recipe
    await model.uploadRecipe(newRecipe);

    //render the recipe
    recipeView.render(model.state.recipe);

    // show success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //set id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the modal
    setTimeout(function () {
      if (!addRecipeView.isVisible()) return;
      addRecipeView._toggleModal();
      // render back the form
      addRecipeView.render(model.state.recipe);
    }, CLOSE_MODAL_SEC * 1000);
  } catch (err) {
    addRecipeView.renderErrorMessage(err);
  }
};

const init = function () {
  bookmarksView.addhandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlpagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
