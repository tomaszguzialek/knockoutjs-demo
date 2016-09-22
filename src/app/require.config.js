// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "knockout-postbox":     "bower_modules/knockout-postbox/build/knockout-postbox.min",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "datatables":           "bower_modules/datatables.net/js/jquery.dataTables.min",
        "js-cookie":            "bower_modules/js-cookie/src/js.cookie",
        "alertifyjs":           "bower_modules/alertifyjs/dist/js/alertify"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
