
const BASE_URL = 'https://openlibrary.org';


export async function fetchBooks(query = 'javascript') {
    try {
        const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=8`);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

      
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


export async function searchBooks(title) {
    return fetchBooks(title);
}