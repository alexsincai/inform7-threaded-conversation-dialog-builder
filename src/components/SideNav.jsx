import { useAtom } from "jotai";
import state from "../state";

const SideNav = () => {
    const [quips, setQuips] = useAtom(state.quips);
    const [current, setCurrent] = useAtom(state.current);

    const listItemClasses = quips.map(
        () => "list-group-item d-flex align-items-center"
    );
    listItemClasses[current] += " active";

    const linkClasses = quips.map(
        (_, i) =>
            `text-decoration-none text-${i === current ? "white" : "dark"}`
    );

    const clickHandler = (e) => {
        e.preventDefault();
        setCurrent(parseInt(e.target.dataset.id, 10));
        linkClasses[current] = linkClasses[current].replace("-dark", "-white");
    };

    const removeHandler = (e) => {
        e.preventDefault();
        const id = parseInt(e.target.dataset.id, 10);
        if (id === 0) {
            setCurrent(current === 0 ? 0 : current - 1);
        } else if (id < current) {
            setCurrent(current - 1);
        } else if (id === current) {
            setCurrent(
                current === quips.length - 1 ? quips.length - 2 : current - 1
            );
        }
        setQuips([...quips.filter((_, i) => i !== id)]);
    };

    return (
        <ul className="list-group">
            {quips.map((q, i) => (
                <li key={i} className={listItemClasses[i]}>
                    <a
                        href="/"
                        data-id={i}
                        onClick={clickHandler}
                        className={linkClasses[i]}>
                        {q.quipName}
                    </a>
                    {quips.length > 1 && (
                        <button
                            className="border-2 btn btn-outline-secondary fw-bold ms-auto"
                            onClick={removeHandler}
                            data-id={i}>
                            &times;
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SideNav;
