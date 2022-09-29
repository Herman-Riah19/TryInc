import { makeStyles } from "@mui/styles"

const style = {
    title: {
        fonSize: '32px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center',
        paddingBottom: '20px',
        position: 'relative',
        color: '#05043D',

        '&::before' :{
            content: '',
            position: "absolute",
            display: "block",
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.959),rgba(255, 255, 255, 0.904))",
            bottom: "1px",
            left: "calc(50% - 60px)",
        },

        '&::after' :{
            content: '',
            position: "absolute",
            display: "block",
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, rgba(53, 108, 226, 0.877),rgba(9, 49, 228, 0.973))",
            bottom: 0,
            left: "calc(50% - 20px)",
        }
    }
}

export const presentationStyle = makeStyles(style)


