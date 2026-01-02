import s from "./FlexWrapper.module.scss"

type Props = {
    children?: React.ReactNode
};
export const FlexWrapper = ({children}: Props) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};