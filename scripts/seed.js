const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE_URL')) {
    console.error('Please provide valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
    console.log('Starting seed process...');

    // 1. Seed Categories
    console.log('Seeding categories...');
    const categories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf8')).map(cat => {
        const { link, ...rest } = cat; // Omit link as it can be derived or added later
        return rest;
    });

    const { error: catError } = await supabase.from('categories').upsert(categories);
    if (catError) {
        console.error('Error seeding categories:', catError);
        return;
    }
    console.log('Categories seeded successfully.');

    // 2. Seed Products
    console.log('Seeding products...');
    const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8')).map(prod => {
        // Ensure id is a number if it's a timestamp string
        if (typeof prod.id === 'string' && !isNaN(prod.id)) {
            prod.id = parseInt(prod.id);
        }
        return prod;
    });

    const { error: prodError } = await supabase.from('products').upsert(products);
    if (prodError) {
        console.error('Error seeding products:', prodError);
    } else {
        console.log('Products seeded successfully.');
    }

    // 3. Seed Site Content
    console.log('Seeding site content...');
    const content = JSON.parse(fs.readFileSync('./data/content.json', 'utf8'));
    const { error: contentError } = await supabase.from('site_content').upsert([{ id: 1, content }]);
    if (contentError) {
        console.error('Error seeding site content:', contentError);
    } else {
        console.log('Site content seeded successfully.');
    }

    console.log('Seed process finished.');
}

seed();
