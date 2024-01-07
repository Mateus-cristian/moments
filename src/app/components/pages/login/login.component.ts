import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/Login';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: ILogin | null = null;

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.loginData?.username ?? '', [
        Validators.required,
      ]),
      password: new FormControl(this.loginData?.password ?? '', [
        Validators.required,
      ]),
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.getLogin(this.loginForm.value).subscribe(
      (response) => {
        const jwtToken = response.token;

        if (jwtToken) {
          const token = JSON.stringify(jwtToken);

          localStorage.setItem('@token', token.replace(/["']/g, ''));
          this.router.navigate(['/']);

          this.toastService.add('Login feito com sucesso', 'success');
        } else {
          // Se as credenciais são inválidas, exiba um toast de erro
          this.toastService.add('Usuário ou senha incorretos', 'error');
        }
      },
      (error) => {
        // Trate os erros de login, se necessário
        console.error('Erro durante o login:', error);
        // Exiba um toast de erro genérico
        this.toastService.add('Usuário ou senha incorretos', 'error');
      }
    );
  }
}
