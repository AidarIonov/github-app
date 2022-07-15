import { parseRequestUrl } from './module/utils.js';
import Header from './module/views/components/Header.js';
import Error404 from './module/views/pages/404.js';
import Home from './module/views/pages/Home.js';
import UserInfo from './module/views/pages/UserInfo.js';

const routes = {
  '/': Home,
  '/user/:id': UserInfo,
};

const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('root');

  header.innerHTML = await Header.render();
  await Header.after_render();
  const { resource, id, verb } = parseRequestUrl();

  const parsedUrl =
    (resource ? '/' + resource : '/') +
    (id ? '/:id' : '') +
    (verb ? '/' + verb : '');

  const page = routes[parsedUrl] || Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
