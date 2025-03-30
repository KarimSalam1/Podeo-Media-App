const users = [
  {
    id: "1",
    username: "admin",
    // In a real app, this would be a hashed password
    password: "password",
    createdAt: new Date().toISOString(),
  },
];

module.exports = {
  findByUsername: (username) => {
    return users.find((user) => user.username === username);
  },

  findById: (id) => {
    return users.find((user) => user.id === id);
  },

  getAllUsers: () => {
    return users.map(({ password, ...user }) => user);
  },
};
