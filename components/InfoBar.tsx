export default function InfoBar() {
    return (
        <section className="info-bar">
            <div className="container">
                <div className="info-item">
                    <i className="fas fa-store"></i>
                    <div>
                        <h3>Est. 2005</h3>
                        <p>Serving since 25+ Years</p>
                    </div>
                </div>
                <div className="info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                        <h3>Prime Location</h3>
                        <p>Swaminarayan Chowk, Rajkot</p>
                    </div>
                </div>
                <div className="info-item">
                    <i className="fas fa-clock"></i>
                    <div>
                        <h3>Open All Days</h3>
                        <p>9:00 AM – 9:00 PM</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
