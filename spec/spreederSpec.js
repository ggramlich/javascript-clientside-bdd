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
    
});

describe('spreeder page', function() {
    
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '../html_fixtures';
        loadFixtures('../html/spreederContent.html');
    });
    
    it('should have a spreeder object with the right div', function () {
        initPage();
        expect(spreeder.getSpreederDiv()).toBe('#spreederWindow');
    });
    
    it('should start the spreeder on a click of the start button', function(){
        initPage();
        spyOn(spreeder, 'start');
        $('#startButton').click();
        expect(spreeder.start).toHaveBeenCalled();
    });
    
});

