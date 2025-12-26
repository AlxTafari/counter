type Props = {
    children: React.ReactNode
    className?: string
};
export const DisplayCounter = ({children, className }: Props) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};