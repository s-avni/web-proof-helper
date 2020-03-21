import React, { KeyboardEvent } from "react";
import { MathFieldComponent } from 'react-mathlive';
import { Props as MathFieldComponentProps } from 'react-mathlive/dist/MathFieldComponent'

import "./styles.module.scss";
export interface MathFieldProps {
    latexInput: string;
    getMathliveRef: MathFieldComponentProps["mathFieldRef"];
    onChange: MathFieldComponentProps["onChange"];
}

type MathLiveInput = any;

export const MathField: React.FunctionComponent<MathFieldProps> = ({
    getMathliveRef,
    latexInput,
    onChange,
}) => {
    const [isVirtualKeyboardVisible, setIsVitualKeyboardVisible] = React.useState(false)
    return <span className={isVirtualKeyboardVisible ? "withVirtualKeyboard" : undefined}>
        <MathFieldComponent
            latex={latexInput}
            mathFieldRef={getMathliveRef}
            onChange={onChange
                ? (inputText) => onChange(inputText.replace(/[\u{0080}-\u{FFFF}]/gu, ""))
                : undefined}
            // https://docs.mathlive.io/tutorial-CONFIG.html
            mathFieldConfig={{
                virtualKeyboardMode: "manual",
                onKeystroke: function (mathField: MathLiveInput, _keyName: string, event: React.KeyboardEvent<HTMLInputElement>) {
                    const { key } = event;
                    if (key === "e") {
                        const keystrokeBuffer = mathField.keystrokeBuffer;
                        console.log({
                            text: mathField.$text(),
                            keystrokeBuffer,
                            isAtStart: mathField.$selectionAtStart(),
                            isAtEnd: mathField.$selectionAtEnd(),
                            mathField
                        })
                        if (
                            mathField.$selectionAtStart()
                        ) {
                            console.log("Replacing last typed e with \\exponentialE")
                            mathField.$insert("\\exponentialE")
                            return false;
                        }
                    }
                    return true
                },
                onBlur: (mathField: MathLiveInput) => {
                    mathField.$perform("hideVirtualKeyboard")
                },
                onVirtualKeyboardToggle: (mathField: MathLiveInput, isVisible: boolean) => {
                    setIsVitualKeyboardVisible(isVisible);
                    if (isVisible) {
                        mathField.$insert("", {
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