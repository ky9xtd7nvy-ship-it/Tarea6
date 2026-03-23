export interface Usuario {
  _id?: string; // Para usuarios obtenidos de la API
  id?: number;  // Para usuarios creados localmente
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  password?: string; // Solo para el formulario de alta
}

export interface RespuestaUsuarios {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Usuario[]; // Aquí mapeamos el array 'data' de tu JSON
}
