/*
dynamicTable.js
copyright 2015, Keun Hoi Kim
*/


export class DynamicTable {
    constructor(container, data, header) {
        this.table = document.createElement('table');
        this.table.classList.add('dynamic-table');
        if (Array.isArray(data)) this.tabulate(data, header);
        container.appendChild(this.table);
    }

    tabulate(data, header = true, append = false) {
        /*
        "format" is either 'object' or 'array', or no data is drawn.
            array: [[row1_value1, row1_value2, row1_value3], [row2_value1, row2_value2, row2_value3], ...]
            object: [{column1_name: v1, column2_name: v2, column3_name: v3}, ...]
        The second format requires header in an array.

        "header" is either an array or true. Anything else will result in no header.
            header: [th1, th2, th3 ...]
            If header === true and format === "array",  the first row will be used as the header.
            data in object format requires its header in an array form otherwise, no header.
        */

        if (!append) this.clear();
        const table = this.table;

        let format = "";
        // data type determination
        if (Array.isArray(data[0])) format = "array";
        else if (data[0] instanceof Object) {
            if (!Array.isArray(header)) throw "A dataset with object datums requires an array header.";
            format = "object";
        } else throw "The data is empty or in an invalid format. 'data' needs to be an Object or an Array.";
        let i = 0;

        // thead generation
        if (append) {
            // don't add the header when appending.
        } else if (header === true) {
            const thead = table.appendChild(document.createElement('thead'));
            const header_row = thead.appendChild(document.createElement('tr'));
            if (format === "array") {
                data[0].forEach(function (value) {
                    header_row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
                });
                i = 1;
            } else if (format === "object") {
                console.warn("header needs to be an array if the datum format is 'object'.")
            }
        } else if (Array.isArray(header)) {
            const thead = table.appendChild(document.createElement('thead'));
            const header_row = thead.appendChild(document.createElement('tr'));
            header.forEach(function (value) {
                header_row.appendChild(document.createElement('th')).appendChild(document.createTextNode(value));
            });
        }

        // tbody generation
        let tbody;
        if (append) tbody = table.querySelector('tbody');
        else tbody = table.appendChild(document.createElement('tbody'));
        if (format === "array") {
            for (; i < data.length; i++) {
                const row = tbody.appendChild(document.createElement('tr'));
                const row_data = data[i]
                for (let j = 0; j < row_data.length; j++) {
                    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(row_data[j]));
                }
            }
        } else if (format === "object") {
            for (; i < data.length; i++) {
                const row = tbody.appendChild(document.createElement('tr'));
                const row_data = data[i];
                for (let j = 0; j < header.length; j++) {
                    row.appendChild(document.createElement('td')).appendChild(document.createTextNode(row_data[header[j]]));
                }
            }
        }
    };

    clear() {
        this.table.innerHTML = "";
    }

    append(data, header = true) {
        this.tabulate(data, header, true)
    }
}

const test = () => {
    let table1 = new DynamicTable(document.body,
        [
            {name: "Locke", number: 4},
            {name: "Reyes", number: 8},
            {name: "Ford", number: 15},
            {name: "Jarrah", number: 16},
            {name: "Shephard", number: 23},
            {name: "Kwon", number: 42}
        ], ['name', 'number']
    );

    let table2 = new DynamicTable(document.body,
        [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ], true
    );

    let table3 = new DynamicTable(document.body,
        [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ], ['num1', 'num2', 'num3', 'num4']
    );

    try {
        let table4 = new DynamicTable(document.body,
            [
                {name: "Locke", number: 4},
                {name: "Reyes", number: 8},
                {name: "Ford", number: 15},
                {name: "Jarrah", number: 16},
                {name: "Shephard", number: 23},
                {name: "Kwon", number: 42}
            ], true
        );
    } catch (e) {
        // should throw here.
        console.warn(e);
    }

    table1.append([
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
    ]);

    table2.append([
            {name: "Locke", number: 4},
            {name: "Reyes", number: 8},
            {name: "Ford", number: 15},
            {name: "Jarrah", number: 16},
            {name: "Shephard", number: 23},
            {name: "Kwon", number: 42}
        ], ['name', 'number']);

    console.log("CLEAR.");
}
