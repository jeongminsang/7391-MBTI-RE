import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-Align: center;
  margin: 0 auto;
`;
const LogoImage = styled.img`
  margin: 0 auto;
  height: 400px;
  width: 400px;
`;

function Main() {
  return (
    <MainContainer>
      <h1>7391-MBTI</h1>
      <LogoImage src="img/school-1.png" alt="로고" />
      <p>
        총 16개의 유형의 MBTI성향을 기반으로 가장 잘 어울리는
        학과를 추천해드립니다.
      </p>

      <div>
        <Link
          to="/survey"
        >
          테스트 시작!
        </Link>
      </div>
    </MainContainer>
  );
}

export default Main;