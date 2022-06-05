import React from "react";

const QuestionList = [
    {
        0: "항상 나보다 일찍 자서 코 시끄럽게 고는 룸메",
        1: "일주일에 한 번만 씻는 룸메"
    },
    {
        0: "바다 놀러갔는데 건물 안에만 있으려는 친구",
        1: "바다 놀러 갔는데 해산물 먹기 싫다는 친구(나도 못 먹게 함)"
    },
    {
        0: "소개팅에서 전애인과의전 애인과의 추억을 자꾸 이야기하는 사람",
        1: "소개팅에서 전 애인과의 추억을 자꾸 묻는 사람"
    },
    {
        0: "요구르트에 김치 말아먹기",
        1: "라면에 초콜릿 넣기"
    },
    {
        0: "평생 탄산 안 마시기",
        1: "평생 라면 못 먹기"
    },
    {
        0: "독심술 초능력이 생겼는데 내 의지와 상관없이 모든 사람 생각 읽기",
        1: "거짓말하면 죽는 병 걸리기"
    },
    {
        0: "약속해서 만났는데 핸드폰만 보는 사람",
        1: "약속은 항상 먼저 잡으면서 돈은 절대 안 내는 사람"
    },
    {
        0: "결혼했는데 전 남자 친구or 전 여자 친구 옆집 (이사 못함)",
        1: "결혼했는데 배우자의 전남친 or 전여친 옆집"
    },
    {
        0: "15년 연애했던 전 애인(헤어진 이후로 연락은 안 함)",
        1: "한 달 사귀었는데 친구처럼 지내는 전 애인"
    },
    {
        0: "모르는 사람 과실로 폰 깨졌는데 사과도 안 하고 가기",
        1: "친구 과실로 폰 깨졌는데 이후로 잠적하기"
    },
    {
        0: "이상형 만나는 대신 평생 친구 잃기(연예인, 짝사랑 상대 누구든 ok) ",
        1: "평범한 사람 만나기"
    },
    {
        0: "빚이 30억 있는 이상형 만나기",
        1: "부자지만 내가 싫어하는 사람과 연애"
    },
    {
        0: "평생 치통",
        1: "평생 두통"
    },
    {
        0: "월 200만 원 백수 되기(일 하면 절대 안 됨)",
        1: "월 600만 원 직장인(정년까지 일 못 그만둠)"
    },
    {
        0: "내가 좋아하는 사람이 날 싫어하게 되기",
        1: "나를 싫어하던 사람이 목숨 걸 만큼 날 좋아하게 되기"
    },
    {
        0: "반반의 확률로 10억 받기",
        1: "100프로 확률로 5000만 원 받기"
    },
    {
        0: "똥 안 먹었는데 먹었다고 소문나기(전 세계 사람들이 다 알고 있음)",
        1: "진짜로 먹었는데 아무도 모르기"
    },
    {
        0: "바람 피우는데 부자인 사람과 결혼하기",
        1: "나를 아껴주고 사랑해주는데 빚이 많은 사람과 결혼하기"
    },
    {
        0: "평소에 양치 절대 안 하는 애인",
        1: "평소에 머리 절대 안 감는 애인"
    },
    {
        0: "잠수 이별",
        1: "환승 이별"
    },
    {
        0: "새 신발인데 물웅덩이에 빠지고 1시간 이상 돌아다니기",
        1: "양말 젖어서 1시간 이상 돌아다니는데 발 냄새 심하게 나기"
    },
    {
        0: "1년 동안 폰 없이 살기",
        1: "1년동안 친구 없기"
    },
    {
        0: "여름에 히터 틀고 자기",
        1: "겨울에 에어컨 켜고 자기"
    },
    {
        0: "항상 불 환하게 켜고 자는 룸메 (불 끄면 일어나서 다시 켬)",
        1: "밤마다 몰래 타자기 두드리는 룸메 (시끄럽지는 않은데 짜증나게 거슬림)"
    },
    {
        0: "과거로 돌아갈 수 있다면 내가 가장 행복했던 시절로 돌아가기",
        1: "내가 가장 불행했던 시절로 돌아가기"
    },
    {
        0: "평생 노래 못 듣기",
        1: "평생 해외 여행 못 가기"
    },
    {
        0: "10년 전 과거로 가기",
        1: "10년 후 미래로 가기"
    },
    {
        0: "자는데 모기 소리 들려서 깨기 (물리지는 않음)",
        1: "자는 동안 모기 소리는 못 들었는데 모기에 물리기"
    },
    {
        0: "요플레 뚜껑 그냥 버리기",
        1: "쭈쭈바 꼬다리 그냥 버리기"
    },
    {
        0: "10원짜리 동전으로 500만원 받기 (지폐 교환 안됨)",
        1: "지폐로 50만원 받기"
    },
    {
        0: "양념치킨",
        1: "후라이드치킨"
    },
    {
        0: "짬뽕",
        1: "짜장면"
    },
    {
        0: "탕수육 찍먹",
        1: "탕수육 부먹"
    },
    {
        0: "겨울",
        1: "여름"
    },
    {
        0: "아이스 아메리카노",
        1: "뜨거운 아메리카노"
    },
    {
        0: "민트초코",
        1: "솔의눈"
    },
    {
        0: "내 방에 모기 10마리",
        1: "내 방에 나방 10마리"
    },
    {
        0: "꿀교양 잡고 전공필수 놓치기",
        1: "전공필수 잡고 꿀교양 놓치기"
    },
    {
        0: "광화문광장 한복판에서 춤추기",
        1: "만원 야구장 한가운데에서 춤추기"
    },
    {
        0: "회 못 먹는 친구랑 바닷가 놀러가기",
        1: "노래 안 하는 친구랑 노래방 가기"
    },
    {
        0: "화장실에 휴지 없으면 휴지심",
        1: "화장실에 휴지 없으면 양말"
    },
    {
        0: "고양이",
        1: "강아지"
    },
    {
        0: "흰 옷 입고 짜장면 먹기",
        1: "구두 신고 축구하기"
    },
    {
        0: "평생 고구마만 먹기",
        1: "평생 감자만 먹기"
    },
    {
        0: "평생 피자 꼬다리 빵만 먹기",
        1: "평생 치킨 목만 먹기"
    },
];

export default QuestionList;