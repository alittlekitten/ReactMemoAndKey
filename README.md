# ✈ React.Memo과 map의 key의 렌더링 연관관계에 대한 실험

[술트리밍 animation-screen/index.tsx](https://github.com/boostcampwm-2021/web12-sooltreaming/blob/main/client/src/components/room/animation-screen/index.tsx)

[술트리밍 animation-screen/QuestionMark.tsx](https://github.com/boostcampwm-2021/web12-sooltreaming/blob/main/client/src/components/room/animation-screen/QuestionMark.tsx)

![image](https://user-images.githubusercontent.com/14370441/159172464-9be3f8a6-c994-4c73-a28f-e73f15b93ab3.png)

- 위 두 컴포넌트에서 발생하는 marks 상태값의 변화에 따른 리렌더링 현상을 실험해보고자 만든 레포지토리입니다.
- key값이 같은 요소가 새롭게 생성되었을 때 리렌더링이 발생하는지 여부, React.memo가 어떻게 동작하는지에 대해서 실험을 통해 공부하였습니다.
- [superLipbalm](https://github.com/superLipbalm)님과 [pyo-sh](https://github.com/pyo-sh)님의 자문을 받아서 실험하였습니다.
- 실험에는 `React Development Tool`이 사용되었습니다.

<br />

---
## 👉 결론

- map의 `key`는 **Reconciliation 과정**에 쓰여서 컴포넌트 함수의 재실행과 DOM Tree의 변경에 영향을 끼칩니다.
- `React.memo`는 같은 위치, 혹은 같은 key의 props를 비교해서 **props가 같으면 메모이제이션된 내용을 그대로 재사용**합니다. 

---

## 🔧 기술 스택

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
</div>

<br />

## 🔑 실행 방법

```
npm install
npm run dev
```

---

## ✨ 자세한 실험 결과

### - 🎉 정배열 / key={index} / React.memo ❌

- 부모 요소가 리렌더링되면 자식 요소는 당연히 리렌더링됩니다.
- 따라서 memo가 되어있지 않은 요소들은 key값과 관계없이 자동으로 리렌더링됩니다.
- 그럼에도 같은 위치에 같은 요소가 남아있다면 실제 DOM Tree는 그대로 유지됩니다.
- 추가되는 요소는 DOM Tree에 추가됩니다. (Reconciliation 과정)
- [공식문서 - Key](https://ko.reactjs.org/docs/lists-and-keys.html#keys)
- [공식문서 - 자식에 대한 재귀적 처리](https://ko.reactjs.org/docs/reconciliation.html#recursing-on-children)

![Honeycam 2022-03-21 02-51-47](https://user-images.githubusercontent.com/14370441/159175683-0b70e82f-a3b0-45b6-82d2-78ad916a1bf0.gif)

<br />

### - 🎉 정배열 / key={index} / React.memo ✔

- 이번에는 아래쪽에 연달아 붙으면서, key가 없지만 React.memo가 되어있는 경우를 살펴보겠습니다.
- 같은 key값의 요소가 비교되고, 같다면 DOM Tree는 바뀌지 않습니다.
- React.memo에 의해 같은 props인 경우 내부 로직이 작동하지 않습니다.
- 따라서 추가되는 부분만 로직이 돌아가게 됩니다. (새로 만들어 지는 친구는 매번 1개씩만 console에 찍힙니다.)

![Honeycam 2022-03-21 02-43-12](https://user-images.githubusercontent.com/14370441/159175337-189e432d-a5a8-4b33-ab95-892aef27faa0.gif)

<br />

### - 🎉 역배열 / key={index} / React.memo ✔

- 역배열로 추가가 된다면 요소가 추가될 때마다 각 아이템들의 index가 바뀌게 됩니다.
- 요소가 추가될 때마다 기존 요소들이 한칸씩 아래로 내려가기 때문에 Diff 알고리즘에 의해 모든 요소들이 달라진 것으로 인식되어 DOM Tree 전체가 변경됩니다.
- 또한 React.memo에 의해 props가 비교되는 과정에서 잘못된 요소가 비교대상이 되어서 리렌더링이 발생하게 됩니다.

![Honeycam 2022-03-21 02-55-31](https://user-images.githubusercontent.com/14370441/159175831-fc2c9d4d-1d8e-4ef9-8ae1-6e4fbf9e9790.gif)

<br />

### - 🎉 역배열 / key ✔ / React.memo ❌

- 이번에는 key를 부여하고 memo를 하지 않았습니다.
- 고유한 key값을 부여하였기 때문에 DOM Tree의 변경은 실제 변경된 부분만 이루어집니다.
- memo가 되지는 않았기 때문에 DOM Tree의 변경과는 별개로 내부 로직이 돌아갑니다. (새로 만들어지는 친구가 모든 요소에 뜹니다!)

![Honeycam 2022-03-21 02-59-15](https://user-images.githubusercontent.com/14370441/159175975-35dd3224-4c31-40ca-90d2-5d5a57765144.gif)

### - 🎉 역배열 / key ✔ / React.memo ✔

- 마지막으로 key값을 고유한 값으로 주고 React.memo까지 적용했습니다.
- 고유한 key값을 부여하였기 때문에 DOM Tree의 변경은 실제 변경된 부분만 이루어집니다.
- React.memo에 의해 같은 컴포넌트는 재생성되지 않고, 로직도 돌아가지 않습니다. (새로 만들어 지는 친구는 매번 1개씩만 console에 찍힙니다.)

![Honeycam 2022-03-21 03-02-46](https://user-images.githubusercontent.com/14370441/159176108-5c5af762-2378-44a3-8eda-918fa59bc860.gif)
