import { useAtom } from "jotai";
import state from "../state";

const Form = () => {
    const [quips, setQuips] = useAtom(state.quips);
    const [current] = useAtom(state.current);

    const dialog = quips[current];
    const otherQuips = [
        { name: "- Select -", value: "" },
        ...quips
            .filter((_, i) => i !== current)
            .map((q) => ({ name: q.quipName, value: q.quipName })),
    ];

    const setValue = (e) =>
        setQuips([
            ...quips.slice(0, current),
            { ...dialog, [e.target.id]: e.target.value },
            ...quips.slice(current + 1),
        ]);

    const setCheck = (e) =>
        setQuips([
            ...quips.slice(0, current),
            { ...dialog, [e.target.id]: e.target.checked },
            ...quips.slice(current + 1),
        ]);

    return (
        <form className="col-md-9">
            <div className="input-group mb-3">
                <input
                    id="quipName"
                    className="form-control"
                    type="text"
                    value={dialog.quipName}
                    onChange={setValue}
                />
                <span className="input-group-text"> is a </span>
                <label className="input-group-text">
                    <input
                        id="repeatable"
                        className="form-check-input"
                        type="checkbox"
                        checked={dialog.repeatable}
                        onChange={setCheck}
                    />{" "}
                    repeatable
                </label>
                <label className="input-group-text">
                    <input
                        id="npc"
                        className="form-check-input"
                        type="checkbox"
                        checked={dialog.npc}
                        onChange={setCheck}
                    />{" "}
                    NPC-directed
                </label>
                <label className="input-group-text">
                    <input
                        id="beatOpened"
                        className="form-check-input"
                        type="checkbox"
                        checked={dialog.beatOpened}
                        onChange={setCheck}
                    />{" "}
                    beat-opened
                </label>
                <select
                    id="type"
                    className="form-select"
                    value={dialog.type}
                    onChange={setValue}>
                    <option value="questioning">questioning</option>
                    <option value="informative">informative</option>
                    <option value="performative">performative</option>
                    <option value="restrictive">restrictive</option>
                </select>
                <span className="input-group-text"> quip.</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">It quip-supplies </span>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    value={dialog.name}
                    onChange={setValue}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">The printed name is</span>
                <input
                    id="printed"
                    className="form-control"
                    type="text"
                    value={dialog.printed}
                    onChange={setValue}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">It mentions </span>
                <input
                    type="text"
                    id="mentions"
                    className="form-control"
                    value={dialog.mentions}
                    onChange={setValue}
                />
            </div>
            {otherQuips.length ? (
                <div className="input-group mb-3">
                    <span className="input-group-text">It</span>
                    <select
                        id="following"
                        className="form-select"
                        value={dialog.following}
                        onChange={setValue}>
                        <option value="none">does not follow anything</option>
                        <option value="indirectly-follows">
                            indirectly-follows
                        </option>
                        <option value="directly-follows">
                            directly-follows
                        </option>
                    </select>
                    {dialog.following !== "none" ? (
                        <select
                            id="followed"
                            className="form-select"
                            value={dialog.followed}
                            onChange={setValue}>
                            {otherQuips.map((q, i) => (
                                <option value={q.value} key={i}>
                                    {q.name}
                                </option>
                            ))}
                        </select>
                    ) : null}
                </div>
            ) : null}
            <div className="input-group mb-3">
                <span className="input-group-text">The proper scene is</span>
                <input
                    id="scene"
                    className="form-control"
                    type="text"
                    value={dialog.scene}
                    onChange={setValue}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">The comment is</span>
                <textarea
                    id="comment"
                    className="form-control"
                    value={dialog.comment}
                    onChange={setValue}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">The reply is</span>
                <textarea
                    id="reply"
                    className="form-control"
                    value={dialog.reply}
                    onChange={setValue}
                />
            </div>
            {dialog.type === "restrictive" ? (
                <div className="input-group mb-3">
                    <span className="input-group-text">The nag is</span>
                    <textarea
                        id="nag"
                        className="form-control"
                        value={dialog.nag}
                        onChange={setValue}
                    />
                </div>
            ) : (
                ""
            )}
        </form>
    );
};

export default Form;
