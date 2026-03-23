import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-usuario.html',
  styleUrl: './formulario-usuario.css'
})
export class FormularioUsuario implements OnInit {
  private _usuariosServicio = inject(UsuariosService);
  private _router = inject(Router);
  private _rutaActiva = inject(ActivatedRoute);

  titulo = signal<string>('Nuevo Usuario');
  textoBoton = signal<string>('Guardar');
  idEdicion = signal<number | null>(null);

  formulario = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this._rutaActiva.params.subscribe(async (params) => {
      if (params['id']) {
        const id = Number(params['id']);
        this.idEdicion.set(id);
        this.titulo.set('Actualizar Usuario');
        this.textoBoton.set('Actualizar');
        
        this._usuariosServicio.obtenerPorId(params['id']).subscribe({
          next: (usuario) => {
            this.formulario.patchValue(usuario);
            this.formulario.get('password')?.clearValidators();
            this.formulario.get('password')?.updateValueAndValidity();
          }
        });
      }
    });
  }

  async enviar() {
    if (this.formulario.invalid) return;

    const datos = this.formulario.value;

    if (this.idEdicion()) {
      this._usuariosServicio.actualizar({ id: this.idEdicion()!, ...datos } as any).subscribe({
        next: (res) => {
          Swal.fire('¡Éxito!', `Usuario ${res.first_name} actualizado correctamente`, 'success');
          this._router.navigate(['/home']);
        }
      });
    } else {
      this._usuariosServicio.crear(datos as any).subscribe({
        next: (res) => {
          Swal.fire('¡Creado!', `Usuario creado con ID: ${res.id}`, 'success');
          this._router.navigate(['/home']);
        },
        error: () => Swal.fire('Error', 'No se pudo crear el usuario', 'error')
      });
    }
  }
}

