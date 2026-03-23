import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, RespuestaUsuarios } from '../interfaces/usuario.interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _http = inject(HttpClient);
  private _urlBase = 'https://peticiones.online/api/users';

  listaUsuarios = signal<Usuario[]>([]);

  async obtenerTodos() {
    try {
    const respuesta = await firstValueFrom(this._http.get<any>(this._urlBase));
    console.log('Respuesta completa recibida:', respuesta);

    const datosListado = respuesta.results || respuesta.data;

    if (datosListado) {
      console.log('Listado de usuarios detectado:', datosListado);
      this.listaUsuarios.set(datosListado);
    } else {
      console.warn('No se encontró el listado de usuarios en la respuesta');
    }
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
