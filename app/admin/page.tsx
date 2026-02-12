import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { getSiteContent } from "@/data/content";
import AdminClientContent from "./AdminClientContent";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const products = await getAllProducts();
    const categories = await getAllCategories();
    const content = await getSiteContent();

    return <AdminClientContent initialProducts={products} initialCategories={categories} initialContent={content} />;
}
