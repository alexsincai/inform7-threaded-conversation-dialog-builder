import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const base = {
    quipName: "example",
    npc: false,
    beatOpened: false,
    type: "questioning",
    name: "an actor",
    printed: "",
    scene: "",
    following: "none",
    followed: "",
    comment: "",
    reply: "",
    nag: "",
};

const quips = atomWithStorage("quips", [{ ...base }]);

const current = atomWithStorage("current", 0);

const state = {
    quips,
    base: atom(base),
    current,
    page: atom(0),
};

export default state;
