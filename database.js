var DB = {

  init: function(){

    this.mongoose = require('mongoose');
    this.ObjectId = require('mongoose').Types.ObjectId;
    this.Schema = this.mongoose.Schema;

    this.mongoose.connect('mongodb://football:jaredsucks@ds153657.mlab.com:53657/heroku_fbq10sd4');
    this.database = this.mongoose.connection;
    this.database.on('error', console.error.bind(console, 'connection error:'));

    this.crypt = require('crypto');

    //schema stuff
    this.gameSchema = {};
    this.teamSchema = {};
    this.conferenceSchema = {};
    this.game = {};
    this.team = {};
    this.conference = {};

    this.database.once('open', function (callback) {

        //create the team schema
        DB.teamSchema = new DB.Schema({
          id: DB.Schema.ObjectId,
          school: { type: String, unique: true, required: true },
          mascot: { type: String, required: true },
          nickname: { type: String, required: true },
          rank: { type: String, required: false },
          conference: { type: String, required: false },
          record: {
            wins: { type: String, required: false },
            losses: { type: String, required: false },
            ties: { type: String, required: false },
          },
          seasons: [{
              year: { type: String, required: false },
              games: [{ type: String, required: false }],
          }],
        });
        DB.team = DB.database.model('teams', DB.teamSchema);

        //create the game schema
        DB.gameSchema = new DB.Schema({
          id: DB.Schema.ObjectId,
          season: { type: String, required: true },
          date: { type: String, required: true },
          away_team: {
            school: { type: String, required: true },
            score: { type: Number, required: false },
          },
          home_team: {
            school: { type: String, required: true },
            score: { type: Number, required: false },
          },
        });
        DB.game = DB.database.model('games', DB.gameSchema);

        //create the conference schema
        DB.conferenceSchema = new DB.Schema({
          id: DB.Schema.ObjectId,
          name: { type: String, unique: true, required: true },
          teams: [{ type: String, required: false }],
        });
        DB.conference = DB.database.model('conferences', DB.conferenceSchema);
      });
    },
    // functions for API
    //add team
    add_team: function (school, mascot, rank, nickname, wins, losses, ties, callback) {
        var instance = new DB.team();
        //required fields
        instance.school = school;
        instance.mascot = mascot;
        instance.nickname = nickname;
        //unrequired fields
        instance.rank = rank;
        instance.record.wins = wins;
        instance.record.losses = losses;
        instance.record.ties = ties;
        instance.save(function (error) {
            if (error) {
                console.log(error);
                callback(false);
            }
            else {
                callback(instance);
            }
        });
    },
    //add conference
    add_conference: function (name, callback) {
        var instance = new DB.conference();
        //required fields
        instance.name = name;
        instance.save(function (error) {
            if (error) {
                console.log(error);
                callback(false);
            }
            else {
                callback(instance);
            }
        });
    },
    //add conference
    add_game: function (season, date, home, home_score, away, away_score, callback) {
        var instance = new DB.game();
        //required fields
        instance.season = season;
        instance.date = date;
        instance.home_team.school = home;
        instance.away_team.school = away;
        //unrequired fields
        instance.home_team.score = home_score;
        instance.away_team.score = away_score;
        instance.save(function (error) {
            if (error) {
                console.log(error);
                callback(false);
            }
            else {
                callback(instance);
            }
        });
    },
    //connect conference to team
    add_conference_team: function (conference, school, callback) {
      DB.database.collection('conferences').update({'name': conference }, {$addToSet: { "teams": school}} , function(error, result) {
          if (result) {
              DB.database.collection('teams').update({'school': school }, {$set: { "conference": conference }} , function(error, result2) {
                if (result2) {
                    callback(result2);
                }
                else {
                    callback(false);
                }
              });
          }
          else {
              callback(false);
          }
      });
    },
    get_team: function(school, callback) {
        DB.database.collection('teams').find({'school': school}).limit(1).toArray(function(err,docs) {
            if (docs[0] != null) {
                callback(docs);
            }
            else {
                callback(err);
            }
        });
    },
    get_conference: function(name, callback) {
        DB.database.collection('conferences').find({'name': name}).limit(1).toArray(function(err,docs) {
            if (docs[0] != null) {
                callback(docs);
            }
            else {
                callback(err);
            }
        });
    },
};
module.exports = DB;
