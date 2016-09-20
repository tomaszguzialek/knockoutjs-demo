import ko from 'knockout';
import template from 'text!./nav-bar.html';
import * as router from 'app/router';

class NavBarViewModel {
    constructor(params) {
        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
        this.route = params.route;
    }

    linkTo(componentName) {
      router.hasher.setHash(componentName);
    }
}

export default { viewModel: NavBarViewModel, template: template };
