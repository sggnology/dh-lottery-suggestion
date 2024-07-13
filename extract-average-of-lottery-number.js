import axios from "axios";
import * as cheerio from "cheerio";

// 로또 당첨시 출현하는 숫자 총 갯수
const LOTTERY_EXPOSED_COUNT_URL = `https://www.dhlottery.co.kr/gameResult.do?method=statByNumber`;

/**
 * 설명
 * - 로또 번호 1~45까지의 숫자 중 가장 많이 당첨된 숫자를 추출
 *  */
async function extractHighestExposedLotteryNumber(n = 7) {

    const response = await axios.get(LOTTERY_EXPOSED_COUNT_URL);
    const $ = cheerio.load(response.data);

    const averageOfLotteryNumberJson = {};

    // tbody 가 두개 존재하는데, 두번째 tbody에 있는 tr만 추출
    $('tbody').eq(1).find('tr').each(function () {
        const row = $(this).find('td').map((i, el) => $(el).text()).get();
        averageOfLotteryNumberJson[row[0]] = parseInt(row[2]);
    });

    const averageOfLotterNumberArrSortedDesc = Object.entries(averageOfLotteryNumberJson).sort((a, b) => b[1] - a[1]);

    return averageOfLotterNumberArrSortedDesc.slice(0, n);
}

export default extractHighestExposedLotteryNumber;