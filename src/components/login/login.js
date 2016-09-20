import ko from 'knockout';
import Cookie from 'js-cookie';
import hasher from 'hasher';
import loginTemplate from 'text!./login.html';
import { app_config } from 'app/app_config';

class LoginViewModel {
    constructor(route) {
    }
}

export default { viewModel: LoginViewModel, template: loginTemplate };
