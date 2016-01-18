var faker = require("faker");
var _ = require("lodash");

function generatePerson(id) {
  return {
    id: id,
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName()
    },
    email: faker.internet.email(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    company: faker.company.companyName(),
    address: {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    },
    phone: faker.phone.phoneNumber(),
    bs: faker.company.bs(),
    lorem: faker.lorem.paragraph()
  }
}

function generateFakeData(){
  return {
    people: _.times(20, function (id) {
      return generatePerson(id);
    })
  }
}
var people = generateFakeData();


var jsonServer = require('json-server');

// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

//Add custom routes
server.get('/random', function (req, res) {
  res.json(generatePerson())
});
var router = jsonServer.router(people);
server.use(router);

server.listen(3000);
