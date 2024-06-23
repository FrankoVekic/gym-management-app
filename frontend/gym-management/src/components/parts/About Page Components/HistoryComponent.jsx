import Statics from "../../static utils/Statics";

export default function HistoryComponent() {
  return (
    <section className="bg-light py-5 border-bottom">
      <div className="container px-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bolder">Our History</h2>
          <p className="lead mb-0">Explore our journey towards excellence</p>
        </div>
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-6">
            <div className="timeline">
              <div className="timeline-item mb-4">
                <h4 className="timeline-title">Founded in 2010</h4>
                <p className="text-muted">Founded in 2010 with a passion for transforming lives through fitness and wellness.</p>
                <img src={Statics.imagesBaseUrl + "founded.jpg"} alt="Founded in 2010" className="trainer-image" />
              </div>
              <div className="timeline-item mb-4">
                <h4 className="timeline-title">Expansion in 2015</h4>
                <p className="text-muted">In 2015, we expanded our offerings to include specialized yoga, HIIT, and rehabilitation programs, catering to diverse fitness needs.</p>
                <img src={Statics.imagesBaseUrl + "opening.jpg"} alt="Expansion in 2015" className="trainer-image" />
              </div>
              <div className="timeline-item mb-4">
                <h4 className="timeline-title">Award-Winning in 2020</h4>
                <p className="text-muted">Recognized in 2020 with prestigious awards for our commitment to innovation and client satisfaction.</p>
                <img src={Statics.imagesBaseUrl + "award.jpg"} alt="Award-Winning in 2020" className="trainer-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
