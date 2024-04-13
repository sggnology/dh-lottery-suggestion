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

    // 객체의 키와 값을 배열로 변환
    const keyValueArray = Object.entries(countObject);

    // 값을 기준으로 정렬 (오름차순)
    keyValueArray.sort((a, b) => a[1] - b[1]);

    // 가장 높은 값 7개의 키 추출
    const topSevenKeys = keyValueArray.slice(-7).map(entry => entry[0]).reverse();

    // 가장 낮은 값 7개의 키 추출
    const bottomSevenKeys = keyValueArray.slice(0, 7).map(entry => entry[0]);

    console.log("가장 높은 값 7개의 번호:", topSevenKeys);
    console.log("가장 낮은 값 7개의 번호:", bottomSevenKeys);
});