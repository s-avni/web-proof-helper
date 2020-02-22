import React from "react";

import classNames from "./styles.module.scss";
import { getLineTests } from "./helpers";
import { MathField } from "./MathField";

export interface MathTableProps {
    isOverReals: boolean;
}

export const MathTable: React.FunctionComponent<MathTableProps> = ({
    isOverReals
}) => {
    // Store the textual data that will be sent to the server upon validation
    const [mathInputs, setMathInputs] = React.useState<string[]>([""])

    const onChangeForField = (fieldIdx: number) => (newLatex: string) => {
        const newMathInputs = [...mathInputs];
        newMathInputs[fieldIdx] = newLatex;
        setMathInputs(newMathInputs);
    };

    // Store the line-by-line answers from the server after running validation
    const [testResults, setTestResults] = React.useState<string[]>([""])

    // Store references to the DOM elements of the math inputs, required to use some of mathlive's APIs (i.e. getting the latex data)
    // Read about React DOM references here: https://reactjs.org/docs/refs-and-the-dom.html
    // Here is the functionality this gives us: https://docs.mathlive.io/MathField.html
    const mathRefs = React.useRef<any[]>([]);
    const updateMathRef = (fieldIdx: number) => (ref: any) => mathRefs.current[fieldIdx] = ref

    // Store a reference to keep track of the latest mathlive input field
    const lastFieldLength = React.useRef(1);

    // Update references to math inputs when a new one is added
    React.useEffect(() => {
        if (lastFieldLength.current < mathInputs.length) {
            lastFieldLength.current = mathInputs.length;
            const idx = mathInputs.length - 1;
            const latex = mathInputs[idx];
            if (mathRefs.current[idx] && mathRefs.current[idx].$insert) {
                mathRefs.current[idx].$perform("deleteAll");
                mathRefs.current[idx].$insert(latex || " ", {
                    focus: true,
                    mode: "math",
                    replaceAll: true
                });
            }
        }
    })

    return <table className={classNames.MathTable}>
        <colgroup>
            <col span={1} style={{ width: "80%" }} />
            <col span={1} style={{ width: "20%" }} />
        </colgroup>
        <thead>
            <tr>
                <th>Expression</th>
                <th>Validity</th>
            </tr>
        </thead>
        <tbody>
            {mathInputs.map((latex, idx) => {
                const otherInputValues = [...mathInputs];
                otherInputValues.splice(idx, 1);
                return <tr key={`${idx}-${otherInputValues.join("\n")}`}>
                    <td className={`${classNames.mathInput} ${!latex ? classNames.empty : ""}`} title={latex}
                        onClick={() => {
                            if (mathRefs.current[idx] && mathRefs.current[idx].$insert) {
                                mathRefs.current[idx].$perform("deleteAll");
                                mathRefs.current[idx].$insert(latex || " ", {
                                    focus: true,
                                    mode: "math",
                                    replaceAll: true
                                });
                            }
                        }}
                        onKeyDown={
                            (async e => {
                                if (e && e.persist) {
                                    e.persist();
                                }
                                // Enter key
                                if (e.keyCode === 13) {
                                    // If this is the last line, add a new one with empty input
                                    // TODO: recognize QED as an ending statement
                                    if (idx === mathInputs.length - 1) {
                                        setMathInputs([
                                            ...mathInputs,
                                            ""
                                        ])
                                    }
                                    const newTestResults = await getLineTests(mathInputs, {
                                        isOverReals
                                    });
                                    if (!newTestResults) {
                                        return;
                                    }
                                    setTestResults(newTestResults);
                                }
                            })
                        }>
                        <MathField
                            latexInput={latex}
                            getMathliveRef={updateMathRef(idx)}
                            onChange={onChangeForField(idx)}
                        />
                    </td>
                    <td style={{ backgroundColor: "#aaa" }}>
                        <p className="status">{idx - 1 >= 0 && testResults.length > idx - 1 ? testResults[idx - 1] : ""}</p>
                    </td>
                </tr>
            })}
        </tbody>
    </table>;
}