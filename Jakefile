desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    var jasmineHelper = require('./jasmineHelper');
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    jasmineHelper.loadJsDomAndJQuery(function (window) {
        global.theWindow = window;
        global.$ = window.jQuery;
        
        var jasmine = require('jasmine-node/lib/jasmine-node/index');
        var specFolder =  'spec';
        jasmineHelper.runJasmine(jasmine, specFolder);
        complete();
    });
}, true);


