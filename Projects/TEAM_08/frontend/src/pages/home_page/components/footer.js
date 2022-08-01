import React, { Component } from "react";
import "./footer.css";
import facebookIcon from "../assets/facebook.png";
import linedinIcon from "../assets/linkedin.png";
import twitterIcon from "../assets/twitter.png";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          © 2022 جَمِيعِ اَلْحُقُوقِ مَحْفُوظَةً لِمَوْقِعِ مَدَارِسِ
          اَلْقُرْآنِ
        </div>
        <div>
          <img src={facebookIcon} />
          <img src={linedinIcon} />
          <img src={twitterIcon} />
        </div>
      </footer>
    );
  }
}
export default Footer;
