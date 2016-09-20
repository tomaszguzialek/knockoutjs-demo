import 'jquery';
import 'bootstrap';
import ko from 'knockout';
import 'knockout-projections'
import * as router from './router';

// Components can be packaged as AMD modules, such as the following:
ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
ko.components.register('feature_requests', { require: 'components/feature_requests/feature_requests' });
ko.components.register('login', { require: 'components/login/login' });

// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

// Start the application
ko.applyBindings({ route: router.currentRoute });
