import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Questions from '../api/questionsApi.json';

const MainContainer = styled.div`
  overflow: hidden;
  text-align: center;
  width: 1200vw;
  height: 200vw;
`;
const SurveyContainer = styled.div`
  width: 100vw;
  float: left;
`;
const SurveySection = styled.div`
  max-width: 390px;
  margin: 0 auto;
`;
const SurveyImg = styled.img`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
`;
const Question = styled.h1`
  font-size: 18px;
  height: 75px;
  margin: 0 auto;
  padding: 0px 30px 0px 30px;
  background-color: #b8d7ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  font-size: 18px;
  border-radius: 10px;
  width: 90%;
  font-weight: bold;
  border: none;
  color: black;
  background-color: #b8d7ff;
  padding: 10px 40px;
  margin: 20px;
  cursor: pointer;
  &:hover {
    background-color: #8fa6c5;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
`;
const Backbtn = styled.button`
  border-radius: 10px;
  border: none;
  color: white;
  background-color: ${(props) => props.disabled === false ? 'rgb(49,130,246)' : "grey"};
  padding: 10px 20px 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.disabled === false ? 'rgb(42, 110, 206)' : "grey"};
    transition: background-color 0.3s ease;
    cursor: ${(props) => props.disabled === false ? '' : 'not-allowed'};
  }
`;

function Survey() {
  const [currentSlide, setCurrentSlide] = useState(1);  //현재 슬라이드
  const slideRef = useRef<any>(null);
  const TOTAL_SLIDES = 12; // 총 슬라이드
  const navigate = useNavigate();
  const [mbti, setMbti] = useState<any>([]); // 가져올 mock 데이터에서 MBTI만 추출한 상태
  let result: string[] = [];
  const nextSlideFir = () => {
    setMbti(mbti + Questions[currentSlide - 1].answers[0].type);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
  };
  const nextSlideSec = () => {
    setMbti(mbti + Questions[currentSlide - 1].answers[1].type);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
    slideRef.current.style.transform += 'translateX(+100vw)';
    setMbti(mbti.slice(0, -1))
  };
  const mbtiChecker = () => {
    let map: any = {};

    for (let i = 0; i < TOTAL_SLIDES; i++) {
      if (mbti[i] in map) {
        map[mbti[i]] += 1;
      } else {
        map[mbti[i]] = 1;
      }
    }
    for (let count in map) {
      if (map[count] >= 2) {
        result.push(count);
      }
    }
    const examResult = result.join('');
    navigate(`/result/${examResult}`);
  };
  useEffect(() => {
    currentSlide > TOTAL_SLIDES && mbtiChecker();
  }, [currentSlide]);

  return (
    <MainContainer ref={slideRef}>
      {Questions.map((item) => {
        return (
          <SurveyContainer key={item.id}>
            <SurveySection>
              <div>
                <Backbtn onClick={prevSlide} disabled={currentSlide === 1 ? true : false}>이전 문항</Backbtn>
                <div>
                  <span>{currentSlide}</span>
                  <span>/{TOTAL_SLIDES}</span>
                </div>
                <Question>{item.question}</Question>
              </div>
              <div>
                <SurveyImg
                  src={item.imagePath}
                  alt='mbtiImg'
                />
              </div>
              <article>
                <Button onClick={nextSlideFir}>
                  {item.answers[0].content}
                </Button>
                <br />
                <Button onClick={nextSlideSec}>
                  {item.answers[1].content}
                </Button>
              </article>
            </SurveySection>
          </SurveyContainer>
        );
      })}
    </MainContainer>
  );
}

export default Survey;
