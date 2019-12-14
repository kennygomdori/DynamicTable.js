# DynamicTable.js
A lightweight js library that generates HTML tables with given data.
No dependencies. Can be used as an ES6 library, or simply copy-pasted.
An alternative to large data visualization libraries (e.g. D3.js) if all you want to do is just make a DOM table.

## API Reference

<a href="#DynamicTable" name="DynamicTable">#</a> <b>DynamicTable</b>(<i>data</i>, <i>header</i>, <i>container</i>) [<>]

Creates an HTML Table element, populates the table with the data and header, and appends it to *container* if *container* is an HTML element.
The data can be either in a form of a 2D matrix (an array of arrays),
```js
  [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907]
  ]
```
or in an array of Javascript Objects
```js
  [
      {name: "Locke", number: 4},
      {name: "Reyes", number: 8},
      {name: "Ford", number: 15},
      {name: "Jarrah", number: 16},
      {name: "Shephard", number: 23},
      {name: "Kwon", number: 42}
  ]
  ```
  If *header* is set to *true*, it will attempt to use the first row as the table. If *data* is an array of JS Objects, *header* needs to be an array of the names of the properties to be used as the header names. This is because JS Object properties are not ordered, and might have properties that you wouldn't want tabulated.


<a href="#tabulate" name="tabulate">#</a> <b>tabulate</b>(<i>data</i>, <i>header</i>, <i>append</i>) [<>]

The update method for the DynamicTable. See <a href="#DynamicTable"><b>DynamicTable</b></a> . If *append* is *truthy*, it will append data, else it will simply clear the entire table before updating. Idempotent in regards to *data* and *header*.


<a href="#append" name="append">#</a> <b>append</b>(<i>data</i>, <i>header</i>) [<>]

Same as <a href="#tabulate">*DynamicTable*.tabulate</a> with *append* argument set to true.


<a href="#clear" name="clear">#</a> <b>clear</b>(<i>data</i>, <i>header</i>) [<>]

Clears the table element. The table element will still be in place, just empty.

<a href="#table" name="table">#</a> <b>*DynamicTable*.table</b>

This is the HTML Table element. Used it to move the table, delete the table, and so on.



### Examples
```js
let table1 = new DynamicTable(
        [
            {name: "Locke", number: 4},
            {name: "Reyes", number: 8},
            {name: "Ford", number: 15},
            {name: "Jarrah", number: 16},
            {name: "Shephard", number: 23},
            {name: "Kwon", number: 42}
        ],
        ['name', 'number'],
        document.body
    );

    let table2 = new DynamicTable(
        [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ],
        true,
        document.body
    );

    let table3 = new DynamicTable(
        [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ],
        ['num1', 'num2', 'num3', 'num4'],
        document.body,
    );

    try {
        let table4 = new DynamicTable(
            [
                {name: "Locke", number: 4},
                {name: "Reyes", number: 8},
                {name: "Ford", number: 15},
                {name: "Jarrah", number: 16},
                {name: "Shephard", number: 23},
                {name: "Kwon", number: 42}
            ], true,
            document.body,
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
```
