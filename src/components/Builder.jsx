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
            },
        ]);
        setCurrent(current + 1);
    };

    return (
        <div className="row">
            <Form />
            <div className="col-md-3">
                <button
                    className="btn btn-lg btn-success mb-3 w-100"
                    onClick={addQuip}>
                    +
                </button>
                <SideNav />
            </div>
        </div>
    );
};

export default Builder;
