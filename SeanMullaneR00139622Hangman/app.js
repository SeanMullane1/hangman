$(document).ready(function() {
    var currentUser;

    var user;
    var pass;
    var score = 0;

    var addUser = false;

    var users = [{
        userName: 'admin',
        passWord: '123',
        finalScore: 0,
    }];
        
    $("#hangman").hide();

    $("#logout").hide();

    $("#regBtn").on("click",function() {
        if ($(".newUser").val() === '' && $(".newPass").val() === ''){
            alert("Please enter both a correct username and password");
        } else {
            for (var i = 0; i < users.length; i++){
                if (users[i].userName === ($(".newUser").val())){
                    alert("Please enter a username that is not used");
                    addUser = false;
                }else{
                    addUser = true;
                }
            }
        }

        if (addUser === true) {
            user = $(".newUser").val();
            pass = $(".newPass").val();
            users.push({
                userName: user,
                passWord: pass,
                finalScore: score,
            });
        alert(user + " added as user");
        $("#register").hide();
        }

    });
   
    $("#loginBtn").on("click", function() {
        if ($(".userName").val() === '' && $(".passWord").val() === '' ) {
                alert("Please enter both a correct username and password");
        } else {
        for (var i = 0; i < users.length; i++){
            if (users[i].userName === ($(".userName").val()) && users[i].passWord === ($(".passWord").val())){
                currentUser = $(".userName").val();
                $("#login").hide();
                $("#register").hide();
                $("#greeting").show();
                $("#greeting").text("Welcome " + currentUser);
                $("#hangman").show();
                $("#logout").show();
                $("#hangman").attr("src", "images/hangman-0.png");
                playGame();
            }
        }
    }
    });

    $("#logout").append("<br><button enabled id='logOut'>Log Out</button>");
        
    $("#logout").on("click", function(userNames) {
                $("#login").show();
                $("#register").show();
                $("#greeting").hide();
                $("#logout").hide();
                $("#hangman").hide();
                $("#lose").hide();
                score = 0;
                $(".score").hide();
                reload(); 

    });

    function reload(){
        $("#rowOne").empty(); 
        $("#rowTwo").empty(); 
        $("#rowThree").empty(); 
        $(".category").empty(); 
        $("#hangman").empty();
        $(".answer").empty(); 
        $("#play").hide();
        $("#win").empty();
        $("#lose").empty();
        $("#playAgain").empty();
        $(".score").hide();
    }

    function playGame() {

        $("#hangman").attr("src", "images/hangman-0.png");

    var names = ['SEAN', 'SAM', 'JEAN', 'JOHN', 'ARTUR','HARRY','MIKE','HUGH','MARK','JANE'];
    var sports = ['SOCCER', 'HURLING','HOCKEY','TENNIS','FOOTBALL','SWIMMING','RUGBY','ROWING','RACING','HURDLES'];
    var fruits = ['MANGOS','PEAR', 'APPLE','ORANGE','STRAWBERRY','GRAPES', 'BANANA', 'PINEAPPLE', 'AVOCADO', 'BLUEBERRY'];

    var keys = ['A','B','C','D','E', 'F', 'G', 'H','I','J','K','L','M','N','O','P','Q','R','S'
    ,'T','U','V','W','X','Y','Z'];

    for(i = 0; i < keys.length; i++) {
            if (i <= 7){
                $("#rowOne").append("<p class='alpha'>" + keys[i] + "</p>"); 
            } else if (i > 7 && i < 18) {
                $("#rowTwo").append("<p class='alpha'>" + keys[i] + "</p>"); 
            } else {
                $("#rowThree").append("<p class='alpha'>" + keys[i] + "</p>"); 
            }
        }

    var randomWord = '';
    var randomNumber = '';
    var randomIndex = '';
    var guess = "";
    var correctGuess = 0;
    var incorrectGuess = 0;
    var correctLetter = false;

    var min = 1;
    var max = 9;

    var maxNames = names.length -1;
    var maxSports = sports.length -1;
    var maxFruits = fruits.length -1;

    var randomNumber = Math.floor(Math.random() * (max- min + 1)) + min;

    console.log(randomNumber);

    if(randomNumber >= 1 && randomNumber <= 4 ){
        randomIndex = Math.floor(Math.random() * (maxNames - min + 1)) + min;
        randomWord = names[randomIndex];
        console.log(randomIndex);

        $(".category").text("Category is Names");  
    }
    if(randomNumber >= 5 && randomNumber <= 7){
        randomIndex = Math.floor(Math.random() * (maxSports - min + 1)) + min;
        randomWord = sports[randomIndex];
        console.log(randomIndex);

        $(".category").text("Category is Sports");  

    }
    if(randomNumber >= 8 ){
        randomIndex = Math.floor(Math.random() * (maxFruits - min + 1)) + min;
        randomWord = fruits[randomIndex];
        console.log(randomIndex);

        $(".category").text("Category is Fruits");      }

    console.log(randomWord);

    $("p").on("click", function() {
        guess = $(this).text();
        $(this).addClass("clicked");
        correctLetter = false;
        console.log("letter " + guess);
        for (i = 0; i < randomWord.length; i++) {
            if (guess === randomWord.charAt(i)) {
                correctGuess = correctGuess + 1;
                correctLetter = true;
                $(".answer").append("<button id='letter'>" + guess + "</button>");
                if (correctGuess === randomWord.length){
                    $(".answer").append("<br><button id='letter'>" + randomWord + "</button>");
                    score = score + 1; 
                    $("#win").show();
                    $("#playAgain").show();
                    $("#win").text("Congratulations you saved a mans life");
                    $(".score").show();
                    $(".score").text("Your current score is: " + score);
                    $("#hangman").attr("src", "images/win.png");
                    $("#playAgain").append("<br><button enabled id='play'>Play again?</button>");

                }
            }
        }
        if (correctLetter === false ) {
            incorrectGuess += 1;
            $("#hangman").attr("src", "images/hangman-" + incorrectGuess + ".png");
        }

        if (incorrectGuess === 9 ) {
            $("#lose").show();
                $(".score").show();
                $("#lose").text(" Sorry you have lost, Random word was " + randomWord);
                $(".score").text("Your final score is: " + score);
                $("#hangman").attr("src", "images/loser.png");
                $("#playAgain").append("<br><button enabled id='play'>Play again?</button>");
                score = 0; 
        }
    });
    }  

    $("#playAgain").on("click", function() {
        reload();
        playGame();
    });
});