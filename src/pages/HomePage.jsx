
import { useContext, useState } from "react";
import Main from "../Main-containers/Main";
import Header from "../Main-containers/Header";
import Footer from "../Main-containers/Footer";
import { QueryContext } from "../contexts/contexts";
import "./HomePage.css"

export default function HomePage() {

    return (
        <div className="home-page">
                <Header  />
                <Main  />
                <Footer />
        </div>
    )
}