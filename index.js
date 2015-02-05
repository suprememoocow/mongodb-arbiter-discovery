"use strict";


module.exports = function mongoArbiterDiscover(options, callback) {

  var mongo = options.mongo || require('mongodb');
  var host = options.host;
  var port = options.port || 27017;

  var db = new mongo.Db('admin', new mongo.Server(host, port), { w: 0, slaveOk: true });
  db.open(function(err, db) {
    if (err) return callback(err);

    function getReplicaSetStatus() {

      db.command({ "replSetGetStatus": 1 }, function(err, result) {
        if (err) {
          db.close();
          return callback(err);
        }

        if (options.replicaSet) {
          if (options.replicaSet !== result.set) {
            db.close();
            return callback(new Error("Autodiscovery host does not have the same replicaset name as that used in the connection: " + options.replicaSet + ' vs. ' + result.set));
          }
        }

        var hosts = result.members
          .filter(function(f) {
            return f.state === 1 || f.state === 2;
          }).map(function(f) {
            return f.name;
          });

        db.close();
        return callback(null, hosts);
      });

    }

    if (options.username) {
      db.authenticate(options.username, options.password, options.authOptions, function(err, result) {
        if (err) {
          db.close();
          return callback(err);
        }

        getReplicaSetStatus();
      });
    } else {
      // No authentication
      getReplicaSetStatus();
    }
  });

};
