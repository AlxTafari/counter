import {AppContainer} from "../app-container/App-Container";
import {Button} from "../button/Button";
import {FlexWrapper} from "../flexWrapper/FlexWrapper";
import {Display} from "../display/Display";
import {ControlsBar} from "../controlsBar/ControlsBar";
import {useState} from "react";

type CalcModeType = "SHOW_RESULT" | "ENTERING" | "OPERATOR_SELECTED"

type CalcType = {
    display: string;
    stored: number | null;
    operator: string | null;
    stateCalc: CalcModeType
    mode: {
        digit: boolean,
        operator: boolean,
    },
    lastResult: number | null,

}

export const Calc = () => {

    const defaultState: CalcType = {
        display: "0",
        stored: null,
        operator: null,
        mode: {
            digit: false,
            operator: false,
        },
        stateCalc: "ENTERING",
        lastResult: null,

    }

    const [calc, setCalc] = useState<CalcType>(defaultState);

    const addDigit = (digit: string) => {

        setCalc(prev => {
            if (calc.display === "0" || calc.stateCalc === "SHOW_RESULT" || calc.stateCalc === "OPERATOR_SELECTED") {
                return {...prev, display: digit, mode: {...prev.mode, digit: true}}
            } else {
                return {...prev, display: prev.display + digit, mode: {...prev.mode, digit: true}}
            }
        });
    }

    const addOperator = (operator: CalcType["operator"]) => {

        setCalc(prevState => ({
            ...prevState,
            stored: Number(prevState.display),
            operator: operator,
            stateCalc: "OPERATOR_SELECTED",
            mode: {...prevState.mode, operator: true},
        }))
    }

    const calculate = () => {
        debugger
        setCalc(prevState => {
            if (prevState.stored === null || prevState.operator === null) {
                return prevState
            }
            const current = +prevState.display
            const operator = prevState.operator;
            const stored = prevState.stored;
            let result: any;

            switch (operator) {
                case "+":
                    result = stored + current
                    break;
                case "-":
                    result = stored - current
                    break;
                case "*":
                    result = stored * current
                    break;
                case "/":
                    result = stored / current
                    break;
            }
            return {
                ...prevState,
                display: String(parseFloat(result.toFixed(5))),
                mode: {...prevState.mode, operator: false},
                lastResult: result,
            };
        });
    };

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",];
    const fooButtons = ["+", "-", "/", "*",]

    return (
        <div>
            <AppContainer height={"550px"} width={"400px"}>
                <Display className={"display"}>
                    <span>{calc.display}</span>
                </Display>

                <ControlsBar>
                    <FlexWrapper direction={"column"} gap={20}>
                        <Button title={"X"}
                                onClick={() => setCalc(defaultState)}/>
                        <FlexWrapper direction={"row"}>
                            <FlexWrapper wrap={"wrap"} gap={20}>
                                {numbers.map((n, i) => (
                                    <Button key={i} title={n} onClick={() => {
                                        addDigit((n))
                                    }}/>
                                ))}
                            </FlexWrapper>
                            <FlexWrapper direction={"column"} gap={20}>
                                {fooButtons.map((b, i) => {
                                    const fooButtonsHandler = () => {
                                        calc.stateCalc === "OPERATOR_SELECTED"
                                            ? calculate()
                                            : addOperator(b)
                                    }
                                    return <Button title={b} onClick={fooButtonsHandler}/>
                                })}
                                <Button title={"="} onClick={calculate}/>
                            </FlexWrapper>
                        </FlexWrapper>
                    </FlexWrapper>
                </ControlsBar>

            </AppContainer>
        </div>
    );
};