import { useAtom } from "jotai";
import state from "../state"

const Link = ({ id, children }) => {
    const [page, setPage] = useAtom(state.page);

    const clickHandler = (e) => {
        e.preventDefault();
        setPage(id);
    };

    return page === id ? (
        <a
            href="/"
            className="nav-link active"
            aria-current="page"
            onClick={clickHandler}>
            {children}
        </a>
    ) : (
        <a href="/" className="nav-link" onClick={clickHandler}>
            {children}
        </a>
    );
};

export default Link;
