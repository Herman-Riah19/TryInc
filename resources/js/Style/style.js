const containerFluid = {
    padding: '15px',
    margin: '15px',
    width: "100%"
};

const container = {
    ...containerFluid,
    "@media (min-width: 576px)": {
        maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
        maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
        maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
        maxWidth: "1140px",
    },
};

const boxShadow = {
    boxShadow:
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
};

const title = {
    color: '#3C4858',
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Poppins", sans-serif`,
};

export {
    container,
    containerFluid,
    boxShadow,
    title,
};