var RECORD_NAMES =['IPv4','IPv6','Canonical Name','Name Servers', 'Mail Exchange','Service', 'Start of authority'];


function createSubComponents(record, col){
	var subComp, keyName, valName, r,
		subTable = document.createElement('table');
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
	subTable.className = 'sub-table';
	col.appendChild(subTable);
}

module.exports = function(table, record, recordNo){
	var row = table.insertRow(),
		col1 = row.insertCell(),
		col2 = row.insertCell();
	col1.innerHTML = RECORD_NAMES[recordNo];
	if(record){
		if(Object.prototype.toString.call(record) === "[object Object]"){
			createSubComponents(record, col2);
		}else{
			col2.innerHTML = record;
		}
	}else{
		col2.innerHTML = '-';
	}
};