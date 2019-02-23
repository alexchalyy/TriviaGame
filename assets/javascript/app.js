/*  This javascript uses jQueries to execute the quiz. Code portions are take from class exercises.

    Written by Alex Chalyy on 2/22/2019.    */

//  Interval Demonstration
//  Set our number counter to 30.
var number = 10;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

//  This sets the counter variables

var unanswered = 8;
var correct = 0;
var incorrect = 0;

//  When the resume button gets clicked, execute the run function.
$("#start").on("click", run);

//  The run function sets an interval
//  that runs the decrement function once a second.
//  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
function run() {
    clearInterval(intervalId);
    console.log("Quiz starts");
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $("#sec").html(number);


    //  Once number hits zero...
    if (number === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        //$("#submit").click();
        //alert("Time Up!");
        /*$(document).ready(function(){
            $("submit").trigger("click");
        });*/
        //$('#submit').find('a').trigger('click');
        $('#submit').click();
    }
}

//  The stop function
function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

function reset_radio_buttons(a, b, c) {

    /*  This function clears all radioboxes that are not checked if one option is selected for a question.  */

    $(a).prop("checked", false);
    $(b).prop("checked", false);
    $(c).prop("checked", false);
}

/*  This listens for user to check radio boxes for questions, and unchecks all other ones appropriately.    */

//  Question 1

$("#a1").click(function()   {reset_radio_buttons("#a2", "#a3", "#a4");});
$("#a2").click(function()   {reset_radio_buttons("#a1", "#a3", "#a4");});
$("#a3").click(function()   {reset_radio_buttons("#a1", "#a2", "#a4");});
$("#a4").click(function()   {reset_radio_buttons("#a1", "#a3", "#a2");});

//  Question 2

$("#b1").click(function()   {reset_radio_buttons("#b2", "#b3", "#b4");});
$("#b2").click(function()   {reset_radio_buttons("#b1", "#b3", "#b4");});
$("#b3").click(function()   {reset_radio_buttons("#b1", "#b2", "#b4");});
$("#b4").click(function()   {reset_radio_buttons("#b1", "#b3", "#b2");});

//  Question 3

$("#c1").click(function()   {reset_radio_buttons("#c2", "#c3", "#c4");});
$("#c2").click(function()   {reset_radio_buttons("#c1", "#c3", "#c4");});
$("#c3").click(function()   {reset_radio_buttons("#c1", "#c2", "#c4");});
$("#c4").click(function()   {reset_radio_buttons("#c1", "#c3", "#c2");});

//  Question 4

$("#d1").click(function()   {reset_radio_buttons("#d2", "#d3", "#d4");});
$("#d2").click(function()   {reset_radio_buttons("#d1", "#d3", "#d4");});
$("#d3").click(function()   {reset_radio_buttons("#d1", "#d2", "#d4");});
$("#d4").click(function()   {reset_radio_buttons("#d1", "#d3", "#d2");});

//  Question 5

$("#e1").click(function()   {reset_radio_buttons("#e2", "#e3", "#e4");});
$("#e2").click(function()   {reset_radio_buttons("#e1", "#e3", "#e4");});
$("#e3").click(function()   {reset_radio_buttons("#e1", "#e2", "#e4");});
$("#e4").click(function()   {reset_radio_buttons("#e1", "#e3", "#e2");});

//  Question 6

$("#f1").click(function()   {reset_radio_buttons("#f2", "#f3", "#f4");});
$("#f2").click(function()   {reset_radio_buttons("#f1", "#f3", "#f4");});
$("#f3").click(function()   {reset_radio_buttons("#f1", "#f2", "#f4");});
$("#f4").click(function()   {reset_radio_buttons("#f1", "#f3", "#f2");});

//  Question 7

$("#g1").click(function()   {reset_radio_buttons("#g2", "#g3", "#g4");});
$("#g2").click(function()   {reset_radio_buttons("#g1", "#g3", "#g4");});
$("#g3").click(function()   {reset_radio_buttons("#g1", "#g2", "#g4");});
$("#g4").click(function()   {reset_radio_buttons("#g1", "#g3", "#g2");});

//  Question 8

$("#h1").click(function()   {reset_radio_buttons("#h2", "#h3", "#h4");});
$("#h2").click(function()   {reset_radio_buttons("#h1", "#h3", "#h4");});
$("#h3").click(function()   {reset_radio_buttons("#h1", "#h2", "#h4");});
$("#h4").click(function()   {reset_radio_buttons("#h1", "#h3", "#h2");});

//  Execute the run function.
run();
