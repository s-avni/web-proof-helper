import React from "react";
import { MathFieldComponent } from 'react-mathlive';

import classNames from "./styles.module.scss";
import { getLineTests } from "./helpers";

export interface MathTableProps {
    isOverReals: boolean;
}

export const MathTable: React.FunctionComponent<MathTableProps> = ({
    isOverReals
}) => {
    const lastFieldLength = React.useRef(1);
    const [mathInputs, setMathInputs] = React.useState<string[]>([""])
    const [testResults, setTestResults] = React.useState<string[]>([""])
    const mathRefs = React.useRef<any[]>([]);
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
                        {/* // @ts-ignore */}
                        <MathFieldComponent
                            mathFieldRef={ref => mathRefs.current[idx] = ref}
                            latex={latex}
                            onChange={(newLatex: string) => {
                                const newMathInputs = [...mathInputs];
                                newMathInputs[idx] = newLatex;
                                setMathInputs(newMathInputs);
                            }}
                        />
                        {/* <!-- <input type="text" /> --> */}
                    </td>
                    <td style={{ backgroundColor: "#aaa" }}>
                        <p className="status">{idx - 1 >= 0 && testResults.length > idx - 1 ? testResults[idx - 1] : ""}</p>
                    </td>
                </tr>
            })}
        </tbody>
    </table>;
}