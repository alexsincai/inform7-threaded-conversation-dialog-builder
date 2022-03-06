import React from "react";
import { render } from "react-dom";
import { useAtom } from "jotai";
import state from "./state";

import Header from "./components/Header";
import Builder from "./components/Builder";
import Result from "./components/Result";

const App = () => {
    const [page] = useAtom(state.page);

    return (
        <>
            {page === 0 && <Builder />}
            {page === 1 && <Result />}
        </>
    );
};

render(<Header />, document.querySelector("header"));
render(<App />, document.querySelector("main"));
