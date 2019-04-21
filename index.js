var express = require('express'),
    session = require('express-session'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Keycloak = require('keycloak-connect')
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

var memoryStore = new session.MemoryStore();

app.use(session({
	secret: 'mySecret',
	resave: false,
	saveUninitialized: true,
	store: memoryStore
}));

var keycloak = new Keycloak({
	store: memoryStore
});

app.use(keycloak.middleware({
	logout: '/logout',
	admin: '/'
}));
// check whether the user logged in
app.use((req, res, next) => {
  if (req.session['keycloak-token'] && req.kauth && req.kauth.grant) {
		req.user = req.kauth.grant.id_token.content.preferred_username
  }
  res.locals.user = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', keycloak.protect(), (req, res) => {
  res.redirect('/')
})

var port = 3000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})