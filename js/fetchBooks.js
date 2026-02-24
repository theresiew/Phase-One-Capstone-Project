

const BASE_URL = 'https://openlibrary.org';

/**
 * Fetch books by search query from Open Library API
 */
export async function fetchBooks(query = 'javascript') {
    try {
        const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=12`);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Map API data to our book format
        return data.docs.map(book => ({
            key: book.key,
            title: book.title,
            author: book.author_name ? book.author_name[0] : 'Unknown Author',
            cover_id: book.cover_i || null,
            year: book.first_publish_year || 'N/A'
        }));

    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

/**
 * Search books by title
 */
export async function searchBooks(title) {
    return fetchBooks(title);
}