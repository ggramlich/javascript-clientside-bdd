var DOCUMENT_ROOT = __dirname + '/';
var jQueryMatchersPath = '../lib/jasmine-node-jquery-matchers';

exports.runTests = function (complete) {
    var scripts = [
        '../lib/jasmine-jquery/lib/jasmine-jquery.js',
        '../javascript/sampleCode.js'
    ];

    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test';
    
    var window = loadJsDomAndJQuery();

    global.jasmine = require('jasmine-node/lib/jasmine-node/index');
    
    // jasmine-node deletes global.window, so we must set it after loading jasmine-node
    
    global.window = window;
    global.$ = window.jQuery;
    global.jQuery = window.jQuery;
    
    scripts.forEach(function (script) {
        loadInContext(script);
    });
    
    setJQueryMatchers();
    
    modifyFixtureLoader(jasmine);
    runJasmine(jasmine, 'spec', complete);
}

var loadJsDomAndJQuery = function (scripts, callback) {
    window = require('jsdom').jsdom().createWindow();
    require('jQuery').create(window);
    return window;
}

var runJasmine = function (jasmine, specFolder, callOnExit) {
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

var loadInContext = function (filePath) {
    var src = require('fs').readFileSync(DOCUMENT_ROOT + filePath);
    require('vm').runInThisContext(src);
}

var modifyFixtureLoader = function (jasmine) {
    jasmine.Fixtures.prototype.loadFixtureIntoCache_ = function(relativeUrl) {
        var url = this.fixturesPath.match('/$') ? this.fixturesPath + relativeUrl : this.fixturesPath + '/' + relativeUrl;
        var data = require('fs').readFileSync(DOCUMENT_ROOT + url);
        this.fixturesCache_[relativeUrl] = data;
    };
}

var setJQueryMatchers = function () {
    var jqm = require(jQueryMatchersPath);
    jqm.options.jQuery = window.jQuery;
    beforeEach(function() {
        this.addMatchers(jqm.matchers);
    });
}
