import { getLocalStorage } from '../../helpers.js';

const Header = {
  render: async () => {
    return `<div class="container header__container">
          <h1><a href="#">Search for Github users</a></h1>
        <ul class="list">
          <li>
            <a href="/#/favorites">Favorites</a>
          </li>
        </ul>
      </div>`;
  },

  after_render: async () => {},
};

export default Header;
