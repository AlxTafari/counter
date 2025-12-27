import {DisplayCounter} from "../displayCounter/DisplayCounter.tsx";
import {CounterControls} from "../counterControls/CounterControls.tsx";
import {Button} from "../button/Button.tsx";
import {LabeledInput} from "../labeledInput/LabeledInput.tsx";

type Props = {
    callback: () => void
    maxValue: number
    startValue: number
    setMaxValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    setStartValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled: boolean

};
export const CounterConfig = ({callback, setMaxValue, setStartValue, startValue, maxValue, disabled}: Props) => {
    const isDisabled= disabled
    return (
        <>
            <DisplayCounter className={"set-counter"}>
                {isDisabled ? <span className={"error"}>недопустимое значение</span> : null}
                <LabeledInput className={isDisabled ? "inputError" : ""}
                              value={maxValue}
                              label={"max value"}
                              type={"number"} onChange={setMaxValue}/>
                <LabeledInput
                    className={isDisabled ? "inputError" : ""}
                    value={startValue}
                    label={"start value"}
                    type={"number"}
                    onChange={setStartValue}/>
            </DisplayCounter>

            <CounterControls>
                <Button className={isDisabled ? "buttonOff" : "buttonOn"} disabled={isDisabled} onClick={callback} title={"Set"}/>
            </CounterControls>
        </>
    );
};