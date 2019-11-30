import React from "react";
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { domain } from "../../types";

import cssNames from "./styles.module.scss";

export interface DomainToggleProps {
    setDomain: (dom: domain) => void;
    domain: domain;
}

export const DomainToggle: React.FunctionComponent<DomainToggleProps> = ({
    setDomain,
    domain
}) => {
    const toggleDomain = () => {
        setDomain(domain === "reals" ? "complex" : "reals")
    }

    return <ToggleButtonGroup name="domain" id={cssNames["domain-toggle"]} className={domain === "complex" ? cssNames["selected-complex"] : cssNames["selected-reals"]} type="radio" value={domain}>
        <ToggleButton className={cssNames.reals} value="reals" type="radio" onClick={() => setDomain("complex")}>Reals</ToggleButton>
        <div className={`${cssNames["toggle-handle"]} btn btn-light`} onClick={toggleDomain} />
        <ToggleButton className={cssNames.complex} value="complex" type="radio" onClick={() => setDomain("reals")}>Complex</ToggleButton>
    </ToggleButtonGroup>;
}