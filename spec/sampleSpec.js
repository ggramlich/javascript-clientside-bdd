if (typeof window === 'undefined') {
    window = global.theWindow;
}

describe('just a sample without html to get started', function () {
    it ('should calculate 1 + 1', function () {
        expect(1 + 1).toBe(2);
    });
});

describe('jQuery variable', function () {
    it ('should be defined', function () {
        expect($).toBeDefined();
        expect($).toBe(window.jQuery);
    });
});

