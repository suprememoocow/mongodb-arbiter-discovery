# mongodb-arbiter-discovery

Poor man's auto-discovery of a mongodb replicaset using an arbiter.

```shell
npm install mongodb-arbiter-discovery
```

## Usage

Point at arbiter and get a list of hosts in the replicaset.

```javascript
var mongoArbiterDiscover = require('mongodb-arbiter-discovery');
mongoArbiterDiscover({
  host: '127.0.0.1',        // Arbiter host name [required]
  port: 27017,              // Arbiter port [default 27017]
  replicaSet: 'rs',         // Replica set name (useful for validation) [optional]
  username: '',             // Username for authentication [optional]
  password: '',             // Password for authentication [optional],
  authOptions: null,        // Passed to `db.authenticate` [optional]
  mongo: require('mongodb') // BYOB mongo library [optional]
}, function(err, hosts) {
  // Host -> ['127.0.0.1:27017', '127.0.0.1:27018', '127.0.0.1:27019']
  // Profit!
});
```

# License
The MIT License (MIT)

Copyright (c) 2015, Andrew Newdigate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
