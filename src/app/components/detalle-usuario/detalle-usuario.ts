import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios';
import { Usuario } from '../../interfaces/usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css'
})
export class DetalleUsuario implements OnInit {
  private _rutaActiva = inject(ActivatedRoute);
  private _router = inject(Router);
  private _usuariosServicio = inject(UsuariosService);

  usuario = signal<Usuario | null>(null);

  ngOnInit() {
    this._rutaActiva.params.subscribe(async (params) => {
      const id = params['id'];
      this._usuariosServicio.obtenerPorId(id).subscribe({
        next: (datos) => this.usuario.set(datos),
        error: () => {
          Swal.fire('Error', 'Usuario no encontrado', 'error');
          this._router.navigate(['/home']);
        }
      });
    });
  }

  async confirmarEliminar() {
    const nombreCompleto = `${this.usuario()?.first_name} ${this.usuario()?.last_name}`;
    
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar a ${nombreCompleto}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      this._usuariosServicio.borrar(this.usuario()?.id!).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'El usuario ha sido borrado con éxito', 'success');
          this._router.navigate(['/home']);
        },
        error: (err) => {
          Swal.fire('Error', err.error.error || 'No se pudo eliminar', 'error');
        }
      });
    }
  }
}

