var RECORD_NAMES =['IPv4','IPv6','Canonical Name','Name Servers', 'Mail Exchange','Service Record', 'Start of authority'];

function createObjComponents(record, subTable, col){
	var subComp, keyName, valName, r;
	for(r in record){
		if(record.hasOwnProperty(r)){
			subComp = subTable.insertRow();
			keyName = subComp.insertCell();
			keyName.setAttribute('class','sub-keys');
			keyName.innerHTML = r;
			valName = subComp.insertCell();
			valName.innerHTML = record[r];
		}
	}
	col.appendChild(subTable);
}

function createArrayComponent(record, subTable, col){
	var subComp, keyName, valName, r, k, subRecord;
	for(r = 0; r < record.length; r++){
		subComp = subTable.insertRow();
		subRecord = record[r];
		if(typeof subRecord === 'object'){
			for(k in subRecord){
				if(subRecord.hasOwnProperty(k)){
					keyName = subComp.insertCell();
					keyName.setAttribute('class','sub-keys');
					keyName.innerHTML = k;
					valName = subComp.insertCell();
					valName.innerHTML = subRecord[k];
				}
			}	
		}else{
			valName = subComp.insertCell();
			valName.innerHTML = subRecord;
		}
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
		if({}.toString.call(record) === "[object Object]"){
			subTable.className = 'sub-table';
			createObjComponents(record, subTable, col2);
		}else if({}.toString.call(record) === "[object Array]"){
			subTable.className = 'sub-table';
			createArrayComponent(record, subTable, col2);
		}else{
			col2.innerHTML = record;
		}
	}else{
		col2.innerHTML = '-';
	}
};