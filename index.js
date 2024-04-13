import fs from 'fs';
import cheerio from 'cheerio';

fs.readFile('./resource/excel.xls', { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const $ = cheerio.load(data);

    const countObject = {};
    for (let i = 1; i <= 45; i++) {
        countObject[i] = 0;
    }

    $('table tr').each(function () {
        const row = $(this).find('td').map((i, el) => $(el).text()).get();
        const lastSeven = row.slice(-7);

        lastSeven.forEach(number => {
            const num = parseInt(number);
            if (num >= 1 && num <= 45) {
                countObject[num]++;
            }
        });

    });

    const jsonResult = JSON.stringify(countObject, null, 2);
    console.log(jsonResult);
});