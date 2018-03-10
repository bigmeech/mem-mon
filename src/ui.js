const Koa = require('koa');
const IO = require('koa-socket');
const logger = require('koa-logger');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const nunjucks = require('koa-nunjucks-render');
const serve = require('koa-static');
const core = require('./core');

function initApp() {
    const app = new Koa();
    const io = new IO();
    const router = initRoutes();
    io.attach(app);

    const viewsDirectory = path.join(__dirname, 'views');
    const staticDir = path.join(__dirname, '/public');

    app.use(logger());
    app.use(nunjucks(viewsDirectory, { ext: '.nunjucks' }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(serve(staticDir));
    return app;
}

function initRoutes() {
    const router = new Router();
    router.get('index', '/', (ctx, next) => {
        ctx.render('index');
    });
    return router;
}

// mem-mon
exports.initialize = function (options) {
  initApp().listen(options.uiPort || 5550, () => {
    console.log(`MEMMON: MemMon dashboard started at http://localhost:${options.uiPort}`);
    console.log(`MEMMON: options :${JSON.stringify(options)}`);
    core.spawnApp(options.entry);
  });
};
