/**
 * Utility functions for text and data formatting
 */

/**
 * Format a date to a readable string (e.g., "24 Juni 2024")
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'id-ID')
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'id-ID') => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

/**
 * Format a relative time (e.g., "3 jam yang lalu")
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'id-ID')
 * @returns {string} Relative time string
 */
export const timeAgo = (date, locale = 'id-ID') => {
    if (!date) return '';
    const now = new Date();
    const dateObj = new Date(date);
    const diff = now - dateObj;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 30) return formatDate(date, locale);
    if (days > 0) return `${days} hari yang lalu`;
    if (hours > 0) return `${hours} jam yang lalu`;
    if (minutes > 0) return `${minutes} menit yang lalu`;
    return 'Baru saja';
};

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

/**
 * Strip HTML tags from text
 * @param {string} html - HTML string to clean
 * @returns {string} Text without HTML tags
 */
export const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
    if (!text) return '';
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Format a slug from text
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
export const slugify = (text) => {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};