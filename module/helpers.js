export const createItemBlock = (item) => {
  const favorites = getLocalStorage('favorites');
  const itemFavorite = favorites.find(fav => fav.id === item.id)
  return `<div class='block__item'>
          <div class="img_container">
            <img src='${item.avatar_url}' alt="Avatar" />
          </div>
          <div class="text-block">
          <h3>${item.login}</h3>
          <a target='_blank' href="${item.html_url}">Link to github</a>
          </div>
          <div class="user__buttons">
          ${
            itemFavorite ? (
             ` <span data-id="${item.id}" class="favorite-button active">
                In favorites
              </span>`
            ) : (
              `<span data-id="${item.id}" class="favorite-button">
                Mark as favorite
              </span>`
            )
          }
          <a class='btn-link user__link' href="/#/user/${
            item.login
          }">Show repositories</a>
          </div>
          </div>`;
};

export const debounce = (callback, wait) => {
  let timeout;

  return (argument) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(argument), wait);
  };
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
