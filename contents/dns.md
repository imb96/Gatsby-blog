---
date: '2024-06-29'
title: 'github page에 도메인 이름 달기'
categories: ['Person']
summary: '블로그에 dns 달기'
thumbnail: './til.jpg'
---

github page로 배포한 사이트에 도메인을 달려고 한다.

먼저 도메인을 구매해야하는데, [SquareSapce](https://domains.squarespace.com/?_gl=1*13b284t*_up*MQ..&gclid=CjwKCAjw4f6zBhBVEiwATEHFVnQVKEM2nb3ye7rfEEY0eC9KgTi1KjrvtKq7NbmN-5hG3UVV27llKRoCPuAQAvD_BwE&gclsrc=aw.ds) 에서 1년간 사용에 30달러로 구매하였다.

도메인을 구매하고 나면 몇가지 설정을 해주어야 한다.

### github 설정
github repository의 root에 `CNAME` 이라는 파일을 만들고 그 안에 도메인의 이름을 넣어준다.
이렇게 해야 github page가 도메인을 인식한다.

그 후에 repository > 설정 > pages > Custom domain에 도메인 주소를 입력하고 save 한다.

### DNS 설정
DNS setting 페이지에서 A record(Address Record)를 추가해준다.
도메인 이름을 IP 주소에 매핑하는 DNS 레코드로, 웹 브라우저가 도메인 이름을 IP 주소로 변환하여 서버에 연결할 수 있게 해준다.
record에는 Host,	Type,	Data 를 입력할 수 있다.

예)
```shell
 Host	Type	      Value
  @	    A	    185.199.108.153
  @	    A	    185.199.109.153
  @	    A	    185.199.110.153
  @	    A	    185.199.111.153

// GitHub Pages는 다음 네 개의 IP 주소를 사용한다:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

위와 같이 설정하면 도메인이 GitHub Pages의 여러 서버에 연결된다.