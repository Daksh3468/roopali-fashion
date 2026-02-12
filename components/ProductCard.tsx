import { Product } from "@/data/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="collection-card product-card">
            <div className="product-card-img-container">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="product-card-img"
                    />
                ) : (
                    <div style={{ color: "#999" }}>
                        No Image
                    </div>
                )}

                <div className="product-card-overlay">
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>
                    </div>
                    <div className="product-price">
                        Rs. {product.price}
                    </div>
                </div>
            </div>
        </div>
    );
}
