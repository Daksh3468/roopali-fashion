import Link from "next/link";
import Image from "next/image";
import { HeroContent } from "@/data/types";

interface HeroProps {
    content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
    const renderImage = (src: string, alt: string) => {
        if (!src) {
            return (
                <div style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--card-bg)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomLeftRadius: "100px",
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
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", borderBottomLeftRadius: "100px" }}
            id="hero-img"
            priority
        />;
    };

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>{content.title || "Style for Little Stars"}</h1>
                <p style={{ textAlign: "justify" }}>
                    {content.description || "Discover the finest collection of baby and kids clothing."}
                </p>
                <Link  href="#collection" className="btn btn-primary" style={{ textAlign: "justify" }}>
                    {content.buttonText || "Shop Collection"}
                </Link>
            </div>
            <div className="hero-image">
                <div className="hero-image-inner">
                    {renderImage(content.image, content.title)}
                </div>
            </div>
        </section>
    );
}
