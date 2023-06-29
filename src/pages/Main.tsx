import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-Align: center;
  margin: 0 auto;
`;
const Title = styled.div`
  font-family: sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;
const LogoImage = styled.img`
  margin: 0 auto;
  /* height: 400px; */
  width: 300px;
`;
const NextPageButton = styled.button`
  /* border-radius: 10px; */
  border: none;
  background-color: rgb(49,130,246);
  color: white;
  padding: 10px 50px 10px 50px;
  width: 380px;
  margin-top: 50px;
  cursor: pointer;
  &:hover {
    background-color: rgb(42, 110, 206);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
`;
const ButtonText = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`;
const SubText = styled.div`
  font-size: 13px;
`;

function Main() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Title>7391-MBTI</Title>
      <LogoImage src="img/school-1.png" alt="로고" />
      <div>
        <NextPageButton onClick={() => navigate('/survey')}>
          <ButtonText>테스트 시작!</ButtonText>
          <SubText>총 16개의 유형의 MBTI성향을 기반으로</SubText>
          <SubText>가장 잘 어울리는 학과를 추천해드립니다.</SubText>
        </NextPageButton>
      </div>
    </MainContainer>
  );
}

export default Main;