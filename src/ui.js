const Koa = require('koa');
const IO = require('koa-socket');
const logger = require('koa-logger');
const views = require('koa-views');
const path = require('path');
const Router = require('koa-router');
const nunjucks = require('koa-nunjucks-render');
const serve = require('koa-static');

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
        console.log(ctx.path);
        ctx.render('index');
    });
    return router;
}

// mem-mon
exports.start = function (options) {
    initApp().listen(options.uiPort || 5550, () => {
        console.log(`memwatch-ui started at http://localhost:${options.uiPort}`);
    });
}