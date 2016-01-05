/*jslint node: true, nomen: true */
'use strict';

var port, Gun, gun, server, express, path, www;
path = require('path');

// ordering matters
port = port || process.env.OPENSHIFT_NODEJS_PORT;
port = port || process.env.VCAP_APP_PORT;
port = port || process.env.PORT;
port = port || process.argv[2];
port = port || 80;

express = require('express');
server = express();

Gun = require('gun');

Gun.log.verbose = true;
gun = new Gun({
	file: 'data.json',
	s3: {
		key: process.env.AWS_ACCESS_KEY_ID,
		secret: process.env.AWS_SECRET_ACCESS_KEY,
		bucket: process.env.AWS_S3_BUCKET
	}
});

gun.wsp(server);
server.use(gun.wsp.server);

www = path.join(__dirname, 'www');
server.use('/', express['static'](www));

server.listen(port, function () {
	console.log('Server started on port ' + port + ' with /gun');
});

