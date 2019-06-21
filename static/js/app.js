// from data.js
var tableData = data;
console.log(tableData);

var tbody = d3.select("tbody");
// populate the table with all the data
data.forEach((ufoData) => {
    var row = tbody.append("tr");
    Object.entries(ufoData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input elements for date and state and get the raw HTML node
  var inputDate = d3.select("#datetime");
  var inputState = d3.select("#state");

  // Get the value properties of the input elements
  var dateValue = inputDate.property("value");
  var stateValue = inputState.property("value");

// select data based on which input fields are populated
// if date and state are populated, select data where date and state = input values
  if (dateValue && stateValue != '') {
  filteredData = tableData.filter(tableData => (tableData.datetime == dateValue) && (tableData.state == stateValue));
  }
//   if date input is not populated, select data where state = input state
  else if (dateValue == '') {
      filteredData = tableData.filter(tableData => (tableData.state == stateValue)); 
  }
//   if state input is not populated, select data where date = input date
  else if (stateValue == '') {
  filteredData = tableData.filter(tableData => (tableData.datetime == dateValue));
  }

  var tbody = d3.select("tbody");
// select table element and assign to 'table' variable
  var table = document.getElementById("ufo-table");
// delete all table rows below headers
  for (var i = table.rows.length -1; i>0; i--){
      table.deleteRow(i);
  }
//   loop through the filtered date and add a row with the filtered data to the table
    filteredData.forEach((fData) => {
        var row = tbody.append("tr");
        Object.entries(fData).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});