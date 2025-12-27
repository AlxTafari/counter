type Props = {
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
};
export const Button = ({title, onClick, className, disabled }: Props) => {

    return (
        <button disabled={disabled} className={className} onClick={onClick}>{title}</button>
    );
};