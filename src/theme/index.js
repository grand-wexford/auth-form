import createTheme from './createTheme';
import './index.css';
import "./fonts";

const palette = {
    primary: {
        main: "#5966f0",
    },
    text: {
        primary: "#ffffff",
        secondary: "#676767",
    },
};

export default createTheme({ palette });