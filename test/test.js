'use strict';

var assert = require('assert');
var mongoArbiterDiscover = require('..');

describe('mongodb-connection-string', function() {

  it('should find a list of hosts in the replicaset', function(done) {
    this.timeout(10000);
    mongoArbiterDiscover({ host: '127.0.0.1' }, function(err, hosts) {
      if (err) return done(err);

      assert(Array.isArray(hosts));
      assert(hosts.length);
      done();
    });
  });

  it('should fail when it cant connect to the arbiter', function(done) {
    mongoArbiterDiscover({ host: 'host_does_not_exist.neverland.blah' }, function(err) {
      if (!err) assert(false, 'Expected a failure');
      done();
    });
  });

});
