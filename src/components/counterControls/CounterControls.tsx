type Props = {
    children: React.ReactNode,
};

export const CounterControls = ({children}: Props) => {
    return (
        <div className={"controls-wrapper"}>
            {children}
        </div>
    );
};