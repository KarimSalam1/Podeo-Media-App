let links = [];

module.exports = {
  getAllLinks: () => {
    return links;
  },

  getLinkById: (id) => {
    return links.find((link) => link.id === id);
  },

  createLink: (linkData) => {
    const newLink = {
      id: Date.now().toString(),
      ...linkData,
      createdAt: new Date().toISOString(),
    };

    links.push(newLink);
    return newLink;
  },

  updateLink: (id, linkData) => {
    const index = links.findIndex((link) => link.id === id);
    if (index === -1) return null;

    const updatedLink = {
      ...links[index],
      ...linkData,
      updatedAt: new Date().toISOString(),
    };

    links[index] = updatedLink;
    return updatedLink;
  },

  deleteLink: (id) => {
    const initialLength = links.length;
    links = links.filter((link) => link.id !== id);
    return initialLength !== links.length;
  },
};
