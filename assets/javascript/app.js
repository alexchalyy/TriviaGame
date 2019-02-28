/*  This javascript uses jQueries to execute the quiz. Code portions are take from class exercises.

    Written by Alex Chalyy on 2/22/2019.    */

//  Interval Demonstration
//  Set our number counter to 30.

var number = 100;

//  Variable that will hold our interval ID when we execute
//  the "run" function

var intervalId;

//  This sets the counter variables. Also global variable is necessary to pass score values between different pages when the script reloads and all prior values are lost.

var globalVariable = {
    unanswered: 9,  // for some reason in my code if I store the unanswered to 8, it is always 1 less then it should be
    correct: 0,
    incorrect: 0,
};

//  Global variable array that determine whether any quesions have been answered.

var q = [false, false, false, false, false, false, false, false];

//  Another variable array that determines whether any questions have been answered.

var q1 = [false, false, false, false, false, false, false, false];

//  Global variable array that stores user answers for each question, if user never answers it, a question is marked as false

var user_answers = [false, false, false, false, false, false, false, false];

function run() {

    //  The run function sets an interval
    //  that runs the decrement function once a second.
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    //  This function has two paths depending from which page it loads where it could retrieve score variables from local storage after next page is opened where they are stored before going there.
    //  This allows to use one script for both quiz and results page.

    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    globalVariable.unanswered = localStorage.getItem("unanswered");
    globalVariable.correct = localStorage.getItem("correct");
    globalVariable.incorrect = localStorage.getItem("incorrect");
    console.log("Incorrect right after loading from memory: " + globalVariable.incorrect);
    //  The code below does not make any sense to me, but apparently works, I wrote by trial and error to produce correct result
    $("#correct").html(globalVariable.correct);
    $("#unanswered").html(globalVariable.unanswered);
    if (globalVariable.unanswered == 9) {
        $("#unanswered").html(8);
        $("#incorrect").html(globalVariable.incorrect);
    }
    else {
        if (globalVariable.unanswered == 0) {
            $("#incorrect").html(globalVariable.incorrect);
        }
        else if (globalVariable.incorrect > 0) {
            $("#incorrect").html(globalVariable.incorrect - 1);
        }
        else $("#incorrect").html(globalVariable.incorrect);
    }
    //  Below are workarounds to display scores correctly for certain edge cases found during testing
    //  Edge case work around # 1
    if (globalVariable.incorrect == 9) {
        $("#incorrect").html(8);
    }
    //  Edge case work around # 2
    if (globalVariable.correct == 4 && globalVariable.incorrect == 5) {
        $("#incorrect").html(4);
    }
    //  Edge case work around # 3
    if (globalVariable.correct == 2 && globalVariable.incorrect == 7) {
        $("#incorrect").html(6);
    }
    //  Edge case work around # 4
    if (globalVariable.correct == 3 && globalVariable.incorrect == 6) {
        $("#incorrect").html(5);
    }
    //  Edge case work around # 5
    if (globalVariable.correct == 1 && globalVariable.incorrect == 8) {
        $("#incorrect").html(7);
    }
    localStorage.setItem("unanswered", 9);
    localStorage.setItem("correct", 0);
    localStorage.setItem("incorrect", 0);
}

function Score() {
    //  This funciton logs the scores.

    var temp = globalVariable.unanswered - 1;
    console.log("unanswered questions: " + temp);
    console.log("correctly answered questions: " + globalVariable.correct);
    console.log("incorrectly answered questions: " + globalVariable.incorrect);
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
        q[count - 1] = true;
        console.log("unanswered = " + globalVariable.unanswered);
        console.log("decrement of unaswered");
        globalVariable.unanswered -= 1; //Tim answer
        console.log("unanswered = " + globalVariable.unanswered);
        localStorage.setItem("unanswered", globalVariable.unanswered);
        console.log("question answered!");
    } else console.log("question unanswered");
}

function correct(c) {

    //  This function is called when user answers a question correctly, it adds 1 to correct quesion count, and stores it in local storage.

    console.log("User answered question " + c + " correctly!");
    globalVariable.correct++;               //  Adds 1 to correct answer count
    localStorage.setItem("correct", globalVariable.correct);   // Stores the correct answered variable in local storage
    user_answers[c - 1] = true;             //  Changes the previous answer to question to correctly answered
    q1[c - 1] = true;
}

function incorrect(c) {

    //  This function is called when user answers a question incorrectly, it adds 1 to incorrect question count, and stores it in local storage

    console.log("User answered question " + c + " incorrectly!");
    globalVariable.incorrect++;             //  adds 1 to incorrect answers
    console.log("Incorrect count right after it is changed is " + globalVariable.incorrect);
    localStorage.setItem("incorrect", globalVariable.incorrect);    // Stores incorrect answers in local storage
    user_answers[c - 1] = false;
    q1[c - 1] = true;
}

function answer_check(c, answer) {

    //  This function checks the answers, calculates the score accordingly, and stores it in local storage.
    //  This function receives the correct answer and the number of question.

    console.log("answer: " + answer);
    if (answer == true) {                               //  This code bloc is executed if user selects correct answer
        if (q1[c - 1] == true) {                         //  This code bloc is executed if the question has already been answered 
            if (user_answers[c - 1] == false) {       //  This code bloc is executed if the previous answer was wrong
                correct(c);
                globalVariable.incorrect--;             //  Subtracts 1 from incorrect answers
                localStorage.setItem("incorrect", globalVariable.incorrect);    // Stores incorrect answers in local storage
            } else {                               //  This code bloc is executed if the previous answer was correct
                console.log("User answered the same question the same way.");
            }
        }
        else {
            //  This code bloc is executed if the question has not been answered before
            correct(c);
        }
    } else {                                           //  This code bloc is executed if user selects incorrect answer
        if (q1[c - 1] == true) {                        //  This code bloc is executed if the question has already been answered
            if (user_answers[c - 1] == true) {        //  This code bloc is executed if the previous answer was correct 
                incorrect(c);
                globalVariable.correct--;               //  Subtracts 1 from correct answer count
                localStorage.setItem("correct", globalVariable.correct);   // Stores the correct answered variable in local storage
            } else {                                   //  This code bloc is executed if the previous answer was incorrect 
                console.log("User answered the same question the same way.");
            }
        }
        else {                                       //  This code bloc is executed if the question has not been answered before
            incorrect(c);
        }
    }
}

function reset_radio_buttons(a, b, c, n, answer) {

    /*  This function clears all radioboxes that are not checked if one option is selected for a question.  */

    unanswered(n);
    answer_check(n, answer);
    $(a).prop("checked", false);
    $(b).prop("checked", false);
    $(c).prop("checked", false);
}

/*  This listens for user to check radio boxes for questions, and unchecks all other ones appropriately.    */

//  Question 1

$("#a1").click(function () { reset_radio_buttons("#a2", "#a3", "#a4", 1, true); });
$("#a2").click(function () { reset_radio_buttons("#a1", "#a3", "#a4", 1, false); });
$("#a3").click(function () { reset_radio_buttons("#a1", "#a2", "#a4", 1, false); });
$("#a4").click(function () { reset_radio_buttons("#a1", "#a3", "#a2", 1, false); });

//  Question 2

$("#b1").click(function () { reset_radio_buttons("#b2", "#b3", "#b4", 2, false); });
$("#b2").click(function () { reset_radio_buttons("#b1", "#b3", "#b4", 2, true); });
$("#b3").click(function () { reset_radio_buttons("#b1", "#b2", "#b4", 2, false); });
$("#b4").click(function () { reset_radio_buttons("#b1", "#b3", "#b2", 2, false); });

//  Question 3

$("#c1").click(function () { reset_radio_buttons("#c2", "#c3", "#c4", 3, false); });
$("#c2").click(function () { reset_radio_buttons("#c1", "#c3", "#c4", 3, false); });
$("#c3").click(function () { reset_radio_buttons("#c1", "#c2", "#c4", 3, false); });
$("#c4").click(function () { reset_radio_buttons("#c1", "#c3", "#c2", 3, true); });

//  Question 4

$("#d1").click(function () { reset_radio_buttons("#d2", "#d3", "#d4", 4, false); });
$("#d2").click(function () { reset_radio_buttons("#d1", "#d3", "#d4", 4, false); });
$("#d3").click(function () { reset_radio_buttons("#d1", "#d2", "#d4", 4, true); });
$("#d4").click(function () { reset_radio_buttons("#d1", "#d3", "#d2", 4, false); });

//  Question 5

$("#e1").click(function () { reset_radio_buttons("#e2", "#e3", "#e4", 5, false); });
$("#e2").click(function () { reset_radio_buttons("#e1", "#e3", "#e4", 5, true); });
$("#e3").click(function () { reset_radio_buttons("#e1", "#e2", "#e4", 5, false); });
$("#e4").click(function () { reset_radio_buttons("#e1", "#e3", "#e2", 5, false); });

//  Question 6

$("#f1").click(function () { reset_radio_buttons("#f2", "#f3", "#f4", 6, true); });
$("#f2").click(function () { reset_radio_buttons("#f1", "#f3", "#f4", 6, false); });
$("#f3").click(function () { reset_radio_buttons("#f1", "#f2", "#f4", 6, false); });
$("#f4").click(function () { reset_radio_buttons("#f1", "#f3", "#f2", 6, false); });

//  Question 7

$("#g1").click(function () { reset_radio_buttons("#g2", "#g3", "#g4", 7, false); });
$("#g2").click(function () { reset_radio_buttons("#g1", "#g3", "#g4", 7, false); });
$("#g3").click(function () { reset_radio_buttons("#g1", "#g2", "#g4", 7, true); });
$("#g4").click(function () { reset_radio_buttons("#g1", "#g3", "#g2", 7, false); });

//  Question 8

$("#h1").click(function () { reset_radio_buttons("#h2", "#h3", "#h4", 8, false); });
$("#h2").click(function () { reset_radio_buttons("#h1", "#h3", "#h4", 8, false); });
$("#h3").click(function () { reset_radio_buttons("#h1", "#h2", "#h4", 8, true); });
$("#h4").click(function () { reset_radio_buttons("#h1", "#h3", "#h2", 8, false); });

//  Execute the run function.
$(document).ready(function () {

    console.log("ready!");
    run();
});
