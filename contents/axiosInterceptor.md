---
date: '2023-08-22'
title: 'Axios와 Interceptor 사용해보기'
categories: ['FE']
summary: 'Axios와 Axios의 Interceptors 사용해보자'
thumbnail: './til.jpg'
---

최근에 Vue.js 를 사용해 프로젝트를 진행하면서 Axios를 사용해보았다.
[Move to Movie](https://fedc-4-11-vue-rho.vercel.app/)

> Axios는 node.js와 브라우저를 위한 _[Promise 기반](https://javascript.info/promise-basics)_ HTTP 클라이언트 입니다. 그것은 _[동형](https://www.lullabot.com/articles/what-is-an-isomorphic-application)_ 입니다(동일한 코드베이스로 브라우저와 node.js에서 실행할 수 있습니다). 서버 사이드에서는 네이티브 node.js의 `http` 모듈을 사용하고, 클라이언트(브라우저)에서는 XMLHttpRequests를 사용합니다.
> 
> 출처: Axios 공식 문서

처음 PR할 때 axios를 사용해서 이런식으로 작성해주었다.

```js
// api
export default async function (req, res) {
	const { data } = await axios.get(API_END_POINT, {
		params: { apikey: APIKEY, ...req.query }
	})
	res.status(200).json(data)
}
// store
async fetchMovies(title: string, page: number) {
	if (this.loading) return
	this.loading = true
	try {
		const response = await axios.get(`/api`, {
			params: {
				s: title,
				page: page
			}
		})
		const { Search, totalResults } = response.data
		this.movies = Search
		this.totalResults = totalResults
		this.page = page
	} catch (error) {
			console.error('store/movie fetchMovies:', error)
	} finally {
			this.loading = false
		}
}
```

이렇게 axios를 호출할 때마다 처리를 해주었는데 제출한 코드를 멘토님께서 axios에 대해서 추가적으로 interceptor를 구현하여서 응답전이나 응답을 받은 이후등에 대해서 여기서 공통적인 처리를 한다면 각 페이지마다 axios 호출에 대한 처리를 할 필요성이 사라지게 된다는 코드리뷰를 주셔서 axios interceptor에 대해서 알아보게 되었다.

[Axios 공식문서-인터셉터](https://axios-http.com/kr/docs/interceptors)
Axios 공식문서가 너무 단순해서 놀랐다.

공식문서에서는 `then` 또는 `catch` 로 처리되기 전에 요청과 응답을 가로챌 수 있다고 한다.

```js
// Axios 공식문서 - 인터셉터
// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) { 
	// 요청이 전달되기 전에 작업 수행 
	return config; 
	}, function (error) { 
	// 요청 오류가 있는 작업 수행 
		return Promise.reject(error);
	});
	// 응답 인터셉터 추가하기 
	axios.interceptors.response.use(function (response) { 
	// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다. 
	// 응답 데이터가 있는 작업 수행 
		return response;
	}, function (error) { 
	// 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다. // 응답 오류가 있는 작업 수행 
		return Promise.reject(error);
	});
```

위의 코드를 참고하며 전에 작성했던 코드를 고쳐 보았다.

```js
// api
const axiosInstance = axios.create({
	baseURL: API_END_POINT
})

axiosInstance.interceptors.request.use(
	config => {
		config.params = { apikey: APIKEY, ...config.params }
		return config
	},
	error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error)
)

export default async function (req, res) {
	const data = await axiosInstance.get('', {
		params: req.query
	})
	res.status(200).json(data)
}

// store
async fetchMovies(title: string, page: number) {
	if (this.loading) return
  this.loading = true
  const response = await axiosInstance.get(`/api`, {
	  params: {
      s: title,
      page: page
    }
  })
  const { Search, totalResults, Response } = response.data
  this.movies = Search
  this.totalResults = totalResults
  this.page = page
  this.loading = false
}
```

Axios 인터셉터를 활용하여 API 요청 전후에 공통적인 처리를 수행함으로써  axios를 호출할 때마다 해주던 코드들을 줄이고 가독성을 높일 수 있었다.
그리고 노션 프로젝트에서 fetchAPI를 사용한 부분을 axios를 사용해서 다음과 같이 바꿔 주었다.

```js
// fetch
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': USERNAME
      }
    })

    if (res.ok) {
      return res.json();
    }

    throw new Error('API Request Error');
  } catch (error) {
    alert(error.message)
  }
}

export const fetchList = async () => {
  const posts = await request('/documents', {
    method: 'GET',
  })
  return posts;
}

export const createPost = async (post) => {
  const newPost = await request('/documents', {
    method: 'POST',
    body: JSON.stringify(post),
  })
  return newPost;
}

export const deletePost = async (_id) => {
  await request(`/documents/${_id}`, {
    method: 'DELETE',
  })
}

export const updatePost = async (_id, postBody) => {
  await request(`/documents/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(postBody),
  })
}

export const fetchPost = async (_id) => {
  console.log(_id);
  const post = await request(`/documents/${_id}`);
  return post;
}
```

```js
// axios
const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  headers: {
    'Content-Type': 'application/json',
    'x-username': USERNAME
  }
})

axiosInstance.interceptors.request.use(
  (config) => return config,
  (error) => return Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export const fetchDocumentPageList = async () => {
  const documents = await axiosInstance.get('/documents')
  return documents
}

export const createDocument = async (document) => {
  const newDocument = await axiosInstance.post('/documents', document)
  return newDocument
}

export const deleteDocument = async (id) => {
  await axiosInstance.delete(`/documents/${id}`)
}

export const updateDocument = async (id, document) => {
  await axiosInstance.put(`/documents/${id}`, document)
}

export const getDocumentById = async (id) => {
  const document = await axiosInstance.get(`/documents/${id}`)
  return document
}

```