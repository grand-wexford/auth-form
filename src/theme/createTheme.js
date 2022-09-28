import { createTheme as MUIcreateTheme } from "@mui/material/styles";


export default function createTheme(props) {
    const { palette } = props;
    const rootFontSize = 14;

    return MUIcreateTheme({
        props: {
            MuiButtonBase: {
                disableRipple: true,
            },
        },
        rootFontSize,
        rootBackground: 'transparent',
        palette: { ...palette },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#3c3c3c",
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "#777777",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: "none",
                        lineHeight: "2",
                        '& svg': {
                            color: 'inherit',
                            marginRight: '4px',
                            marginLeft: '-8px',
                            fontSize: "26px !important"
                        },
                        '&:hover': {
                            boxShadow: '0px 5px 10px rgba(91, 83, 122, 0.3)',
                        },
                        '&.Mui-disabled ': {
                            backgroundColor: "#5966f0",
                            color: "#FFF",
                            opacity: 0.6,
                        },
                        "& .MuiButton-endIcon": {
                            right: 6,
                            position: "absolute",
                        }
                    },
                    label: {
                        textTransform: "uppercase",
                        textAlign: "center",
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            "color": "#fff"
                        }
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: "#777",
                        fontSize: "0.8rem !important",
                    },
                },
            }
        },
        typography: {
            useNextVariants: true,
            fontSize: rootFontSize,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            textAlign: "center",
            letterSpacing: "0.03em",
        }
    });
}