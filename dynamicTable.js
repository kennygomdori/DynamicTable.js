/*
dynamicTable.js
copyright 2015, Keun Hoi Kim 
*/


function dynamicTable(_id, _class){
	this._id = _id;
	this._class = _class;
	let table = document.getElementById(this._id).appendChild(document.createElement('table'));
	table.className = this._class + " dynamicTable";

	this.tabulate = function(data, header) {
		// format is either 'object' or 'array', or no data is drawn.
		/*
			array: [[value1, value2, value3],[value1,value2,value3], ...]
			object: [{key1:v1, key2:v2, key3:v3}, ...]
		*/
		// header is either an array or true. Anything else will result in no header.
		/*
			header: [th1, th2, th3 ...]
			If header === true,  the first row (if format === "array"), or the keys of the first row (if format === "object")
		*/
		
		clear();

		let format = "";
		// data type determination
		if (typeof data[0] === 'object') format = "object";
		if (Array.isArray(data[0])) format = "array";
		
		// thead generation
		if (format !== "object" && format !== "array"){
			console.warn("The data is empty or in an invalid format."); 
			return false;
		}
		
		if (header === true){
			let thead = table.appendChild(document.createElement('thead'));
			let row = thead.appendChild(document.createElement('tr'));
			if (format === "array"){
				data[0].forEach(function(value){
					row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
				});
				data.shift();
			}
			if (format === "object"){
				data[0].entries().forEach(function([key,value]){
					row.appendChild(document.createElement('th')).appendChild(document.createTextNode(key));
				});
			}
		}
		if (typeof header === "array") {
			let thead = table.appendChild(document.createElement('thead'));
			let row = thead.appendChild(document.createElement('tr'));
			header.forEach(function(value){
				row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
			});
		}

		// tbody generation
		let tbody = table.appendChild(document.createElement('tbody'));
		data.forEach(function(array){
			let row = tbody.appendChild(document.createElement('tr'));
			array.forEach(function(value){
				row.appendChild(document.createElement('td')).appendChild(document.createTextNode(value));
			});
		});
	};

	const clear = this.clear = () => {
		while (table.firstChild) {
    		table.removeChild(table.firstChild);
		}
	};
}
