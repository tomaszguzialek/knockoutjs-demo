import 'jquery';
import 'bootstrap';
import ko from 'knockout';
import 'knockout-projections'
import * as router from './router';
import Cookie from 'js-cookie';
import alertify from 'alertifyjs';

// Components can be packaged as AMD modules, such as the following:
ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
ko.components.register('feature_requests', { require: 'components/feature_requests/feature_requests' });
ko.components.register('login', { require: 'components/login/login' });

// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

// Start the application
ko.applyBindings({ route: router.currentRoute });

var checkLoggedInInterval = setInterval(function () {
  var token = Cookie.get('token');

  if (!token && router.currentRoute().page !== 'login') {
    console.log("Detected token cookie removed, redirecting to login page.");
    alertify.log("Your session expired! Please login again!");
    router.hasher.setHash('login');
  }
}, 5 * 1000); // 5 seconds
