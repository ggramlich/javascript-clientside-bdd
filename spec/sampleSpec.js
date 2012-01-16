describe('just a sample without html to get started', function () {
    it ('should calculate 1 + 1', function () {
        expect(1 + 1).toBe(2);
    });
});

describe('jQuery variable', function () {
    it ('should be defined', function () {
        expect($).toBeDefined();
        expect($).toBe(window.jQuery);
        expect(jQuery).toBe(window.jQuery);
    });
});

describe('jQuery object from html snippet', function () {
    it ('should be recognized as a selector by the jasmine-jquery matchers', function () {
        expect($('<div id="some-id"></div>')).toBe('div#some-id');
    });
});

describe('fixture loading', function () {
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '../html_fixtures';
    });

    it('should load a fixture from the fixtures folder', function () {
        expect($('#some-sample-fixture-div')).not.toExist();
        loadFixtures('sampleFixture.html');
        expect($('#some-sample-fixture-div')).toExist();
    });
});
