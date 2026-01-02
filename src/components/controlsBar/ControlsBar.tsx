import s from './ControlsBar.module.scss';

type Props = {
    children: React.ReactNode,
};

export const ControlsBar = ({children}: Props) => {
    return (
        <div className={s.controlsBar}>
            {children}
        </div>
    );
};