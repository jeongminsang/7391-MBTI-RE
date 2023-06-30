import styled from 'styled-components';

const Container = styled.div`
    margin: 10px auto;
    background-color: #eee;
    width: 100%;
    height: 10px;
    display: flex;
    align-items: center;
    border-radius: 20px;
`;
const Progress = styled.div<{ currentSlide: number }>`
    background-color: rgb(49,130,246);
    width: ${(props) => (props.currentSlide / 12) * 100}%;
    height: 100%;
    transition: width 1s;
    border-radius: 20px;
`;

function ProgressBar(currentSlide: { currentSlide: number }) {
    return (
        <Container>
            <Progress currentSlide={currentSlide.currentSlide} />
        </Container>
    );
}

export default ProgressBar;
