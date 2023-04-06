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

    const setOutput = (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        setQuips(
            quips.map((q, i) =>
                i !== id ? q : { ...q, included: e.target.checked }
            )
        );
    };

    return (
        <ul className="list-group">
            {quips.map((q, i) => (
                <li key={i} className={listItemClasses[i]}>
                    <span className="align-items-center d-flex form-check form-check-inline">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={"include-" + i}
                            data-id={i}
                            onChange={setOutput}
                            checked={q.included}
                            title={`Include "${q.quipName}" in output?`}
                        />
                        <label
                            className="visually-hidden"
                            htmlFor={"include-" + i}>
                            Include "{q.quipName}" in output?
                        </label>
                    </span>
                    <a
                        href="/"
                        data-id={i}
                        onClick={clickHandler}
                        className={linkClasses[i]}>
                        {q.quipName}
                    </a>
                    {quips.length > 1 && (
                        <button
                            className="border-2 btn btn-outline-danger fw-bold ms-auto"
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
