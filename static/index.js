$(document).ready(function () {
    // $('textarea').bind("enterKey", function (e) {
    // });

    $('#math_table').keyup(function (e) {
        if (e.keyCode == 13) {
            const currentInput = $(e.target);
            if (!currentInput.val() || currentInput.val().trim() === "") {
                return;
            }
            let nextInput = $(e.target).closest("tr").next().find(".mathInput>input");
            if (!nextInput || nextInput.length === 0 || (!!nextInput.val() && !!nextInput.val().trim())) {
                $(e.target).closest("tr").after('<tr>\n' +
                '                    <td class="mathInput"><input type="text" /></td>\n' +
                '                    <td class="status" style="background-color: #aaa"></td>\n' +
                '                </tr>');
                nextInput = $(e.target).closest("tr").next().find(".mathInput>input");
            }
            if (!nextInput) {
                console.error("Couldn't add newRow");
                return;
            }
            console.log({nextInput, target: $(e.target)})
            nextInput.focus();

            const inputs = $('#math_table input');
            const lines = Array.from($('#math_table input')).map(el => el.value);
            const lines2 = lines.filter((entry) => entry.trim() != '');
            console.log({inputs, lines, lines2});
            if (lines2.length <= 1) {
                return
            }
            const desired_lines = lines2.slice(-2);
            const txt = desired_lines.join('\n');
            console.log({txt});
            $.ajax({
                url: '/validate',
                type: 'post', //the method to use. GET or POST
                dataType: 'json',
                data: {
                    txt: txt
                }, //your data: {key1:value1, key2:value2}
                success: function (data) { //handle a successfull response (200 OK)
                    console.log(data.result);
                    if (data.result == "A-OK") {
                        $('#check_1').text('OK!');
                        console.log("OK");
                    } else {
                        $('#check_1').text('Mistake!');
                    }
                    const val = $('#check_1').val();
                    console.log(val);
                    console.log("hey")

                    //here you can do with your data whatever you want
                },
                error: function (jqXHR, textStauts,
                    errorThrown) { //handle every error. e.g. 500
                    console.log(textStatus + ': ' + errorThrown);
                }
            });
            
            $(this).trigger("enterKey");
        }
    });
});