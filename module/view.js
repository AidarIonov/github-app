import { API } from './api.js';
import { createItemBlock, debounce, createElement } from './helpers.js';

const usersListWrapper = document.querySelector('.users'),
  usersList = createElement('div', 'users__list'),
  usersCounter = createElement('span', 'counter'),
  searchInput = document.getElementById('search'),
  sortInput = document.getElementById('sort'),
  orderInput = document.getElementById('order'),
  usersPerPageInput = document.getElementById('per_page'),
  paginateInput = document.querySelector('.paginate__input');
usersListWrapper.append(usersCounter);
usersListWrapper.append(usersList);

let currentPage = 1;

const renderUsers = async (list) => {
  usersList.innerHTML = '';
  if (!list?.length) {
    usersList.innerHTML = '<h2>Users not found!</h2>';
  } else {
    list.map((item) => {
      usersList.innerHTML += createItemBlock(item);
    });
  }
};

const displayAllUsers = async () => {
  const users = await API.loadUsers(usersPerPageInput.value, currentPage - 1);
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

const displayUserInfo = async (id) => {
  const info = await API.loadUserData(id);
  console.log(info);
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

paginateInput.addEventListener('input', (event) => {
  currentPage = event.target.valueAsNumber;
  checkIfIsSearchInput();
});

usersPerPageInput.addEventListener(
  'input',
  debounce(setUserPerPage.bind(this), 500)
);

searchInput.addEventListener('input', debounce(findUsers.bind(this), 500));
sortInput.addEventListener('input', debounce(findUsers.bind(this), 500));
orderInput.addEventListener('input', debounce(findUsers.bind(this), 500));

displayAllUsers();


// export class View {
//   constructor(api) {
//     this.api = api;
//     this.currentPage = 1;
//     if (document.body.id === 'users') {
//       this.usersListWrapper = document.querySelector('.users');
//       this.usersList = createElement('div', 'users__list');
//       this.usersCounter = createElement('span', 'counter');
//       this.usersListWrapper.append(this.usersCounter);
//       this.usersListWrapper.append(this.usersList);
//       this.searchInput = document.getElementById('search');
//       this.sortInput = document.getElementById('sort');
//       this.orderInput = document.getElementById('order');
//       this.usersPerPageInput = document.getElementById('per_page');
//       this.paginateInput = document.querySelector('.paginate__input');

//       this.displayAllUsers();

//       document.addEventListener('click', (event) => {
//         if (event.target.classList[0] === 'prev-page') {
//           if (this.currentPage < 1) {
//             this.currentPage = 1;
//           }
//           this.currentPage -= 1;
//           this.paginateInput.value = this.currentPage;
//           this.checkIfIsSearchInput();
//         } else if (event.target.classList[0] === 'next-page') {
//           this.currentPage += 1;
//           this.paginateInput.value = this.currentPage;
//           this.checkIfIsSearchInput();
//         }
//       });

//       this.paginateInput.addEventListener('input', (event) => {
//         this.currentPage = event.target.valueAsNumber;
//         this.checkIfIsSearchInput();
//       });

//       this.usersPerPageInput.addEventListener(
//         'input',
//         debounce(this.setUserPerPage.bind(this), 500)
//       );

//       this.searchInput.addEventListener(
//         'input',
//         debounce(this.findUsers.bind(this), 500)
//       );
//       this.sortInput.addEventListener(
//         'input',
//         debounce(this.findUsers.bind(this), 500)
//       );
//       this.orderInput.addEventListener(
//         'input',
//         debounce(this.findUsers.bind(this), 500)
//       );
//       this.displayAllUsers();
//     }
//     this.reposWrapper = document.querySelector('.repos');
//     document.addEventListener('click', (e) => {
//       if (e.target.classList[0] === 'item__link') {
//         const userLogin = e.target.getAttribute('data-login');
//         this.displayUserInfo(userLogin);
//       }
//     });
//   }

//   async displayAllUsers() {
//     const users = await this.api.loadUsers(
//       this.usersPerPageInput.value,
//       this.currentPage - 1
//     );
//     this.renderUsers(users);
//   }

//   async findUsers() {
//     if (this.searchInput.value) {
//       const response = await this.api.searchUsers(this.searchInput.value, {
//         page: this.currentPage,
//         userPerPage: this.usersPerPageInput.value,
//         sort: this.sortInput.value.toLowerCase(),
//         order: this.orderInput.value.toLowerCase(),
//       });
//       this.usersCounter.textContent = `Total found users: ${response.total_count}`;
//       this.renderUsers(response.items);
//     } else {
//       this.displayAllUsers();
//       this.usersCounter.textContent = '';
//     }
//   }
//   async displayUserInfo(id) {
//     const info = await this.api.loadUserData(id);
//     console.log(window.history);
//   }

//   setUserPerPage(event) {
//     this.usersPerPageInput.value = event.target.valueAsNumber;
//     this.checkIfIsSearchInput();
//   }

//   checkIfIsSearchInput() {
//     if (!this.searchInput.value) {
//       this.displayAllUsers();
//     } else {
//       this.findUsers();
//     }
//   }

//   async renderUsers(list) {
//     this.usersList.innerHTML = '';
//     if (!list?.length) {
//       this.usersList.innerHTML = '<h2>Users not found!</h2>';
//     } else {
//       list.map((item) => {
//         this.usersList.innerHTML += createItemBlock(item);
//       });
//     }
//   }
// }
