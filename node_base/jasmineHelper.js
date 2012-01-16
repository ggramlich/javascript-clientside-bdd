var DOCUMENT_ROOT = __dirname + '/';
var jQueryPath = '../lib/jquery/jquery-1.7.1.js';

exports.loadJsDomAndJQuery = function (callback) {
    var jsdom = require('jsdom');
    
    jsdom.env({
        html: "<html><body></body></html>",
        documentRoot: DOCUMENT_ROOT,
        scripts: [
            jQueryPath,
        ]
    }, function (err, window) {
        callback(window);
    });
}

exports.runJasmine = function (jasmine, specFolder, callOnExit) {
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
        callOnExit();
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

exports.loadWithJasmine = function (jasmine, filePath) {
    var src = require('fs').readFileSync(filePath);
    return require('vm').runInThisContext(src + "\njasmine");
}

exports.modifyFixtureLoader = function (jasmine) {
    jasmine.Fixtures.prototype.loadFixtureIntoCache_ = function(relativeUrl) {
        var url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl;
        var data = require('fs').readFileSync(DOCUMENT_ROOT + url);
        this.fixturesCache_[relativeUrl] = data;
    };
}
