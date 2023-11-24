import Header from "../Main-containers/Header"
import Heading from "../components/Heading"
import UserList from "../containers/UserList"

export default function UsersPage() {

    return (
        <div className="users-page">
            <Header />
            <Heading content="Authors" />
            <UserList />
        </div>
    )
}