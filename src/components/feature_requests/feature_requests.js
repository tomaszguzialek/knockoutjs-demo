import ko from 'knockout';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.message = ko.observable('Welcome to knockoutjs-demo!');
    }

    doSomething() {
        this.message('You invoked doSomething() on the viewmodel.');
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
