import Link from "./Link";

const Header = () => {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <Link id="editor">Dialog editor</Link>
            </li>
            <li className="nav-item">
                <Link id="result">Result</Link>
            </li>
            <li className="nav-item">
                <Link id="about">About</Link>
            </li>
        </ul>
    );
};

export default Header;
