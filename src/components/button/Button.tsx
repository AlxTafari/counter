import s from "./Button.module.scss"

type Props = {
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
};
export const Button = ({title, onClick, className, disabled }: Props) => {

    return (
        <button disabled={disabled} className={disabled ? s.disabledButton : s.buttonBase} onClick={onClick}>{title}</button>
    );
};