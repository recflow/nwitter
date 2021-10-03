#작업시 에러 모음

1. 로그아웃 시 메모리 누수 이슈가 존재함.
```
index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Home
```

2. 재로그인 시 중복 랜더링 에러 존재함.
> 이건 화면상으로 보여지는 문제라서 로그는 없음.