const Error404 = {
  render: async () => {
    return `
      <main class="main">
        <div class="container notfound__container">
            <h3>Error 404! This page not found!</h3>
            <a class="btn-link" href="#">Go home</a>
          </div>
        </div>
        </main>
    `;
  },
  after_render: async () => {},
};

export default Error404;
