import { createClient } from '@/utils/supabase/server';
import { SiteContent } from './types';

export async function getSiteContent(): Promise<SiteContent> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        console.error("Error reading content:", error);
        return {
            hero: { title: "", description: "", buttonText: "", image: "" },
            about: { title: "", content: "" },
            bornBaby: { title: "", subtitle: "", description: "", image: "public/images/born_baby.jpg", features: [] }
        };
    }
    return data.content;
}

export async function saveSiteContent(content: SiteContent) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('site_content')
        .upsert([{ id: 1, content }]);

    if (error) {
        console.error("Error saving content:", error);
        throw error;
    }
}

export async function updateHeroContent(hero: Partial<SiteContent['hero']>) {
    const content = await getSiteContent();
    content.hero = { ...content.hero, ...hero };
    await saveSiteContent(content);
}
