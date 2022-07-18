import { API } from '../../api.js';
import {
  debounce,
  createItemBlock,
  getLocalStorage,
  setLocalStorage,
} from '../../helpers.js';

const Home = {
  render: async () => {
    return `
    <main class="main">
    <div class="container">
    <div class="main__header">
    <input
            id="search"
            type="search"
            name="search"
            placeholder="Enter user nickname"
          />
    <div class="main__inputs">
    <div class="select">
    <select id="sort">
      <option>Joined</option>
      <option>Followers</option>
      <option>Repositories</option>
    </select>
    <fieldset>
      <legend>Sort</legend>
    </fieldset>
    <svg viewBox="0 0 24 24">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
      />
    </svg>
  </div>
  <div class="select">
    <select id="order">
      <option>Asc</option>
      <option>Desc</option>
    </select>
    <fieldset>
      <legend>Order</legend>
    </fieldset>
    <svg viewBox="0 0 24 24">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
      />
    </svg>
  </div>
  <div class="per-page-input">
    <fieldset>
      <input id="per_page" type="number" value="9" min="1" />
      <legend>Per page</legend>
    </fieldset>
  </div>
    </div>
  </div>
      <div class="users">
      <span class="counter"></span>
      <div class="users__list">
      <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </div></div>
      </div>
    </div>
    </main>
    <div class="paginate">
        <button class="prev-page">< prev</button>
        <input class="paginate__input" type="number" value="1" min="1" />
        <button class="next-page">next ></button>
      </div>
    `;
  },
  after_render: async () => {
    const usersList = document.querySelector('.users__list'),
      usersCounter = document.querySelector('.counter'),
      searchInput = document.getElementById('search'),
      sortInput = document.getElementById('sort'),
      orderInput = document.getElementById('order'),
      usersPerPageInput = document.getElementById('per_page'),
      paginateInput = document.querySelector('.paginate__input');

    let currentPage = 1;
    let usersArray = [];
    let favorites = getLocalStorage('favorites') || [];

    document.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'favorite-button') {
        const id = parseInt(e.target.dataset.id);
        const inFavoriteExists = favorites.find((item) => item.id === id);
        if (inFavoriteExists === undefined) {
          const user = usersArray.find((item) => item.id === id);
          favorites.push(user);
          e.target.classList.add('active');
          e.target.textContent = 'In favorites';
        } else {
          favorites = favorites.filter((item) => item.id !== id);
          e.target.classList.remove('active');
          e.target.textContent = 'Mark as favorite';
        }
        setLocalStorage('favorites', favorites);
      }
    });

    const renderUsers = async () => {
      try {
        usersList.innerHTML = '';
        if (!usersArray?.length) {
          usersList.innerHTML = '<h2 class="error-title">Users not found!</h2>';
        } else {
          usersArray.map((item) => {
            usersList.innerHTML += createItemBlock(item);
          });
        }
      } catch (e) {
        console.log(e);
        usersList.innerHTML =
          '<h2 class="error-title">Oops! Something went wrong. Try it later</h2>';
        usersCounter.textContent = '';
      }
    };

    const displayAllUsers = async () => {
      const users = await API.loadUsers(
        usersPerPageInput.value,
        currentPage - 1
      );
      usersArray = users;
      renderUsers();
    };

    const findUsers = async () => {
      if (searchInput.value) {
        const response = await API.searchUsers(searchInput.value, {
          page: currentPage,
          userPerPage: usersPerPageInput.value,
          sort: sortInput.value.toLowerCase(),
          order: orderInput.value.toLowerCase(),
        });
        usersCounter.textContent = `Total found users: ${response.total_count}`;
        usersArray = response.items;
        renderUsers();
      } else {
        displayAllUsers();
        usersCounter.textContent = '';
      }
    };

    const setUserPerPage = (event) => {
      usersPerPageInput.value = event.target.valueAsNumber;
      checkIfIsSearchInput();
    };

    const checkIfIsSearchInput = () => {
      if (!searchInput.value) {
        displayAllUsers();
      } else {
        findUsers();
      }
    };

    document.addEventListener('click', (event) => {
      if (event.target.classList[0] === 'prev-page') {
        if (currentPage < 1) {
          currentPage = 1;
        }
        currentPage -= 1;
        paginateInput.value = currentPage;
        checkIfIsSearchInput();
      } else if (event.target.classList[0] === 'next-page') {
        currentPage += 1;
        paginateInput.value = currentPage;
        checkIfIsSearchInput();
      }
    });

    document.addEventListener('input', (event) => {
      if (event.target.classList[0] === 'paginate__input') {
        currentPage = event.target.valueAsNumber;
        checkIfIsSearchInput();
      }
    });

    usersPerPageInput.addEventListener('input', debounce(setUserPerPage, 500));

    searchInput.addEventListener('input', debounce(findUsers, 500));
    sortInput.addEventListener('input', debounce(findUsers, 500));
    orderInput.addEventListener('input', debounce(findUsers, 500));
    displayAllUsers();
  },
};
export default Home;
