import React, { Component } from "react";
import "./main.css";
import firstImage from "../assets/first_section.jpg";
import aboutUsImage from "../assets/about_us.jpg";
import searchIcon from "../assets/search.png";
import identityICon from "../assets/identity.png";
import paymentICon from "../assets/payment.png";

class Main extends Component {
  render() {
    return (
      <article>
        <section id="el--1">
          <div>
            <p>
              اَلْقُرْآن هُوَ نُورُ اَلْحَيَاةِ ،<br /> فَبَحَثَ عَنْهُ حَتَّى
              تُنِيرَ حَيَاتَكَ.
            </p>
            <p>
              عن عائشة -رضي الله عنها- قالتْ: قالَ رسولُ اللهِ -صلى الله عليه
              وسلم-: «الذي يقرَأُ القرآنَ وهو مَاهِرٌ به مع السَّفَرَةِ
              الكِرَامِ البَرَرَةِ، والذي يقرَأُ القرآنَ ويَتَتَعْتَعُ فيه وهو
              عليه شَاقٌ لَهُ أجْرَانِ».
            </p>
            <button>أَقْرَب مَدْرَسَةٍ</button>
            <button>اِدْعَمْنَا</button>
          </div>
          <img src={firstImage} alt="" />
        </section>
        <section id="el--2">
          <div>
            <h2>مِنْ نَحْنُ؟</h2>
            <p>
              - مَجْمُوعَة مِنْ اَلْمُبَرْمَجَيْنِ نُرِيد اَلْخَيْرُ لِلنَّاسِ
              وَنَشْرِ تَحْفِيظِ اَلْقُرْآنِ وَتَعْلِيمِ اَلْعُلُومِ
              اَلشَّرْعِيَّةِ وَمِنْ خِلَالِنَا تَعَلُّمُ اَلْكَثِيرِ بِفَضْلٍ
              لِلَّهِ.S
            </p>
            <p>
              - قُمْنَا بِإِنْشَاءِ هَذَا اَلْمَوْقِعِ لِلْمُسَاعَدَةِ وَلَا
              نُرْجَى إِلَّا اَلثَّوَابُ مِنْ اَللَّهِ.
            </p>
          </div>
          <div>
            <img src={aboutUsImage} />
          </div>
        </section>
        <section id="el--3">
          <h2>خِدْمَاتُنَا</h2>
          <div className="card" id="card-1">
            <div>
              <img src={searchIcon} />
            </div>
            <div>
              <p>- مَعْرِفَة أَقْرَبِ اَلْمَدَارِسِ اَلْقُرْآنِيَّةِ.</p>
              <p>
                - يُمْكِنَ اَلْبَحْثُ عَنْ مَدْرَسَةٍ بِاسْمِ اَلْمِنْطَقَةِ.
              </p>
            </div>
          </div>
          <div className="card" id="card-2">
            <div>
              <img src={identityICon} />
            </div>
            <div>
              <p>- اَلتَّحَقُّق مِنْ مَوْجُودٍ اَلْمَدْرَسَةِ.</p>
              <p>- اَلتَّحَقُّق مِنْ هُوِيَّةِ صَاحِبِ اَلْمَدْرَسَةِ.</p>
            </div>
          </div>
          <div className="card" id="card-3">
            <div>
              <img src={paymentICon} />
            </div>
            <div>
              <p>
                - تَحْدِيدٌ إِذَا مَا كَانَتْ اَلْمَدْرَسَةُ مَدْفُوعَةً أَوْ
                مَجَّانِيَّةٍ.
              </p>
              <p>- إِظْهَارُ أَسْعَارِ اَلْمَدَارِسِ .</p>
            </div>
          </div>
        </section>
        <section id="el--4">
          <h2>تُوَاصِلَ مَعَنَا</h2>
          <form>
            <div>
              <p>اَلِاسْم</p>
              <input type="text" id="name" placeholder="اَلِاسْم" />
            </div>
            <div>
              <p>اَلْبَرِيد اَلْإِلِكْتِرُونِيِّ</p>
              <input
                type="email"
                id="email"
                placeholder="اَلْبَرِيد اَلْإِلِكْتِرُونِيِّ"
              />
            </div>
            <div>
              <p>رَقْم اَلْهَاتِفِ</p>
              <input type="email" id="email" placeholder="رَقْم اَلْهَاتِفِ" />
            </div>
            <input type="submit" />
          </form>
        </section>
      </article>
    );
  }
}
export default Main;
