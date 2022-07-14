export const API_URL = 'https://api.github.com/';

export const API = {
  async searchUsers(searchValue, params) {
    const res = await fetch(
      `${API_URL}search/users?q=${searchValue}&page=${params.page}&per_page=${params.userPerPage}&sort=${params.sort}&order=${params.order}`
    );
    return res.json();
  },

  async loadUsers(userPerPage, page) {
    try {
      const res = await fetch(
        `${API_URL}users?per_page=${userPerPage}&since=${page}`
      );
      document.querySelector('.loader').style.display = 'none';
      return res.json();
    } catch (e) {
      document.querySelector('.users__list').innerHTML =
        '<h2>Oops! Something went wrong</h2>';
    }
  },

  async loadUserData(user, options) {
    const urls = [
      `${API_URL}users/${user}/following`,
      `${API_URL}users/${user}/followers`,
      `${API_URL}users/${user}/repos`,
    ];
    const requests = urls.map((url) => fetch(url, options));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  },
};
