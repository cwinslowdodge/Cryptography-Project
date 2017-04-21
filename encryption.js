$(function() {
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

var caesarCipher = function() {
    var message = $('#caesar-input').val();
    message = message.replace('[^a-zA-z]', '');
    if (message.length == 0) {
        $('#caesar-output').html('');
        return;
    }

    var result = '';
    var length = message.length;
    for (var i = 0; i <= 26; i++) {
        result += i + ') ';
        for (var j = 0; j < length; j++) {
            var asciiCode = message.charCodeAt(j);
            if ((asciiCode >= 65) && (asciiCode <= 90))
                asciiCode = ((asciiCode - 65 + i) % 26) + 65;

            // Lowercase letters
            else if ((asciiCode >= 97) && (asciiCode <= 122))
                asciiCode = ((asciiCode - 97 + i) % 26) + 97;

            result += String.fromCharCode(asciiCode);
        }
        result += '<br>'
    }


    $('#caesar-output').html(result);
};