import { useAtom } from "jotai";
import state from "../state";

import Form from "./Form";
import SideNav from "./SideNav";

const Builder = () => {
    const [base] = useAtom(state.base);
    const [quips, setQuips] = useAtom(state.quips);
    const [current, setCurrent] = useAtom(state.current);

    const addQuip = (e) => {
        e.preventDefault();
        setQuips([
            ...quips,
            {
                ...base,
                name: quips[current].name ? quips[current].name : base.name,
                scene: quips[current].scene ? quips[current].scene : base.scene,
            },
        ]);
        setCurrent(current + 1);
    };

    const resetAll = (e) => {
        e.preventDefault();
        setQuips([base]);
        setCurrent(0);
    };

    return (
        <div className="row">
            <Form />
            <div className="col-md-4">
                <button
                    className="btn btn-lg btn-success mb-3 w-100"
                    onClick={addQuip}>
                    <i className="bi bi-plus me-1"></i>
                    Add a quip
                </button>
                <button
                    className="btn btn-lg btn-danger mb-3 w-100"
                    onClick={resetAll}>
                    <i className="bi bi-x-circle me-1"></i>
                    Remove all quips
                </button>
                <SideNav />
            </div>
        </div>
    );
};

export default Builder;
