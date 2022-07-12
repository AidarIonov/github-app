export class View {
  constructor(api) {
    this.api = api;
    this.usersListWrapper = document.querySelector('.users');
    this.usersList = this.createElement('div', 'users__list');
    this.usersListWrapper.append(this.usersList);
    this.searchInput = document.getElementById('search');
    this.usersPerPageInput = document.getElementById('per_page');
    this.usersCounter = this.createElement('span', 'counter');
    this.usersListWrapper.append(this.usersCounter);
  

    this.usersPerPageInput.addEventListener('input', (e) => {
      this.usersPerPageInput.value = e.target.valueAsNumber;
      this.renderUsers();
    });
  }

  createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  async renderUsers() {
    const res = await this.api.loadUsers(this.usersPerPageInput.value, this.perPage);
    const users = await res.json();
    this.usersList.innerHTML = '';
    users.length
      ? users
          .map((item) => {
            this.usersList.innerHTML += `<div class='users__item'>${item.login}</div>`;
          })
          .join('')
      : (this.usersList.innerHTML = 'Nothing');
  }
}
