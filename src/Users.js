// src/users.js
const users = [];

export const addUser = (user) => {
  users.push(user);
};

export const findUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

export const validateUser = (username, password) => {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return true;
  }
  return false;
};