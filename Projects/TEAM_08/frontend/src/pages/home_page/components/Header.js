import React, { Component } from "react";
import iconImage from "../assets/quran.png";
import "./header.css";

class Header extends Component {
  render() {
    return (
      <header>
        <div id="header-title">
          <a href="#">
            <img src={iconImage} alt="icon image" id="header-icon" />
          </a>
          <a href="#">مَدَارِس اَلْقُرْآنِ</a>
        </div>
        <nav id="header-links">
          <div id="response-links">
            <ul>
              <li>
                <a href="#el--2">مِنْ نَحْنُ</a>
              </li>
              <li>
                <a href="#el--3">خِدْمَاتُنَا</a>
              </li>
              <li>
                <a href="#el--4">تُوَاصِلَ مَعَنَا</a>
              </li>
            </ul>
          </div>
          <div>
            <button>تَسْجِيلٌ</button>
            <button>دُخُولٌ</button>
          </div>
        </nav>
      </header>
    );
  }
}
export default Header;
