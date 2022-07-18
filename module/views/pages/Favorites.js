import { createItemBlock, getLocalStorage } from '../../helpers.js';

const Favorites = {
  render: async () => {
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
    favorites.length
      ? favorites.map((item) => {
          favoritesWrapper.innerHTML += createItemBlock(item);
        })
      : (favoritesWrapper.innerHTML =
          '<h2 class="error-title">You haven`t added anyone to list yet!</h2>');
  },
};

export default Favorites;
