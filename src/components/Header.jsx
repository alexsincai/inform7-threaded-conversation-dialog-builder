import Link from "./Link";

const Header = () => {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <Link id={0}>Dialog editor</Link>
            </li>
            <li className="nav-item">
                <Link id={1}>Result</Link>
            </li>
        </ul>
    );
};

export default Header;
