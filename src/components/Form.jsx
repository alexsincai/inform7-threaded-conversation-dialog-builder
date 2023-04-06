import { useAtom } from "jotai";
import state from "../state";
import { lower } from "./Result";

const Form = () => {
    const [quips, setQuips] = useAtom(state.quips);
    const [current] = useAtom(state.current);

    const dialog = quips[current];
    const otherQuips = [
        { name: "- Select -", value: "" },
        ...quips
            .filter((_, i) => i !== current)
            .map((q) => ({
                name: q.quipName,
                value: lower(q.quipName, q.addDashes),
            })),
    ];
    const characters = quips
        .map((q) => q.name.trim())
        .filter((e, i, a) => !a.slice(0, i).includes(e))
        .sort();
    const canChar = characters.length > 1;

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
        <form className="col-md-8">
            <div className="input-group mb-3">
                <label className="input-group-text" role="button">
                    <input
                        id="addDashes"
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={dialog.addDashes}
                        onChange={setCheck}
                    />
                    (Kebab-cased) Quip name
                </label>
                <input
                    id="quipName"
                    className="form-control"
                    type="text"
                    value={dialog.quipName}
                    onChange={setValue}
                    placeholder="Quip name"
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">It is a </span>
                <label className="input-group-text" role="button">
                    <input
                        id="repeatable"
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={dialog.repeatable}
                        onChange={setCheck}
                    />
                    repeatable
                </label>
                <label className="input-group-text" role="button">
                    <input
                        id="npc"
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={dialog.npc}
                        onChange={setCheck}
                    />
                    NPC-directed
                </label>
                <label className="input-group-text" role="button">
                    <input
                        id="beatOpened"
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={dialog.beatOpened}
                        onChange={setCheck}
                    />
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
                    list={canChar ? "characters" : null}
                    multiple={canChar ? "characters" : null}
                    placeholder="Character name"
                />
                {canChar ? (
                    <datalist id="characters">
                        {characters.map((c, i) => (
                            <option key={i} value={c}></option>
                        ))}
                    </datalist>
                ) : null}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">The printed name is</span>
                <input
                    id="printed"
                    className="form-control"
                    type="text"
                    value={dialog.printed}
                    onChange={setValue}
                    placeholder="Printed name"
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
                    placeholder="A subject"
                />
            </div>
            {otherQuips.length ? (
                <div className="input-group mb-3">
                    <span className="input-group-text">It</span>
                    <select
                        id="following"
                        className="form-select"
                        value={quips.length > 1 ? dialog.following : "none"}
                        onChange={setValue}>
                        <option value="none">does not follow anything</option>
                        <option value="indirectly-follows">
                            indirectly-follows
                        </option>
                        <option value="directly-follows">
                            directly-follows
                        </option>
                    </select>
                    {dialog.following !== "none" && quips.length > 1 ? (
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
                    placeholder="Scene name"
                />
            </div>
            {!dialog.npc ? (
                <div className="input-group mb-3">
                    <span className="input-group-text">The comment is</span>
                    <textarea
                        id="comment"
                        className="form-control"
                        value={dialog.comment}
                        onChange={setValue}
                        placeholder="Player says"
                    />
                </div>
            ) : null}
            <div className="input-group mb-3">
                <span className="input-group-text">The reply is</span>
                <textarea
                    id="reply"
                    className="form-control"
                    value={dialog.reply}
                    onChange={setValue}
                    placeholder="Character replies"
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
                        placeholder="Character nags"
                    />
                </div>
            ) : (
                ""
            )}
            <div className="input-group mb-3">
                <span className="input-group-text">An availability rule:</span>
                <textarea
                    id="availability"
                    className="form-control"
                    value={dialog.availability}
                    onChange={setValue}
                    placeholder="Availability rules"></textarea>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Report:</span>
                <textarea
                    id="report"
                    className="form-control"
                    value={dialog.report}
                    onChange={setValue}
                    placeholder="Report rules"></textarea>
            </div>
        </form>
    );
};

export default Form;
