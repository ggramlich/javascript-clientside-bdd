describe('asynchronuous behavior', function () {
    describe('the long execution', function () {
        it('should take more than 200 ms', function () {
            expect(durationOfLongExecution()).toBeGreaterThan(200);
        });
        it('should take less than 400 ms', function () {
            expect(durationOfLongExecution()).toBeLessThan(400);
        });
    });
    
    xit ('should not affect the current execution', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 0);
        string += 'c';
        expect(string).toBe('?');
    });
    
    xit ('takes effect if we wait for it', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 0);
        string += 'c';
        waits(0);
        runs(function () {
            expect(string).toBe('?');
        });
    });
    
    xit ('should not affect the current execution, even if there were enough time for it', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 0);
        longExecution();
        string += 'c';
        expect(string).toBe('?');
    });
    
    xit('should put the calls in correct order', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 100);
        setTimeout(function () {string += 'c';}, 20);
        setTimeout(function () {string += 'd';}, 40);
        waits(100);
        runs(function () {
            expect(string).toBe('?');
        });
    });
    
    xit('should put the calls in correct order when there is a long execution in between', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 200);
        longExecution();
        setTimeout(function () {string += 'c';}, 0);
        waits(0);
        runs(function () {
            expect(string).toBe('?');
        });
    });
    
    xit('should wait for a condition', function () {
        var string = 'a';
        setTimeout(function () {string += 'b';}, 100);
        waitsFor(function () {
            return string == 'ab';
        });
        expect(string).toBe('?');
        runs(function () {
            expect(string).toBe('?');
        });
    });
});

var durationOfLongExecution = function () {
    // http://peter.michaux.ca/articles/lazy-function-definition-pattern
    var start = new Date().getTime();
    longExecution();
    var duration = new Date().getTime() - start;
    durationOfLongExecution = function () {
        return duration;
    };
    return durationOfLongExecution();
};

function longExecution () {
    fibo(28);
}

function fibo(n) {
    if (n <= 1) {
        return 0;
    }
    return fibo(n-1) + fibo(n-2);
}
