var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 80;

var Gun = require('gun');
Gun.log.verbose = true;
var gun = Gun({
	file: 'data.json',
	s3: {
		key: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key
		secret: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Token
		bucket: process.env.AWS_S3_BUCKET// The bucket you want to save into
	}
});

var server = require('http').createServer(function(req, res){
	if(gun.server(req, res)){ 
		return; // filters gun requests!
	}
	require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error',function(){ // static files!
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(require('fs').readFileSync(require('path').join(__dirname, 'index.html'))); // or default to index
	}).pipe(res); // stream
});
gun.attach(server);
server.listen(port);

console.log('Server started on port ' + port + ' with /gun');