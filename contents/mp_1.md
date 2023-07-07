---
date: '2023-07-07'
title: '스크롤 버튼 만들기'
categories: ['STUDY']
summary: '미니프로젝트 스터디 발표 내용'
thumbnail: './codingcat2.png'
---
> 데브코스 안에서 진행중인 미니프로젝트 스터디 에서 발표한 내용입니다. 
>
> 진행중인 프로젝트의 변경사항이나 공부한내용을 공유하고 발표하는 스터디입니다.

### 목적
현재 운영중인 이 블로그에 포스트가 많거나 포스트의 내용이 길 때 스크롤을 다시 올리기 불편할 수 있기 때문에 화면의 최상단으로 스크롤을 올려주는 기능을 만들어 보았습니다.

### 기능
처음 화면에서는 버튼이 보이지 않고 스크롤을 조금 내리다보면 버튼이 보이게 되고 버튼을 클릭하면 화면의 최상단으로 스크롤이 이동합니다.

### 스타일
```tsx
// styled Component를 사용해서 스크롤버튼의 스타일을 작성했습니다.
const ScrollToTopButton = styled.button<{ isVisible: boolean }>`
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 10%;
  right: 12%;
  background-color: #6584fb;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
```
- opacity 값을 isVisible이 truthy한 값 일때, opacity 값을 1로, falsy한 값이면 opacity를 0으로 줌으로써 버튼이 보였다 안보였다 할 수 있게 만들었습니다.
- opacity 속성이 변화할 때 0.3초동안 부드럽게 변하도록 설정했습니다.

### 로직
```tsx
// useState Hook을 사용해서 isVisible의 값을 변경시킵니다.
const [isVisible, setIsVisible] = useState(false);

	// 스크롤 이벤트가 발생할 때마다 스크롤 위치를 확인하고 isVisible 값을 업데이트 하는 함수입니다.
  const handleScroll = () => {
		// 스크롤이 수직방향으로 200이상 내려가면 true 값을 할당해서
    const shouldShowButton = window.scrollY > 200
		// setIsVisible 함수롤통해 isVisible의 값을 true로 바꿔줍니다.
    setIsVisible(shouldShowButton);
  }

	// 스크롤 버튼을 눌렀을때 화면을 최상단으로 스크롤하는 함수입니다.
  const scrollToTop = () => {
		// window객체의 scrollTo 메서드를 사용해서 스크롤이 최상단에 올라가게 하고 부드럽게 움직일수 있도록 했습니다.
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
	// useEffect Hook을 사용해서 컴포넌트가 처음 렌더링될 때만 스크롤 이벤트 리스너를 추가하고, 컴포넌트가 언마운트 될 때 리스너를 제거합니다.
  useEffect(() => {
		// scroll 이벤트가 발생 할때마다 handleScroll 함수 호출합니다.
    window.addEventListener('scroll', handleScroll);
		// 컴포넌트가 언마운트되기 전에 scroll 이벤트 리스너를 제거하고
		// 컴포넌트가 사라지는 경우에는 더 이상 해당 이벤트가 처리되지 않도록 합니다.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
```
이렇게 `useEffect` Hook을 사용하여 스크롤 이벤트 리스너를 추가하고 제거함으로써 컴포넌트가 렌더링될 때마다 스크롤 위치를 감지하고, 이에 따라 'isVisible'상태를 업데이트하여 스크롤 버튼을 표시하거나 숨깁니다.

```tsx
<ScrollToTopButton isVisible={isVisible} onClick={scrollToTop}>
	<svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 512 512">
    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" style={{ fill: '#fff' }} />
  </svg>
</ScrollToTopButton>
```
이런 식으로 렌더링 해서 isVisible = true 일때 버튼이 보이고 버튼을 클릭하면 scrollToTop 함수를 실행하여 스크롤이 화면의 최상단에 올라가게 만들어주는 버튼을 완성했습니다.

<br>

컴포넌트가 언마운트되기 전에 scroll 이벤트 리스너를 제거하는 이유는 메모리 누수를 방지하고 성능을 최적화하기 위해서입니다.

일반적으로 컴포넌트가 마운트된 상태에서는 해당 컴포넌트에 등록된 이벤트 리스너가 메모리에 유지됩니다. 이벤트 리스너는 컴포넌트의 수명 주기 동안 계속 유지되어 이벤트가 발생할 때마다 동작합니다.

컴포넌트가 사라질 때 (언마운트될 때), 해당 컴포넌트와 관련된 리소스를 `clean-up` 하는 것이 중요하다고 생각합니다. 이벤트 리스너도 마찬가지로 정리되어야 하며 그렇지 않으면 컴포넌트가 사라져도 이벤트 리스너가 계속 유지되며, `메모리 누수`(memory leak)가 발생할 수 있습니다.

따라서 `useEffect` 훅 내에서 `return` 구문을 사용하여 이벤트 리스너를 제거함으로써 컴포넌트가 언마운트될 때 해당 이벤트가 처리되지 않도록 합니다. 이를 통해 불필요한 메모리 소비와 성능 저하를 방지할 수 있습니다.