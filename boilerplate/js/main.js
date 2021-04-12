//initialize function called when the script loads
function initialize(){
    cities();
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");
    
    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };


    addColumns(cityPop);
    addEvents();
};

// function to add a third column describing city size
function addColumns(cityPop){
    
    // perform the function on each row
    $('tr').each(function(i){

        // create if/else function to append third column based on population
        if (i == 0){

            // adds header City Size to third column
            $(this).append('<th>City Size</th>');
        } else {

            var citySize;

            //writes 'Small' in city size column if population is <100,000
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';

            //writes 'Medium' in city size column if population >100,000 but <500,000
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';

            //writes 'Large' in city size column if population is >500,000
            } else {
                citySize = 'Large';
            };

            //appends the table data for City Size
            $(this).append('<td>' + citySize + '</td>');
        };
    });
};

//function to add additional interactions
function addEvents(){

    //color current element a random RGB color on mouseouver
    $(this).mouseover(function(){
        //initial define color
        var color = "rgb(";
        //for loop to continue adding number until there are 3
        for (var i = 0; i < 3; i++){
            //select random number between 0 and 255
            var random = Math.round(Math.random() * 255);
            //add random number to color variable
            color += random;
            //repeat loop if not yet 3 numbers
            if (i<2){
                color += ", ";
            //end loop at 3 numbers (position 2 since first number is position 0)
            } else {
                color += ")";
        };
    };
        //apply color to table
        $('table').css('color', color);
    });
    //function to execute on click
    function clickme(){
        //popup message on click
        alert('Hey, you clicked me!');
    };
    //apply to this element (aka table)
    $(this).on('click', clickme);
};

//start of Week 4 Activity
// define var mydata outside of any function
var mydata;

//call function
function callback(response){
//equate mydata to response for data to be defined
    mydata=response;
//call data, with "<br>" allowing for a line break between this and the above data
    $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};

//call function
//(this comment is a joke)remove insects from the Greek hero Ajax
function jQueryAjax(){
//access data from file source
    $.ajax("data/MegaCities.geojson", {
//define data type
        dataType: "json",
//when using AJAX, called with callback on success to load in the right order
        success: callback
    });
};

//call the initialize function when the document has loaded
$(document).ready(initialize);
//call the JQueryAjax function when the document has loaded
$(document).ready(jQueryAjax);