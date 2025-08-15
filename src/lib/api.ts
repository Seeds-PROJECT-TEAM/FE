const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export class ApiError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.message || 'API 요청 실패', response.status)
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message
    }
  } catch (error) {
    console.error('API Error:', error)
    
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message
      }
    }
    
    return {
      success: false,
      error: '네트워크 오류가 발생했습니다.'
    }
  }
}

export const api = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint),
  
  post: <T>(endpoint: string, data?: any) => 
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: <T>(endpoint: string, data?: any) => 
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: <T>(endpoint: string) => 
    fetchApi<T>(endpoint, {
      method: 'DELETE',
    }),
}