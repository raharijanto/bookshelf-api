const Hapi = require('@hapi/hapi');
const { rute } = require('./routes');

const mulai = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(rute);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

mulai();
