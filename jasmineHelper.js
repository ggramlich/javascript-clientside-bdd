var jQueryPath = 'lib/jquery/jquery-1.7.1.js';

exports.loadJsDomAndJQuery = function (callback) {
    var jsdom = require('jsdom');
    
    jsdom.env({
        html: "<html><body></body></html>",
        documentRoot: __dirname,
        scripts: [
            jQueryPath,
        ]
    }, function (err, window) {
        callback(window);
    });
}

exports.runJasmine = function (jasmine, specFolder) {
    var util,
        Path= require('path');
    try {
      util = require('util')
    } catch(e) {
      util = require('sys')
    }

    specFolder = Path.join(process.cwd(), specFolder);

    for (var key in jasmine)
        global[key] = jasmine[key];

    var isVerbose = false;
    var showColors = true;
    var teamcity = process.env.TEAMCITY_PROJECT_NAME || false;
    var useRequireJs = false;
    var extentions = "js";
    var match = '.';
    var useHelpers = true;
    
    var junitreport = {
        report: false,
        savePath : "./reports/",
        useDotNotation: true,
        consolidate: true
    }
    
    var exitCode = 0;
    
    process.on("exit", onExit);

    function onExit() {
        process.removeListener("exit", onExit);
        process.exit(exitCode);
    }
    
    var onComplete = function(runner, log) {
        util.print('\n');
        if (runner.results().failedCount == 0) {
            exitCode = 0;
        } else {
            exitCode = 1;
        }
    };
    
    if(useHelpers){
        jasmine.loadHelpersInFolder(specFolder,
            new RegExp("helpers?\\.(" + extentions + ")$", 'i'));
    }

    jasmine.executeSpecsInFolder(specFolder,
        onComplete,
        isVerbose,
        showColors,
        teamcity,
        useRequireJs,
        new RegExp(match + "spec\\.(" + extentions + ")$", 'i'),
        junitreport);

}
