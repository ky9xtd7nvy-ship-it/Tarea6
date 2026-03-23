import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, RespuestaUsuarios } from '../interfaces/usuario.interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _http = inject(HttpClient);
  private _urlBase = 'https://peticiones.online';

  listaUsuarios = signal<Usuario[]>([]);

  async obtenerTodos() {
    try {
      const respuesta = await firstValueFrom(this._http.get<RespuestaUsuarios>(this._urlBase));
      this.listaUsuarios.set(respuesta.data);
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    }
  }

  obtenerPorId(id: string): Observable<Usuario> {
    return this._http.get<Usuario>(`${this._urlBase}/${id}`);
  }

  crear(usuario: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this._urlBase, usuario);
  }

  actualizar(usuario: Usuario): Observable<Usuario> {
    return this._http.put<Usuario>(`${this._urlBase}/${usuario.id}`, usuario);
  }

  borrar(id: number): Observable<any> {
    return this._http.delete<any>(`${this._urlBase}/${id}`);
  }
}
