var RECORD_NAMES =['IPv4','IPv6','Canonical Name','Name Servers', 'Mail Exchange','Service', 'Start of authority'];

function createObjComponents(record, subTable, col){
	var subComp, keyName, valName, r;
	for(r in record){
		if(record.hasOwnProperty(r)){
			subComp = subTable.insertRow();
			keyName = subComp.insertCell();
			keyName.innerHTML = r;
			keyName.setAttribute('class','sub-keys');
			valName = subComp.insertCell();
			valName.innerHTML = record[r];
		}
	}
	col.appendChild(subTable);
}

function createArrayComponent(record, subTable, col){
	var subComp, valName, r;

	for(r = 0; r < record.length; r++){
		subComp = subTable.insertRow();
		valName = subComp.insertCell();
		valName.innerHTML = record[r];
	}
	col.appendChild(subTable);
}

module.exports = function(table, record, recordNo){
	var row = table.insertRow(),
		col1 = row.insertCell(),
		col2 = row.insertCell(),
		subTable = document.createElement('table');
	
	col1.innerHTML = RECORD_NAMES[recordNo];
	if(record){
		if(Object.prototype.toString.call(record) === "[object Object]"){
			subTable.className = 'sub-table';
			createObjComponents(record, subTable, col2);
		}else if(Object.prototype.toString.call(record) === "[object Array]"){
			subTable.className = 'sub-table';
			createArrayComponent(record, subTable, col2);
		}else{
			col2.innerHTML = record;
		}
	}else{
		col2.innerHTML = '-';
	}
};