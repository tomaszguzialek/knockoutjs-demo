import ko from 'knockout';
import 'datatables';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.clients = ko.observableArray();
        this.getAllFeatureRequests();
        this.getAllClients();
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
          })
        });
    }

    getAllClients() {
        var self = this;
        $.getJSON('http://localhost:5000/v1/client', function (data) {
          self.clients(data.clients);
        });
    }

    filterByClient(client) {
      this.table.column([1]).search(client !== this ? client.id : '').draw();
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
