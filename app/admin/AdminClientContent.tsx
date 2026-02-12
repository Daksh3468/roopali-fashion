"use client";

import { addProductAction, deleteProductAction, updateProductImageAction, logoutAction } from "../actions";
import { Product, Category, SiteContent } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface AdminClientProps {
    initialProducts: Product[];
    initialCategories: Category[];
    initialContent: SiteContent;
}

export default function AdminClientContent({ initialProducts, initialCategories, initialContent }: AdminClientProps) {
    const [activeTab, setActiveTab] = useState<"products" | "categories" | "content">("products");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newImage, setNewImage] = useState("");

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
                    borderRadius: "10px",
                    color: "#999",
                    fontSize: "0.8rem",
                    textAlign: "center"
                }}>
                    No Image
                </div>
            );
        }
        return <Image src={src} alt={alt} fill style={{ objectFit: "cover", borderRadius: "10px" }} />;
    };

    return (
        <div className="container" style={{ padding: "50px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h1>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => {
                            import("../actions").then(mod => mod.logoutAndRedirectAction());
                        }}
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                        Visit Site & Logout
                    </button>
                    <form action={logoutAction}>
                        <button type="submit" className="btn btn-secondary" style={{ background: '#333', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer' }}>Logout</button>
                    </form>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "30px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                <button
                    onClick={() => setActiveTab("products")}
                    style={{ padding: "10px 20px", background: activeTab === "products" ? "var(--primary-color)" : "transparent", color: activeTab === "products" ? "white" : "var(--text-color)", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    style={{ padding: "10px 20px", background: activeTab === "categories" ? "var(--primary-color)" : "transparent", color: activeTab === "categories" ? "white" : "var(--text-color)", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Categories
                </button>
                <button
                    onClick={() => setActiveTab("content")}
                    style={{ padding: "10px 20px", background: activeTab === "content" ? "var(--primary-color)" : "transparent", color: activeTab === "content" ? "white" : "var(--text-color)", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Homepage Content
                </button>
            </div>

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
                    {/* Add Product Form */}
                    <div style={{ background: "var(--card-bg)", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", height: "fit-content" }}>
                        <h2>Add New Product</h2>
                        <form action={async (formData) => {
                            await addProductAction(formData);
                            // For direct updates on the site, revalidatePath is usually enough, 
                            // but client components might need local state update or router.refresh()
                            window.location.reload();
                        }} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Product Name</label>
                                <input type="text" name="name" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Price (Rs.)</label>
                                <input type="number" name="price" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category</label>
                                <select name="category" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }}>
                                    {initialCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <ImageUpload name="image" label="Product Image" />
                            <button type="submit" className="btn btn-primary" style={{ marginTop: "10px", border: "none" }}>Add Product</button>
                        </form>
                    </div>

                    {/* Product List */}
                    <div>
                        <h2>Current Inventory ({initialProducts.length})</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px", maxHeight: "600px", overflowY: "auto" }}>
                            {initialProducts.map((product) => (
                                <div key={product.id} style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px", border: "1px solid var(--input-border)", borderRadius: "10px", background: "var(--card-bg)" }}>
                                    <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
                                        {renderImage(product.image, product.name)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>{product.name}</h3>
                                        <p style={{ color: "var(--text-color)", opacity: 0.7, fontSize: "0.9rem" }}>{product.category}</p>
                                        <p style={{ fontWeight: "bold", color: "var(--primary-color)" }}>Rs. {product.price}</p>

                                        {editingId === product.id ? (
                                            <div style={{ marginTop: "10px" }}>
                                                <p style={{ marginBottom: "5px" }}>Update Image:</p>
                                                {/* Simplified edit: just text input for now or upload if we expand this */}
                                                <div style={{ display: "flex", gap: '10px' }}>
                                                    <input
                                                        type="text"
                                                        value={newImage}
                                                        onChange={(e) => setNewImage(e.target.value)}
                                                        placeholder="Paste new Image URL or Base64"
                                                        style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "1px solid #ddd" }}
                                                    />
                                                    <button onClick={async () => {
                                                        await updateProductImageAction(product.id, newImage);
                                                        setEditingId(null);
                                                        window.location.reload();
                                                    }} style={{ background: "green", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Save</button>
                                                    <button onClick={() => setEditingId(null)} style={{ background: "gray", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                            </div>
                                        )
                                        }
                                    </div>
                                    <form action={async () => {
                                        if (confirm('Are you sure?')) {
                                            await deleteProductAction(product.id);
                                            window.location.reload();
                                        }
                                    }}>
                                        <button type="submit" style={{ background: "#ff4444", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
            }

            {/* CATEGORIES TAB */}
            {
                activeTab === "categories" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }}>
                        <div style={{ background: "var(--card-bg)", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", height: "fit-content" }}>
                            <h2>Add Category</h2>
                            <form action={async (formData) => {
                                await import("../actions").then(mod => mod.addCategoryAction(formData));
                                window.location.reload();
                            }} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Name</label>
                                    <input type="text" name="name" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Slug (ID)</label>
                                    <input type="text" name="id" placeholder="e.g. summer-wear" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Description</label>
                                    <input type="text" name="description" required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                                </div>
                                <ImageUpload name="image" label="Category Image" />
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Category</button>
                            </form>
                        </div>
                        <div>
                            <h2>Existing Categories</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                {initialCategories.map(cat => (
                                    <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "20px", padding: "15px", border: "1px solid var(--input-border)", borderRadius: "10px", background: "var(--card-bg)" }}>
                                        <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
                                            {renderImage(cat.image, cat.name)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3>{cat.name}</h3>
                                            <p>{cat.description}</p>
                                        </div>
                                        <form action={async () => {
                                            if (confirm('Delete category?')) {
                                                await import("../actions").then(mod => mod.deleteCategoryAction(cat.id));
                                                window.location.reload();
                                            }
                                        }}>
                                            <button type="submit" style={{ background: "#ff4444", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div >
                )
            }

            {/* CONTENT TAB */}
            {
                activeTab === "content" && (
                    <div style={{ maxWidth: "800px" }}>
                        <h2>Homepage Content</h2>

                        <div style={{ marginTop: "30px", background: "var(--card-bg)", padding: "30px", borderRadius: "20px" }}>
                            <h3>Hero Section</h3>
                            <form action={async (formData) => {
                                await import("../actions").then(mod => mod.updateHeroAction(formData));
                                window.location.reload();
                            }} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Hero Title</label>
                                    <input type="text" name="title" defaultValue={initialContent.hero.title} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Hero Description</label>
                                    <textarea name="description" defaultValue={initialContent.hero.description} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)", minHeight: "100px" }} />
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }}>Button Text</label>
                                    <input type="text" name="buttonText" defaultValue={initialContent.hero.buttonText} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid var(--input-border)", background: "var(--input-bg)", color: "var(--text-color)" }} />
                                </div>
                                <ImageUpload name="image" label="Hero Image" defaultValue={initialContent.hero.image} />
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update Hero</button>
                            </form>
                        </div>
                    </div>
                )
            }

        </div >
    );
}
