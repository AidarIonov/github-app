export const API_URL = 'https://api.github.com/';

export const API = {
  async searchUsers(searchValue, params) {
    return (await fetch(
      `${API_URL}search/users?q=${searchValue}&page=${params.page}&per_page=${params.userPerPage}&sort=${params.sort}&order=${params.order}`
    )).json()
  },

  async loadUsers(userPerPage, page) {
    return (
      await fetch(`${API_URL}users?per_page=${userPerPage}&since=${page}`)
    ).json();
  },

  async loadUserData(user, page, per_page, sort, order) {
    const urls = [
      // `${API_URL}users/${user}/following`,
      // `${API_URL}users/${user}/followers`,
      `${API_URL}users/${user}/repos?page=${page}&per_page=${per_page}&sort=${sort}&direction=${order}`,
    ];
    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((res) => res.json()))
    );
  },
};
