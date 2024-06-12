const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');

const app = new Koa();
const router = new Router();

const SECRET_KEY = '123';

// Simulando uma base de dados de usuários
const users = [
    { id: 1, username: '1234', password: '1234' },
    { id: 2, username: '123', password: '123' }
];

// Middleware para autenticação JWT
const authenticateJWT = async (ctx, next) => {
    const token = ctx.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            ctx.state.user = decoded;
            await next();
        } catch (err) {
            ctx.status = 401;
            ctx.body = { error: 'Token inválido' };
        }
    } else {
        ctx.status = 401;
        ctx.body = { error: 'Token necessário' };
    }
};

// Rota para autenticação e obtenção de token JWT
router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
        ctx.body = { token };
    } else {
        ctx.status = 401;
        ctx.body = { error: 'Credenciais inválidas' };
    }
});

// Rota protegida
router.get('/protegido', authenticateJWT, async (ctx) => {
    ctx.body = { message: 'Rota protegida alcançada!' };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
