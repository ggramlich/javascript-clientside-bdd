desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    var jasmineHelper = require('./node_base/jasmineHelper');
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    jasmineHelper.loadJsDomAndJQuery(function (window) {
        var jasmine = require('jasmine-node/lib/jasmine-node/index');
        
        // jasmine-node deletes global.window, so we must set it after loading jasmine-node
        
        global.window = window;
        global.$ = window.jQuery;
        global.jQuery = window.jQuery;
        
        jasmine = jasmineHelper.loadWithJasmine(jasmine, __dirname + '/lib/jasmine-jquery/lib/jasmine-jquery.js');
        jasmineHelper.modifyFixtureLoader(jasmine);
        jasmineHelper.runJasmine(jasmine, 'spec', complete);
    });
}, true);


