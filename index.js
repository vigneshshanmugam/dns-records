var getResult = require('./src/GetRequest'),
	co = require('co'),
	endpoint = "/getDNSRecords?name=",
	layout = require('./src/Layout'),
	result = document.querySelectorAll('.result')[0],
	tBody = document.querySelectorAll('.record-table tbody')[0];

function handleResponse(response){
	var record, i,
		table = document.querySelectorAll('.record-table')[0];
	if(response.length>0){
		for(i=0; i<response.length; i++){
			record = response[i];
			layout(tBody, record, i);
		}
		table.className = 'record-table';
	}	
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