import {useEffect, useState} from "react";
import {CounterView} from "./CounterView.tsx";
import {CounterConfig} from "./CounterConfig.tsx";


export const Counter = () => {


    const minValue = 0

    const [maxValue, setMaxValue] = useState<number>(() => {
        const maxVal = localStorage.getItem("maxValue")
        return maxVal ? JSON.parse(maxVal) : minValue;
    });
    const [counter, setCounter] = useState(() => {
        const count = localStorage.getItem("counter")
        return count ? JSON.parse(count) : minValue;
    });

    useEffect(() => {
        localStorage.setItem("counter", JSON.stringify(counter));
    })
    useEffect(() => {
        localStorage.setItem("maxValue", JSON.stringify(maxValue));
    })

    const disabled = counter === maxValue

    const onChangeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCounter(Number(e.currentTarget.value));
        console.log(Number(e.currentTarget.value))
    }

    const onChangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxValue(Number(e.currentTarget.value));
        console.log(Number(e.currentTarget.value))
    }

    const [set, setSet] = useState<boolean>(true)
    const setHandler = () => setSet(prevState => !prevState)

    return (
        <div className={"counter-wrapper"}>
            {set
                ? <CounterView counter={counter}
                               setCounter={setCounter}
                               disabled={disabled}
                               callback={setHandler}  />
                : <CounterConfig startValue={counter}
                                 maxValue={maxValue}
                                 setStartValue={onChangeStartValueHandler}
                                 setMaxValue={onChangeMaxValueHandler}
                                 callback={setHandler} />
            }
        </div>


    )

};