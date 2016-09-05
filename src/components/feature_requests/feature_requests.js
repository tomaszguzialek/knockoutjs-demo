import ko from 'knockout';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.feature_requests = ko.observableArray([]);
        this.getAllFeatureRequests();
    }

    getAllFeatureRequests() {
        var self = this;
        $.getJSON('http://localhost:5000/v1/feature_request', function (data) {
          self.feature_requests(data.feature_requests);
        })
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
