import {useEffect, useState} from "react";
import {CounterView} from "./CounterView";
import {CounterConfig} from "./CounterConfig";
import {FlexWrapper} from "../flexWrapper/FlexWrapper";
import {Button} from "../button/Button";
import s from "./Counter.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {cancelSetCounterAC, incrementCounterAC, resetCounterAC, setCounterAC} from "../../model/counter-reducer";


type CounterProps = {
    currentValue: number; // текущее значение
    startValue: number; // начальное значение
    maxValue: number; // максимальное значение

    startValueSet: number; // настройка startValue
    maxValueSet: number; // настройка maxValue
}


export const Counter = () => {

    // const [counter, setCounter] = useState<CounterProps>(() => {
    //     const data = localStorage.getItem("counter")
    //     return data ? JSON.parse(data)
    //         : {}
    // })
    // useEffect(() => {
    //     localStorage.setItem("counter", JSON.stringify(counter))
    // }, [counter]);

    const counter1 = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch();
    // контроль инпутов
    const [inputValue, setInputValue] = useState(() => {
        return {inputStart: counter1.startValue, inputMax: counter1.maxValue}
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
    const disabledInc = counter1.currentValue === counter1.maxValue
    const disabledSet = inputValue.inputMax && inputValue.inputStart < 0 || inputValue.inputStart >= inputValue.inputMax;
    const disabledReset = counter1.startValue === counter1.currentValue;

    // Кнопки управления счетчиком
    const incrementHandler = () => {
        dispatch(incrementCounterAC());
    }
    const resetHandler = () => {
        dispatch(resetCounterAC());
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
        dispatch(setCounterAC({startValue: inputValue.inputStart, maxValue: inputValue.inputMax}));

        setInputValue({...inputValue, inputStart: counter1.startValue, inputMax: counter1.maxValue});
        if (mobile) {
            setMode("view");
        }
    }

    const cancelHandler = () => {
        setMode('view');
        dispatch(cancelSetCounterAC());
        setInputValue({...inputValue, inputStart: counter1.startValue, inputMax: counter1.maxValue});
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
                       counter={counter1.currentValue}
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
                         counter={counter1.currentValue}
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