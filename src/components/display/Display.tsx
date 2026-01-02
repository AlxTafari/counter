import s from "./Display.module.scss"

type Props = {
    children: React.ReactNode
    className?: string
    isDisabled?: boolean
};
export const Display = ({children, isDisabled}: Props) => {

    return (
        <div className={isDisabled ? s.displayStop : s.display}>
            {children}
        </div>
    );
};