var http = require('http');
var os = require('os');
var Game = require('./Game').Game;


callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    loadIntoFile(str);
  });
}


loadIntoFile = function(input){
	var inp = input.substring(input.indexOf("<pre>") + 5, input.indexOf("</pre>"));
	gamesArray = inp.split(os.EOL);

	gamesArray.forEach(function(item, index){
		var array = item.split(/\s+/);
		if(array.length > 4){
			gamesObj.push(new Game(item.split(/\s+/)));
			if(gamesObj[index].hasBeenPlayed()){
				console.log(gamesObj[index].toString());
			}
		}
	});
}

var gamesObj = [];

var options = {
  host: 'www.masseyratings.com',
  path: '/scores.php?s=286577&sub=12801&all=1&mode=2&sch=on&format=0'
};


var req = http.request(options, callback).end();
