export const pageTitle = 'GitHub Users';
export const routes = {
  // 404: {
  // 	template: "/templates/404.html",
  // 	title: "404 | " + pageTitle,
  // 	description: "Page not found",
  // },
  '/': {
    template: '../pages/index.html',
    title: 'Home | ' + pageTitle,
  },
  detail: {
    template: '../pages/detail.html',
    title: 'User Info | ' + pageTitle,
  },
};

export const locationHandler = async () => {
  let location = window.location.hash.replace('#', '');
  if (location.length === 0) {
    location = '/';
  }
  const route = routes[location]
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById('content').innerHTML = html;
  document.title = route.title;
};
