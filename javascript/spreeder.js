function Spreeder($div){
    var currentChunk = 0;
    var self = this;
    this.getSpreederDiv = function () {
        return $div;
    };
    
    this.setText = function(text) {
        this.text = text;
        this.displayCurrentChunk();
    };
    
    this.start = function () {
        setInterval(this.advance, 1000);
    };
    this.advance = function(){
        currentChunk++;
        self.displayCurrentChunk();
    };
    
    this.displayCurrentChunk = function(){
        var currentWord = this.text.split(' ')[currentChunk];
        $div.text(currentWord);
    };
}

initPage = function () {
    
    spreeder = new Spreeder($('#spreederWindow'));
        
    $('#startButton').click(function(){
        spreeder.start();
    });
};
