import * as React from 'react';
import s from "./App-container.module.scss"


type Props = {
    children: React.ReactNode;
};
export const AppContainer = ({children}: Props) => {
    return (
        <div className={s.counterWrapper}>
            {children}
        </div>
    );
};