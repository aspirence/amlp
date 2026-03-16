const fs = require('fs');
fs.readFile('report.json', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    const report = JSON.parse(data);
    console.log("Performance Score:", report.categories.performance.score * 100);
});
