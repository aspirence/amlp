const fs = require('fs');
fs.readFile('report.json', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    const report = JSON.parse(data);
    const audits = report.audits;
    
    console.log("--- CLS ELEMENTS ---");
    const layoutShifts = audits['cumulative-layout-shift']?.details?.items;
    if (layoutShifts) {
         audits['layout-shifts']?.details?.items.forEach(el => console.log(el.node.selector, el.score));
    }
});
