"use client";

import { useState, useCallback } from "react";
import { employeesService } from "@/src/services/employees.service";
import type { Employee, EmployeeFormData, PaginatedResponse } from "@/src/types";

interface UseEmployeesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: string;
  status?: string;
}

interface UseEmployeesReturn {
  employees: Employee[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchEmployees: (params?: UseEmployeesParams) => Promise<void>;
  getEmployee: (id: string) => Promise<Employee | null>;
  createEmployee: (data: EmployeeFormData) => Promise<Employee | null>;
  updateEmployee: (id: string, data: Partial<EmployeeFormData>) => Promise<Employee | null>;
  deleteEmployee: (id: string) => Promise<boolean>;
  transferToPrint: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async (params?: UseEmployeesParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.getAll(params);

      if (response.success && response.data) {
        setEmployees(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setPageSize(response.data.pageSize);
        setTotalPages(response.data.totalPages);
      } else {
        setError(response.error || "Échec du chargement des employés");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEmployee = useCallback(async (id: string): Promise<Employee | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.getById(id);

      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || "Employé non trouvé");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEmployee = useCallback(async (data: EmployeeFormData): Promise<Employee | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.create(data);

      if (response.success && response.data) {
        // Refresh the list
        await fetchEmployees({ page, pageSize });
        return response.data;
      } else {
        setError(response.error || "Échec de la création de l'employé");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchEmployees, page, pageSize]);

  const updateEmployee = useCallback(async (
    id: string,
    data: Partial<EmployeeFormData>
  ): Promise<Employee | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.update(id, data);

      if (response.success && response.data) {
        // Update the employee in the list
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? response.data! : emp))
        );
        return response.data;
      } else {
        setError(response.error || "Échec de la mise à jour de l'employé");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.delete(id);

      if (response.success) {
        // Remove the employee from the list
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        setTotal((prev) => prev - 1);
        return true;
      } else {
        setError(response.error || "Échec de la suppression de l'employé");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const transferToPrint = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await employeesService.transferToPrint(id);

      if (response.success) {
        // Refresh the list
        await fetchEmployees({ page, pageSize });
        return true;
      } else {
        setError(response.error || "Échec du transfert vers l'impression");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchEmployees, page, pageSize]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    employees,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    error,
    fetchEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    transferToPrint,
    clearError,
  };
}
