$(document).ready(function () {
    // $('textarea').bind("enterKey", function (e) {
    // });

    $('#math_table').keyup(function (e) {
        if (e.keyCode == 13) {
            const newRow = $(e.target).closest("tr").after('<tr>\n' +
            '                    <td className="mathInput"><input type="text" /></td>\n' +
            '                    <td style="background-color: #aaa"></td>\n' +
            '                </tr>');
            const newInput = $(e.target).closest("tr").next().find("input");
            console.log({newRow, newInput, target: $(e.target)})
            newInput.focus();

            const inputs = $('#math_table input');
            const lines = Array.from($('#math_table input')).map(el => el.value);
            const lines2 = lines.filter((entry) => entry.trim() != '');
            console.log({inputs, lines, lines2});
            if (lines2.length < 1) {
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