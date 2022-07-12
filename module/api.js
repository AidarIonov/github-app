const USER_PER_PAGE = 10;
export const API_URL = 'https://api.github.com/';

export class API {
  constructor() {}

  async searchUsers(searchValue, page) {
    return await fetch(
      `${API_URL}search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${page}`
    );
  }

  async loadUsers(userPerPage, page) {
    return await fetch(`${API_URL}users?per_page=${userPerPage}&since=${page}`);
  }

  async loadUserData(user) {
    const urls = [
      `${URL}users/${user}/following`,
      `${URL}users/${user}/followers`,
      `${URL}users/${user}/repos`,
    ];
    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  }
}
