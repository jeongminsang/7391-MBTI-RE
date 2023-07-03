import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import MbtiApi from '../api/mbtiApi.json';

const MainContainer = styled.div`
  text-align: center;
  max-width: 390px;
  margin: 0 auto;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const AgainLink = styled(Link)`
  font-size: 15px;
  border-radius: 5px;
  border: none;
  color: black;
  background-color: #b8d7ff;
  padding: 10px 40px;
  margin: 20px;
  text-decoration: none;
`;
const ShareBtn = styled.button`
  font-size: 15px;
  border-radius: 5px;
  border: none;
  color: black;
  background-color: #b8d7ff;
  padding: 10px 40px;
  margin: 20px;
`;
const ResultImg = styled.img`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
`;
const Char = styled.h2`
  text-align: center;
  max-width: 390px;
  /* margin: 0 auto; */
  margin-top: 0px;
`;
const Department = styled.h1`
  font-size: 18px;
  /* height: 75px; */
  margin: 0 auto;
  padding: 10px;
  background-color: #b8d7ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const sharehandle = () => {
  if (navigator.share) {
    navigator.share({
      title: '나의 학과 테스트 해보기',
      text: '심리 테스트를 통해 당신의 학과를 선택하세요!\n',
      url: 'https://7391-mbti.netlify.app/',
    });
  } else {
    alert('공유하기가 지원되지 않는 환경 입니다.');
  }
};

const Result = () => {
  const match: any = useMatch('/result/:MbtiName');
  console.log(match.params);
  const { MbtiName }: any = match.params;
  const nation = MbtiApi[MbtiName as keyof typeof MbtiApi];

  return (
    <MainContainer>
      <div>
        <div>
          <ResultImg src={nation.image} />
        </div>
        <div>
          <Char>{nation.id}의 학과특징은?</Char>
          <br />
        </div>
        <div>
          <Department>{nation.subject}</Department>
        </div>
        <BtnContainer>
          <AgainLink to="/">다시하기</AgainLink>
          <ShareBtn
            onClick={() => {
              sharehandle();
            }}
          >
            공유하기
          </ShareBtn>
        </BtnContainer>
      </div>
    </MainContainer>
  );
};
export default Result;
