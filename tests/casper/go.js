/*

run: casperjs go.js http://m.devu.jackpotparty.com/games/slots/amazon-queen/

*/

var casper = require("casper").create(),
    viewportSizes = [
    [320,480],
    [480,568],
    [768,1024],
    [1024,768],
],
    url = casper.cli.args[0],
    saveDir = url.replace(/[^a-zA-Z0-9]/gi, '').replace(/^https?-+/, '');

casper.start();

casper.each(viewportSizes, function(self, viewportSize, i) {
    // set two vars for the viewport height and width as we loop through each item in the viewport array
    var w = viewportSize[0],
        h = viewportSize[1];
    //give some time for the page to load
    casper.wait(3000, function() {
        this.echo('Creating folder: ' + saveDir);
        // viewport
        this.viewport(w, h);
        casper.thenOpen(url, function() {
            this.echo('Opening at ' + w + ' x ' + h);
            //Set up two vars, one for the entire save, one for the actual viewport save
            var FPfilename = saveDir + '/entire-' + w + ".png";
            var ACfilename = saveDir + '/' + w + '-' + h + ".png";
            //Capture selector captures the full body
            this.captureSelector(FPfilename, 'body');
            //capture snaps a defined selection of the page
            this.capture(ACfilename,{top: 0,left: 0, width: w, height: h});
            this.echo('screen snapshot taked and saved at: /' + ACfilename);
        });
    });
});

casper.run(function() {
    this.echo('Finished captures: ' + url).exit();
});