var getResult = require('./src/GetRequest'),
	co = require('co'),
	endpoint = "/getDNSRecords?name=",
	result = document.querySelectorAll('.result')[0];

function handleResponse(response){
	var records;
	//TODO
	// if(response.length>0){
	// 	for(i=0; i<response.length; i++){
	// 		record = response[i];
	// 	}
	// }	
}

function createLayout(){
	
}

function handleError(err){
	result.style.color = 'red';
	result.innerHTML = "Domain is Invalid. Please check!";
}

function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
        elem.addEventListener(event, fn, false);
    } else {
        elem.attachEvent("on" + event, function() {
            return(fn.call(elem, window.event));   
        });
    }
}

var find = document.getElementById('find');

addEvent(find,'click',onResultsHandler);

function onResultsHandler(e) {
	co(function *() {
		var domainName = document.querySelectorAll('.domain')[0].value;
		var name = endpoint + domainName.replace(/.*?:\/\//g, "");
		var resp = yield getResult(name);
		return resp;
	}).then(handleResponse, handleError);
}