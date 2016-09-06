import ko from 'knockout';
import 'datatables';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.getAllFeatureRequests();
    }

    getAllFeatureRequests() {
        var self = this;
        $.getJSON('http://localhost:5000/v1/feature_request', function (data) {
          $('#feature_requests_dt').DataTable({
            data: data.feature_requests,
            columns: [
              { data: 'id' },
              { data: 'client_id' },
              { data: 'title' },
              { data: 'description' }
            ]
          });
        })
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
