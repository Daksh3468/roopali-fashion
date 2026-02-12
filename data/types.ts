export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

export interface Category {
    id: string; // slug
    name: string;
    description: string;
    image: string;
}

export interface HeroContent {
    title: string;
    description: string;
    buttonText: string;
    image: string;
}

export interface AboutContent {
    title: string;
    content: string;
}

export interface BornBabyContent {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
}

export interface SiteContent {
    hero: HeroContent;
    about: AboutContent;
    bornBaby: BornBabyContent;
}
