desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    var specFolder =  'spec';
    process.argv.push(specFolder);
    loadJsDomAndJQuery(function (window) {
        global.window = window;
        global.$ = window.jQuery;
        
        require('jasmine-node/lib/jasmine-node/cli.js');
        complete();
    });
}, true);

function loadJsDomAndJQuery(callback) {
    var jsdom = require('jsdom');
    
    jsdom.env({
        html: "<html><body></body></html>",
        scripts: [
            // TODO: find a way to use local jquery
            // (maybe the node-jQuery package)
            // TODO: load jasmine-jquery.js
            'http://code.jquery.com/jquery-1.5.min.js'
        ]
    }, function (err, window) {
        callback(window);
    });
}
