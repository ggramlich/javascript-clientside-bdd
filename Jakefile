desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    var scripts = [
        '../lib/jasmine-jquery/lib/jasmine-jquery.js',
        '../javascript/sampleCode.js'
    ];

    var jasmineHelper = require('./node_base/jasmineHelper');
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    jasmineHelper.loadJsDomAndJQuery(['../lib/jquery/jquery-1.7.1.js'], function (window) {
        global.jasmine = require('jasmine-node/lib/jasmine-node/index');
        
        // jasmine-node deletes global.window, so we must set it after loading jasmine-node
        
        global.window = window;
        global.$ = window.jQuery;
        global.jQuery = window.jQuery;
        
        scripts.forEach(function (script) {
            jasmineHelper.loadInContext(script);
        });
        
        jasmineHelper.setJQueryMatchers();
        
        jasmineHelper.modifyFixtureLoader(jasmine);
        jasmineHelper.runJasmine(jasmine, 'spec', complete);
    });
}, true);


