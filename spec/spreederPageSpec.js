describe('spreeder page', function() {
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '../html';
        loadFixtures('spreederContent.html');
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