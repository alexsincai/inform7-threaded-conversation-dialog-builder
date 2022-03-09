import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const base = {
    included: true,
    addDashes: true,
    quipName: "quip name",
    npc: false,
    beatOpened: false,
    repeatable: false,
    type: "questioning",
    name: "a person",
    printed: "printed quip name",
    scene: "",
    following: "none",
    followed: "",
    mentions: "",
    comment: "The player's comment",
    reply: "The person's reply",
    nag: "",
    availability: "",
    report: "",
};

const quips = atomWithStorage("quips", [{ ...base }]);

const current = atomWithStorage("current", 0);

const state = {
    quips,
    base: atom(base),
    current,
    page: atom("editor"),
};

export default state;
