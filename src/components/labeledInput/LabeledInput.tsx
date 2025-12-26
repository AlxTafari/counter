type Props = {
    label: string,
    type?: "text" | "number" | "password" | "email" | "checkbox";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: number
};
export const LabeledInput = ({label, type, onChange, value}: Props) => {

    return (
        <label>
            {label}
            <input value={value} type={type} onChange={onChange}/>
        </label>
    );
};