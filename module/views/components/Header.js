import { getLocalStorage } from "../../helpers.js";

const Header = {
  render: async () => {
    return `<div class="container header__container">
          <h1><a href="#">Search for Github users</a></h1>
        <ul class="list">
          <li>
            <a href="/#/favorites">(${getLocalStorage('favorites').length}) Favorites</a>
          </li>
        </ul>
      </div>`;
  },

  after_render: async () => {
    // const inputs = document.querySelector('.header__inputs'),
    //   searchInput = document.getElementById('search');

    // if (window.location.hash) {
    //   inputs.style.display = 'none';
    //   searchInput.style.display = 'none';
    // }
  },
};

export default Header;
