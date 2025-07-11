import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Can from "../rbac/Can";

function UserHeader() {
    const userDetails = useSelector((state) => state.userDetails);

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand text-light" to="/">
                    Dashboard
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn btn-link text-light"
                                type="button"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ textDecoration: "none" }}
                            >
                                {userDetails && userDetails.name ? userDetails.name : "Account"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li><Link className="dropdown-item" to="/manage-payment"> Payments</Link> </li>

                                <Can
                                    permission='canViewUser'>
                                    <li>
                                        <Link className="dropdown-item" to="/users">
                                            Manage Users
                                        </Link>
                                    </li>
                                </Can>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/logout">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default UserHeader;