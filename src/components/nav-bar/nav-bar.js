import ko from 'knockout';
import template from 'text!./nav-bar.html';
import * as router from 'app/router';
import Cookie from 'js-cookie';
import alertify from 'alertifyjs';

class NavBarViewModel {
    constructor(params) {
        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
        this.route = params.route;
        this.isLoggedIn = ko.observable(Cookie.get('token') ? true : false);

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
      this.isLoggedIn(false);
    }
}

export default { viewModel: NavBarViewModel, template: template };
