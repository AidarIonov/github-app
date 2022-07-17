import { parseRequestUrl } from './module/utils.js';
import Header from './module/views/components/Header.js';
import Error404 from './module/views/pages/404.js';
import Favorites from './module/views/pages/Favorites.js';
import Home from './module/views/pages/Home.js';
import UserInfo from './module/views/pages/UserInfo.js';

const routes = {
  '/': Home,
  '/favorites': Favorites,
  '/user/:id': UserInfo,
};

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('root');

  header.innerHTML = await Header.render();
  await Header.after_render();
  const { resource, id } = parseRequestUrl();

  const parsedUrl = (resource ? '/' + resource : '/') + (id ? '/:id' : '');

  const page = routes[parsedUrl] || Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
