import { container } from "./style";

const profileStyle = {
  container,
  banner: {
    position: 'relative',
    height: '20rem',
    width: 'auto',
    marginBottom: '50px',
    backgroundPosition: "center center",
    backgroundSize: "cover",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:after,&:before": {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
    },
  },
  avatar: {
    position: 'relative',
    top: '235px',
    left: '50px',
    justifyContent: 'center'
  },
};

export default profileStyle;