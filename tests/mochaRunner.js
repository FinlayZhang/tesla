const Mocha = require("mocha");
const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions:{
        reportDir:'./docs/service-reporter'
    }
});
mocha.addFile('./tests/service/router.spec.js');
mocha.run(function(){
    console.log("All done");
    process.exit();
});