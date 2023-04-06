import React from "react";
import { createRoot } from "react-dom/client";
import { useAtom } from "jotai";
import state from "./state";

import Header from "./components/Header";
import Builder from "./components/Builder";
import Result from "./components/Result";

const App = () => {
    const [page] = useAtom(state.page);

    return (
        <>
            {page === "editor" && <Builder />}
            {page === "result" && <Result />}
            {page === "about" && (
                <>
                    <p>
                        This is a visual(ish) editor for creating dialog quips,
                        for use in <a href="http://inform7.com/">Inform7</a>{" "}
                        with the{" "}
                        <a href="https://i7el.herokuapp.com/extensions/threaded-conversation-by-chris-conley">
                            Threaded Conversation extension
                        </a>
                        .
                    </p>
                    <p>
                        The dialog editor allows the creation of quips,
                        specifying what type of quip it is, the actor(s) to whom
                        it is restricted, the scene during which it will appear,
                        if any, and the nag, if any.
                    </p>
                    <p>
                        <strong>Please be aware:</strong> if the quip starts
                        with "a" or "the", or if it contains the words "is" or
                        "has", you <strong>must</strong> use the printed name.
                    </p>
                    <p className="fw-bold">
                        It only allows a quip to follow a single other quip.
                        Should you need it to follow several, you will need to
                        edit it manually.
                    </p>
                    <p>
                        Adding a new quip will copy the current actor's name and
                        the current scene to the new quip.
                    </p>
                    <p>
                        Should you add any actions to the Report input, a
                        "continue the action" will be added automatically at the
                        end.
                    </p>
                    {/* <p><strong>Beware!</strong> The Availability and Report inputs automatically strip the first tab character!</p> */}
                    <p>
                        The resulting quips will be displayed, nicely formatted,
                        in the Results tab.
                    </p>
                    <p>
                        It was built by <strong>Reason: Optional</strong> in{" "}
                        <a href="https://reactjs.org/">React</a>, with{" "}
                        <a href="https://jotai.org/">Jotai</a> for state
                        management and{" "}
                        <a href="https://getbootstrap.com/">Bootstrap</a> for
                        layout.
                    </p>
                </>
            )}
        </>
    );
};

createRoot(document.querySelector("header")).render(<Header />);
createRoot(document.querySelector("main")).render(<App />);
