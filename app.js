var order1 = 'pizza';
var order2 = 'pineapplePizza';

var makeDough = function() {
  return 'dough';
}

var putToppings = function(order, base) {
  var toppings = {
    pizza: 'tomato, mozzarella, basil',
    pineapplePizza: 'pineapple, tomato, mozzarella, basil'
  }

  return toppings[order] + ' on ' + base;
}

var bake = function(preppedMeal) {
  return 'baked: ' + preppedMeal;
}

var cook = function(order) {
  var areInstallationsOk = true;

  return new Promise(function(resolve, reject) {
    if(areInstallationsOk) {
      var cookTimes = {
        pizza: 3000,
        pineapplePizza: 6000
      }
      var COOK_TIME = cookTimes[order];
      var thingThatsTakingTime = function() {
        var cookedMeal = bake(putToppings(order, makeDough()));
        resolve(cookedMeal);
      }
      window.setTimeout(thingThatsTakingTime, COOK_TIME);
    }
    else {
      reject('The kitchen blew up!!!');
    }
  });
}

var serve = function(cookedMeal) {
  // var result = 'plate of ' + cookedMeal;
  // thingToDoAfterServing(result);

  return new Promise(function(thingToDoAfterServing){
    var result = 'plate of ' + cookedMeal;
    thingToDoAfterServing(result);
  });
}

var eat = function(servedMeal) {
  var result = 'eat a ' + servedMeal;
  console.log(result);
}

var apologize = function(whatHappened) {
  console.log("I'm terribly sorry, but " + whatHappened);
}

var haveDinner = function(order1, order2) {
  // cook(order)
  //   .then(serve)
  //   .then(eat)
  //   .catch(apologize);

  Promise.all([ cook(order1), cook(order2) ])
    .then(serve)
    .then(eat)
    .catch(apologize);
}

haveDinner(order1, order2);
