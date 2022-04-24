const {
  postBukuHandler, getBukuHandler, putBukuHandler, deleteBukuHandler, getIDBukuHandler,
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
    method: 'GET',
    path: '/books/{id}',
    handler: getIDBukuHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: putBukuHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBukuHandler,
  },
];

module.exports = { rute };
