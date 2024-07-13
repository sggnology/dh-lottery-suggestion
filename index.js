import fs from 'fs';
import extractRecentDhLotteryNumber from './extract-recent-lottery-number.js';
import { countSameNumbers } from './how-many-same-number.js';
import extractHighestExposedLotteryNumber from './extract-average-of-lottery-number.js';

const COMPARISON_NUMBER = 20;

const highestExposedLotteryNumberInfo = await extractHighestExposedLotteryNumber(COMPARISON_NUMBER);
const highestExposedLotteryNumberArr = highestExposedLotteryNumberInfo.map(([numberStr, exposedCount]) => parseInt(numberStr));

const lotteryJsonResult = await extractRecentDhLotteryNumber();
const thisWeekLotteryNumbers = lotteryJsonResult.numbers;

const topSevenComparison = countSameNumbers(highestExposedLotteryNumberArr, thisWeekLotteryNumbers);

console.log(`이번 주 로또 일치 갯수: ${topSevenComparison}`);

const today = new Date();
const formatDateToyyyyMMdd = (date) =>{

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}
const yyyyMMddDate = formatDateToyyyyMMdd(today);

fs.writeFileSync('result.txt', 
    `
    ${yyyyMMddDate} 로또 번호 분석 결과
    
    이번 주 로또 번호: ${thisWeekLotteryNumbers}
    (보너스 번호: ${lotteryJsonResult.bouns1})
    
    가장 높은 값 ${highestExposedLotteryNumberArr.length}개의 번호: ${highestExposedLotteryNumberArr}

    이번 주 로또 번호와 가장 높은 값 ${highestExposedLotteryNumberArr.length}개의 일치 개수: ${topSevenComparison}
    `
);