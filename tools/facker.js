var express = require('express');
var faker = require('faker');
var app = express();
app.use(express.static('public'));

app.get('/', function (request, response) {
  const data = generateUsers();
  response.json(data);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function generateUsers() {
  const users = [];
  for (let i = 1; i <= 50; i++) {
    users.push(generateUser(i));
  }
  return users;
}

function generateUser(id) {
  // make name contextual to username and email
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  let dob = faker.date.past(
    50,
    new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)')
  );
  dob = dob.getFullYear() + '-' + (dob.getMonth() + 1) + '-' + dob.getDate();
  const mobile = faker.phone.phoneNumber('##########');
  const email = faker.internet.email(firstName, lastName);
  const avatar = faker.internet.avatar();
  const gender = faker.random.number(1) ? 'male' : 'female';
  const createdAt = faker.date.past();
  return {
    id: id,
    createdAt: createdAt,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    email: email,
    mobileNumber: mobile,
    gender: gender,
    avatar: avatar
  };
}
