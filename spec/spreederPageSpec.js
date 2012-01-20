describe('spreeder page', function() {
    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '../html';
        loadFixtures('spreederContent.html');
        initPage();
    });
    
    it('should have a spreeder object with the right div', function () {
        expect(spreeder.getSpreederDiv()).toBe('#spreederWindow');
    });
    
    it('should start the spreeder on a click of the start button', function(){
        spyOn(spreeder, 'start');
        $('#startButton').click();
        expect(spreeder.start).toHaveBeenCalled();
    });
    
    it('should have the pause button disabled at the beginning', function(){
        expect($('#pauseButton')).toBeDisabled();
    });

    it('should enable the pause button, when the spreeder is started', function(){
        $('#startButton').click();
        expect($('#pauseButton')).not.toBeDisabled();
    });
    
    it('should pause the spreeder on a click of the pause button and make the button an unpause button', function(){
        $('#startButton').click();
        spyOn(spreeder, 'pause');
        $('#pauseButton').click();
        expect(spreeder.pause).toHaveBeenCalled();
        expect($('#pauseButton').text()).toBe('Unpause');
    });
    
    it('should unpause the spreeder on a click of the unpause button and change the button back to a a pause button', function(){
        $('#startButton').click();
        $('#pauseButton').click();
        
        spyOn(spreeder, 'unpause');
        $('#pauseButton').click();
        expect(spreeder.unpause).toHaveBeenCalled();
        expect($('#pauseButton').text()).toBe('Pause');
        
        spyOn(spreeder, 'pause');
        $('#pauseButton').click();
        expect(spreeder.pause).toHaveBeenCalled();
    });
    
    it('should show and hide the options div on a toggle of the options button', function(){
         expect($('#options')).not.toBeVisible();
         $('#optionsButton').click();
         expect($('#options')).toBeVisible();
         $('#optionsButton').click();
         expect($('#options')).not.toBeVisible();
    });
});