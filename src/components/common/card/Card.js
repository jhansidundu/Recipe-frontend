import classes from "./Card.module.css";

// reusable component for create
const Card = ({ extraClass, children }) => {
  return <div className={`${classes.card}  ${extraClass}`}>{children}</div>;
};

export default Card;
