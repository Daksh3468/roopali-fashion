import Link from "next/link";
import Image from "next/image";
import { Category } from "@/data/types";

interface CollectionGridProps {
    categories: Category[];
}

export default function CollectionGrid({ categories }: CollectionGridProps) {
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
                    color: "#999",
                    fontSize: "0.9rem",
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
        <section id="collection" className="collection">
            <div className="container">
                <h2>Our Collections</h2>
                <div className="divider"></div>
                <div className="collection-grid">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Link key={category.id} href={`/collection/${category.id}`} className="collection-card">
                                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                    {renderImage(category.image, category.name)}
                                </div>
                                <div className="overlay">
                                    <h3>{category.name}</h3>
                                    <p>{category.description}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", gridColumn: "1 / -1", padding: "40px" }}>No collections added yet.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
