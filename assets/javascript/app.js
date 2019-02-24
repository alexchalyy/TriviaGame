/*  This javascript uses jQueries to execute the quiz. Code portions are take from class exercises.

    Written by Alex Chalyy on 2/22/2019.    */

//  Interval Demonstration
//  Set our number counter to 30.
var number = 10;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

//  This sets the counter variables. Also global variable is necessary to pass score values between different pages when the script reloads and all prior values are lost.

var globalVariable = {
    unanswered: 8,
    correct: 0,
    incorrect: 0,
    done: 0
};

//  Global variables that determine whether any quesions have been answered.

var q = ["false", "false", "false", "false", "false", "false", "false", "false", "false", "false"];

function run() {

    //  The run function sets an interval
    //  that runs the decrement function once a second.
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    //  This function has two paths depending from which page it loads where it could retrieve score variables from local storage after next page is opened where they are stored before going there.
    //  This allows to use one script for both quiz and results page.

    globalVariable.done = localStorage.getItem("vThreeLocalStorage");

    if (globalVariable.done == 1) {
        console.log("This is the code section that is executed on results page.");
        console.log("Retrieving score variables from local storage...");
        globalVariable.done = 0;
        localStorage.setItem("vThreeLocalStorage", globalVariable.done);
        globalVariable.unanswered = localStorage.getItem("vOneLocalStorage");
        globalVariable.correct = localStorage.getItem("vTwoLocalStorage");
        globalVariable.incorrect = localStorage.getItem("vFourLocalStorage");
        Score();
        $("#correct").html(globalVariable.correct);
        $("#incorrect").html(globalVariable.incorrect);
        $("#unanswered").html(globalVariable.unanswered);
    } else {
        var item = localStorage.getItem("stuff");
        console.log("item: " + item);
        console.log("This is the code section that is executed on quiz page.");
        clearInterval(intervalId);
        console.log("Quiz starts");
        intervalId = setInterval(decrement, 1000);
    }
}

function Score() {
    //  This funciton logs the scores.

    console.log("unanswered questions: " + globalVariable.unanswered);
    console.log("correctly answered questions: " + globalVariable.correct);
    console.log("incorrectly answered questions: " + globalVariable.incorrect);
}

function Result() {
    //  This function prints the result scores on result page. Since all pages are static, this function stores all results in local storage where the next page can retrieve the scores from.

    console.log("storing the score variables in local storage...");
    globalVariable.done = 1;
    localStorage.setItem("stuff", 4);
    localStorage.setItem("vOneLocalStorage", globalVariable.unanswered);
    localStorage.setItem("vTwoLocalStorage", globalVariable.correct);
    localStorage.setItem("vThreeLocalStorage", globalVariable.done);
    localStorage.setItem("vFourLocalStorage", globalVariable.incorrect);
    Score();
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
        //  Navigate to result page, when time runs out.
        Result();
        document.getElementById("sub").click();
    }
}

//  The stop function
function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

function unanswered(count) {

    //  This function appends unanswered question count

    if (q[count - 1] == false) {
        q[count - 1] == true;
        globalVariable.unanswered--;
    }
}

function reset_radio_buttons(a, b, c, q) {

    /*  This function clears all radioboxes that are not checked if one option is selected for a question.  */

    unanswered(q);
    $(a).prop("checked", false);
    $(b).prop("checked", false);
    $(c).prop("checked", false);
    Result();
}

/*  This listens for user to check radio boxes for questions, and unchecks all other ones appropriately.    */

//  Question 1

$("#a1").click(function () { reset_radio_buttons("#a2", "#a3", "#a4", 1); });
$("#a2").click(function () { reset_radio_buttons("#a1", "#a3", "#a4", 1); });
$("#a3").click(function () { reset_radio_buttons("#a1", "#a2", "#a4", 1); });
$("#a4").click(function () { reset_radio_buttons("#a1", "#a3", "#a2", 1); });

//  Question 2

$("#b1").click(function () { reset_radio_buttons("#b2", "#b3", "#b4", 2); });
$("#b2").click(function () { reset_radio_buttons("#b1", "#b3", "#b4", 2); });
$("#b3").click(function () { reset_radio_buttons("#b1", "#b2", "#b4", 2); });
$("#b4").click(function () { reset_radio_buttons("#b1", "#b3", "#b2", 2); });

//  Question 3

$("#c1").click(function () { reset_radio_buttons("#c2", "#c3", "#c4", 3); });
$("#c2").click(function () { reset_radio_buttons("#c1", "#c3", "#c4", 3); });
$("#c3").click(function () { reset_radio_buttons("#c1", "#c2", "#c4", 3); });
$("#c4").click(function () { reset_radio_buttons("#c1", "#c3", "#c2", 3); });

//  Question 4

$("#d1").click(function () { reset_radio_buttons("#d2", "#d3", "#d4", 4); });
$("#d2").click(function () { reset_radio_buttons("#d1", "#d3", "#d4", 4); });
$("#d3").click(function () { reset_radio_buttons("#d1", "#d2", "#d4", 4); });
$("#d4").click(function () { reset_radio_buttons("#d1", "#d3", "#d2", 4); });

//  Question 5

$("#e1").click(function () { reset_radio_buttons("#e2", "#e3", "#e4", 5); });
$("#e2").click(function () { reset_radio_buttons("#e1", "#e3", "#e4", 5); });
$("#e3").click(function () { reset_radio_buttons("#e1", "#e2", "#e4", 5); });
$("#e4").click(function () { reset_radio_buttons("#e1", "#e3", "#e2", 5); });

//  Question 6

$("#f1").click(function () { reset_radio_buttons("#f2", "#f3", "#f4", 6); });
$("#f2").click(function () { reset_radio_buttons("#f1", "#f3", "#f4", 6); });
$("#f3").click(function () { reset_radio_buttons("#f1", "#f2", "#f4", 6); });
$("#f4").click(function () { reset_radio_buttons("#f1", "#f3", "#f2", 6); });

//  Question 7

$("#g1").click(function () { reset_radio_buttons("#g2", "#g3", "#g4", 7); });
$("#g2").click(function () { reset_radio_buttons("#g1", "#g3", "#g4", 7); });
$("#g3").click(function () { reset_radio_buttons("#g1", "#g2", "#g4", 7); });
$("#g4").click(function () { reset_radio_buttons("#g1", "#g3", "#g2", 7); });

//  Question 8

$("#h1").click(function () { reset_radio_buttons("#h2", "#h3", "#h4", 8); });
$("#h2").click(function () { reset_radio_buttons("#h1", "#h3", "#h4", 8); });
$("#h3").click(function () { reset_radio_buttons("#h1", "#h2", "#h4", 8); });
$("#h4").click(function () { reset_radio_buttons("#h1", "#h3", "#h2", 8); });

//  Execute the run function.
$(document).ready(function () {

    console.log("ready!");
    Score();
    run();
});
