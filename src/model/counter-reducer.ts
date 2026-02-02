import {combineReducers, createAction, createReducer} from "@reduxjs/toolkit";

const initCounter = {
    currentValue: 0,
    startValue: 0,
    maxValue: 5,
    startValueSet: 0,
    maxValueSet: 5
}

export const incrementCounterAC = createAction("incrementCounter");
export const resetCounterAC = createAction("resetCounter");
export const setCounterAC = createAction<{startValue: number, maxValue: number}>("setCounter");
export const cancelSetCounterAC = createAction("cancelSetCounter");

export const counterReducer = createReducer(initCounter, (builder) => {
    builder
        .addCase(incrementCounterAC, (state, action) => {
            state.currentValue += 1;
        })
        .addCase(resetCounterAC, (state, action) => {
            state.currentValue = state.startValue;
        })
        .addCase(setCounterAC, (state, action) => {
            state.currentValue = action.payload.startValue;
            state.startValue = action.payload.startValue;
            state.maxValue = action.payload.maxValue;
        })
        .addCase(cancelSetCounterAC, (state, action) => {
            state.startValueSet = state.startValue
            state.maxValueSet = state.maxValue;
        })
})