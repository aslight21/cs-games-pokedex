var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 5678;
var router = express.Router();

var pokemons = [
    {
      "number": "004",
      "name": "Charmander",
      "type": "Fire",
      "image": "http://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/250px-004Charmander.png"
    },
    {
      "number": "025",
      "name": "Pickachu",
      "type": "Electric",
      "image": "http://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png"
    }
];

router.get('/', function(req, res) {
    res.json({ message: 'Pokedex' });
});

router.route('/pokemons')

    .get(function(req, res) {
        res.json({
            "pokemons": pokemons
        });
    })

    .post(function(req, res) {
        pokemons.push(req.body);
        res.json({ message: 'Pokemon created!' });
    });


app.use('/pokedex', router);
app.listen(port);

console.log('Listening on port ' + port);
