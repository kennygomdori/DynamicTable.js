/*
dynamicTable.js
copyright 2015, Keun Hoi Kim 
*/


function dynamicTable(_id, _class){
	this._id = _id;
	this._class = _class;
	var table = document.getElementById(this._id).appendChild(document.createElement('table'));
	table.className = this._class + " dynamicTable";

	this.tabulate = function(data, header) {
		// format is either 'object' or 'array', or no data is drawn.
		/*
			array: [[value1, value2, value3],[value1,value2,value3], ...]
			object: [{key1:v1, key2:v2, key3:v3}, ...]
		*/
		// header is either a array or true. Anything else will result in no header.
		/*
			header: [th1, th2, th3 ...]
			If header === true,  the first row (if format === "array"), or the keys of the first row (if format === "object")
		*/
		
		clear();

		var format = "";
		// data type determination
		if (typeof data[0] === 'object'){format = "object";}
		if (Array.isArray(data[0])){format = "array";}

		// thead generation
		if (format !== "object" && format !== "array"){console.log("The database is empty or in an invalid format. The format (second argument) needs to be either 'array' or 'object'."); return false;}
		console.log("what?")
		if (header === true){
			var thead = table.appendChild(document.createElement('thead'));
			var row = thead.appendChild(document.createElement('tr'));
			if (format === "array"){
				$.each(data[0], function(index,value){
					row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
				});
				data.shift();
			}
			if (format === "object"){
				$.each(data[0], function(key,value){
					row.appendChild(document.createElement('th')).appendChild(document.createTextNode(key));
				});
			}
		}
		if (typeof header === "array") {
			var thead = table.appendChild(document.createElement('thead'));
			var row = thead.appendChild(document.createElement('tr'));
			$.each(header, function(index,value){
				row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
			});
		}

		// tbody generation
		var tbody = table.appendChild(document.createElement('tbody'));
		$.each(data, function(index,array){
			var row = tbody.appendChild(document.createElement('tr'));
			$.each(array, function(index,value){
				row.appendChild(document.createElement('td')).appendChild(document.createTextNode(value));
			});	
		});
	};

	var clear = function(){
		while (table.firstChild) {
    		table.removeChild(table.firstChild);
		}
	};
	this.clear = clear
}
