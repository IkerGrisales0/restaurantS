const { get } = require("react-hook-form");

const user = getUser();
const posts = getPosts();
const [u, p] = await Promise.all([user, posts]);


const user = getUser();