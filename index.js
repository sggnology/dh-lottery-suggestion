import fs from 'fs';
import cheerio from 'cheerio';
import extractRecentDhLotteryNumber from './extract-recent-lottery-number.js';
import { countSameNumbers } from './how-many-same-number.js';


fs.readFile('./resource/excel.xls', { encoding: 'utf8' }, async (err, data) => {
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
    const topSevenKeys = keyValueArray.slice(-7).map(entry => parseInt(entry[0])).reverse();

    // 가장 낮은 값 7개의 키 추출
    const bottomSevenKeys = keyValueArray.slice(0, 7).map(entry => parseInt(entry[0]));

    console.log("가장 높은 값 7개의 번호:", topSevenKeys);
    console.log("가장 낮은 값 7개의 번호:", bottomSevenKeys);

    const lotteryJsonResult = await extractRecentDhLotteryNumber();
    const thisWeekLotteryNumbers = lotteryJsonResult.numbers;

    console.log(lotteryJsonResult)

    const topSevenComparison = countSameNumbers(topSevenKeys, thisWeekLotteryNumbers);
    const bottomSevenComparison = countSameNumbers(bottomSevenKeys, thisWeekLotteryNumbers);

    console.log("이번 주 로또 번호와 가장 높은 값 7개의 일치 개수:", topSevenComparison);
    console.log("이번 주 로또 번호와 가장 낮은 값 7개의 일치 개수:", bottomSevenComparison);

    const today = new Date();
    const formattedDate = formatDate(today);

    fs.writeFileSync('result.txt', 
        `
        ${formattedDate} 로또 번호 분석 결과
        
        이번 주 로또 번호: ${thisWeekLotteryNumbers}
        (보너스 번호: ${lotteryJsonResult.bouns1})
        
        가장 높은 값 7개의 번호: ${topSevenKeys}
        가장 낮은 값 7개의 번호: ${bottomSevenKeys}

        이번 주 로또 번호와 가장 높은 값 7개의 일치 개수: ${topSevenComparison}
        이번 주 로또 번호와 가장 낮은 값 7개의 일치 개수: ${bottomSevenComparison}
        `
    );
});

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}