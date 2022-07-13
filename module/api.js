export const API_URL = 'https://api.github.com/';

export class API {
  constructor() {}

  async searchUsers(searchValue, userPerPage, page) {
    const res = await fetch(
      `${API_URL}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}`
    );
    return res.json();
  }

  async loadUsers(userPerPage, page) {
    const res = await fetch(
      `${API_URL}users?per_page=${userPerPage}&since=${page}`
    );
    document.querySelector('.loader').style.display = 'none';
    return res.json();
  }

  async loadUserData(user) {
    const urls = [
      `${API_URL}users/${user}/following`,
      `${API_URL}users/${user}/followers`,
      `${API_URL}users/${user}/repos`,
    ];
    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  }
}
