import { Component, computed, inject, signal } from '@angular/core';
import { email, Field, form, minLength, required} from '@angular/forms/signals';
import { UserApi } from '../../../../core/services/user-api';
import { Router } from '@angular/router';
import { IRegisterParams } from '../../models/register-params';
import { confirmPassword } from '../../validators/confirm-passwords';
import { rxResource } from '@angular/core/rxjs-interop';
import { setErrorMessage } from '../../../../shared/utils/set-error-message';

@Component({
  selector: 'app-register-user-form',
  imports: [Field],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css',
})
export class RegisterUserForm {

 private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);

  registerModel = signal<IRegisterParams>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'O nome é obrigatório. '});

    required(fieldPath.email, { message: 'O E-mail é obrigatório. '});
    email(fieldPath.email, { message: 'O E-email é inválido. '});

    required(fieldPath.password, { message: 'A senha é obrigatória. '});
    minLength(fieldPath.password, 8, { message: 'A senha deve ter no minímo 8 caracteres. '});

     confirmPassword(fieldPath.confirmPassword, fieldPath.password);
  });

  registerParams = signal<IRegisterParams | undefined>(undefined);

  registerResource = rxResource({
    params: () => this.registerParams(),
    stream: ({params}) =>
      this._userApi.register(params.name, params.email, params.password),
  });

  registerError = computed(() => setErrorMessage(this.registerResource.error()));
  successMessage = computed(() =>{
    const SUCESS_REGISTRATION = this.registerResource.hasValue();
    return SUCESS_REGISTRATION ? 'Usuário cadastrado com sucesso!' : undefined;
  })

  register() {
    const userInfo = this.registerForm().value();

    this.registerParams.set(userInfo);
}

 

}
