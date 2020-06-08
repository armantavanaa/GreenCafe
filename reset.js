// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const Menu = require('./models/menu');

// Connect to the database
connect();

// Model a collection of courses
const menus = [
  new Menu({date:'2019-09-25',main: 'Stuffed pepper', side: 'Panini pressed potatoes with rosemary and flaky salt', drink: 'Mint and cucumber water ', salad:'Greens, apples, carrots and Maple syrup vinaigrette',dessert:'Rice pudding with pear and cardamom'}),
  new Menu({date:'2019-09-18',main: 'Tofu or Beef Burritos with rice and salsa', side: 'Panini pressed potatoes with rosemary and flaky salt', drink: 'Horchata with milk and cinnamon', salad:'Green Bean Salad',dessert:'Cajun Spice Brownie'}),
  new Menu({date:'2019-10-30',main: 'Squash Vegetable Risotto', side: 'Fall kale salad with carrots, peppers, hakurei turnips, pepitas, and apple cider vinaigrette', drink: 'Herbal Ajiri Tea with honey and milk', salad:'Green Bean Salad',dessert:' Pumpkin cranberry cake'}),
];


// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(menus.map(menu => menu.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
