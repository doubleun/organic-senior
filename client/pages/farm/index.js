import Layout from "../layout/_layout";
import FarmImages from "./_farmImages";
import Image from "next/image";

import { useState } from "react";

export default function Farm() {
  const [readMore, setReadMore] = useState(false);
  return (
    <main>
      {/* Farm details */}
      <section className="farmDetails">
        <FarmImages />
        <div className="container farmContainer">
          <div className="farmProfileRow">
            {/* Farm name and address */}
            <Image src="/images/farmProfile.jpg" width="120px" height="120px" />
            <div className="flexProfile">
              <div>
                <h3>BusyPuzzle</h3>
                <p>Organically made from hearts of local</p>
              </div>
              <p>3,211 sales</p>
            </div>

            <div className="farmLocation">
              <h5>Address</h5>
              <p>Province: Lampamg</p>
              <p>District: Mueang</p>
              <p>Sub-District: Prabaht</p>
              <p>Postal-Code: 52000</p>
            </div>
          </div>

          {/* About farm */}
          <div className="farmAboutRow">
            <div className="farmAboutAnnouncement">
              <h5>Announcement</h5>
              <p>Last updated on Sep 26, 2020</p>
            </div>
            <div className="farmAbout">
              <h5>About</h5>
              <p id={readMore ? undefined : "more"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
                harum distinctio nobis, ut doloribus autem sed iure, corporis
                exercitationem rerum alias. Veritatis saepe inventore impedit
                alias tempora veniam deserunt voluptate! Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Ratione autem nostrum tempora
                accusantium maiores voluptas, harum impedit eum. Quod, ullam.
              </p>
              <a onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read more" : "Read less"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Farm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
