import React, { StrictMode, Fragment } from "react";
import { render } from "react-dom";
import { useAtom } from "jotai";
import state from "./state";

import Link from "./Link";
import Form from "./Form";
import SideNav from "./SideNav";
import Result from "./Result";

const App = () => {
    const [page, setPage] = useAtom(state.page);
    const [base] = useAtom(state.base);

    const [quips, setQuips] = useAtom(state.quips);

    const clickHandler = (e) => {
        e.preventDefault();
        setQuips([...quips, { ...base }]);
    };

    return (
        <>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <Link
                        classes="nav-link"
                        callback={setPage}
                        id={0}
                        decider={page}>
                        Form
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        classes="nav-link"
                        callback={setPage}
                        id={1}
                        decider={page}>
                        Result
                    </Link>
                </li>
            </ul>
            {page === 0 && (
                <div className="row">
                    <div className="col-md-9">
                        <Form />
                    </div>
                    <div className="col-md-3">
                        <button
                            className="btn btn-lg btn-success mb-3 w-100"
                            onClick={clickHandler}>
                            +
                        </button>
                        <SideNav />
                    </div>
                </div>
            )}
            {page === 1 && <Result />}
        </>
    );
};

render(
    <StrictMode>
        <App></App>
    </StrictMode>,
    document.getElementById("root")
);
