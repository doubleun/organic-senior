// Component imports
import Layout from "../layout/_layout";

export default function ContactPage() {
  return (
    <main className="contactPageMain">
      <section className="contactPageContent container">
        {/* (Top part) location, contact info */}
        <div className="locationContactInfo">
          {/* Location flex */}
          <div className="locationContactInnerFlex">
            <h3>THIALAND, CHIANG RAI</h3>
            <p>
              333 Tha Sut, Amphoe Mueang Chiang Rai, Chang Wat Chiang Rai 57100
            </p>
          </div>
          {/* Contact info flex */}
          <div className="locationContactInnerFlex">
            <h3>CONTACT INFO</h3>
            <p>Tel: 090-000-0000</p>
            <p>Email: 6131501052@lamduan.mfu.ac.th</p>
          </div>
        </div>
      </section>

      {/* Footer image */}
      <section className="contactPageFooter">
        <h1>Thank you for supporting our platform</h1>
      </section>
    </main>
  );
}

ContactPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
