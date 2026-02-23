// ========================================
// FAVORITES MODULE - favorites.js
// ========================================

const STORAGE_KEY = 'bookExplorerFavorites';

export function getFavorites() {
    try {
        const favorites = localStorage.getItem(STORAGE_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error reading favorites:', error);
        return [];
    }
}

export function addFavorite(book) {
    try {
        const favorites = getFavorites();
        if (isFavorite(book.key)) return false;
        favorites.push(book);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return true;
    } catch (error) {
        console.error('Error adding favorite:', error);
        return false;
    }
}

export function removeFavorite(bookKey) {
    try {
        const favorites = getFavorites();
        const filtered = favorites.filter(book => book.key !== bookKey);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error removing favorite:', error);
        return false;
    }
}

export function isFavorite(bookKey) {
    return getFavorites().some(book => book.key === bookKey);
}

export function getFavoritesCount() {
    return getFavorites().length;
}