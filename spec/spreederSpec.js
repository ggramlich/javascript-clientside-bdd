describe('spreeder app', function(){
    var spreeder;
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '../html_fixtures';
        loadFixtures('../html/spreederContent.html');
        spreeder = new Spreeder($('#spreederWindow'));
    });
    
    it('should display the first word of the text on start', function(){        
        spreeder.setText('Das ist ein Beispieltext');
        expect($('#spreederWindow')).toHaveText('Das');
        
        spreeder.setText('Ein anderer Beispieltext');
        expect($('#spreederWindow')).toHaveText('Ein');        
    });
    
    it('should display the next word after advance()', function(){
        spreeder.setText('Noch ein anderer Beispieltext');
        
        spreeder.advance();
        expect($('#spreederWindow')).toHaveText('ein');
        
        spreeder.advance();
        expect($('#spreederWindow')).toHaveText('anderer');
        
    });
    
});

describe('spreeder object', function(){

    var $theDiv;
    var spreeder;
    
    beforeEach(function () {
        $theDiv = $('<div/>');
        spreeder = new Spreeder($theDiv);
    });
    
    it('should use the defined div to display the text', function(){
        expect(spreeder.getSpreederDiv()).toBe($theDiv);
        
        spreeder.setText('Wort');
        expect($theDiv).toHaveText('Wort');
    });
    
    it('should advance after an interval after start', function(){
        setInterval = jasmine.createSpy('spy for setInterval');
        spreeder.start();
        expect(setInterval).toHaveBeenCalledWith(spreeder.advance, 1000);
    });
    
    it('should end the interval timer at the end of the text', function(){
        spreeder.setText("Lorem ipsum dolor")
        
        var timerId = 12345;
        setInterval = jasmine.createSpy('startInterval').andReturn(timerId);
        clearInterval = jasmine.createSpy('stopInterval');
        
        spreeder.start();
        
        spreeder.advance();
        spreeder.advance();
        
        
        expect(clearInterval).not.toHaveBeenCalled();
        spreeder.advance();
        expect(clearInterval).toHaveBeenCalledWith(timerId);
    });
    
    it('should set the reading speed according to the defined wordsPerMinute-setting', function(){
        spreeder.setWordsPerMinute(100);
        expect(spreeder.readingSpeed()).toBe(600);
        
        spreeder.setWordsPerMinute(300);
        expect(spreeder.readingSpeed()).toBe(200);
    });
    
    it('should reset the interval timer when the wordsPerMinute-setting has changed', function(){
        spreeder.setText('Dolor sit amet');
        spreeder.setWordsPerMinute(100);
        
        spreeder.start();
        
        setInterval = jasmine.createSpy('setInterval');
        clearInterval = jasmine.createSpy('clearInterval');
        
        spreeder.advance();
        spreeder.setWordsPerMinute(200);
        
        expect(clearInterval).toHaveBeenCalled;
        expect(setInterval).toHaveBeenCalledWith(jasmine.any(Function), 300);
    });
    
    it('should halt the timer on pause', function(){
        spreeder.setText('Dolor sit amet');
        clearInterval = jasmine.createSpy('clearInterval');
        
        spreeder.start();
        
        expect(clearInterval).not.toHaveBeenCalled;
        spreeder.pause();
        expect(clearInterval).toHaveBeenCalled;
    });
    
    it('should continue at the current word on unpause', function(){
        spreeder.setText('Dolor sit amet');
        clearInterval = jasmine.createSpy('clearInterval');
        
        spreeder.start();
        spreeder.advance();
        
        spreeder.pause();
        
        startInterval = jasmine.createSpy('startInterval');
        
        spreeder.unpause();
        spreeder.advance();
        
        expect(startInterval).toHaveBeenCalled;
        expect(spreeder.getCurrentChunkIndex()).toBe(2);
    });
});
