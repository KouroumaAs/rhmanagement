import axios from '@/src/lib/axios';

export type EmployeeType =
  | 'PERSONNELS_DSD'
  | 'DNTT'
  | 'STAGIAIRES_DSD'
  | 'BANQUES'
  | 'MAISONS_PLAQUE'
  | 'DNTT_STAGIAIRES'
  | 'DEMARCHEURS';

export type EmployeeStatus = 'ACTIF' | 'SUSPENDU' | 'TERMINE';

export interface CreateEmployeeDto {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  fonction: string;
  matricule: string;
  type: EmployeeType;
  dateEmbauche: string;
  dateFinContrat: string;
  photo?: string;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {
  status?: EmployeeStatus;
}

export interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  fonction: string;
  matricule: string;
  type: EmployeeType;
  status: EmployeeStatus;
  dateEmbauche: string;
  dateFinContrat: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeQuery {
  page?: number;
  limit?: number;
  type?: EmployeeType;
  status?: EmployeeStatus;
  search?: string;
}

export const employeeService = {
  // Récupérer tous les employés
  getAll: async (query?: EmployeeQuery) => {
    const params = new URLSearchParams();
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());
    if (query?.type) params.append('type', query.type);
    if (query?.status) params.append('status', query.status);
    if (query?.search) params.append('search', query.search);

    const response = await axios.get(`/employees?${params.toString()}`);
    return response.data;
  },

  // Récupérer un employé par ID
  getById: async (id: string) => {
    const response = await axios.get(`/employees/${id}`);
    return response.data;
  },

  // Créer un employé
  create: async (data: CreateEmployeeDto) => {
    const response = await axios.post('/employees', data);
    return response.data;
  },

  // Mettre à jour un employé
  update: async (id: string, data: UpdateEmployeeDto) => {
    const response = await axios.put(`/employees/${id}`, data);
    return response.data;
  },

  // Supprimer un employé
  delete: async (id: string) => {
    const response = await axios.delete(`/employees/${id}`);
    return response.data;
  },

  // Changer statut employé
  updateStatus: async (id: string, status: EmployeeStatus) => {
    const response = await axios.put(`/employees/${id}/status`, { status });
    return response.data;
  },

  // Transférer vers impression
  transferToPrint: async (id: string) => {
    const response = await axios.post(`/employees/${id}/transfer-to-print`);
    return response.data;
  },

  // Statistiques
  getStats: async () => {
    const response = await axios.get('/employees/stats');
    return response.data;
  },
};