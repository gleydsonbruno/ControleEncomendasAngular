import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  name: string;
  email: string;
  password: string;
}



@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})

export class Auth implements OnInit {
  form!: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  getUsuarios(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];
  }

  salvarUsuarios(Lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(Lista));
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.form.invalid) {
      return console.log('Form inválido', this.form.errors);
    }

    const { name, email, password } = this.form.value;
    const usuarios = this.getUsuarios();

    if (this.isLoginMode) {
      const usuario = usuarios.find(u => u.email === email && u.password === password);
      if (usuario) {
        console.log('Login bem-sucedido');
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.router.navigate(['/home']);
      } else {
        alert('Email ou senha inválidos');
      }
    } else {
      const usuarioJaExiste = usuarios.some(u => u.email === email);
      if (usuarioJaExiste) {
        alert('Usuário já existe com este email');
        return;
      }

      const NovoUsuario: Usuario = { name, email, password };
      usuarios.push(NovoUsuario);
      this.salvarUsuarios(usuarios);
      alert('Cadastro bem-sucedido!')
      this.toggleMode();
      this.form.reset();
    }
  }
}