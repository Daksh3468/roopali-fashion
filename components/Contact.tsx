export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Visit Us</h2>
                <div className="divider"></div>
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-map-marked-alt"></i>
                            <div>
                                <h4>Address</h4>
                                <p>
                                    16-Shilpan Plaza, B/h P.D.M. College,
                                    <br />
                                    Krishna Nagar Main Road,
                                    <br />
                                    Rajkot – 360004
                                </p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone-alt"></i>
                            <div>
                                <h4>Phone</h4>
                                <p>
                                    <a href="tel:+919879266695">+91 98792 66695</a>
                                </p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>
                                    <a href="mailto:vimal.bangoria@gmail.com">
                                        vimal.bangoria@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fab fa-instagram"></i>
                            <div>
                                <h4>Instagram</h4>
                                <p>
                                    <a
                                        href="https://instagram.com/roopali.fashion"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        @roopali.fashion
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-file-invoice"></i>
                            <div>
                                <h4>GSTIN</h4>
                                <p>24AKAPB0886B1ZV</p>
                            </div>
                        </div>
                    </div>
                    <div className="map-container" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472608.24150029576!2d70.4512894680189!3d22.268446322189416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f0.1!3m3!1m2!1s0x3959ca68afcfdafb%3A0xa7d19b6eb7344888!2sRoopali%20Fashion!5e0!3m2!1sen!2sin!4v1770893851772!5m2!1sen!2sin&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "400px" }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
