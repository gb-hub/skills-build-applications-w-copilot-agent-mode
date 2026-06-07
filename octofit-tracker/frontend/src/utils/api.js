/**
 * API Configuration and Helper Functions
 * 
 * Environment Setup:
 * - VITE_CODESPACE_NAME must be defined in .env.local
 * - Example: VITE_CODESPACE_NAME=mycodespace
 * 
 * This will construct API URLs like:
 * https://mycodespace-8000.app.github.dev/api/[endpoint]/
 */

/**
 * Get the base API URL, with a safe fallback if VITE_CODESPACE_NAME is not set
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. Using localhost fallback. ' +
      'Please set VITE_CODESPACE_NAME in .env.local for production use.'
    );
    return 'http://localhost:8000/api';
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
}

/**
 * Build an API endpoint URL for a given path
 * @param {string} path - The API endpoint path (e.g., 'activities', 'users/123')
 * @returns {string} The full API URL
 */
export function getApiUrl(path) {
  return `${getApiBaseUrl()}/${path}/`;
}

/**
 * Fetch data from an API endpoint
 * Handles both paginated and array responses
 * @param {string} endpoint - The API endpoint path
 * @returns {Promise<Array>} Array of items (unpacks paginated responses)
 */
export async function fetchData(endpoint) {
  try {
    const response = await fetch(getApiUrl(endpoint));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle paginated responses (with 'results' key)
    if (data && data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    // Handle direct array responses
    if (Array.isArray(data)) {
      return data;
    }
    
    // Handle single object response
    if (typeof data === 'object' && data !== null) {
      return [data];
    }
    
    return [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Create a new item via POST
 * @param {string} endpoint - The API endpoint path
 * @param {object} payload - The data to send
 * @returns {Promise<object>} The created item
 */
export async function createData(endpoint, payload) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to create ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Update an item via PUT
 * @param {string} endpoint - The API endpoint path with ID (e.g., 'users/123')
 * @param {object} payload - The data to send
 * @returns {Promise<object>} The updated item
 */
export async function updateData(endpoint, payload) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to update ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Delete an item via DELETE
 * @param {string} endpoint - The API endpoint path with ID (e.g., 'users/123')
 * @returns {Promise<void>}
 */
export async function deleteData(endpoint) {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to delete ${endpoint}:`, error);
    throw error;
  }
}
