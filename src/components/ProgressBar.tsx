import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Checkbox = styled.input<{ isChecked: boolean }>`
  width: 13px;
  height: 13px;
  appearance: none;
  border-radius: 20px;
  margin: 0 auto;
  background-color: ${props => props.isChecked ? 'rgb(49,130,246)' : '#ccc'};
`;

function ProgressBar(currentSlide: { currentSlide: number }) {
    const checkboxes = [...Array(12)].map((_, index) => (
        <Checkbox
            key={index}
            type="radio"
            isChecked={index + 1 <= currentSlide.currentSlide}
        />
    ));

    return (
        <Container>
            {checkboxes}
        </Container>
    );
}

export default ProgressBar;
