import * as React from 'react';
import s from "./App-container.module.scss"


type Props = {
    children: React.ReactNode;
    width?: string;
    height?: string;
};
export const AppContainer = ({
                                 children,
                                 height = "300px",
                                 width = "350px"}: Props) => {
    return (
        <div
            style={{
                width: width,
                height: height
            }}
            className={s.counterWrapper}>
            {children}
        </div>
    );
};