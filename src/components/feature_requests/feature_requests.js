import ko from 'knockout';
import 'datatables';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.clientIds = ko.observableArray([0, 1, 2, 3]);
        this.getAllFeatureRequests();
    }

    getAllFeatureRequests() {
        var self = this;
        $.getJSON('http://localhost:5000/v1/feature_request', function (data) {
          self.table = $('#feature_requests_dt').DataTable({
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

    filterByClientId(clientId) {
      this.table.column([1]).search(clientId !== 0 ? clientId : '').draw();
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
