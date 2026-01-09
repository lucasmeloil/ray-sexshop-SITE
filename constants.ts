import type { Product, NavLink, AdminUser, HeroSlide, PageBanner } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Início', id: 'home' },
  { name: 'Catálogo', id: 'catalog' },
  { name: 'Sobre', id: 'about' },
  { name: 'Contato', id: 'contact' },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [];

export const INITIAL_SLIDES: HeroSlide[] = [];

export const INITIAL_PAGE_BANNERS: PageBanner[] = [];

// Helper to generate extra images for demo
const getImages = (mainUrl: string) => [
    mainUrl,
    'https://placehold.co/300x300/ef4444/ffffff?text=Foto+2',
    'https://placehold.co/300x300/1f2937/ffffff?text=Foto+3'
];

export const INITIAL_PRODUCTS: Product[] = [];
