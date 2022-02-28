import React, { StrictMode, useState } from "react";
import { render } from "react-dom";

const App = () => {
    const [dialog, setDialog] = useState({
        quipName: "example",
        npc: false,
        type: "questioning",
        name: "an actor",
        printed: "",
        following: "none",
        followed: "some other quip",
        comment: "You say",
        reply: "The actor replies",
        nag: null,
    });

    return (
        <>
            <form>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={dialog.quipName}
                        onChange={(e) =>
                            setDialog({ ...dialog, quipName: e.target.value })
                        }
                    />
                    <span className="input-group-text"> is a </span>
                    <label className="input-group-text">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="npc"
                            checked={dialog.npc}
                            onChange={(e) =>
                                setDialog({
                                    ...dialog,
                                    npc: e.target.checked,
                                })
                            }
                        />
                        NPC-directed
                    </label>
                    <select
                        className="form-select"
                        value={dialog.type}
                        onChange={(e) =>
                            setDialog({ ...dialog, type: e.target.value })
                        }>
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
                        type="text"
                        className="form-control"
                        value={dialog.name}
                        onChange={(e) =>
                            setDialog({ ...dialog, name: e.target.value })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        The printed name is
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        value={dialog.printed}
                        onChange={(e) =>
                            setDialog({ ...dialog, printed: e.target.value })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">It</span>
                    <select
                        className="form-select"
                        value={dialog.following}
                        onChange={(e) =>
                            setDialog({ ...dialog, following: e.target.value })
                        }>
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
                            type="text"
                            className="form-control"
                            value={dialog.followed}
                            onChange={(e) =>
                                setDialog({
                                    ...dialog,
                                    followed: e.target.value,
                                })
                            }
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
                        type="text"
                        className="form-control"
                        value={dialog.scene}
                        onChange={(e) =>
                            setDialog({ ...dialog, scene: e.target.value })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">The comment is</span>
                    <textarea
                        className="form-control"
                        value={dialog.comment}
                        onChange={(e) =>
                            setDialog({
                                ...dialog,
                                comment: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">The reply is</span>
                    <textarea
                        className="form-control"
                        value={dialog.reply}
                        onChange={(e) =>
                            setDialog({
                                ...dialog,
                                reply: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">The nag is</span>
                    <textarea
                        className="form-control"
                        value={dialog.nag}
                        onChange={(e) =>
                            setDialog({
                                ...dialog,
                                nag: e.target.value,
                            })
                        }
                    />
                </div>
            </form>

            <textarea
                className="form-control mt-3"
                disabled
                rows="20"
                value={`
${dialog.quipName} is a ${dialog.npc ? "NPC-directed" : ""} ${
                    dialog.type
                } quip, quip-supplying ${dialog.name}.
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
    !dialog.nag && dialog.comment
        ? `The comment is "${dialog.comment.replace(/\n+/gim, "[pp]")}".`
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
                    .replace("a informative", "an informative")
                    .replace("a NPC", "an NPC")
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
