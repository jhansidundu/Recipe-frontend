import classes from "./Card.module.css";
const Card = ({ extraClass, children }) => {
  return <div className={`${classes.card}  ${extraClass}`}>{children}</div>;
};

export default Card;
