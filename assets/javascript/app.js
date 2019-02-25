/*  This javascript uses jQueries to execute the quiz. Code portions are take from class exercises.

    Written by Alex Chalyy on 2/22/2019.    */

//  Interval Demonstration
//  Set our number counter to 30.
var number = 25;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

//  This sets the counter variables. Also global variable is necessary to pass score values between different pages when the script reloads and all prior values are lost.

var globalVariable = {
    unanswered: 9,
    correct: 0,
    incorrect: 0,
    done: 0
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

    globalVariable.done = localStorage.getItem("vThreeLocalStorage");

    console.log("script starts.");
    console.log("globalVariable.done = " + globalVariable.done);
    if (globalVariable.done == 0) {
        console.log("This is the code section that is executed on results page.");
        console.log("Retrieving score variables from local storage...");
        globalVariable.done = 1;
        localStorage.setItem("vThreeLocalStorage", globalVariable.done);
        globalVariable.unanswered = localStorage.getItem("vOneLocalStorage");
        globalVariable.correct = localStorage.getItem("vTwoLocalStorage");
        globalVariable.incorrect = localStorage.getItem("vFourLocalStorage");
        Score();
        //$("#correct").html(globalVariable.correct);
        //$("#incorrect").html(globalVariable.incorrect);
        //$("#unanswered").html(globalVariable.unanswered);
    } else {
        var item = localStorage.getItem("stuff");
        console.log("item: " + item);
        console.log("This is the code section that is executed on quiz page.");
        clearInterval(intervalId);
        console.log("Quiz starts");
        intervalId = setInterval(decrement, 1000);
        globalVariable.unanswered = localStorage.getItem("vOneLocalStorage");
        globalVariable.correct = localStorage.getItem("vTwoLocalStorage");
        globalVariable.incorrect = localStorage.getItem("vFourLocalStorage");
        //globalVariable.incorrect--;
        $("#correct").html(globalVariable.correct);
        if (globalVariable.unanswered == 9) {
            $("#unanswered").html(8);  
           // $("#incorrect").html(0);
        }
        else    {
            $("#unanswered").html(globalVariable.unanswered);
        }
        $("#incorrect").html(globalVariable.incorrect - 1);
        //$("#incorrect").html(globalVariable.incorrect);
        //var unanswered = globalVariable.unanswered/2;
        localStorage.setItem("vOneLocalStorage", 9);
        localStorage.setItem("vTwoLocalStorage", 0);
        localStorage.setItem("vFourLocalStorage", 0);
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
    //localStorage.setItem("vOneLocalStorage", globalVariable.unanswered);
    //globalVariable.incorrect--;
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

    console.log("count: " + count);
    if (q[count - 1] == false) {
        q[count - 1] = true;
        //if (count == 1) {
        //if (globalVariable.unanswered == 8) {
            console.log("unanswered = " + globalVariable.unanswered);
            console.log("decrement of unaswered");
            globalVariable.unanswered -= 1;
            console.log("unanswered = " + globalVariable.unanswered);
        //    localStorage.setItem("vOneLocalStorage", globalVariable.unanswered);
        //}
        //else {
        //    globalVariable.unanswered = globalVariable.unanswered - 1;
        //    
        //}
        //globalVariable.unanswered++;
        //}
        //else    {
        //globalVariable.unanswered--;
        //globalVariable.unanswered++;
        //}
        localStorage.setItem("vOneLocalStorage", globalVariable.unanswered);
        console.log("question answered!");
    } else console.log("question unanswered");
    //globalVariable.unanswered--;
    //console.log("questions unanswered: " + globalVariable.unanswered);
}

function correct(c)  {

    //  This function is called when user answers a question correctly, it adds 1 to correct quesion count, and stores it in local storage.

    console.log("User answered question " + c + " correctly!");
    globalVariable.correct++;               //  Adds 1 to correct answer count
    localStorage.setItem("vTwoLocalStorage", globalVariable.correct);   // Stores the correct answered variable in local storage
    user_answers[c - 1] = true;             //  Changes the previous answer to question to correctly answered
    q1[c - 1] = true;
}

function incorrect(c)   {

    //  This function is called when user answers a question incorrectly, it adds 1 to incorrect question count, and stores it in local storage

    console.log("User answered question " + c + " incorrectly!");
    globalVariable.incorrect++;             //  adds 1 to incorrect answers
    localStorage.setItem("vFourLocalStorage", globalVariable.incorrect);    // Stores incorrect answers in local storage
    user_answers[c - 1] = false;
    q1[c - 1] = true;
}

function answer_check(c, answer)    {

    //  This function checks the answers, calculates the score accordingly, and stores it in local storage.
    //  This function receives the correct answer and the number of question.

    console.log("answer: " + answer);
    if (answer == true) {                               //  This code bloc is executed if user selects correct answer
        if (q1[c - 1] == true) {                         //  This code bloc is executed if the question has already been answered
            console.log("V R Here");   
            if (user_answers[c - 1] == false)   {       //  This code bloc is executed if the previous answer was wrong
                correct(c);
                globalVariable.incorrect--;             //  Subtracts 1 from incorrect answers
                localStorage.setItem("vFourLocalStorage", globalVariable.incorrect);    // Stores incorrect answers in local storage
            }   else    {                               //  This code bloc is executed if the previous answer was correct
                console.log("User answered the same question the same way.");
            }
        }    
        else    {   
            //  This code bloc is executed if the question has not been answered before
            correct(c);
        }
    } else  {                                           //  This code bloc is executed if user selects incorrect answer
        if (q1[c - 1] == true)  {                        //  This code bloc is executed if the question has already been answered
            if (user_answers[c - 1] == true)   {        //  This code bloc is executed if the previous answer was correct 
                incorrect(c);
                globalVariable.correct--;               //  Subtracts 1 from correct answer count
                localStorage.setItem("vTwoLocalStorage", globalVariable.correct);   // Stores the correct answered variable in local storage
            } else  {                                   //  This code bloc is executed if the previous answer was incorrect 
                console.log("User answered the same question the same way.");
            }                                           
        }  
        else    {                                       //  This code bloc is executed if the question has not been answered before
                incorrect(c);
        }
    }
    /*
    if (c == 1) {
        if (answer == true) {
            console.log("Correct!");
            console.log("correct count = " + globalVariable.correct);
            globalVariable.correct++;
            //if q[c - 1] == true
            localStorage.setItem("vTwoLocalStorage", globalVariable.correct);
            console.log("correct count = " + globalVariable.correct);
        }
        else    {
            console.log("Incorrect!");
            console.log("incorrect count = " + globalVariable.correct);
            globalVariable.incorrect++;
            console.log("incorrect count = " + globalVariable.correct);
            localStorage.setItem("vFourLocalStorage", globalVariable.incorrect);
        }
    } */
}

function reset_radio_buttons(a, b, c, n, answer) {

    /*  This function clears all radioboxes that are not checked if one option is selected for a question.  */

    unanswered(n);
    answer_check(n, answer);
    $(a).prop("checked", false);
    $(b).prop("checked", false);
    $(c).prop("checked", false);
    Result();
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
    Score();
    run();
});
