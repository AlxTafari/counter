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
};

export const CounterView = ({counter, callback, isDisabled, increment, reset, mobileView}: Props) => {

    return (
        <AppContainer>
            <Display isDisabled={isDisabled}>
                {counter}
            </Display>

            <ControlsBar>
                <Button className={isDisabled ? "disabled-button" : ""} onClick={increment}
                        disabled={isDisabled} title={"Inc"}/>
                <Button onClick={reset} title={"Reset"}/>
                {mobileView ? <Button onClick={callback} title={"Set"}/> : null}
            </ControlsBar>
        </AppContainer>
    );
};