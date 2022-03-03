import React, { StrictMode, useState } from "react";
import { render } from "react-dom";

const App = () => {
    const [dialog, setDialog] = useState({
        quipName: "example",
        npc: false,
        beatOpened: false,
        type: "questioning",
        name: "an actor",
        printed: "",
        following: "none",
        followed: "some other quip",
        comment: "You say",
        reply: "The actor replies",
        nag: null,
    });

    const setValue = (e) =>
        setDialog({ ...dialog, [e.target.id]: e.target.value });
    const setCheck = (e) =>
        setDialog({ ...dialog, [e.target.id]: e.target.checked });

    return (
        <>
            <form>
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
                    <span className="input-group-text">
                        {" "}
                        quip, quip-supplying{" "}
                    </span>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        value={dialog.name}
                        onChange={setValue}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        The printed name is
                    </span>
                    <input
                        id="printed"
                        className="form-control"
                        type="text"
                        value={dialog.printed}
                        onChange={setValue}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">It</span>
                    <select
                        id="following"
                        className="form-select"
                        value={dialog.following}
                        onChange={setValue}>
                        <option value="none">does not follow anything</option>
                        <option value="directly-follows">
                            directly-follows
                        </option>
                        <option value="indirectly-follows">
                            indirectly-follows
                        </option>
                    </select>
                    {dialog.following !== "none" ? (
                        <input
                            id="followeed"
                            className="form-control"
                            type="text"
                            value={dialog.followed}
                            onChange={setValue}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        The proper scene is
                    </span>
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

            <textarea
                className="form-control mt-3"
                disabled
                rows="20"
                value={`
${dialog.quipName} is a ${dialog.npc ? "NPC-directed" : ""} ${
                    dialog.beatOpened ? "beat-opened" : ""
                } ${dialog.type} quip, quip-supplying ${dialog.name}.
${
    dialog.following !== "none"
        ? `It ${dialog.following} ${dialog.followed}.`
        : ""
}
${dialog.scene ? `The proper scene is ${dialog.scene}.` : ""}
${
    dialog.printed
        ? `The printed name is "${dialog.printed}".
The true-name is "${dialog.quipName}".
Understand "${dialog.printed}" as ${dialog.quipName}.
`
        : ""
}
${
    !dialog.nag
        ? dialog.comment
            ? `The comment is "${dialog.comment.replace(/\n+/gim, "[pp]")}".`
            : ""
        : ""
}
${
    dialog.reply
        ? `The reply is "${dialog.reply.replace(/\n+/gim, "[pp]")}".`
        : ""
}    
${dialog.nag ? `The nag is "${dialog.nag.replace(/\n+/gim, "[pp]")}".` : ""}`
                    .replace(/[ ]+/g, " ")
                    .split("\n")
                    .map((x) => x.trim())
                    .filter((x) => !!x)
                    .join("\n")
                    .replace(/a (NPC|informative)/gi, "an $1")
                    .replace(/\[pp\]/g, "\n\n")}></textarea>
        </>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById("root")
);
