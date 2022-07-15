export const createItemBlock = (item) => {
  return `<div class='block__item'>
          <div class="img_container">
            <img src='${item.avatar_url}' alt="" />
          </div>
          <div class="text-block">
          <h3>${item.login}</h3>
          <a target='_blank' href="${item.html_url}">Link to github</a>
          </div>
          <a class='item__link' href="/#/user/${item.login}">Show repositories</a>
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
  document.addEventListener('click', (event) => {
    let currentPage;
    if (event.target.classList[0] === 'prev-page') {
      if (currentPage < 1) {
        currentPage = 1;
      }
      currentPage -= 1;
      currentPage = value;
      func();
    } else if (event.target.classList[0] === 'next-page') {
      currentPage += 1;
      currentPage = value;
      func();
    }
  });
};
