// Mock Authentication Library (No Docker/Keycloak Required)

interface MockUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface MockAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  username: string;
  roles: string[];
}

class MockAuthService {
  private baseUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://hirevia-assignment-3.onrender.com/api'
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api');
  
  async login(username: string, password: string): Promise<MockAuthResponse> {
    try {
      console.log('Login URL:', `${this.baseUrl}/auth/login`);
      console.log('Environment:', process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for CORS
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials');
        }
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_token', data.access_token);
        localStorage.setItem('mock_user', JSON.stringify({
          username: data.username,
          roles: data.roles,
        }));
      }
      
      return data;
    } catch (error: any) {
      console.error('Login error details:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Failed to connect to backend server at ${this.baseUrl}`);
      }
      throw error;
    }
  }

  async getCurrentUser(): Promise<MockUser | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Get stored user info instead of making API call
      if (typeof window === 'undefined') return null; // SSR check
      
      const userStr = localStorage.getItem('mock_user');
      if (!userStr) {
        this.logout();
        return null;
      }

      const storedUser = JSON.parse(userStr);
      
      // Return user object from stored data
      return {
        username: storedUser.username,
        roles: storedUser.roles,
        email: storedUser.username + "@example.com",
        firstName: storedUser.username.charAt(0).toUpperCase() + storedUser.username.slice(1),
        lastName: "User"
      };
    } catch (error) {
      console.error('Error getting user:', error);
      this.logout();
      return null;
    }
  }

  async register(username: string, password: string, email: string, fullName: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password, email, fullName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Registration failed: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Failed to connect to backend server at ${this.baseUrl}`);
      }
      throw error;
    }
  }

  logout(): void {
    if (typeof window === 'undefined') return; // SSR check
    localStorage.removeItem('mock_token');
    localStorage.removeItem('mock_user');
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null; // SSR check
    return localStorage.getItem('mock_token');
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false; // SSR check
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    if (typeof window === 'undefined') return false; // SSR check
    
    const userStr = localStorage.getItem('mock_user');
    if (!userStr) return false;
    
    const user = JSON.parse(userStr);
    return user.roles?.includes(role) || false;
  }

  // Mock users for testing
  getMockUsers() {
    return [
      {
        username: 'testuser',
        password: 'password123',
        roles: ['USER'],
        description: 'Regular user - can access dashboard and assessment'
      },
      {
        username: 'admin',
        password: 'admin123',
        roles: ['USER', 'ADMIN'],
        description: 'Admin user - can access all areas including admin panel'
      }
    ];
  }
}

export const mockAuth = new MockAuthService();
export type { MockUser, MockAuthResponse };
