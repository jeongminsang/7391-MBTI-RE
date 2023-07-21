## 리팩토링 회고록

예전부터 해보고 싶었지만 '해봤자 별로 달라지는게 있겠어?'라는 생각으로 미뤄뒀던 작업.
처음으로 만들어봤던 리액트 프로젝트를 그때를 떠올리며 다시 뜯어보고 고치고 추가하는 작업을 해보기로 했다.

> 🚨 본 내용은 공부 목적과 레거시 코드 수정, 기능 추가, 마이그레이션에 중점을 두고 있습니다.

원본 레포 : https://github.com/jeongminsang/7391-MBTI

### 1. TypeScript 마이그레이션

typescript 템플릿으로 처음부터 다시 시작하였다.

### 2. 폴더 구조 재구성

-   기존 폴더 구조

    > 📦src
    > ┣ 📂api
    > ┃ ┣ 📜mbtiApi.json
    > ┃ ┗ 📜questionsApi.json
    > ┣ 📂components
    > ┃ ┣ 📜department.jsx
    > ┃ ┣ 📜home.jsx
    > ┃ ┣ 📜option.jsx
    > ┃ ┗ 📜ProgressBar.jsx
    > ┣ 📜App.css
    > ┣ 📜app.jsx
    > ┣ 📜index.css
    > ┗ 📜index.js

-   변경 폴더 구조
    > 📦src
    > ┣ 📂api
    > ┃ ┣ 📜mbtiApi.json
    > ┃ ┗ 📜questionsApi.json
    > ┣ 📂components
    > ┃ ┗ 📜ProgressBar.tsx
    > ┣ 📂pages
    > ┃ ┣ 📜Main.tsx
    > ┃ ┣ 📜Result.tsx
    > ┃ ┗ 📜Survey.tsx
    > ┣ 📜App.css
    > ┣ 📜App.tsx
    > ┣ 📜index.css
    > ┣ 📜index.tsx
    > ┣ 📜logo.svg
    > ┗ 📜react-app-env.d.ts

App 파일에 컴포넌트를 때려 넣는식으로 구조가 짜여있었다. 크게 다르진 않지만
각각의 페이지가 있고 페이지의 이동이 있으므로 컴포넌트식으로 구현하기보단 pages폴더에 이 서비스에서 사용되는 페이지를 보여주게끔 바꿨다.

### 3. 레거시 코드 변경, 코드 컨벤션 맞추기

이것 저것 가져다 쓴 티가 났다.

```js
//app.js
class app extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/departmentMBTI">
                        <Options />
                    </Route>
                    <Route>
                        <Route
                            path="/result/:departmentName"
                            component={Department}
                        />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
```

```js
//ProgressBar.js
function App(props) {
    const gage = props.gage - 1;
    const total = props.total;

    return (
        <Container>
            {/*%로 부모넓이의 1/12 씩 넓어짐*/}
            <Progress width={(gage / total) * 100 + '%'} />
        </Container>
    );
}

export default App;
```

-   클래스형, 함수형 컴포넌트를 혼용해서 사용하고 있었다.
    어디는 클래스, 어디는 함수 ~
    혼란이 있어서 일관되게 하나로 변경하였다.

-   BrowserRouter가 app.js에 설정되어 있어서 index.js로 옮겼다.
    이는 둘다 동작에 차이는 없지만 index.js에는 보통 리액트 애플리케이션의 진입점(entry point)으로 사용되며 ReactDOM.render 메서드를 사용하여 루트 컴포넌트를 렌더링하는 역할을 하므로 초기 설정은 가능하면 index.js에서 하는게 일반적인 방법이다.

```ts
//index.tsx
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
```

-   파일명과 파일안에 컴포넌트명이 다른 경우가 있었다. 이것도 인터넷에서 배껴 작성하면서 미처 수정하지 못한걸로 보인다.

```js
//Department.js
export default Profile;
```

-   useHistory 은 React Router v6에서부터는 useNavigate으로 변경되었다.

```js
import { useHistory } from 'react-router-dom';
const history = useHistory();
```

```ts
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
```

### 4. 일관되지 않는 css 라이브러리, 적용방식 변경

전체적으로 styled-components를 사용했지만 inline 방식도 같이 사용하고 있었다.

```js
const imagestyle = {
    height: '300px',
    width: '500px',
};
<img src={item.imagePath} style={imagestyle} alt="mbti" />;
```

이렇게 객체를 생성해서 적용하는 인라인 방식도 있었다.
styled-components로 싹 변경하였다.

### 5. 불필요한 로직 리팩토링

쓸데없이 상태를 남발하는 로직을 압축하였다.

```js
const [num, setNum] = useState(0);
const [currentSlide, setCurrentSlide] = useState(1);
const [mbti, setMbti] = useState([]);
const nextSlideFir = () => {
    setMbti(mbti + Questions[num].answers[0].type);
    setNum(num + 1);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
};
```

별 문제는 없어보이지만 setNum과 setCurrentSlide은 초기 데이터가 0과 1의 차이이지만 사실 둘다 '현재 페이지'에 대한 상태 데이터이다.
이 두개의 상태를 합치고 로직을 손본다면 문제가 없을거라고 생각했다.

```ts
const [currentSlide, setCurrentSlide] = useState(1); //현재 슬라이드
const [mbti, setMbti] = useState([]);
let result: string[] = [];
const nextSlideFir = () => {
    setMbti(mbti + Questions[currentSlide - 1].answers[0].type);
    setCurrentSlide(currentSlide + 1);
    slideRef.current.style.transform += 'translateX(-100vw)';
};
```

### 6. 추가 기능

-   뒤로가기 버튼
    써보는 사람마다 '한 단계 뒤로가기'기능이 없어서 아쉽다고 했었다. 그래서 이번기회에 만들어봤다.

```ts
const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
    if (slideRef.current !== null) {
        slideRef.current.style.transform += 'translateX(+100vw)';
    }
    setMbti(mbti.slice(0, -1));
};
```

| 뒤로가기 비활성화                                                                                    | 뒤로가기 활성화                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/minsang9735/post/bb7fb504-8963-4b91-9adb-57a554cad291/image.png) | ![](https://velog.velcdn.com/images/minsang9735/post/c9786449-b75d-4591-92c7-02a0641aa3bb/image.png) |

결과 배열이 페이지를 지날 때마다 하나씩 쌓이는데 이를 반대로 맨 뒤에 있는 배열 요소를 하나씩 잘라주면 된다.

-   진행바 리팩토링
    ![](https://velog.velcdn.com/images/minsang9735/post/f0e2bfdf-71bf-4a55-8f68-6765eae5bdf8/image.png)

너무 심플하게 진행 상태를 알려주는 진행바를 진행상황을 좀 더 자세하게 알 수 있게끔 변경하였다.
![](https://velog.velcdn.com/images/minsang9735/post/51ac13eb-fb40-42f9-8de2-692966e97095/image.png)

```ts
const checkboxes = [...Array(12)].map((_, index) => (
    <Checkbox
        key={index}
        type="radio"
        isChecked={index + 1 <= currentSlide.currentSlide}
    />
));
```

이전엔 그냥 div에 div를 겹쳐서 보여주는 방식이였지만
체크박스 라디오 타입으로 질문 개수만큼 뿌리고 현재 슬라이드 만큼 채우는 식으로 구현하였다.
