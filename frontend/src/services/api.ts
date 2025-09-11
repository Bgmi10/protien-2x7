const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Generic fetch wrapper with credentials
async function fetchWithCredentials(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Always include cookies
  });

  if (!response.ok && response.status === 401) {
    // Redirect to login if unauthorized
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  return response;
}

// Meal Plans API
export const mealPlansApi = {
  // Public endpoints
  async getAll() {
    const response = await fetchWithCredentials('/api/v1/meal-plans');
    return response.json();
  },

  async getById(id: number) {
    const response = await fetchWithCredentials(`/api/v1/meal-plans/${id}`);
    return response.json();
  },

  // Admin endpoints
  async getAllAdmin() {
    const response = await fetchWithCredentials('/api/v1/meal-plans/admin/all');
    return response.json();
  },

  async create(data: any) {
    const response = await fetchWithCredentials('/api/v1/meal-plans/admin/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: number, data: any) {
    const response = await fetchWithCredentials(`/api/v1/meal-plans/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: number) {
    const response = await fetchWithCredentials(`/api/v1/meal-plans/admin/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  async reorder(orders: Array<{ id: number; display_order: number }>) {
    const response = await fetchWithCredentials('/api/v1/meal-plans/admin/reorder', {
      method: 'POST',
      body: JSON.stringify({ orders }),
    });
    return response.json();
  },

  async getStats() {
    const response = await fetchWithCredentials('/api/v1/meal-plans/admin/stats');
    return response.json();
  },
};

// Auth API
export const authApi = {
  async login(email: string, password: string) {
    const response = await fetchWithCredentials('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async logout() {
    const response = await fetchWithCredentials('/api/v1/auth/logout', {
      method: 'POST',
    });
    return response.json();
  },

  async verify() {
    const response = await fetchWithCredentials('/api/v1/auth/verify');
    return response.json();
  },

  async getAdminProfile() {
    const response = await fetchWithCredentials('/api/v1/auth/admin/profile');
    return response.json();
  },

  async initAdmin() {
    const response = await fetchWithCredentials('/api/v1/auth/init-admin', {
      method: 'POST',
    });
    return response.json();
  },
};