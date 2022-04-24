const {
  postBukuHandler, getBukuHandler, putBukuHandler, deleteBukuHandler,
} = require('./handler');

const rute = [
  {
    method: 'POST',
    path: '/books',
    handler: postBukuHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBukuHandler,
  },
  {
    method: 'PUT',
    path: '/books',
    handler: putBukuHandler,
  },
  {
    method: 'DELETE',
    path: '/books',
    handler: deleteBukuHandler,
  },
];

module.exports = { rute };
