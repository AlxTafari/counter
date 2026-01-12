import s from "./FlexWrapper.module.scss";

type FlexDirection = "row" | "column";
type FlexWrap = "nowrap" | "wrap";
type JustifyContent =
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end";

type Props = {
    children?: React.ReactNode;
    direction?: FlexDirection;
    wrap?: FlexWrap;
    justify?: JustifyContent;
    align?: AlignItems;
    gap?: number;
};

export const FlexWrapper = ({
                                children,
                                direction = "row",
                                wrap = "nowrap",
                                justify = "space-around",
                                align = "center",
                                gap,
                            }: Props) => {
    return (
        <div
            className={s.container}
            style={{
                flexDirection: direction,
                flexWrap: wrap,
                justifyContent: justify,
                alignItems: align,
                gap: gap + "px",
            }}
        >
            {children}
        </div>
    );
};
