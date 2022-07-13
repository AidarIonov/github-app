import { API, API_URL } from './module/api.js';
import { Search } from './module/search.js';
import { View } from './module/view.js';

const api = new API();
const view = new View(api);
const search = new Search();
view.renderUsers();
