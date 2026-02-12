import fs from 'fs';
import path from 'path';
import { SiteContent } from './types';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export function getSiteContent(): SiteContent {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading content:", error);
        // Return default fallback if file missing
        return {
            hero: { title: "", description: "", buttonText: "", image: "" },
            about: { title: "", content: "" },
            bornBaby: { title: "", subtitle: "", description: "", image: "public/images/born_baby.jpg", features: [] }
        };
    }
}

export function saveSiteContent(content: SiteContent) {
    fs.writeFileSync(dataFilePath, JSON.stringify(content, null, 2));
}

export function updateHeroContent(hero: Partial<SiteContent['hero']>) {
    const content = getSiteContent();
    content.hero = { ...content.hero, ...hero };
    saveSiteContent(content);
}
