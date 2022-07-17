import { API } from '../../api.js';
import { createItemBlock, debounce } from '../../helpers.js';
import { parseRequestUrl } from '../../utils.js';

const UserInfo = {
  render: async () => {
    return `
      <main class="main">
        <div class="container">
        <div class="repos__owner">
        </div>
        <div class="repos__header">
        <div class="main__inputs">
        <div class="select">
          <select id="repos-sort">
            <option>Created</option>
            <option>Updated</option>
            <option>Pushed</option>
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
          <select id="repos-order">
            <option>Asc</option>
            <option>Desc</option>
          </select>
          <fieldset>
            <legend>Direction</legend>
          </fieldset>
          <svg viewBox="0 0 24 24">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
            />
          </svg>
        </div>
        <div class="header__per-page">
          <fieldset>
            <input id="repos-per-page" type="number" value="6" min="1" />
            <legend>Per page</legend>
          </fieldset>
        </div>
        </div>
        </div>
          <div class="repos">
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
        </main>
        <a target="_blank" class="btn-link repos__btn">More repositories in github</a>
    `;
  },

  after_render: async () => {
    const reposWrapper = document.querySelector('.repos'),
      sortInput = document.getElementById('repos-sort'),
      orderInput = document.getElementById('repos-order'),
      perPageInput = document.getElementById('repos-per-page'),
      reposOwnerWrapper = document.querySelector('.repos__owner'),
      moreReposBtn = document.querySelector('.repos__btn');
    let currentPage = 1;
    const params = parseRequestUrl();

    const renderRepos = async (list) => {
      reposOwnerWrapper.innerHTML = createItemBlock(list[0].owner);
      moreReposBtn.href = list[0].owner.html_url
      try {
        reposWrapper.innerHTML = '';
        if (!list.length) {
          reposWrapper.innerHTML =
            '<h2 class="error-title">Repos not found!</h2>';
        } else {
          reposWrapper.innerHTML += list
            .map((item) => {
              return `<div class="block__item repos__item">
                    <h4>${item.full_name.split('/')[1]}</h4>
              <a target="_blank" href="${
                item.html_url
              }" class="btn-link">Go to github</a>
                  </div>`;
            })
            .join('');
        }
      } catch (e) {
        reposWrapper.innerHTML =
          '<h2 class="error-title">Oops! Something went wrong!</h2>';
      }
    };

    const fetchAndDisplayRepos = async () => {
      const [repos] = await API.loadUserData(
        params.id,
        currentPage,
        perPageInput.value,
        sortInput.value.toLowerCase(),
        orderInput.value.toLowerCase()
      );
      renderRepos(repos);
    };

    const setUserPerPage = (event) => {
      perPageInput.value = event.target.valueAsNumber;
      fetchAndDisplayRepos();
    };

    perPageInput.addEventListener('input', debounce(setUserPerPage, 500));
    document.addEventListener('input', (e) => {
      if (e.target.id === 'repos-sort' || e.target.id === 'repos-order') {
        fetchAndDisplayRepos();
      }
    });
    fetchAndDisplayRepos();
  },
};

export default UserInfo;
