/* simon game js */
(function () {
    var stateContinue = false;
    var stateStart = false;
    var statePlayColors = false;
    var stateStrict = false;
    var sequence = [];
    var count = 0;
    var turns = 0;
    var userSequence = [];
    var userTurns = 0;
    var duration1 = 1300;
    var duration2 = 1100;

    var audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var audioYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    var losingSound = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2014/08/Price-is-right-losing-horn.mp3');
    var winningSound = new Audio('http://soundbible.com/mp3/Ta%20Da-SoundBible.com-1884170640.mp3');
    var wrongMove = new Audio('http://soundbible.com/mp3/Slap-SoundMaster13-49669815.mp3');

    function click() {

        $(".color").bind("mousedown touchstart", function (e) {
            if (statePlayColors == true) {
                e.preventDefault();
                var colorPressed = $(this).attr("id");
                console.log(colorPressed);
                switch (colorPressed) {
                case "red":
                    $(this).css("background-color", "#ff4c4c");
                    audioRed.play();
                    userSequence[userTurns] = 0;
                    break;
                case "green":
                    $(this).css("background-color", "#13ff7c");
                    audioGreen.play();
                    userSequence[userTurns] = 1;
                    break;
                case "blue":
                    $(this).css("background-color", "#1c8cff");
                    audioBlue.play();
                    userSequence[userTurns] = 2;
                    break;
                case "yellow":
                    $(this).css("background-color", "#fed93f");
                    audioYellow.play();
                    userSequence[userTurns] = 3;
                    break;
                }
                userTurns++;
                sequenceChecker();
            }
        });
        $(".color").bind("mouseup touchend", function () {
            var colorPressed = $(this).attr("id");
            switch (colorPressed) {
            case "red":
                $(this).css("background-color", "#9f0f17");
                break;
            case "green":
                $(this).css("background-color", "#00a74a");
                break;
            case "blue":
                $(this).css("background-color", "#094a8f");
                break;
            case "yellow":
                $(this).css("background-color", "#cca707");
                break;
            }
        });
    }

    function beep(num) {
        var audios = [audioRed, audioGreen, audioBlue, audioYellow];
        var colors = ["#red", "#green", "#blue", "#yellow"];
        var colorCodes = ["#ff4c4c", "#13ff7c", "#1c8cff", "#fed93f"];
        var colorNormal = ["#9f0f17", "#00a74a", "#094a8f", "#cca707"];
        var random = Math.floor((Math.random() * 4));
        $(colors[num]).css("background-color", colorCodes[num]);

        setTimeout(function () {
            $(colors[num]).css("background-color", colorNormal[num])
        }, duration2);
        audios[num].play();
    }

    function randomSequence() {
        for (var i = 0; i < 20; i++) {
            sequence[i] = Math.floor((Math.random() * 4));
        }
        console.log(sequence);
    }

    function incrementBeeps(arr) {
        var playthis = setInterval(function () {
            beep(arr[count]);
            count++;
            $("#count").text(count);
            if (count >= turns) {
                clearInterval(playthis);
            }
        }, duration1);
        turns++;
    }

    function sequenceChecker() {
        var currentSequence = sequence.slice(0, count);
        var currentIndex = sequence.slice(userTurns - 1, userTurns);
        var traverseSequence = userSequence.slice(userTurns - 1, userTurns);
        $("#count").text(userTurns);
        if (+traverseSequence !== +currentIndex && !stateStrict) {
            statePlayColors = false;
            turns -= 1;
            wrongMove.play();
            continueGame();
        }
        if (+traverseSequence !== +currentIndex && stateStrict) {
            losingSound.play();
            reset();
        }
        if (userSequence.join("") === sequence.join("")) {
            stateContinue = false;
            (stateStrict) ? celebration2(): celebration();
        } else if (userSequence.join("") === currentSequence.join("")) {
            stateContinue = true;
            statePlayColors = false;
            continueGame();
        }
    }

    function startGame() {
        $("#start").click(function () {
            if (!stateStart) {
                $(this).css("background-color", "white");
                stateStart = true;
                incrementBeeps(sequence);
                count = 0;
                setTimeout(function () {
                    statePlayColors = true;
                }, turns * duration1);
            } else if (stateStart) {
                reset();
            }
        });
    }

    function continueGame() {
        userTurns = 0;
        if (turns >= 10) {
            duration1 = 650;
            duration2 = 550;
        }
        if (turns >= 15) {
            duration1 = 450;
            duration2 = 350;
        }
        if (stateStart && stateContinue == true) {
            incrementBeeps(sequence);
            count = 0;
            setTimeout(function () {
                statePlayColors = true;
            }, turns * duration1);
        }
    }

    function reset() {
        duration1 = 1300;
        duration2 = 1100;
        stateContinue = false;
        stateStart = false;
        statePlayColors = false;
        stateStrict = false;
        sequence = [];
        count = 0;
        turns = 0;
        userSequence = [];
        userTurns = 0;
        randomSequence();
        $("#strict").css("border-color", "black")
        $("#yellow").css("border-color", "#333");
        $("#blue").css("border-color", "#333");
        $("#green").css("border-color", "#333");
        $("#red").css("border-color", "#333");
        $(".center").css("border-color", "#333");
        $("#start").css("background-color", "crimson");
        $("#red").css("background-color", "#9f0f17");
        $("#green").css("background-color", "#00a74a");
        $("#blue").css("background-color", "#094a8f");
        $("#yellow").css("background-color", "#cca707");
        $("#count").text(count);
    }

    $("#strict").click(function () {
        if (stateStart === false) {
            stateStrict = (stateStrict) ? false : true;
            console.log(stateStrict);
            (stateStrict) ? $(this).css("border-color", "red"): $(this).css("border-color", "black");
        }

    });

    function celebration() {
        winningSound.play();
        var countdown = 11;
        var flashing = setInterval(function () {
            countdown--;
            if (countdown % 2 === 0) {
                $("#red").css("background-color", "#ff4c4c");
                $("#green").css("background-color", "#13ff7c");
                $("#blue").css("background-color", "#1c8cff");
                $("#yellow").css("background-color", "#fed93f");
            } else {
                $("#red").css("background-color", "#9f0f17");
                $("#green").css("background-color", "#00a74a");
                $("#blue").css("background-color", "#094a8f");
                $("#yellow").css("background-color", "#cca707");
            }
            if (countdown <= 0) {
                clearInterval(flashing);
                reset();
            }
        }, 100)
    }

    function celebration2() {
        winningSound.play();
        var countdown = 11;
        var flashing = setInterval(function () {
            countdown--;
            if (countdown % 2 === 0) {
                $("#yellow").css("border-color", "#fed93f");
                $("#blue").css("border-color", "#fed93f");
                $("#green").css("border-color", "#fed93f");
                $("#red").css("border-color", "#fed93f");
                $(".center").css("border-color", "#ff4c4c");
                $("#red").css("background-color", "#ff4c4c");
                $("#green").css("background-color", "#13ff7c");
                $("#blue").css("background-color", "#1c8cff");
                $("#yellow").css("background-color", "#fed93f");
            } else {
                $("#yellow").css("border-color", "#ff4c4c");
                $("#blue").css("border-color", "#ff4c4c");
                $("#green").css("border-color", "#ff4c4c");
                $("#red").css("border-color", "#ff4c4c");
                $(".center").css("border-color", "#fed93f");
                $("#red").css("background-color", "#9f0f17");
                $("#green").css("background-color", "#00a74a");
                $("#blue").css("background-color", "#094a8f");
                $("#yellow").css("background-color", "#cca707");
            }
            if (countdown <= 0) {
                clearInterval(flashing);
                reset();
            }
        }, 100)
    }

    randomSequence();
    startGame();
    click();
}());