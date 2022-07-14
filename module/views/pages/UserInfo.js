import { API } from '../../api.js';
import { createItemBlock } from '../../helpers.js';
import { parseRequestUrl } from '../../utils.js';

const getUserInfo = async (id) => {
  try {
    const options = { cache: 'force-cache' };

    const data = await API.loadUserData(id, options);

    return data;
  } catch (e) {
    console.log(e);
  }
};

const UserInfo = {
  render: async () => {
    const params = parseRequestUrl();
    const [following, followers, repos] = await getUserInfo(params.id);

    const renderedRepos = repos.map((item) => {
      console.log(item);
      return `<div class="users__item">${item.full_name.split('/')[1]}</div>`;
    });
    return `
      <main class="main">
        <div class="container">
          ${createItemBlock(repos[0].owner)}
          <div class="repos">
          <h2>Last repos of this user</h2>
          ${renderedRepos}
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
    `;
  },

  after_render: async () => {
    // const params = parseRequestUrl();
    // console.log(params);
  },
};

export default UserInfo;
