function Spreeder($div){
    var self = this;
    
    var currentChunk = 0;
    var chunks = [];
    var intervalTimerId;
    
    var wordsPerMinute = 60;

    this.getSpreederDiv = function () {
        return $div;
    };
    
    this.setText = function(text) {
        chunks = text.split(' ');
        this.displayCurrentChunk();
    };
    
    this.start = function () {
        intervalTimerId = setInterval(this.advance, self.readingSpeed());
    };
    
    this.advance = function(){
        currentChunk++;
        self.displayCurrentChunk();
        
        if(!this.timerShouldContinue())
            clearInterval(intervalTimerId);
    };
    
    this.cancelTimer = function(){
        clearInterval(intervalTimerId);
    };
    
    this.timerShouldContinue = function(){
        return currentChunk < chunks.length;
    };
    
    this.displayCurrentChunk = function(){
        var currentWord = chunks[currentChunk];
        $div.text(currentWord);
    };
    
    this.setWordsPerMinute = function(wpm){
        wordsPerMinute = wpm;
        
        if(self.timerShouldContinue()){
            self.cancelTimer();
            self.start();
        }
    };
    
    this.readingSpeed = function(){
        return 60 * 1000 / wordsPerMinute;
    };

    this.pause = this.cancelTimer;
    
    this.unpause = this.start;
    
    this.getCurrentChunkIndex = function(){
        return currentChunk;
    };
}

initPage = function () {
    
    spreeder = new Spreeder($('#spreederWindow'));
        
    $('#startButton').click(function(){
        spreeder.start();
    });
};
