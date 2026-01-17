import {Display} from "../display/Display";
import {ControlsBar} from "../controlsBar/ControlsBar";
import {Button} from "../button/Button";
import {AppContainer} from "../app-container/App-Container";


type Props = {
    counter: number
    callback: () => void
    isDisabled: boolean
    increment: () => void
    reset: () => void
    mobileView: boolean
    isResetDisabled: boolean
    setError: boolean
};

export const CounterView = ({counter,
                                callback,
                                isDisabled,
                                increment,
                                reset,
                                isResetDisabled,
                                setError,
                                mobileView}: Props) => {

    return (
        <AppContainer>
            <Display isDisabled={isDisabled}>
                {!mobileView && setError ? <span className={"errorDesk"}>недопустимое значение</span> : counter}
            </Display>

            <ControlsBar>
                <Button className={isDisabled ? "disabled-button" : "button-base"} onClick={increment}
                        disabled={isDisabled} title={"Inc"}/>
                <Button disabled={isResetDisabled} className={isResetDisabled ? "disabled-button" : ""} onClick={reset} title={"Reset"}/>
                {mobileView ? <Button onClick={callback} title={"Set"}/> : null}
            </ControlsBar>
        </AppContainer>
    );
};