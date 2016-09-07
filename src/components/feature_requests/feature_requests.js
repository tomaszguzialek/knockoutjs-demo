import ko from 'knockout';
import 'datatables';
import featureRequestsTemplate from 'text!./feature_requests.html';

class FeatureRequestsViewModel {
    constructor(route) {
        this.clients = ko.observableArray();
        this.currentClientFilter = ko.observable(null);

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
      if (client === this) {
        client = null;
      }
      this.currentClientFilter(client);
      this.table.column([1]).search(client ? client.id : '').draw();
    }

    isSelected(client) {
      if (client === this) {
        client = null;
      }

      return client === this.currentClientFilter();
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
