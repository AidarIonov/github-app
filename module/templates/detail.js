export const detail = `
<header class="header">
      <div class="container header__container">
        <div class="header__title">
          <h1><a href="index.html">Search for Github users</a></h1>
        </div>
      </div>
    </header>
<main class="main">
<div class="container">
  <div class="repos-owner"></div>
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
<!-- <div class="paginate">
      <button class="prev-page">< prev</button>
      <input class='paginate__input' type="number" value='1' min='1'>
      <button class="next-page">next ></button>
    </div> -->
</main>
<script src="index.js" type="module"></script>
`;
