import {AppContainer} from "../app-container/App-Container";
import {Button} from "../button/Button";
import {FlexWrapper} from "../flexWrapper/FlexWrapper";
import {Display} from "../display/Display";
import {ControlsBar} from "../controlsBar/ControlsBar";
import {useState} from "react";

type CalcType = {
    display: string;
    stored: number;
    operator: string;

}

export const Calc = () => {
    const [calc, setCalc] = useState<CalcType>({
        display: "0", stored: 0, operator: "",
    });

    const valueInput = (val: string) => {
        calc.display === "0"
            ? setCalc({...calc, display: val})
            : setCalc({...calc, display: calc.display + val})
    }

    const addOperator = (operator: CalcType["operator"]) => {
        setCalc(prevState => ({
            ...prevState,
            display: "0",
            stored: Number(prevState.display),
            operator: operator
        }))
    }

    const calculate = () => {
        setCalc(prevState => {
            if (prevState.stored === 0 || prevState.operator === "") {
                return prevState
            }

            const current = +calc.display
            const operator = calc.operator;
            const stored = calc.stored;
            let result;

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
                display: String(result),
                stored: 0,
                operator: "",
            };
        });
    };

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",];
    const fooButtons = ["+", "-", "/", "*", "="]
    return (
        <div>
            <AppContainer height={"550px"} width={"400px"}>
                <Display className={"display"}>
                    <input type="number" value={calc.display}/>
                </Display>

                <ControlsBar>
                    <FlexWrapper direction={"column"} gap={20}>
                        <Button title={"X"}
                                onClick={() => setCalc({...calc, display: "0", stored: 0, operator: ""})}/>
                        <FlexWrapper direction={"row"}>
                            <FlexWrapper wrap={"wrap"} gap={20}>
                                {numbers.map((n, i) => (
                                    <Button key={i} title={n} onClick={() => {
                                        valueInput((n))
                                    }}/>
                                ))}
                            </FlexWrapper>
                            <FlexWrapper direction={"column"} gap={20}>
                                {fooButtons.map((b, i) => (
                                    <Button title={b} onClick={b === "=" ? calculate : () => {
                                        addOperator(b)
                                    }}/>
                                ))}
                            </FlexWrapper>
                        </FlexWrapper>
                    </FlexWrapper>
                </ControlsBar>

            </AppContainer>
        </div>
    );
};