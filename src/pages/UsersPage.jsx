import Header from "../Main-containers/Header"
import Heading from "../components/Heading"
import UserList from "../containers/UserList"
import "./UsersPage.css"

export default function UsersPage() {

    return (
        <div className="users-page">
            <Header />
            <Heading content="All Authors" />
            <div className="wrapper">
                <UserList />

            </div>
        </div>
    )
}