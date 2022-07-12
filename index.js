import { API, API_URL } from './module/api.js';
import { View } from './module/view.js';

const api = new API();
const view = new View(api);
view.renderUsers()
// const fetchAllUsers = async (usersPerPage) => {
//   const res = await fetch(`${API_URL}users?per_page=${usersPerPage}`);
//   const users = await res.json();
//   view.renderUsers(users)
// };
// fetchAllUsers()
