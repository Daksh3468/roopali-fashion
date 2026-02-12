import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { getSiteContent } from "@/data/content";
import AdminClient from "./AdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const products = getAllProducts();
    const categories = getAllCategories();
    const content = getSiteContent();

    return <AdminClient initialProducts={products} initialCategories={categories} initialContent={content} />;
}
