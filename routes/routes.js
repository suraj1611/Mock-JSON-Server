const postRoutes = require('./posts');
const authorRoutes = require('./authors');

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('Welcome to the mock REST api server!');
  });

  postRoutes(app, fs);
  authorRoutes(app,fs);

};

module.exports = appRouter;