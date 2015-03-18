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
		var response = yield Promise.all([getARecord(),getAAAARecord(),getCNAME(),
			getNsRecord(),getMxRecord(),getSrvRecord, getSOARecord()]).then(function(resp){
			var result = [].slice.call(resp);
			return result;
		}).catch(function(err){return err;});
		this.body = response;
	}
}

function getARecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolve4(domain,function(err, address) {
			handleError(err,resolve,reject);
			resolve(address);
		});
	});
}

function getAAAARecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolve6(domain,function(err, address) {
			handleError(err,resolve,reject);
			resolve(address);
		});
	});
}

function getCNAME(){
	return new Promise(function(resolve,reject){
		dns.resolveCname(domain,function(err,record){
			handleError(err,resolve,reject);
			resolve(record);
		});
	});
}

function getMxRecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolveMx(domain,function(err, record) {
			handleError(err,resolve,reject);
			resolve(record);
		});
	});
}

function getNsRecord(){
	return new Promise(function(resolve,reject){
		dns.resolveNs(domain,function(err,record){
			handleError(err,resolve,reject);
			resolve(record);
		});
	});
}

function getSrvRecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolveSrv(domain,function(err, record) {
			handleError(err,resolve,reject);
			resolve(record);
		});
	});
}

function getSOARecord(){
	 return new Promise(function(resolve, reject) {
		dns.resolveSoa(domain,function(err, address) {
			handleError(err,resolve,reject);
			resolve(address);
		});
	});
}

function handleError(err,resolve,reject){
	if(err) {
		if(err.code === 'ENODATA'){resolve(null);}
		reject(err);
	}
}