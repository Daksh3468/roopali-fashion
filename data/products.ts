import { createClient } from '@/utils/supabase/server';
import { Product } from './types';

export type { Product };

export async function getAllProducts(): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }
    return data || [];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('id', { ascending: false });

    if (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
    return data || [];
}

export async function saveProduct(product: Omit<Product, 'id'>) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error("Error saving product:", error);
        throw error;
    }
    return data;
}

export async function deleteProduct(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

export async function updateProduct(id: number, updates: Partial<Product>) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

