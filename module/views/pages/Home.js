import { API } from "../../api.js";
import { debounce, createItemBlock } from "../../helpers.js";

const Home = {
  render: async () => {
    return `
    <main class="main">
    <div class="container">
      <div class="users">
      <span class="counter"></span>
      <div class="users__list"></div>
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
        </div>
      </div>
    </div>
    <div class="paginate">
      <button class="prev-page">< prev</button>
      <input class="paginate__input" type="number" value="1" min="1" />
      <button class="next-page">next ></button>
    </div>
  </main>
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

    const renderUsers = async (list) => {
      try {
        usersList.innerHTML = '';
        if (!list?.length) {
          usersList.innerHTML = '<h2>Users not found!</h2>';
        } else {
          list.map((item) => {
            usersList.innerHTML += createItemBlock(item);
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    const displayAllUsers = async () => {
      const users = await API.loadUsers(
        usersPerPageInput.value,
        currentPage - 1
      );
      renderUsers(users);
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
        renderUsers(response.items);
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

    const displayUserInfo = async (login) => {
      const info = await API.loadUserData(login);
      const owner = document.createElement('div');
      owner.innerHTML = createItemBlock(info[2][0].owner);
      document.querySelector('.repos').append(owner);
      // console.log(createItemBlock(info[2][0].owner));
    };

    document.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'item__link') {
        const userLogin = e.target.getAttribute('data-login');
        displayUserInfo(userLogin);
      }
    });

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

    usersPerPageInput.addEventListener(
      'input',
      debounce(setUserPerPage.bind(this), 500)
    );

    searchInput.addEventListener('input', debounce(findUsers.bind(this), 500));
    sortInput.addEventListener('input', debounce(findUsers.bind(this), 500));
    orderInput.addEventListener('input', debounce(findUsers.bind(this), 500));
    displayAllUsers()
  },
};
export default Home;
