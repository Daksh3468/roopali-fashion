import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBar from "@/components/InfoBar";
import BornBaby from "@/components/BornBaby";
import CollectionGrid from "@/components/CollectionGrid";
import Contact from "@/components/Contact";
import { getAllCategories } from "@/data/categories";
import { getSiteContent } from "@/data/content";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = getAllCategories();
  const content = getSiteContent();

  return (
    <main>
      <Header />
      <Hero content={content.hero} />
      <InfoBar />
      <CollectionGrid categories={categories} />
      <BornBaby content={content.bornBaby} /> {/* New Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <h2>{content.about.title || "Our Story"}</h2>
            <div className="divider"></div>
            <div
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html: content.about.content || `
                <p>Welcome to <strong>Roopali Fashion</strong>, your trusted destination for premium baby and kids wear in Rajkot since <strong>2005</strong>. Located at the heart of the city near Swaminarayan Chowk, we pride ourselves on offering the latest trends, comfortable fabrics, and adorable styles for your little ones.</p>
                <p>From newborn essentials to trendy outfits for growing kids, our collection is curated with love and care. We believe every child deserves to shine, and our mission is to provide quality clothing that combines style with ultimate comfort.</p>
              ` }}
            />
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
