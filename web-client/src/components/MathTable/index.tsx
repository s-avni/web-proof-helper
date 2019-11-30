import React from "react";

export const MathTable = () => {
    return <table id="math_table" style={{ width: "100%" }}>
        <colgroup>
            <col span={1} style={{ width: "80%" }} />
            <col span={1} style={{ width: "20%" }} />
        </colgroup>
        <thead>
            <th>Expression</th>
            <th>Validity</th>
        </thead>
        <tbody>
            <tr>
                <td className="mathInput">
                    <span className="math-field"></span>
                    {/* <!-- <input type="text" /> --> */}
                </td>
                <td style={{ backgroundColor: "#aaa" }}>
                    <p className="status"></p>
                </td>
            </tr>
        </tbody>
    </table>;
}