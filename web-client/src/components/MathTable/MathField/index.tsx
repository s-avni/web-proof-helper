import React from "react";
import { MathFieldComponent } from 'react-mathlive';
import { Props as MathFieldComponentProps } from 'react-mathlive/dist/MathFieldComponent'

import "./styles.module.scss";
export interface MathFieldProps {
    latexInput: string;
    getMathliveRef: MathFieldComponentProps["mathFieldRef"]
    onChange: MathFieldComponentProps["onChange"]
}

type MathLiveInput = any;

export const MathField: React.FunctionComponent<MathFieldProps> = ({
    getMathliveRef,
    latexInput,
    onChange
}) => {
    const [isVirtualKeyboardVisible, setIsVitualKeyboardVisible] = React.useState(false)
    return <span className={isVirtualKeyboardVisible ? "withVirtualKeyboard" : undefined}>
        <MathFieldComponent
            latex={latexInput}
            mathFieldRef={getMathliveRef}
            onChange={onChange}
            // https://docs.mathlive.io/tutorial-CONFIG.html
            mathFieldConfig={{
                virtualKeyboardMode: "manual",
                onBlur: (mathField: MathLiveInput) => mathField.$perform("hideVirtualKeyboard"),
                onVirtualKeyboardToggle: (mathField: MathLiveInput, isVisible: boolean) => {
                    setIsVitualKeyboardVisible(isVisible);
                    if (isVisible) {
                        mathField.$insert(latexInput || " ", {
                            focus: true,
                            mode: "math",
                            replaceAll: true
                        });
                    }
                }
            }}
        />
    </span>;
}