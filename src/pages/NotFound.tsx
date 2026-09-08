import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BtnNormal } from "../components/Btn";

export default function NotFound() {
  return (
    <>
      <header className="section error-header theme-dark">
        <NavBar />
        <div className="container medium once-in">
          <div className="row">
            <div className="flex-col">
              <h1>404</h1>
              <p>That page never made it to production.</p>
              <div className="stripe" />
              <div className="btn-row">
                <BtnNormal href="/" label="Home">
                  Back home
                </BtnNormal>
                <BtnNormal href="/work" label="Work" className="btn-dark">
                  See the work
                </BtnNormal>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer contactPage />
    </>
  );
}
