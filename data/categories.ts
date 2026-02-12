import fs from 'fs';
import path from 'path';
import { Category } from './types';

const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');

export function getAllCategories(): Category[] {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading categories:", error);
        return [];
    }
}

export function saveCategory(category: Category) {
    const categories = getAllCategories();
    // Check if exists
    const index = categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
        categories[index] = category;
    } else {
        categories.push(category);
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
}

export function deleteCategory(id: string) {
    const categories = getAllCategories();
    const filtered = categories.filter(c => c.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2));
}
