import {DisplayCounter} from "../displayCounter/DisplayCounter.tsx";
import {CounterControls} from "../counterControls/CounterControls.tsx";
import {Button} from "../button/Button.tsx";

type Props = {
    counter: number
    callback: () => void
    disabled: boolean
    setCounter: (value: number) => void
};

export const CounterView = ({counter, callback, disabled, setCounter}: Props) => {

    const increment = () => setCounter(counter + 1);
    const reset = () => setCounter(0);

    return (
        <>
            <DisplayCounter className={disabled ? "maxCounter" : "counter"}>
                {counter}
            </DisplayCounter>

            <CounterControls>
                <Button className={disabled ? "buttonOff" : "buttonOn"} onClick={increment}
                        disabled={disabled} title={"Inc"}/>
                <Button onClick={reset} title={"Reset"}/>
                <Button onClick={callback} title={"Set"}/>
            </CounterControls>
        </>
    );
};