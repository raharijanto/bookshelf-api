const { nanoid } = require('nanoid');
const books = require('./bookshelf');

/* Handler POST */
const postBukuHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  /* Pengecekan selesai dibaca */
  let finished = false;
  if (readPage === pageCount) {
    finished = true;
  }

  /* Memasukkan buku baru ke dalam rak buku */
  const bukubaru = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    id,
    insertedAt,
    updatedAt,
  };

  /* Response gagal buku tanpa nama */
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  /* Response gagal readPage > pageCount buku */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  /* Response berhasil buku ditambahkan */
  books.push(bukubaru);
  const sudahmasuk = books.filter((buku) => buku.id === id).length > 0;
  if (sudahmasuk) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  /* Response gagal buku ditambahkan */
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/* Handler GET */
const getBukuHandler = () => ({
  status: 'success',
  data: {
    books,
    // books: books.map((bukubaru) => ({
    //   id: bukubaru.id,
    //   name: bukubaru.name,
    //   publisher: bukubaru.publisher,
    // })),
  },
});

/* Handler PUT */
const putBukuHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading, finished,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((buku) => buku.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal diperbarui',
  });
  response.code(404);
  return response;
};

/* Handler DELETE */
const deleteBukuHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((buku) => buku.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {
  postBukuHandler, getBukuHandler, putBukuHandler, deleteBukuHandler,
};
