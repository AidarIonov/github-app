export class View {
  constructor(api) {
    this.api = api;
    this.currentPage = 1;

    this.usersListWrapper = document.querySelector('.users');
    this.usersList = this.createElement('div', 'users__list');
    this.usersListWrapper.append(this.usersList);
    this.searchInput = document.getElementById('search');
    this.usersPerPageInput = document.getElementById('per_page');
    this.usersCounter = this.createElement('span', 'counter');
    this.usersListWrapper.append(this.usersCounter);
    this.paginationItem = document.querySelector('.pagination');
    this.paginateInput = document.querySelector('.paginate__input');

    this.displayAllUsers();

    document.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'prev-page') {
        if (this.currentPage < 1) {
          this.currentPage = 1;
        }
        console.log(this.currentPage);
        this.currentPage -= 1;
        this.displayAllUsers();
      } else if (e.target.classList[0] === 'next-page') {
        this.currentPage += 1;
        this.displayAllUsers();
      }
    });

    this.paginateInput.addEventListener('input', (e) => {
      this.currentPage = e.target.valueAsNumber;
      this.displayAllUsers();
    });

    this.usersPerPageInput.addEventListener(
      'input',
      this.debounce(this.setUserPerPage.bind(this), 500)
    );
  }

  async displayAllUsers() {
    const users = await this.api.loadUsers(
      this.usersPerPageInput.value,
      this.currentPage - 1
    );
    this.renderUsers(users);
  }

  setUserPerPage(e) {
    this.usersPerPageInput.value = e.target.valueAsNumber;
    this.displayAllUsers();
  }

  createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  async renderUsers(list) {
    this.usersList.innerHTML = '';
    if (!list?.length) {
      document.querySelector('.loader').style.display = 'none'
      this.usersList.innerHTML = '<h2>Users not found!</h2>';
    } else {
      list
        .map((item) => {
          const block = this.createItemBlock(item);
          this.usersList.innerHTML += block;
        })
        .join('');
    }
  }

  createItemBlock(item) {
    return `<div class='users__item'>
            <div class="img_container">
              <img src='${item.avatar_url}' alt="" />
            </div>
            <div class="text-block">
            <h3>${item.login}</h3>
            <a target='_blank' href="${item.html_url}">Link to github</a>
            </div>

            <a class='item__link' href="#">Show repositories</a>
            </div>`;
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
