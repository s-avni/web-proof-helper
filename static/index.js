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
                '                    <td style="background-color: #aaa"><p class="status"></p></td>\n' +
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
            
            console.log({inputs, lines});
            if (lines.length <= 1) {
                return
            }
            for (let i = 0; i < lines.length - 1; i += 1) {
                const desired_lines = lines.slice(i, i + 2).filter((entry) => entry.trim() != '');
                console.log({desired_lines});
                if (desired_lines.length !== 2) {
                    continue;
                }
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
                        const row = $(`#math_table tr`)[i + 2];
                        console.log({row: $(row)});
                        const resCell = $(row).find("p");
                        console.log({resCell})
                        if (data.result == "A-OK") {
                            console.log("OK");
                            if (resCell) {
                                resCell.text('OK!');
                            }
                        } else {
                            if (resCell) {
                                resCell.text('Mistake!');
                            }
                        }
                        if (resCell) {
                            const val = resCell.val();
                            console.log(val);
                            console.log("hey")
                        }
                    },
                    error: function (jqXHR, textStauts,
                        errorThrown) { //handle every error. e.g. 500
                        console.log(textStatus + ': ' + errorThrown);
                    }
                });
            }
            
            $(this).trigger("enterKey");
        }
    });
});