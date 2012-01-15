desc('This is the default task.');
task('default', ['runspecs']);

desc('Run all jasmine specs from the spec folder');
task('runspecs', [], function () {
    if( !process.env.NODE_ENV ) process.env.NODE_ENV = 'test';
    
    var specFolder =  'spec';
    process.argv.push(specFolder);
    require('jasmine-node/lib/jasmine-node/cli.js');
});
