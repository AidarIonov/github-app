export const createItemBlock = (item) => {
  return `<div class='block__item'>
          <div class="img_container">
            <img src='${item.avatar_url}' alt="Avatar" />
          </div>
          <div class="text-block">
          <h3>${item.login}</h3>
          <a target='_blank' href="${item.html_url}">Link to github</a>
          </div>
          <a class='btn-link user__link' href="/#/user/${item.login}">Show repositories</a>
          </div>`;
};

export const debounce = (callback, wait) => {
  let timeout;

  return (argument) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(argument), wait);
  };
};

export const handlePaginate = (func, value) => {
  
};
