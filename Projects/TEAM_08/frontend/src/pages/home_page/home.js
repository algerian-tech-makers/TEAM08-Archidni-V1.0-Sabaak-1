import React, { Component } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <div id="main">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
export default Home;
