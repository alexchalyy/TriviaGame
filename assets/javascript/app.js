/*  This javascript uses jQueries to execute the quiz.

    Written by Alex Chalyy on 2/22/2019.    */

    function Timer(c)  {
        $("#time").html("Time Remaining: " + c + " seconds");
        console.log("Time: " + c + " seconds.");
    }

    $("#start").click(
        function Time() {
            
            console.log("Timer started");
            for (var c = 30; c > 0; c--)    {
                setTimeout(Timer(c), 1000);
            }
        }
    );
    