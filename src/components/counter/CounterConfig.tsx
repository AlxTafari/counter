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

};
export const CounterConfig = ({callback, setMaxValue, setStartValue,startValue, maxValue}: Props) => {

    // const [value, setValue] = useState<number>(0);

    return (
        <>
            <DisplayCounter className={"set-counter"}>

                <LabeledInput value={maxValue}
                              label={"max value"}
                              type={"number"} onChange={setMaxValue}/>

                <LabeledInput
                value={startValue}
                            label={"start value"}
                              type={"number"}
                              onChange={setStartValue}/>
            </DisplayCounter>

            <CounterControls>
                <Button onClick={callback} title={"Set"} />
            </CounterControls>
        </>
    );
};