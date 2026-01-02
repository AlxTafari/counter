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

    const defaultSetCounter = {currentValue: 0, startValue: 0, maxValue: 5, startValueSet: 0, maxValueSet: 0}

    const [counter, setCounter] = useState<CounterProps>(() => {
        const data = localStorage.getItem("counter")
        return data ? JSON.parse(data)
            : defaultSetCounter
    })

    useEffect(() => {
        localStorage.setItem("counter", JSON.stringify(counter))
    },);

    // Проверка включить или выключить кнопку
    const disabledInc = counter.currentValue === counter.maxValue
    const disabledSet = counter.maxValueSet && counter.startValueSet < 0 || counter.startValueSet >= counter.maxValueSet;

    // Настройка максимального и стартового значения
    const onChangeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = Number(e.currentTarget.value)
        setCounter({...counter, startValueSet: newState});
    }
    const onChangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = Number(e.currentTarget.value)
        setCounter({...counter, maxValueSet: newState});
    }

    // Кнопки управления счетчиком
    const incrementHandler = () => {
        const newState = counter.currentValue + 1
        setCounter({...counter, currentValue: newState})
    }
    const resetHandler = () => {
        const newState = counter.currentValue = counter.startValue
        setCounter({...counter, startValue: newState})
    }

    // Кнопка для установки новых значений счетчика + кнопка отмены(для мобильной версии)
    const [mode, setMode] = useState<'view' | 'settings'>('view');
    const modeHandler = () => {
        setMode(prevState => prevState === 'view' ? 'settings' : 'view');
        if (mode === 'settings' || !mobile) {
            setCounter({
                ...counter,
                currentValue: counter.startValueSet,
                startValue: counter.startValueSet,
                maxValue: counter.maxValueSet
            });
        }
    }
    const cancelHandler = () => {
        setMode('view');
        setCounter({...counter, startValueSet: counter.startValue, maxValueSet: counter.maxValue});
    }

    const [mobile, setMobile] = useState(false)
    const mobileCounter = mode === 'view'
        ? <CounterView counter={counter.currentValue}
                       increment={incrementHandler}
                       reset={resetHandler}
                       isDisabled={disabledInc}
                       callback={modeHandler}
                       mobileView={true}/>
        : <CounterConfig startValue={counter.startValueSet}
                         maxValue={counter.maxValueSet}
                         setStartValue={onChangeStartValueHandler}
                         setMaxValue={onChangeMaxValueHandler}
                         setCounter={modeHandler}
                         cancel={cancelHandler}
                         disabled={disabledSet}
                         mobileView={true}/>

    const desktopCounter =
        <FlexWrapper>
            <CounterView counter={counter.currentValue}
                         increment={incrementHandler}
                         reset={resetHandler}
                         isDisabled={disabledInc}
                         callback={modeHandler}
                         mobileView={false}/>

            <CounterConfig startValue={counter.startValueSet}
                           maxValue={counter.maxValueSet}
                           setStartValue={onChangeStartValueHandler}
                           setMaxValue={onChangeMaxValueHandler}
                           setCounter={modeHandler}
                           cancel={cancelHandler}
                           disabled={disabledSet}
                           mobileView={false}/>
        </FlexWrapper>


    return (

        <div className={s.counter}>
            <Button title={mobile ? "Desktop Version" : "Mobile Version"} onClick={()=>setMobile(!mobile)} />
            {mobile ? mobileCounter : desktopCounter}
        </div>
    )
};