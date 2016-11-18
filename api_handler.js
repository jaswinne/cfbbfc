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
        // add team to conference
        API.app.all('/conference/add/team(/)?', function(req,res) {
            if (req.method == "POST") {
                API.add_conference_team(req,res);
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

    //API calls
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
                    response.status.description = "Error Inserting Into the Database.";
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
                    response.status.description = "Error Inserting Into the Database.";
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
                    response.status.description = "Error Updating Database.";
                    API.sendResponse(req,res,response);
                }
            });
        }
        else {
            API.badDataReceived(req,res);
        }
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
