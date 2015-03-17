var koa = require('koa'),
	app = koa(),
	logger = require('koa-logger'),
	route = require('koa-route'),
	staticDir = require('koa-static'),
	port = process.env.PORT || 3000,
	dns = require('dns');

app.use(logger());

app.use(route.get('/getDNSRecords', getDNSRecords));
app.use(staticDir('./'));

app.listen(port, function() {
	console.log("Koa server listening on port %s", port);
});

function *getDNSRecords() {
	domain = this.request.query.name;
	if(domain){
		var resp = getARecord(domain).then(getNsRecord(domain));
		console.log(resp);
		this.body = resp;
	}
}

function sendResponse(resp){
	return resp;
}

function getARecord(domain){
	var a = new Promise(function(resolve, reject) {
		dns.resolve(domain, 'A', function(err, address) {
			if(err) reject(err);
			else resolve(address);
		});
	});
	return a;
}

function getNsRecord(domain){
	var b = new Promise(function(request,response){
		dns.resolveNs(domain,function(err,record){
			if(err) reject(err);
			else resolve(address);
		});
	});
	return b;
}