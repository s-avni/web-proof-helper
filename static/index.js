$(document).ready(function () {
    const MQ = MathQuill.getInterface(2);
    let allMathFields = [];

    const updateMathFields = () => {
        const mathFields = []
        const mathFieldSpans = $('.math-field');
        console.log({mathFieldSpans})
        // const latexSpan = document.getElementById('latex');

        for (let i = 0; i < mathFieldSpans.length; i += 1) {
            const mathFieldSpan = mathFieldSpans[i]
            console.log({mathFieldSpan})
            const mathField = MQ.MathField(mathFieldSpan, {
              spaceBehavesLikeTab: true, // configurable
              handlers: {
                enter: () => {
                    const currentField = mathFields[i];
                    const currentValue = currentField.latex()
                    console.log({currentValue})
                    if (currentValue.trim() === "") {
                        return;
                    }
                    let nextField = allMathFields[i + 1];
                    if (!nextField || !!nextField.latex().trim()) {
                        $(mathFieldSpan).closest("tr").after('<tr>\n' +
                        '                    <td class="mathInput"><span class="math-field"></span></td>\n' +
                        '                    <td style="background-color: #aaa"><p class="status"></p></td>\n' +
                        '                </tr>');
                        allMathFields = updateMathFields()
                        nextField = allMathFields[i + 1];
                    }
                    console.log({nextField, currentField, mathFields})
                    if (!nextField) {
                        console.error("Couldn't add newRow");
                        return;
                    }
                    console.log({nextField})
                    nextField.focus();

                    const lines = mathFields.map(field => field.latex());
                    
                    console.log({mathFields, lines});
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
                            error: function (_jqXHR, textStatus, errorThrown) {
                                //handle every error. e.g. 500
                                console.log(textStatus + ': ' + errorThrown);
                            }
                        });
                    }
                }
                // function() { // useful event handlers
                //   latexSpan.textContent = mathField.latex(); // simple API
                // }
              }
            });
            mathFields.push(mathField)
        }
        console.log("RETURNING", {mathFields})
        return mathFields;
    }

    allMathFields = updateMathFields();

    // http://docs.mathquill.com/en/latest/Config/#outof-handlers
    // Need to see how I can find and iterate over all math fields to get their values
});