import { StylesConfig } from "react-select"

const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

export const dateOptions = [
    { label: "All", value: "all" },
    { label: "Custom", value: "custom" },
    // { label: "Today", value: today },
    // { label: "Yesterday", value: yesterday }
]

export const reactStyles: StylesConfig = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? "white" : "white",
        backgroundColor: "#0000002b",
        borderRadius: "8px",
        boxShadow: "none",
        "&:hover": {
            borderColor: state.isFocused ? "white" : "white",
        },
        width: "140px"
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        fontWeight: "bold",
        color: "white"
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        fontWeight: "bold",
        color: "white"
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        color: "#ffffff91",
        fontWeight: "bold",

    }),
    indicatorSeparator: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "white"
    }),
    indicatorsContainer: (baseStyles, state) => ({
        ...baseStyles,
        svg: {
            fill: "white"
        }
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#0000002b",
        backdropFilter: "blur(50px)",
        transition: "0.2s all ease-in-out",
    }),
    menuList: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "#0000002b",
        borderColor: "white",
        backdropFilter: "blur(50px)",
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        fontWeight: "bold",
        transition: "0.2s all ease-in-out",
        backgroundColor: state.isSelected || state.isFocused ? "white" : "transparent",
        color: state.isSelected || state.isFocused ? "black" : "white",
        "&:active": {
            backgroundColor: "white",
        },
        "&:hover": {
            backgroundColor: "#ffffff91",
        }
    })
}