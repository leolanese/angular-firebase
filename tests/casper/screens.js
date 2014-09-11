var casper = require("casper").create(),
    viewportSizes = [
    [320,480],
    [512,568],
    [768,1024],
    [1024,768],
],
    url = casper.cli.args[0],
    saveDir = url.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');

casper.start();

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});

casper.each(viewportSizes, function(self, viewportSize, i) {
    var width  = viewportSize[0],
        height = viewportSize[1];
    casper.wait(4000, function() {
        this.viewport(width, height);
        this.verbose();
        casper.thenOpen(url, function() {
            this.echo('Opening at ' + width + ' x ' + height);
            var FPfilename = saveDir + '/fullpage-' + width + ".png"; //save png
            var ACfilename = saveDir + '/' + width + '-' + height + ".png";
            this.captureSelector(FPfilename, 'body');
            this.capture(ACfilename,{top: 0,left: 0,width: width, height: height});
            this.echo('screen snapshot done and saved');
        });
    });
});

casper.run(function() {
    this.echo('Taking snapshot at ' + url).exit();
});



