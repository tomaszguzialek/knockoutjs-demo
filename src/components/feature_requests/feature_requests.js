import ko from 'knockout';
import 'datatables';
import featureRequestsTemplate from 'text!./feature_requests.html';
import { app_config } from 'app/app_config';

class FeatureRequestsViewModel {
    constructor(route) {
        this.clients = ko.observableArray();
        this.currentClientFilter = ko.observable(null);

        this.newFeatureRequestTitle = ko.observable();
        this.newFeatureRequestDescription = ko.observable();
        this.newFeatureRequestClient = ko.observable();

        this.getAllFeatureRequests();
        this.getAllClients();
    }

    getAllFeatureRequests() {
        var self = this;
        $.getJSON('http://' + app_config.api_host + '/v1/feature_request', function (data) {
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
        $.getJSON('http://' + app_config.api_host + '/v1/client', function (data) {
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

    addNewFeatureRequest() {
      var data = {
        title: this.newFeatureRequestTitle(),
        description: this.newFeatureRequestDescription(),
        client_id: this.newFeatureRequestClient().id
      };
      $.ajax({
        url: 'http://' + app_config.api_host + 'v1/feature_request',
        data: ko.toJSON(data),
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {
          console.log(response);
          $('#addFeatureRequestModal').modal('hide');
        },
        error: function (error) {
          console.error(error);
        }
      });
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
