---
date: '2022-07-12'
title: 'Regexp'
categories: ['JS']
summary: '정규표현식에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

**정규표현식(regular expression)**은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식언어(formal language)다.
정규표현식은 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환할 수 있는 기능을 제공한다.

정규식 객체를 만들 땐 두 가지 문법이 사용된다.
정규 표현식 리터럴과 RegExp 생성자 함수를 사용할 수 있다.
일반적으로는 정규 표현식 리터럴을 사용한다.

```
const target = 'Is this all there is?;
// pattern : is
// flag: i // 대소문자 구분없이 검색한다.
const regexp = /is/i;
// test 메서드는 target 문자열에 대해 정규 표현식 regexp의 패턴을 검색하여
// 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // true
```

RegExp 생성자 함수를 사용하여 RegExp 객체를 생성할 수도 있다.
```
const target = 'Is this all there is?';
const regexp = new RegExp(/is/i);
regexp.test(target);	// true
```

RegExp 생성자 함수를 사용하면 변수를 사용해 동적으로 RegExp 객체를 생성할 수 있다.
const count = (str, char) => (str.match(new RegExp(char,'gi')) ?? []).length;
count('Is this all there is?, 'is'); // 3
count('Is this all there is?, 'bcx'); // 0

### 자주 사용하는 정규표현식
#### 특정 단어로 시작하는지 검사
검색 대상 문자열이 'http://' 또는 'https://'로 시작하는지 검사하는 예제
[...] 바깥의 ^은 문자열의 시작을 의미. ?은 앞선 패턴(다음 예제에선 's')이 최대한번(0번포함)이상 반복되는지를 의미. 따라서 검색 대상 문자열에 앞선패턴('s')이 있든 없든 매치된다.
```
const url = 'https://example.com';
// 'http://' or 'https://'로 시작하는지 검사
/^https?:\/\//.test(url); // true
//or
/^(http|https):\/\//.test(url) // ture
```
#### 특정 단어로 끝나는지 검사
검색 대상 문자열이 'html'로 끝나는지 검사. '$'는 문자열의 마지막을 의미.
```
const fileName = 'index.html';
// 'html'로 끝나는지 검사.
/html$/.test(fileName); // true
```
### 숫자로만 이루어진 문자열인지 검사
[...] 바깥의 ^은 문자열의 시작, $는 문자열의 마지막을 의미.
\d는 숫자를 의미. +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미.
즉, 처음과 끝이 숫자이고 최소 한 번 이상 반복되는 문자열과 매치.
```
const target = '12345'
// 숫자로만 이루어진 문자열인지 검사.
/^\d+$/.test(target);	// true
```
### 하나 이상의 공백으로 시작하는지 검사
검색 대상 문자열이 하나 이상의 공백으로 시작하는지 검사.
\s 는 여러 가지 공백 문자(스페이스, 탭 등)를 의미.
즉 \s는 [\t\r\n\v\f]와 같은 의미.
```
const target = ' Hi!;
// 하나 이상의 공백으로 시작하는지 검사.
/^[\s]+/.test(target); // true
```
### 아이디로 사용 가능한지 검사
검색 대상 문자열이 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사
{4,10}은 앞선 패턴(알파벳 대소문자 또는 숫자)이 최소 4번, 최대 10번 반복되는 문자열을 의미.
즉, 4~10자리로 이루어진 알파벳 대소문자 또는 숫자를 의미.
```
const id = 'abc123';
// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리인지 검사한다.
/^[A-Za-z0-9]{4,10}$/.test(id); // true

```
### 메일 주소 형식에 맞는지 검사
검색 대상 문자열이 메일 주소 형식에 맞는지 검사
```
const email = 'ungmo2@gmail.com';
/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email) // true
```
### 핸드폰 번호 형식에 맞는지 검사
검색 대상 문자열이 핸드폰 번호 형식에 맞는지 검사
```
const cellphone = '010-1234-5678';
/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone) // true
```
### 특수 문자 포함 여부 검사
검색 대상 문자열에 특수 문자가 포함되어 있는지 검사.
```
const target = 'abc#123';
(/[^A-Za-z0-9]/gi).test(target); // true
```
다음 방식으로 대체해 사용할 수도 있다. 특수 문자를 선택적으로 검사할 수 있다.
```
(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi).test(target); // true
```
특수 문자를 제거할 때는 String.prototype.replace 메서드를 사용.
`target.replace(/[^A-Za-z0-9]/gi, ''); // abc123`
