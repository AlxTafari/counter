import {DisplayCounter} from "../displayCounter/DisplayCounter.tsx";
import {CounterControls} from "../counterControls/CounterControls.tsx";
import {Button} from "../button/Button.tsx";

type Props = {
    counter: number
    callback: () => void
    disabled: boolean
    increment: () => void
    reset: () => void
};

export const CounterView = ({counter, callback, disabled, increment, reset}: Props) => {

    return (
        <>
            <DisplayCounter className={disabled ? "maxCounter" : "counter"}>
                {counter}
            </DisplayCounter>

            <CounterControls>
                <Button className={disabled ? "buttonOff" : ""} onClick={increment}
                        disabled={disabled} title={"Inc"}/>
                <Button onClick={reset} title={"Reset"}/>
                <Button onClick={callback} title={"Set"}/>
            </CounterControls>
        </>
    );
};