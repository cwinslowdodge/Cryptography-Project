var calculationsPerSecond = 1e10; // An estimate of 10,000,000,000 hashes per second
var containsLowercase = false;
var containsUppercase = false;
var containsNumbers = false;
var containsSpecial = false;
var color = "white";
var strength = 0;
var caesarDescription = '<p>The Caesar cipher, also known as a shift cipher, is one of the simplest forms of encryption.' +
    ' It is a substitution cipher where each letter in the original message (called the plaintext) is replaced with a ' +
    'letter corresponding to a certain number of letters up or down in the alphabet. In this way, a message that ' +
    'initially was quite readable, ends up in a form that can not be understood at a simple glance. Below are examples ' +
    'of Caesar ciphers of the letters of your password or message typed above.</p>'

$(function() {
    $("#password-strength-bar").progressbar();
    $(".ciphers").tabs();
    document.getElementById("output").style.display = 'none';

    $("#password-input").keyup(checkPassword);
    $("#caesar-input").keyup(function() {
        var cursor = this.selectionStart;
        var regex = /[^a-zA-Z]/g;
        var text = $(this).val();
        if(regex.test(text)) {
            $(this).val(text.replace(regex, ''));
            cursor--;
        }
        this.setSelectionRange(cursor, cursor);
    });
    $("#caesar-input").keyup(caesarCipher);
});


var checkPassword = function() {
    var password = $("#password-input").val();
    var length = password.length;
    if(length)
    {
        document.getElementById("output").style.display = 'inherit';
        var possibleCharacters = getPossibleCharacters(password);

        var possibleCombinations = Math.pow(possibleCharacters, length);
        var timeInSeconds = possibleCombinations / calculationsPerSecond / 2;

        var timeInUnits = convertUnits(timeInSeconds);
        var timeDescription = alternateTimes(timeInSeconds);
        $(".password-time").text('It would take a hacker approximately ' + timeInUnits + ' to crack this password,' +
            ' or ' + timeDescription + '.');

        if (!(containsSpecial && containsUppercase && containsLowercase && containsNumbers)) {
            var warning = '<ul>';
            if (containsLowercase ^ containsUppercase) {
                warning += '<li>Try mixing lowercase and uppercase letters to improve your password.</li>';
            }
            if (!containsLowercase && !containsUppercase) {
                warning += '<li>You might want to include letters to have a more secure password.</li>';
            }
            if (!containsNumbers) {
                warning += '<li>Adding numbers to your password will make it harder to crack.</li>';
            }
            if (!containsSpecial) {
                warning += '<li>Special characters like @ or * will give your password extra strength.</li>';
            }
            warning += '</ul>'
            $(".password-strength-tips").html(warning);
        }

        $("#password-strength-bar > div").css({ 'background': color });
        $("#password-strength-bar").progressbar("value", strength);

        caesarCipher(password);
    }
    else
    {
        document.getElementById("output").style.display = 'none';
    }
};

var getPossibleCharacters = function(password) {
    containsLowercase = false;
    containsUppercase = false;
    containsNumbers = false;
    containsSpecial = false;

    var characterCount = 0;
    var lowercase = new RegExp('[a-z]');
    if (password.search(lowercase) >= 0) {
        characterCount += 26;
        containsLowercase = true;
    }

    var uppercase = new RegExp('[A-Z]');
    if (password.search(uppercase) >= 0) {
        characterCount += 26;
        containsUppercase = true;
    }

    var numbers = new RegExp('[0-9]');
    if (password.search(numbers) >= 0) {
        characterCount += 10;
        containsNumbers = true;
    }

    var specialCharacters = new RegExp('[^a-zA-Z0-9]');
    if (password.search(specialCharacters) >= 0) {
        characterCount += 31;
        containsSpecial = true;
    }

    return characterCount;
};

var convertUnits = function(seconds) {
    if (seconds < 1) return seconds.toFixed(2) + " seconds"
    if (seconds < 4) return seconds.toFixed(1) + " seconds"
    if (seconds < 60) return "about " + seconds + " seconds";
    if ((seconds /= 60) < 60) return "about " + seconds.toFixed(2) + " minutes";
    if ((seconds /= 60) < 24) return "about " + seconds.toFixed(2) + " hours";
    if ((seconds /= 24) < 7) return "about " + seconds.toFixed(2) + " days";
    if ((seconds /= 7) < 4) return "about " + seconds.toFixed(2) + " weeks";
    if ((seconds /= 4.34) < 12) return "about " + seconds.toFixed(2) + " months";
    seconds /= 12;
    return "about " + seconds.toFixed(2) + " years";
};

var alternateTimes = function(time) {
    strength = 100;
    color = 'DarkGreen';
    if(time > 60*60*24*365*14000000000) return "longer than the universe has been around";
    strength -= 10;
    color = 'Green';
    if(time > 60*60*24*365*700000000) return "about the amount of time it would take to reach a neighboring galaxy";
    strength -= 10;
    color = 'LimeGreen';
    if(time > 60*60*24*365*100000) return "about the amount of time it would take you to reach Alpha Centauri";
    strength -= 10;
    color = 'LawnGreen';
    if(time > 60*60*24*365*36) return "about the amount of time it would take to leave the solar system (but not reach anything yet)";
    strength -= 10;
    color = 'Yellow';
    if(time > 60*60*24*365*10) return "about the amount of time it's going to take me to pay off my student loans...";
    strength -= 10;
    color = 'Goldenrod';
    if(time > 60*60*24*365*4) return "about the time it would take you to watch all of Netflix.";
    strength -= 10;
    color = 'Orange';
    if(time > 60*60*24*30) return "about the amount of time a person would spend in the international space station";
    strength -= 10;
    color = 'DarkOrange ';
    if(time > 60*60*24*7) return "about the amount of time it would take to execute a lunar mission";
    strength -= 10;
    color = 'OrangeRed ';
    if(time > 60*60*24) return "about the amount of time it would take to go on a long distance train ride";
    strength -= 10;
    color = 'Red';
    if(time > 60*60) return "about the amount of time you spend binge watching shows on Netflix";
    strength = 1;
    color = 'DarkRed';
    if(time > 60) return "about the amount of time it would take you to go grab a bite to eat";
    strength = 1;
    color = 'DarkRed';
    if(time > 5) return "about the amount of time it would take you to walk to the kitchen";
    strength = 1;
    color = 'DarkRed';
    if(time > 1) return "about the amount of time it takes your heart to beat once";
    strength = 1;
    color = 'DarkRed';
    if(time > .5) return "about the amount of time it would take you to blink";
    strength = 1;
    color = 'DarkRed';
    if(time >= 0) return "about the amount of time it would take a hummingbird to flap its wings"
};

var caesarCipher = function() {
    var message = $('#caesar-input').val();
    message = message.replace('[^a-zA-z]', '');
    if (message.length == 0)
    {
        $('#caesar-output').html('');
        return;
    }

    var result = '<ol>';

    var length = message.length;
    for(var i = 0; i <= 26; i++) {
        result += '<li>';
        for (var j = 0; j < length; j++) {
            var asciiCode = message.charCodeAt(j);
            if ((asciiCode >= 65) && (asciiCode <= 90))
                asciiCode = ((asciiCode - 65 + i) % 26) + 65;

            // Lowercase letters
            else if ((asciiCode >= 97) && (asciiCode <= 122))
                asciiCode = ((asciiCode - 97 + i) % 26) + 97;

            result += String.fromCharCode(asciiCode);
        }
        result += '</li>';
    }

    result += '</ol>';

    $('#caesar-output').html(result);
}