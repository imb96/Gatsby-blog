---
date: '2024-07-13'
title: 'CSS Flex'
categories: ['CSS']
summary: 'Flex 해보렸지 모얌'
thumbnail: './til.jpg'
---

# Flex
레이아웃을 정의할 때 특히, 수평정렬을 할 때 당연하다는 듯이 Flex 를 사용해서 구현하고는 합니다. 웹 페이지는 기본적으로 수직으로 구성되어 있으며 수직으로 스크롤하며 화면을 읽게 됩니다. HTML Elements들은 대부분 `display: block` 속성을 가지고 있기 때문에 수직으로 Element들을 수직으로 쌓는 것은 쉽게 가능하지만 수평으로 쌓는 것은 다릅니다.

Flex를 알기 전에는 주로 요소에 `float: left` 속성을 주어 수평정렬을 구성하였는데요 Flex를 사용하면 더 쉽게 레이아웃을 구성할 수 있으며 반응형 디자인에도 적합하다고 생각합니다.

모든 속성을 다 배우기보다는 활용하기 좋은 속성을 위주로 진행해보겠습니다.

Flex는 Flexible Box, Flex Box 라고도 불리우며 두 가지 요소로 분리됩니다.
- Flex Container(플렉스 컨테이너)
- Flex Items(플렉스 아이템)

이름만들어도 어느정도 유추가능한데요, Flex Container라는 부모요소가 Flex의 영향을 받으며, 설정된 속성에 따라서 각각의 Flex Items가 배치되게 됩니다.

그리고 이런 Flex Container와 Flex Items에 적용될 수 있는 속성도 각각 존재합니다.

## Flex Container

Flex Container의 속성은 다음과 같습니다.
- display
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-content
- align-items
- gap

간단한 Flex 레이아웃을 만들어 보겠습니다.

```html
// index.html
<div class="container">  
    <div class="item">item1</div>  
    <div class="item">item2</div>  
    <div class="item">item3</div>  
</div>
```
```css
/* index.css */
.container {  
  display: flex;
  // display: inline-flex;
}
```

위와 같은 레이아웃은 화면에 다음과 같이 출력됩니다.!
![](../static/flex.png)

Flex Items들이 수평으로 배치되며 item의 width만큼 자리를 차지하고 height값을 직접 지정해주지 않으면 Flex Container의 height만큼 늘어나게 됩니다.

`display: inline-flex`의 경우에는 다음과 같이 출력됩니다.
![](../static/inline-flex.png)

`display: flex`는 block 요소와 같이 수직으로 쌓이며 `display: inline-flex`는 inline 요소와 같이 수평적으로 쌓이는 특성을 가지게 됩니다. block과 inline-block을 생각하시면 됩니다. 
여기서 얘기하는 수직, 수평으로 쌓이는 것은 Flex Items를 말하는 것이 아닌 Flex Container를 말하는 것임을 주의해주세요.

먼저 Flex Container의 속성들을 알아보겠습니다.

### flex-direction
`flex-direction` 속성으로 flex items를 어느 방향으로 배치 할 것인지(메인축) 설정할 수 있습니다.

> 메인축(Main Axis): item들이 배치된 방향의 축
>
> 교차축(Cross Axis): 메인축과 수직으로 교차하는 축
<br />
위에서 만들어 본 레이아웃을 예시로 들어보겠습니다.

![](../static/axis.png)

<br />

메인축(Main Axis)와 교차축(Cross Axis)를 이해하고있으면 flex를 이해하기 더 쉽습니다!

`flex-direction` 속성을 사용해서 item들이 배치되는 방향 (메인축)을 정해줄 수 있습니다.

<br />

![](../static/flex-direction.png)

### flex-wrap
Flex에서는 기본적으로 items들의 크기가 container의 요소보다 커지더라도 한 줄에서만 (메인축으로) 표시가 되고 줄 바꿈되지가 않습니다.

`flex-wrap`은 items의 여러 줄 묶음(줄 바꿈)을 설정할 수 있습니다.

![](../static/flex-wrap.png)

지금까지 `flex-direction` 속성과 `flex-wrap`을 알아보았는데요, 이 속성을 한 속성에서 설정해줄 수도 있습니다.

### flex-flow
```css
{
  /* flex-flow: [flex-direction] [flex-wrap] */
  flex-flow: column wrap;
}
```

### justify-content
`justify-content` 속성을 사용하면 메인 축(main-axis)의 정렬 방법을 설정할 수 있습니다.

![](../static/justify-content.png)

`space-around`와 `space-between`의 차이점이 미묘해 보일 수 있는데요 
- `space-between`은 첫번째 item을 시작점에, 마지막 item을 끝점에 두고 나머지 여백을 골고루 지정해줍니다.
- `space-around`는 item들의 사이의 여백을 골고루 지정해줍니다.
<br />
<br />

### align-content
`align-content` 속성을 사용하면 교차 축(cross-axis)의 정렬 방법을 설정할 수 있습니다.

![](../static/align-content.png)

### align-items
`align-items` 속성을 사용하면 교차 축(cross-axis)에서 items의 정렬 방법을 설정할 수 있습니다.

![](../static/align-items.png)


### gap
`gap` 속성을 사용하면 items들의 사이사이 간격들을 설정할 수 있습니다.

## Flex Items
Flex Items의 속성은 다음과 같습니다.
- order
- flex-grow

### order
`order` 속성을 사용하면 item의 순서를 설정할 수 있습니다. order의 값으로 items의 정렬 순서가 결정됩니다. order의 기본값은 0입니다. 

아이템의 순서를 바꾸고 싶을 때 사용할 수 있습니다.

![](../static/order.png)

### flex-grow
`flex-grow` 속성을 사용하면 item들의 증가 너비 비율을 설정할 수 있습니다.

![](../static/flex-grow.png)

<br />

이렇게 Flex와 Flex의 여러 속성들을 알아보았는데요. 이 글에서 이야기하지 않은 속성들도 많이 있으니 더 궁금하시다면 아래 참고 자료를 찾아보시면 좋을것 같습니다.
<br />

> https://www.heropy.dev/p/Ha29GI
>
> https://studiomeal.com/archives/197
