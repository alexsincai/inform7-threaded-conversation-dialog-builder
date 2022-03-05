import { useAtom } from "jotai";
import state from "./state";

const Link = ({ id, decider, callback, classes, children }) => {

    const clickHandler = (e) => {
        e.preventDefault();
        callback(id);
    };

    return decider === id ? (
        <a
            href="/"
            className={classes + " active"}
            aria-current="page"
            onClick={clickHandler}>
            {children}
        </a>
    ) : (
        <a href="/" className={classes} onClick={clickHandler}>
            {children}
        </a>
    );
};

export default Link;
