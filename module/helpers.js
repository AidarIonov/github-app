export const createItemBlock = (item) => {
  return `<div class='users__item'>
          <div class="img_container">
            <img src='${item.avatar_url}' alt="" />
          </div>
          <div class="text-block">
          <h3>${item.login}</h3>
          <a target='_blank' href="${item.html_url}">Link to github</a>
          </div>
          <a class='item__link' data-link data-login='${item.login}' href="/#/user/${item.login}">Show repositories</a>
          </div>`;
};

export const createElement = (elementName, className) => {
  const element = document.createElement(elementName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

export const debounce = (callback, wait) => {
  let timeout;

  return (argument) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(argument), wait);
  };
};
