import React from "react";
import { MathFieldComponent } from 'react-mathlive';

import classNames from "./styles.module.scss";

export const MathTable = () => {
    const [mathInputs, setMathInputs] = React.useState<string[]>([""])
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
            {mathInputs.map((latex, idx) => <tr key={idx}>
                <td className="mathInput" title={latex}>
                    {/* // @ts-ignore */}
                    <MathFieldComponent
                        latex={latex}
                        onChange={(newLatex: string) => setMathInputs([
                            ...mathInputs.slice(0, idx),
                            newLatex,
                            ...mathInputs.slice(idx + 1)
                        ])}
                    />
                    {/* <!-- <input type="text" /> --> */}
                </td>
                <td style={{ backgroundColor: "#aaa" }}>
                    <p className="status"></p>
                </td>
            </tr>)}
        </tbody>
    </table>;
}