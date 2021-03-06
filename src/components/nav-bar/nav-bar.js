import ko from 'knockout';
import template from 'text!./nav-bar.html';
import * as router from 'app/router';
import Cookie from 'js-cookie';
import alertify from 'alertifyjs';
import { app_config } from 'app/app_config';

class NavBarViewModel {
    constructor(params) {
        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
        this.route = params.route;
        this.isLoggedIn = ko.observable(Cookie.get('token') ? true : false).syncWith("isLoggedIn");

        var self = this;
        var checkLoggedInInterval = setInterval(function () {
          var token = Cookie.get('token');

          if (!token && router.currentRoute().page !== 'login') {
            console.log("Detected token cookie removed, redirecting to login page.");
            $('div.modal-backdrop').remove();
            self.isLoggedIn(false);
            alertify.log("Your session expired! Please login again!");
            router.hasher.setHash('login');
          }
        }, 5 * 1000); // 5 seconds
    }

    linkTo(componentName) {
      router.hasher.setHash(componentName);
    }

    logout() {
      var self = this;

      var data = {
        token: Cookie.get('token')
      };

      $.ajax({
        url: 'http://' + app_config.api_host + '/v1/auth/logout',
        data: ko.toJSON(data),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {
          Cookie.remove('token');
          self.isLoggedIn(false);
          router.hasher.setHash('');
        },
        error: function (error) {
          console.error("Error while calling logout endpoint: " + JSON.stringify(error));
        }
      });
    }
}

export default { viewModel: NavBarViewModel, template: template };
