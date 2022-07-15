const Header =  {
  render: async () => {
    return (
      `<div class="container header__container">
        <div class="header__title">
          <h1><a href="/">Search for Github users</a></h1>
          <input
            id="search"
            type="search"
            name="search"
            placeholder="Enter user nickname"
          />
        </div>
        <div class="header__inputs">
          <div class="select">
            <select id="sort">
              <option>Joined</option>
              <option>Followers</option>
              <option>Repositories</option>
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
            <select id="order">
              <option>Asc</option>
              <option>Desc</option>
            </select>
            <fieldset>
              <legend>Order</legend>
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
              <input id="per_page" type="number" value="5" min="0" />
              <legend>Per page</legend>
            </fieldset>
          </div>
        </div>
      </div>`
    )
  },

  after_render: async () => {}

}

export default Header