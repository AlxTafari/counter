import {useEffect, useState} from "react";
import {CounterView} from "./CounterView";
import {CounterConfig} from "./CounterConfig";
import {FlexWrapper} from "../flexWrapper/FlexWrapper";
import {Button} from "../button/Button";
import s from "./Counter.module.scss"


type CounterProps = {
    currentValue: number; // текущее значение
    startValue: number; // начальное значение
    maxValue: number; // максимальное значение

    startValueSet: number; // настройка startValue
    maxValueSet: number; // настройка maxValue

}

export const Counter = () => {

    const defaultSetCounter = {
        currentValue: 0,
        startValue: 0,
        maxValue: 5,
        startValueSet: 0,
        maxValueSet: 5
    }

    const [counter, setCounter] = useState<CounterProps>(() => {
        const data = localStorage.getItem("counter")
        return data ? JSON.parse(data)
            : defaultSetCounter
    })
    useEffect(() => {
        localStorage.setItem("counter", JSON.stringify(counter))
    }, [counter]);

    // контроль инпутов
    const [inputValue, setInputValue] = useState(() => {
        return {inputStart: counter.startValue, inputMax: counter.maxValue}
    });
    const onChangeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value)
        setInputValue({...inputValue, inputStart: newValue});
    }
    const onChangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value)
        setInputValue({...inputValue, inputMax: newValue});
    }

    // Проверка включить или выключить кнопки
    const disabledInc = counter.currentValue === counter.maxValue
    const disabledSet = inputValue.inputMax && inputValue.inputStart < 0 || inputValue.inputStart >= inputValue.inputMax;
    const disabledReset = counter.startValue === counter.currentValue;

    // Кнопки управления счетчиком
    const incrementHandler = () => {
        setCounter(prev => ({...counter, currentValue: prev.currentValue + 1}));
    }
    const resetHandler = () => {
        setCounter(prev => ({...prev, currentValue: prev.startValue}));
    }

    // Кнопка для установки новых значений счетчика + кнопка отмены(для мобильной версии)
    const [mode, setMode] = useState<'view' | 'settings'>("view");

    const modeHandler = () => {
        setMode("settings")
    }

    // const normalizeNumber = (value: string): number => {
    //     const trimmed = value.replace(/^0+(?!$)/, "");
    //     return Number(trimmed);
    // };

    const setCounterHandler = () => {
        setCounter({
            ...counter,
            currentValue: inputValue.inputStart,
            startValue: inputValue.inputStart,
            maxValue: inputValue.inputMax
        });
        setInputValue({...inputValue, inputStart: counter.startValue, inputMax: counter.maxValue});
        if (mobile) {
            setMode("view");
        }
    }

    const cancelHandler = () => {
        setMode('view');
        setCounter({...counter, startValueSet: counter.startValue, maxValueSet: counter.maxValue});
        setInputValue({...inputValue, inputStart: counter.startValue, inputMax: counter.maxValue});
    }
    // Мобильное или Десктопное представление
    const [mobile, setMobile] = useState(() => {
        const data = localStorage.getItem("mobile")
        return data ? JSON.parse(data) : false
    })
    useEffect(() => {
        localStorage.setItem("mobile", JSON.stringify(mobile))
    }, [mobile]);
    const mobileCounter = mode === 'view'
        ? <CounterView setError={disabledSet}
                       counter={counter.currentValue}
                       increment={incrementHandler}
                       reset={resetHandler}
                       isDisabled={disabledInc}
                       isResetDisabled={disabledReset}
                       setViewCounter={modeHandler}
                       mobileView/>
        : <CounterConfig startValue={inputValue.inputStart}
                         maxValue={inputValue.inputMax}
                         setCounter={setCounterHandler}
                         setStartValue={onChangeStartValueHandler}
                         setMaxValue={onChangeMaxValueHandler}
                         cancel={cancelHandler}
                         isDisabled={disabledSet}
                         mobileView/>

    const desktopCounter =
        <FlexWrapper>
            <CounterView setError={disabledSet}
                         counter={counter.currentValue}
                         increment={incrementHandler}
                         reset={resetHandler}
                         isDisabled={disabledInc}
                         isResetDisabled={disabledReset}
                         setViewCounter={modeHandler}
                         mobileView={false}/>

            <CounterConfig startValue={inputValue.inputStart}
                           maxValue={inputValue.inputMax}
                           setCounter={setCounterHandler}
                           setStartValue={onChangeStartValueHandler}
                           setMaxValue={onChangeMaxValueHandler}
                           cancel={cancelHandler}
                           isDisabled={disabledSet}
                           mobileView={false}/>
        </FlexWrapper>

    return (

        <div className={s.counter}>
            <h1>{mobile ? "Mobile Version" : "Desktop Version"}</h1>
            {mobile ? mobileCounter : desktopCounter}
            <Button title={mobile ? "Go to Desktop" : "Go to Mobile"} onClick={() => setMobile(!mobile)}/>

        </div>
    )
};