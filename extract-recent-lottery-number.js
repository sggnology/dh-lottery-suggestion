import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * 설명
 * - 동행복권 메인 페이지에 노출되는 최근 당첨 번호를 추출
 */
async function extractRecentDhLotteryNumber(){
    try {

        const DH_LOTTERY_MAIN_URL = `https://dhlottery.co.kr/common.do?method=main`

        // POST 요청 보내기
        const response = await axios.get(DH_LOTTERY_MAIN_URL);

        // 응답 받은 HTML을 Cheerio로 로드
        const $ = cheerio.load(response.data);

        // 당첨 번호의 ID 선택자를 찾아서 당첨 번호 추출
        const number1 = $("#drwtNo1").text();
        const number2 = $("#drwtNo2").text();
        const number3 = $("#drwtNo3").text();
        const number4 = $("#drwtNo4").text();
        const number5 = $("#drwtNo5").text();
        const number6 = $("#drwtNo6").text();
        const bouns1 = $("#bnusNo").text();

        console.log("최근 로또 번호:", number1, number2, number3, number4, number5, number6, "보너스 번호:", bouns1);

        return {
            number1: parseInt(number1),
            number2: parseInt(number2),
            number3: parseInt(number3),
            number4: parseInt(number4),
            number5: parseInt(number5),
            number6: parseInt(number6),
            bouns1: parseInt(bouns1),
            numbers: [parseInt(number1), parseInt(number2), parseInt(number3), parseInt(number4), parseInt(number5), parseInt(number6), parseInt(bouns1)]
        }

    } catch (error) {
        console.error('에러 발생:', error);
    }
}

export default extractRecentDhLotteryNumber;