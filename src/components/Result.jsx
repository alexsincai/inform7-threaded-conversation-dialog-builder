import { useAtom } from "jotai";
import state from "../state";

const tabbedCleanup = (text, extra = false) => {
    if (!!text) {
        text += extra ? "\ncontinue the action;" : "";
        return (
            [...text.split("\n")]
                // .map((x) => x.replace(/^\t*/gmi, ""))
                .map((x) => x.trim())
                .filter((x) => !!x)
                .filter((e, i, a) => !a.slice(0, i).includes(e))
                .map((x) => x.replace(/[;.\s]*$/gim, ""))
                .map((x) => "[tt]" + x.replace(/[;.\s]*$/gim, ";"))
                .map((x, i, a) =>
                    i === a.length - 1 ? x.replace(/;$/gim, ".") : x
                )
                .join("[pp]")
        );
    }
    return "";
};

const lower = (text, addDashes = false) =>
    addDashes
        ? text
              .trim()
              .replace(/[^a-z]+/gim, "-")
              .toLocaleLowerCase()
        : text.trim();

const quipResult = ({
    addDashes,
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
}) => {
    const replacedQuipName = lower(quipName, addDashes);
    const npcDirected = npc ? "NPC-directed" : "";
    const isBeatOpened = beatOpened ? "beat-opened" : "";
    const isRepeatable = repeatable ? "repeatable" : "";
    const theType = npc ? "" : type;
    const showQuip = `${replacedQuipName} is a ${isRepeatable} ${npcDirected} ${isBeatOpened} ${theType} quip.`;
    const theName = `It quip-supplies ${name}.`;
    const itFollows =
        following !== "none" && followed !== ""
            ? `It ${following} ${followed}.`
            : "";
    const properScene = scene ? `The proper scene is ${scene.trim()}.` : "";
    const shortened = printed
        ? printed
              .replace(/\b(an?|it|of|and|the)\b/gim, "")
              .trim()
              .replace(/\s+/gmi, " / ")
              .toLocaleLowerCase()
        : "";
    const printedName = printed
        ? `The printed name is "${printed.trim()}".[pp]The true-name is "${printed.trim()}".[pp]Understand "${shortened}" as ${replacedQuipName}.`
        : "";
    const itMentions = mentions ? `It mentions ${mentions.trim()}.` : "";
    const theComment =
        !nag && !npc
            ? comment
                ? `The comment is "${comment.replace(/\n/gim, "[pp]")}".`
                : ""
            : "";
    const theReply = reply
        ? `The reply is "${reply.replace(/\n/gim, "[pp]")}".`
        : "";
    const theNag = nag ? `The nag is "${nag.replace(/\n/gim, "[pp]")}".` : "";
    const availabilityRules = availability
        ? `An availability rule for ${replacedQuipName}:[pp]${tabbedCleanup(
              availability
          )}`
        : "";
    const reporting = report
        ? `Report ${name} discussing ${replacedQuipName}:[pp]${tabbedCleanup(
              report,
              true
          )}`
        : "";

    const output = [
        showQuip,
        theName,
        itFollows,
        properScene,
        printedName,
        itMentions,
        theComment,
        theReply,
        theNag,
        availabilityRules,
        reporting,
    ]
        .filter((x) => !!x)
        .map((x) =>
            x
                .replace(/[ ]+/gim, " ")
                .replace(/a (NPC|informative)/gim, "an $1")
                .replace(/(An availability|^Report)/gim, "[pp]$1")
        )
        .join("\n")
        .replace(/\[tt\]/gim, "\t")
        .replace(/\[pp\]/gim, "\n");

    return output;
};

const Result = () => {
    const [quips] = useAtom(state.quips);

    const result = quips
        .map((e, i, a) =>
            a.length > 1 &&
            a
                .map((q) => lower(q.quipName, true))
                .includes(lower(e.quipName, true))
                ? e
                : { ...e, followed: "" }
        )
        .map(quipResult)
        .join("\n\n\n");

    return (
        <textarea
            value={result}
            rows={30}
            className="form-control"
            disabled="disabled"></textarea>
    );
};

export default Result;
export { lower };
