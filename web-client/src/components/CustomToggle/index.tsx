import React from "react";
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import cssNames from "./styles.module.scss";

export const CustomToggle = () => {
    const [domain, setDomain] = React.useState<"reals" | "complex">("reals");
    const toggleDomain = () => setDomain(domain === "reals" ? "complex" : "reals")

    return <ToggleButtonGroup name="domain" id={cssNames["domain-toggle"]} className={domain === "complex" ? cssNames["selected-complex"] : cssNames["selected-reals"]} type="radio" value={domain}>
        <ToggleButton className={cssNames.reals} value="reals" type="radio" onClick={() => setDomain("complex")}>Reals</ToggleButton>
        <div className={`${cssNames["toggle-handle"]} btn btn-light`} onClick={toggleDomain} />
        <ToggleButton className={cssNames.complex} value="complex" type="radio" onClick={() => setDomain("reals")}>Complex</ToggleButton>
    </ToggleButtonGroup>;
}