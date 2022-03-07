import { useAtom } from "jotai";
import state from "../state";

const quipResult = ({
    quipName,
    npc,
    beatOpened,
    repeatable,
    type,
    name,
    printed,
    scene,
    following,
    followed,
    mentions,
    comment,
    reply,
    nag,
    availability,
    report,
}) =>
    `
${quipName} is a ${npc ? "NPC-directed" : ""} ${
        beatOpened ? "beat-opened" : ""
    } ${repeatable ? "repeatable" : ""} ${type} quip.
It quip-supplies ${name}.
${following !== "none" && followed !== "" ? `It ${following} ${followed}.` : ""}
${scene ? `The proper scene is ${scene}.` : ""}
${
    printed
        ? `The printed name is "${printed}".
The true-name is "${quipName}".
Understand "${printed}" as ${quipName}.
`
        : ""
}
${mentions ? `It mentions ${mentions}.` : ""}
${
    !nag
        ? comment
            ? `The comment is "${comment.replace(/\n+/gim, "[pp]")}".`
            : ""
        : ""
}
${reply ? `The reply is "${reply.replace(/\n+/gim, "[pp]")}".` : ""}    
${nag ? `The nag is "${nag.replace(/\n+/gim, "[pp]")}".` : ""}
${
    availability
        ? `An availability rule for ${quipName}:
${availability.replace(/(^|\n)/g, "$1$$$$$$$$")}`
        : ""
    }
${
    report
        ? `Report ${name} discussing ${quipName}:
${report.replace(/(^|\n)/g, "$1$$$$$$$$")}
$$$$$$$$continue the action.`
        : ""
}`
        .replace(/[ ]+/g, " ")
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => !!x)
        .join("\n")
        .replace(/\$+/g, "\t")
        .replace(/a (NPC|informative)/gi, "an $1")
        .replace(/\[pp\]/g, "\n\n")
        .replace(/(An availability|Report)/g, "\n$1")

const Result = () => {
    const [quips] = useAtom(state.quips);

    const result = quips.map(quipResult).join("\n\n\n");

    return (
        <textarea
            value={result}
            rows={30}
            className="form-control"
            disabled="disabled"></textarea>
    );
};

export default Result;
