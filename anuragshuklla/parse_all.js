const fs = require('fs');
fs.readFile('report.json', 'utf8', (err, data) => {
    if (err) { console.error(err); return; }
    const report = JSON.parse(data);
    const audits = report.audits;
    
    console.log("--- PERFORMANCE METRICS ---");
    console.log("LCP:", audits['largest-contentful-paint'].displayValue);
    console.log("FCP:", audits['first-contentful-paint'].displayValue);
    console.log("Cumulative Layout Shift:", audits['cumulative-layout-shift'].displayValue);
    console.log("Speed Index:", audits['speed-index'].displayValue);
    
    console.log("\n--- OPPORTUNITIES ---");
    Object.values(audits)
        .filter(a => a.details && a.details.type === 'opportunity' && a.score < 1)
        .forEach(a => console.log(`- ${a.title} (${a.displayValue})`));
        
    console.log("\n--- DIAGNOSTICS ---");
    Object.values(audits)
        .filter(a => a.score !== null && a.score < 0.9 && !a.details?.type)
        .forEach(a => console.log(`- ${a.title}`));
});
