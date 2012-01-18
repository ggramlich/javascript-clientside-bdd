desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    var jasmineHelper = require('./node_base/jasmineHelper');
    jasmineHelper.runTests(complete);
}, true);


