// Require Path
var jquery = "https://code.jquery.com/jquery-3.2.1.slim.min.js",
    test = "test.min";

requirejs([jquery, test], function($) {
  var yourName = "Mike";
  testFunction(yourName);
});