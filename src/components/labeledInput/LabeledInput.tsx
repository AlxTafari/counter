import s from './LabeledInput.module.scss';

type Props = {
    label: string,
    type?: "text" | "number" | "password" | "email" | "checkbox";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number
    className?: string
};
export const LabeledInput = ({label, type, onChange, value, className}: Props) => {


    return (
        <div className={s.labeledInput}>
            <label>{label}</label>

            <input className={className} value={value} type={type} onChange={onChange}/>
        </div>

    );
};