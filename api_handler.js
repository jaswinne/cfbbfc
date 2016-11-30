var BOT = require('./bot');

var API = {

    init: function(a,s,d){

        this.app = a;
        this.server = s;
        this.database = d;

        this.path = require('path');
        this.bodyParser = require('body-parser');
        this.https = require('https');
        this.crypto = require('crypto');

        // best way to get the "body" from POST requests
        this.app.use(this.bodyParser.urlencoded({ extended: false, type:"urlencoded" }));


        // used for general file routing
        this.rootDir = this.path.dirname(require.main.filename);

        if (this.app && this.server && this.database)
            console.log("API Initialized");
        else
            console.log("Failure: API Initialization");
    },
    start: function() {
        /*
            BOT CODE
        */

            API.app.all('/bot(/)?', (request, response) => {
                if(request.method === "POST"){
                    console.log("BOT REQUEST");
                    API.bot(request, response);
                }
                else {
                    API.methodNotAllowed(request,response);
                }
            });


        /*
            CFB CODE
        */


        // add team
        API.app.all('/team/add(/)?', function(req,res) {
            if (req.method == "POST") {
                API.add_team(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        
        // add conference
        API.app.all('/conference/add(/)?', function(req,res) {
            if (req.method == "POST") {
                API.add_conference(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // add game
        API.app.all('/game/add(/)?', function(req,res) {
            if (req.method == "POST") {
                API.add_game(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // add team to conference
        API.app.all('/conference/add/team(/)?', function(req,res) {
            if (req.method == "POST") {
                API.add_conference_team(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get conference
        API.app.all('/conference(/)?', function(req,res) {
            if (req.method == "GET") {
                API.conference(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get team
        API.app.all('/team(/)?', function(req,res) {
            if (req.method == "GET") {
                API.team(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get game
        API.app.all('/game(/)?', function(req,res) {
            if (req.method == "GET") {
                API.game(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get conference
        API.app.all('/conferences(/)?', function(req,res) {
            if (req.method == "GET") {
                API.conferences(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get team
        API.app.all('/teams(/)?', function(req,res) {
            if (req.method == "GET") {
                API.teams(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });
        // get game
        API.app.all('/games(/)?', function(req,res) {
            if (req.method == "GET") {
                API.games(req,res);
            }
            else {
                API.methodNotAllowed(req,res);
            }
        });

        // this handles generic file routing, and 404's the rest.
        API.app.get('/*(/)?',function(req,res){
            // disallow some things to be seen (.js files, most importantly)
            // SECURITY ISSUE!
            if (req.path.indexOf('node_modules') < 0) {
                var path;
                if (API.path.extname(req.path)) {
                    path = API.path.join(API.rootDir, req.path);
                }
                else {
                    path = API.path.join(API.rootDir, req.path, 'index.html');
                }
                res.sendFile(path, null, function(err){
                    if (err) {
                        API.notFound(req,res);
                    }
                });
            }
            else {
                API.notFound(req,res);
            }
        });
        // this needs to be the last app.all called (for 404 errors and bad requests)
        API.app.all('*', function(req, res){API.notFound(req,res);});


        console.log('API Started');
    },

    // API BOT CALLS

    bot: (request, response) => {

        var responseOut = { status: {code:"69",description:"harambot has spoken"} };
        var input = request.body.input;
        console.log(input);
        if(input){
            //database call??
            var botResponse = BOT.parse(input);
            responseOut.output = botResponse;
            API.sendResponse(request, response, responseOut);
        }
        else {
            responseOut.status.code = "-69";
            responseOut.status.description = "Error with input to bot. Use \"input\" as the key for the data";
            API.sendResponse(request,response,responseOut);
        }
    },









    //API CFB calls
    add_team: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        //required fields
        var school = req.body.school;
        var mascot = req.body.mascot;
        var nickname = req.body.nickname;
        //unrequired fields
        var rank = req.body.rank;
        var wins = req.body.wins;
        var losses = req.body.losses;
        var ties = req.body.ties;
        if (rank == null){
          rank = "unranked";
        }
        if (school != null && mascot != null) {
            API.database.add_team(school, mascot, rank, nickname, wins, losses, ties,
            function(team) {
                if (team) {
                    response.team = team;
                    API.sendResponse(req, res, response);
                }
                else {
                    response.status.code = "-22";
                    response.status.description = "Error Inserting Team Into the Database.";
                    API.sendResponse(req,res,response);
                }
            });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    add_conference: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        //required fields
        var name = req.body.name;
        //unrequired fields
        if (name != null) {
            API.database.add_conference(name,
            function(conference) {
                if (conference) {
                    response.conference = conference;
                    API.sendResponse(req, res, response);
                }
                else {
                    response.status.code = "-22";
                    response.status.description = "Error Inserting Conference Into the Database.";
                    API.sendResponse(req,res,response);
                }
            });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    add_game: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        //required fields
        var season = req.body.season;
        var date = req.body.date;
        var home = req.body.home;
        var away = req.body.away;
        //unrequired fields
        var away_score = req.body.away_score;
        var home_score = req.body.home_score;

        if (season != null && date != null && home != null && away != null) {
            API.database.add_game(season, date, home, home_score, away, away_score,
            function(game) {
                if (game) {
                    response.game = game;
                    API.sendResponse(req, res, response);
                }
                else {
                    response.status.code = "-22";
                    response.status.description = "Error Inserting Conference Into the Database.";
                    API.sendResponse(req,res,response);
                }
            });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    add_conference_team: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        //required items
        var conference = req.body.conference;
        var school = req.body.school;

        if (conference != null && school != null) {
            API.database.add_conference_team(conference, school,
            function(update) {
                if (update) {
                    response.update = update;
                    API.sendResponse(req, res, response);
                }
                else {
                    response.status.code = "-23";
                    response.status.description = "Error Updating Database Conference Matching to Teams.";
                    API.sendResponse(req,res,response);
                }
            });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    team: function(req,res) {
        var response = { status: {code:"0",description:":)"} };

        var school = req.query.school;

        if (school != null) {
          var team = API.database.get_team(school, function(team){
              if (team) {
                  response.team = team;
                  API.sendResponse(req,res,response);
              }
              else {
                  API.badDataReceived(req,res);
              }
          });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    conference: function(req,res) {
        var response = { status: {code:"0",description:":)"} };

        var name = req.query.name;

        if (name != null) {
          var conference = API.database.get_conference(name, function(conference){
              if (conference) {
                  response.conference = conference;
                  API.sendResponse(req,res,response);
              }
              else {
                  API.badDataReceived(req,res);
              }
          });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    game: function(req,res) {
        var response = { status: {code:"0",description:":)"} };

        var home = req.query.home;
        var away = req.query.away;
        var date = req.query.date;
        var season = req.query.season;

        if (home != null && away != null && date != null && season != null) {
          var game = API.database.get_game(home, away, date, season, function(game){
              if (game) {
                  response.game = game;
                  API.sendResponse(req,res,response);
              }
              else {
                  API.badDataReceived(req,res);
              }
          });
        }
        else {
            API.badDataReceived(req,res);
        }
    },
    teams: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        var team = API.database.get_teams(function(team){
            if (team) {
                response.team = team;
                API.sendResponse(req,res,response);
            }
            else {
                API.badDataReceived(req,res);
            }
        });
    },
    conferences: function(req,res) {
        var response = { status: {code:"0",description:":)"} };
        var conferences = API.database.get_conferences(function(conferences){
            if (conferences) {
                response.conferences = conferences;
                API.sendResponse(req,res,response);
            }
            else {
                API.badDataReceived(req,res);
            }
        });
    },
    games: function(req,res) {
        var response = { status: {code:"0",description:":)"} };

        var games = API.database.get_games(function(games){
            if (games) {
                response.games = games;
                API.sendResponse(req,res,response);
            }
            else {
                API.badDataReceived(req,res);
            }
        });
    },
    // generic response handlers
    sendResponse: function (req, res, response_object){
        res.header("Content-Type", "Application/JSON");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers","Content-Type");
        res.status(200).send(response_object);
    },
    badDataReceived: function(req,res, message) {
        if (message == null) message = "bad data received";
        var response = {"status":{
            "code":"-31",
            "description":message
        }};
        res.header("Content-Type", "Application/JSON");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers","Content-Type");
        res.status(400).send(response);
    },
    methodNotAllowed: function(req,res) {
        var response = {"status":{
            "code":"-11",
            "description":"wrong method was used"
        }};
        res.header("Content-Type", "Application/JSON");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers","Content-Type");
        res.status(200).send(response); //this has to be 200 to allow CORS
    },
    serverError: function(req,res, message) {
        // this should probably be logged for QA purposes
        if (message == null) message = "internal server error";
        var response = {"status":{
            "code":"-22",
            "description":message
        }};
        res.header("Content-Type", "Application/JSON");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers","Content-Type");
        res.status(500).send(response);
    },
    notFound: function(req,res) {
        // this should probably be logged for QA purposes
        var response = {"status":{
            "code":"-12",
            "description":"url does not exist"
        }};
        res.header("Content-Type", "Application/JSON");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers","Content-Type");
        res.status(404).send(response);
    }
};
// this must be last.
module.exports = API;
