var koa = require('koa'),
	app = koa(),
	logger = require('koa-logger'),
	route = require('koa-route'),
	staticDir = require('koa-static'),
	port = process.env.PORT || 3000,
	dns = require('dns'),
	dnsRecords = {},domain='';

app.use(logger());

app.use(route.get('/getDNSRecords', getDNSRecords));
app.use(staticDir('./'));

app.listen(port, function() {
	console.log("Koa server listening on port %s", port);
});

function *getDNSRecords() {
	domain = this.request.query.name;
	if(domain){
		var resp = Promise.all([getARecord(),getNsRecord(),getCNAME()]).then(function(respObj){
			console.log('Response' + JSON.stringify(respObj));
			return respObj;
		}).catch(function(err){
			console.log('Error' + err);
			return err;
		});
		this.body = resp;
	}
}

function getARecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolve4(domain,function(err, address) {
			if(err) reject(err);
			dnsRecords.A = address;
			resolve(dnsRecords);
		});
	});
}

function getNsRecord(){
	return new Promise(function(resolve,reject){
		dns.resolveNs(domain,function(err,record){
			if(err) reject(err);
			dnsRecords.NS = record;
			resolve(dnsRecords);
		});
	});
}

function getCNAME(){
	return new Promise(function(resolve,reject){
		dns.resolveCname(domain,function(err,record){
			if(err.code ==='ENODATA'){
				dnsRecords.CNAME = '';
				resolve(dnsRecords);
			}
			if(err) reject(err);
			dnsRecords.CNAME = record;
			resolve(record);
		});
	});
}
