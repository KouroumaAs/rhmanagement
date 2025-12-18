import { API_ENDPOINTS } from "@/src/constants";
import { get, post, put, del, upload } from "./api";
import type { Employee, EmployeeFormData, ApiResponse, PaginatedResponse } from "@/src/types";

/**
 * Employee Service
 * Handles all employee-related API calls
 */

export const employeesService = {
  /**
   * Get all employees with optional filters
   */
  async getAll(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    type?: string;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<Employee>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.pageSize) queryParams.append("pageSize", params.pageSize.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.type && params.type !== "TOUS") queryParams.append("type", params.type);
    if (params?.status && params.status !== "TOUS") queryParams.append("status", params.status);

    const endpoint = `${API_ENDPOINTS.EMPLOYEES}?${queryParams.toString()}`;
    return get<PaginatedResponse<Employee>>(endpoint);
  },

  /**
   * Get a single employee by ID
   */
  async getById(id: string): Promise<ApiResponse<Employee>> {
    return get<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
  },

  /**
   * Create a new employee
   */
  async create(data: EmployeeFormData): Promise<ApiResponse<Employee>> {
    if (data.photo) {
      // If there's a photo, use multipart/form-data
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : value.toString());
        }
      });
      return upload<Employee>(API_ENDPOINTS.EMPLOYEES, formData);
    } else {
      // Otherwise, use JSON
      return post<Employee>(API_ENDPOINTS.EMPLOYEES, data);
    }
  },

  /**
   * Update an existing employee
   */
  async update(id: string, data: Partial<EmployeeFormData>): Promise<ApiResponse<Employee>> {
    if (data.photo) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : value.toString());
        }
      });
      return upload<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), formData);
    } else {
      return put<Employee>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), data);
    }
  },

  /**
   * Delete an employee
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return del<void>(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
  },

  /**
   * Transfer employee to print service
   */
  async transferToPrint(id: string): Promise<ApiResponse<void>> {
    return post<void>(`${API_ENDPOINTS.EMPLOYEE_BY_ID(id)}/transfer-to-print`);
  },
};