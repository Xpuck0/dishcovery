
import { useState } from "react";
import Main from "../Main-containers/Main";
import Header from "../Main-containers/Header";
import Footer from "../Main-containers/Footer";
import { QueryContext } from "../contexts/queryContext";
import "./HomePage.css"

export default function HomePage() {
    const [search, setSearch] = useState('');

    return (
        <div className="home-page">
            <QueryContext.Provider value={search}>
                <Header setSearch={setSearch} search={search} />
                <Main search={search} />
                <Footer />
            </QueryContext.Provider>
        </div>
    )
}