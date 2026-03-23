import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios implements OnInit {
  usuariosServicio = inject(UsuariosService);

  ngOnInit() {
    this.usuariosServicio.obtenerTodos();
  }

  async eliminarUsuario(id: string, nombre: string) {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al usuario ${nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (resultado.isConfirmed) {
      this.usuariosServicio.borrar(id).subscribe({
        next: () => {
          this.usuariosServicio.listaUsuarios.update(lista => 
            lista.filter(u => u._id !== id)
          );
          Swal.fire('Eliminado', `El usuario ${nombre} ha sido borrado con éxito`, 'success');
        },
        error: (error) => {
          Swal.fire('Error', error.error.error || 'No se pudo eliminar', 'error');
        }
      });
    }
  }
}

