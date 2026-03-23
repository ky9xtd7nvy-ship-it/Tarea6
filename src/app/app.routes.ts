import { Routes } from '@angular/router';
import { ListaUsuarios } from './components/lista-usuarios/lista-usuarios';
import { DetalleUsuario } from './components/detalle-usuario/detalle-usuario';
import { FormularioUsuario } from './components/formulario-usuario/formulario-usuario';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Listado de usuarios
  { path: 'home', component: ListaUsuarios },
  
  // Detalle de usuario (pasamos el id como parámetro)
  { path: 'user/:id', component: DetalleUsuario },
  
  // Alta de nuevo usuario
  { path: 'newuser', component: FormularioUsuario },
  
  // Actualización de usuario (mismo formulario, pero con id)
  { path: 'updateuser/:id', component: FormularioUsuario },
  
  // Comodín para rutas no encontradas
  { path: '**', redirectTo: 'home' }
];
