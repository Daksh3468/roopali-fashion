import { createClient } from '@/utils/supabase/server';
import { Category } from './types';

export async function getAllCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
    return data || [];
}

export async function saveCategory(category: Category) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('categories')
        .upsert([category])
        .select()
        .single();

    if (error) {
        console.error("Error saving category:", error);
        throw error;
    }
    return data;
}

export async function deleteCategory(id: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}
