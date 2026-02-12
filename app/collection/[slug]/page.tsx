import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Correct typing for Next.js 15 App Router params
// Page props are now asynchronous in some contexts, but simple params interface usually works. 
// However, strictly speaking, params is a Promise in the latest Next.js 15 edge cases, but generated types often use standard props.
// Let's use the standard standard: { params: { slug: string } }
// But wait, creating 'app/collection/[slug]/page.tsx' means params will have 'slug'.
// The folder name I used in path is 'slug'.

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const products = await getProductsByCategory(slug);

    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    return (
        <main>
            <Header />
            <section className="about">
                <div className="container">
                    <h1 style={{ marginTop: "100px", textAlign: "center" }}>{title}</h1>
                    <div className="divider"></div>

                    {products.length > 0 ? (
                        <div className="collection-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: "center" }}>No products found in this category.</p>
                    )}

                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <a href="/" className="btn btn-primary">Back to Home</a>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
