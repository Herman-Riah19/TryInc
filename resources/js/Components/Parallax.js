import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const styles = {
    parallax: {
        height: "75vh",
        maxHeight: "750px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
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
    let windowScrollTop;
    if (window.innerWidth >= 768) {
        windowScrollTop = window.pageYOffset / 3;
    } else {
        windowScrollTop = 0;
    }

    const [transform, setTransform] = useState(
        "translate3d(0," + windowScrollTop + "px, 0)"
    );

    useEffect(() => {
        if (window.innerWidth >= 768) {
            window.addEventListener("scroll", resetTransform);
        }
        return function cleanup() {
            if (window.innerWidth >= 768) {
                window.removeEventListener("scroll", resetTransform);
            }
        };
    });

    const resetTransform = () => {
        var windowScrollTop = window.pageYOffset / 3;
        setTransform("translate3d(0," + windowScrollTop + "px,0)")
    }

    const { filter, className, children, style, image, small } = props;
    const classes = useStyles();
    const parallaxClasses = classNames({
        [classes.parallax]: true,
        [classes.filter]: filter,
        [classes.small]: small,
        [className]: className !== undefined,
    })
    return (
        <div
            className={parallaxClasses}
            style={{
                ...style,
                backgroundImage: "url(" + image + ")",
                transform: transform
            }}
        >
            {children}
        </div>
    )
}

export default Parallax