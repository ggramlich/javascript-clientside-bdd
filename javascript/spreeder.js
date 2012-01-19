function Spreeder($div){
    var self = this;
    
    var currentChunk = 0;
    var chunks;
    var intervalTimerId;
    
    this.getSpreederDiv = function () {
        return $div;
    };
    
    this.setText = function(text) {
        chunks = text.split(' ');
        this.displayCurrentChunk();
    };
    
    this.start = function () {
        intervalTimerId = setInterval(this.advance, 1000);
    };
    this.advance = function(){
        currentChunk++;
        self.displayCurrentChunk();
        
        if(currentChunk == chunks.length)
            clearInterval(intervalTimerId);
    };
    
    this.displayCurrentChunk = function(){
        var currentWord = chunks[currentChunk];
        $div.text(currentWord);
    };
}

initPage = function () {
    
    spreeder = new Spreeder($('#spreederWindow'));
        
    $('#startButton').click(function(){
        spreeder.start();
    });
};
