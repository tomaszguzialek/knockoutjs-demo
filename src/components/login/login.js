import ko from 'knockout';
import Cookie from 'js-cookie';
import hasher from 'hasher';
import loginTemplate from 'text!./login.html';
import { app_config } from 'app/app_config';

class LoginViewModel {
    constructor(route) {
      this.login = ko.observable();
      this.password = ko.observable();
    }

    signIn() {
      var self = this;

      var data = {
        login: self.login(),
        password: self.password()
      };

      $.ajax({
        url: 'http://' + app_config.api_host + '/v1/auth/login',
        data: ko.toJSON(data),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {
          var json = $.parseJSON(response);
          Cookie.set('token', json.token);
        },
        error: function (error) {
          console.error(error);
        }
      });
    }
}

export default { viewModel: LoginViewModel, template: loginTemplate };
