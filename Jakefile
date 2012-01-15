desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    var specFolder =  'spec';
    process.argv.push(specFolder);
    loadJsDomAndJQuery(function (window) {
        global.theWindow = window;
        global.$ = window.jQuery;
        
        require('jasmine-node/lib/jasmine-node/cli.js');
        complete();
    });
}, true);

function loadJsDomAndJQuery(callback) {
    var jsdom = require('jsdom');
    
    jsdom.env({
        html: "<html><body></body></html>",
        documentRoot: __dirname,
        scripts: [
            'lib/jquery/jquery-1.7.1.js',
        ]
    }, function (err, window) {
        callback(window);
    });
}
