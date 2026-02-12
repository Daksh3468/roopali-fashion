'use server';

import { saveProduct, deleteProduct, updateProduct } from "@/data/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(password: string) {
    if (password === "admin123") {
        // Await the cookies() call
        const cookieStore = await cookies();
        cookieStore.set("admin_auth", "true", { httpOnly: true, path: "/" });
        return true;
    }
    return false;
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_auth");
    redirect("/login");
}

export async function logoutAndRedirectAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_auth");
    redirect("/");
}


export async function addProductAction(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string || ""; // Allow empty

    if (!name || isNaN(price) || !category) {
        throw new Error("Missing required fields");
    }

    await saveProduct({ name, price, category, image });

    // Comprehensive revalidation
    revalidatePath('/admin');
    revalidatePath(`/collection/${category}`);
    revalidatePath('/');
}

export async function deleteProductAction(id: number) {
    // Get product first to know category for revalidation
    const { getAllProducts } = await import("@/data/products");
    const products = await getAllProducts();
    const product = products.find(p => p.id === id);

    await deleteProduct(id);

    revalidatePath('/admin');
    if (product) revalidatePath(`/collection/${product.category}`);
    revalidatePath('/');
}

export async function updateProductImageAction(id: number, imageUrl: string) {
    await updateProduct(id, { image: imageUrl });

    const { getAllProducts } = await import("@/data/products");
    const products = await getAllProducts();
    const product = products.find(p => p.id === id);

    revalidatePath('/admin');
    if (product) revalidatePath(`/collection/${product.category}`);
    revalidatePath('/');
}

// Category Actions
import { saveCategory as saveCat, deleteCategory as delCat } from "@/data/categories";
export async function addCategoryAction(formData: FormData) {
    const name = formData.get('name') as string;
    const id = formData.get('id') as string; // slug
    const description = formData.get('description') as string;
    const image = formData.get('image') as string || ""; // Allow empty

    if (!name || !id) return;
    await saveCat({ id, name, description, image });

    revalidatePath('/admin');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/');
}

export async function deleteCategoryAction(id: string) {
    await delCat(id);
    revalidatePath('/admin');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/');
}

// Content Actions
import { updateHeroContent as updateHero } from "@/data/content";
export async function updateHeroAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const buttonText = formData.get('buttonText') as string;
    const image = formData.get('image') as string || "";

    await updateHero({ title, description, buttonText, image });
    revalidatePath('/');
    revalidatePath('/admin');
}
