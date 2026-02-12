import Image from "next/image";
import { BornBabyContent } from "@/data/types";

interface BornBabyProps {
    content: BornBabyContent;
}

export default function BornBaby({ content }: BornBabyProps) {
    const renderImage = (src: string, alt: string) => {
        if (!src) {
            return (
                <div style={{
                    width: "100%",
                    height: "100%",
                    background: "#eee",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#999",
                    fontSize: "1.2rem",
                    textAlign: "center"
                }}>
                    No Image
                </div>
            );
        }
        return <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
        />;
    };

    return (
        <section id="born-baby" className="born-baby section">
            <div className="container">
                <h2>{content.title || "Born Baby Essentials"}</h2>
                <div className="divider"></div>
                <div className="born-baby-content">
                    <div className="born-baby-image-wrapper">
                        <div className="born-baby-image">
                            {renderImage(content.image, content.title)}
                        </div>
                    </div>
                    <div className="born-baby-text">
                        <h3>{content.subtitle || "Softest Touch for New Beginnings"}</h3>
                        <p>
                            {content.description || "Welcoming a new member to the family is a special joy."}
                        </p>
                        <ul className="born-baby-features">
                            {content.features && content.features.length > 0 ? content.features.map((feature, idx) => (
                                <li key={idx}>
                                    <i className="fas fa-heart"></i> {feature}
                                </li>
                            )) : (
                                <>
                                    <li>
                                        <i className="fas fa-heart"></i> Organic Cotton Rompers
                                    </li>
                                    <li>
                                        <i className="fas fa-heart"></i> Soft Bedding Sets
                                    </li>
                                    <li>
                                        <i className="fas fa-heart"></i> Baby Accessories & Gifts
                                    </li>
                                </>
                            )}
                        </ul>
                        <a href="#contact" className="btn btn-primary">Visit Store/Contact</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
