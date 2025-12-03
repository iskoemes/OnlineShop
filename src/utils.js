export const sampleProducts = [
    {
        id: 'p1',
        title: 'Oversize Hoodie',
        description: 'Уютный худи из плотного хлопка',
        price: 45,
        category: 'men',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['black', 'gray', 'white'],
        imageUrl: 'https://placehold.co/600x400?text=Hoodie',
        createdAt: Date.now(),
        isActive: true
    },
    {
    id: 'p2',
    title: 'Летняя футболка',
    description: 'Лёгкая футболка для лета',
    price: 20,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['white', 'blue'],
    imageUrl: 'https://placehold.co/600x400?text=T-Shirt',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    isActive: true
    },
    {
    id: 'p3',
    title: 'Детские шорты',
    description: 'Удобные шорты для игры на улице',
    price: 18,
    category: 'kids',
    sizes: ['S', 'M'],
    colors: ['red', 'green'],
    imageUrl: 'https://placehold.co/600x400?text=Shorts',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    isActive: true
    }
];

export const save = (key, v) => localStorage.setItem(key, JSON.stringify(v));

export const load = (key, fallback) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
} 