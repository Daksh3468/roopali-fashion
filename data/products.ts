import fs from 'fs';
import path from 'path';
import { Product } from './types';

export type { Product };

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

export function getAllProducts(): Product[] {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading product data:", error);
        return [];
    }
}

export function getProductsByCategory(category: string): Product[] {
    const products = getAllProducts();
    return products.filter((product) => product.category === category);
}

export function saveProduct(product: Omit<Product, 'id'>) {
    const products = getAllProducts();
    const newProduct = { ...product, id: Date.now() }; // Simple ID generation
    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    return newProduct;
}

export function deleteProduct(id: number) {
    const products = getAllProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filteredProducts, null, 2));
}

export function updateProduct(id: number, updates: Partial<Product>) {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    }
}

// Initial Seed Data (for reference, actual data in products.json)
/*
[
    {
      "id": 1,
      "name": "Soft Cotton Romper",
      "price": 499,
      "category": "baby-wear",
      "image": ""
    }
]
*/

