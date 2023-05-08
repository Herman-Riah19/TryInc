import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const styles = {
    parallax: {
        height: "60vh",
        maxHeight: "500px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        objectFit: 'fill',
        margin: "0",
        padding: "0",
        border: "0",
        borderRadius: '10px',
        display: "flex",
        alignItems: "center",
    },
    filter: {
        "&:before": {
            background: "rgba(0, 0, 0, 0.5)",
        },
        "&:after,&:before": {
            position: "absolute",
            zIndex: "0",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''",
        },
    },
    small: {
        height: "380px",
    },
}

const useStyles = makeStyles(styles);

const Parallax = (props) => {
    const { filter, className, children, style, image, small } = props;
    const classes = useStyles();
    const parallaxClasses = classNames({
        [classes.parallax]: true,
        [classes.filter]: filter,
        [classes.small]: small,
        [className]: className !== undefined,
    })
    return (
        <div className={parallaxClasses} style={{ ...style, backgroundImage: "url(" + image + ")" }} >
            {children}
        </div>
    )
}

export default Parallax