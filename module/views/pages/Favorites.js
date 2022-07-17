import { createItemBlock, getLocalStorage } from '../../helpers.js';

const renderFav = () => {
  const favoritesWrapper = document.querySelector('.favorites');
  console.log(favoritesWrapper);
}

const Favorites = {
  render: async () => {
    renderFav()
    return `
      <main class="main">
        <div class="container">
            <h3>Favorite list</h3>
            <div class="favorites">
            </div>
          </div>
        </div>
        </main>
    `;
  },

  after_render: async () => {
    const favoritesWrapper = document.querySelector('.favorites');
    const favorites = getLocalStorage('favorites') || [];
    const renderFav = () => {
      favorites.length ? favorites.map((item) => {
        favoritesWrapper.innerHTML += createItemBlock(item);
      }) : favoritesWrapper.innerHTML = '<h2 class="error-title">You haven`t added anyone to list yet!</h2>';
    };
    renderFav();
  },
};

export default Favorites;
