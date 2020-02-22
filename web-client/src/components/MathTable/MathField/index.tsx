import React from "react";
import { MathFieldComponent } from 'react-mathlive';
import { Props as MathFieldComponentProps } from 'react-mathlive/dist/MathFieldComponent'

export interface MathFieldProps {
    latexInput: string;
    getMathliveRef: MathFieldComponentProps["mathFieldRef"]
    onChange: MathFieldComponentProps["onChange"]
}

export const MathField: React.FunctionComponent<MathFieldProps> = ({
    getMathliveRef,
    latexInput,
    onChange
}) => {
    return <MathFieldComponent
        latex={latexInput}
        mathFieldRef={getMathliveRef}
        onChange={onChange}
        // https://docs.mathlive.io/tutorial-CONFIG.html
        mathFieldConfig={{
            virtualKeyboardMode: "manual",
            onBlur: (mathField: any) => mathField.$perform("hideVirtualKeyboard")
        }}
    />;
}