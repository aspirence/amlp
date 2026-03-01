const fs = require('fs');
fs.readFile('report.json', 'utf8', (err, data) => {
    if (err) throw err;
    const report = JSON.parse(data);
    const renderBlocking = report.audits['render-blocking-resources'];
    console.log("Render Blocking:", renderBlocking?.details?.items);
});
