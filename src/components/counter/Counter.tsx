import {useEffect, useState} from "react";
import {CounterView} from "./CounterView.tsx";
import {CounterConfig} from "./CounterConfig.tsx";

type CounterProps = {
    current: number;
    startValue: number;
    maxValue: number;
}

export const Counter = () => {

    const defaultSetCounter = {current: 0, startValue: 0, maxValue: 5}

    const [counterX, setCounterX] = useState<CounterProps>(() => {
        const data = localStorage.getItem("counterX")
        return data ? JSON.parse(data)
       : defaultSetCounter
    })

    useEffect(() => {
        localStorage.setItem("counterX", JSON.stringify(counterX))
    }, );

    const disabled = counterX.current >= counterX.maxValue || counterX.maxValue < 0 || counterX.startValue < 0 || counterX.startValue >= counterX.maxValue;

    const onChangeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = Number(e.currentTarget.value)
        setCounterX({...counterX, startValue: newState, current: newState});
        console.log(counterX.current, counterX.startValue)
    }
    const onChangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = Number(e.currentTarget.value)
        setCounterX({...counterX, maxValue: newState});
    }

    const [mode, setMode] = useState<'view' | 'settings'>('view');
    const modeHandler = () => {
        setMode(prevState => prevState === 'view' ? 'settings' : 'view');
        if (mode) {
            resetHandler()
        }
    }

    const incrementHandler = () => {
        const newState = counterX.current + 1
        setCounterX({...counterX, current: newState})
    }

    const resetHandler = () => {
        const newState = counterX.current = counterX.startValue
        setCounterX({...counterX, current: newState})

    }



    return (

        <div className={"counter-wrapper"}>
            {mode === 'view'
                ? <CounterView counter={counterX.current}
                               increment={incrementHandler}
                               reset={resetHandler}
                               disabled={disabled}
                               callback={modeHandler}  />
                : <CounterConfig startValue={counterX.startValue}
                                 maxValue={counterX.maxValue}
                                 setStartValue={onChangeStartValueHandler}
                                 setMaxValue={onChangeMaxValueHandler}
                                 callback={modeHandler}
                                 disabled={disabled} />
            }
        </div>
    )
};