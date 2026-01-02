import {Display} from "../display/Display";
import {LabeledInput} from "../labeledInput/LabeledInput";
import {ControlsBar} from "../controlsBar/ControlsBar";
import {Button} from "../button/Button";
import {AppContainer} from "../app-container/App-Container";

type Props = {
    setCounter: () => void
    maxValue: number
    startValue: number
    setMaxValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    setStartValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
    cancel: () => void
    disabled: boolean
    mobileView: boolean

};
export const CounterConfig = ({
                                  setCounter,
                                  setMaxValue,
                                  setStartValue,
                                  startValue,
                                  maxValue,
                                  cancel,
                                  disabled,
                                  mobileView,
                              }: Props) => {


    const isDisabled = disabled
    return (
        <AppContainer>
            <Display>
                {isDisabled ? <span className={"error"}>недопустимое значение</span> : null}

                <LabeledInput
                    className={isDisabled ? "inputError" : ""}
                    value={maxValue}
                    label={"max value"}
                    type={"number"} onChange={setMaxValue}/>
                <LabeledInput
                    className={isDisabled ? "inputError" : ""}
                    value={startValue}
                    label={"start value"}
                    type={"number"}
                    onChange={setStartValue}/>
            </Display>

            <ControlsBar>
                {mobileView ? <Button title={"Cancel"} onClick={cancel}/> : null }
                <Button disabled={isDisabled} onClick={setCounter} title={"Set"}/>
            </ControlsBar>
        </AppContainer>
    );
};