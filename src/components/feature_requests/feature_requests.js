import ko from 'knockout';
import 'datatables';
import Cookie from 'js-cookie';
import featureRequestsTemplate from 'text!./feature_requests.html';
import { app_config } from 'app/app_config';
import * as router from 'app/router';

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
        var token = Cookie.get('token');

        if (token) {
          var self = this;
          $.ajax({
            url: 'http://' + app_config.api_host + '/v1/feature_request',
            dataType: 'json',
            headers: {
              'token': token
            },
            success: function (data) {
              self.table = $('#feature_requests_dt').DataTable({
                data: data.feature_requests,
                columns: [
                  { data: 'id' },
                  { data: 'client_id' },
                  { data: 'title' },
                  { data: 'description' }
                ]
              })
            },
            error: function (error) {
              if (error.status === 403) {
                router.hasher.setHash('login');
              }
            }
          });
        } else {
          router.hasher.setHash('login');
        }
    }

    getAllClients() {
        var token = Cookie.get('token');

        if (token) {
          var self = this;
          $.ajax({
            url: 'http://' + app_config.api_host + '/v1/client',
            dataType: 'json',
            headers: {
              'token': token
            },
            success: function (data) {
                self.clients(data.clients);
            },
            error: function (error) {
              if (error.status === 403) {
                router.hasher.setHash('login');
              }
            }
          });
        } else {
          router.hasher.setHash('login');
        }
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

      var token = Cookie.get('token');

      if (token) {
        $.ajax({
          url: 'http://' + app_config.api_host + '/v1/feature_request',
          data: ko.toJSON(data),
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "text",
          headers: {
            'token': token
          },
          success: function (response) {
            console.log(response);
            $('#addFeatureRequestModal').modal('hide');
          },
          error: function (error) {
            if (error.status === 403) {
              router.hasher.setHash('login');
            }
          }
        });
      } else {
        router.hasher.setHash('login');
      }
    }
}

export default { viewModel: FeatureRequestsViewModel, template: featureRequestsTemplate };
