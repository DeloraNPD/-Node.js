// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    const url1 = '/';
    const url2 = '/about';
    if (req.url === url1) {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(`<h1>Главная страница</h1>
        <p>Количество просмотров: ${viewsHome()}</p>
        <a href=${url2}>Ссылка на страницу about</a>`);
    } else if (req.url === url2) {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end(`<h1>Страница about</h1>
        <p>Количество просмотров: ${viewsAbout()}</p>
        <a href=${url1}>Ссылка на главную страницу</a>`);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=UTF-8"
        });
        res.end("<h1>Страница не найдена</h1>");
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

function counter() {
    let count = 0;
    return function () {
        return count++;
    };
}
let viewsHome = counter();
let viewsAbout = counter();