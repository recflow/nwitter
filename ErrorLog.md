# 작업시 에러 모음

### 1. 로그아웃 시 메모리 누수 이슈가 존재함.

- 증상
```
index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Home
```
-----
### 2. 재로그인 시 중복 랜더링 에러 존재함.
- 증상
> 이건 화면상으로 보여지는 문제라서 로그는 없고... 일단 좀 둬보자
-----
### 3. for 에러
- 증상
```
index.js:1 Warning: Invalid DOM property `for`. Did you mean `htmlFor`?
    at label
    at form
```
- 이유 
>JSX는 javascript이므로 for은 반복의 의미가 있어 label 태그에는 htmlFor을 써줘야한다. 

- 해결
>NewitFactory의 label태그 수정
-----
### 4. ComputeMatch error
- 증상
```
index.js:1 Warning: React does not recognize the `computedMatch` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `computedmatch` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
    at div
    at Switch (http://localhost:3000/static/js/vendors~main.chunk.js:93002:29)
    at Router(...
```

- 해결방법
>Router의 Switch 태그의 안을 <></> Fragment로 묶어준다
-----
### 5. 프로필 변경시 발생하는 에러

- 증상
```
Uncaught (in promise) TypeError: userInternal.getIdToken is not a function
    at updateProfile (account_info.ts:50)
    at onSubmit
```
>프로필의 이름을 변경시 실시간으로 나타나게 하는 부분에서 2번 이상 수정하면 토큰을 불러오지 못한다. 2일 붙들고 있었는데 여러 방안을 시도해봤으나 해결이 되지 않는 중...


-----
### 6. 중복 아이디인데 다른 인증을 통해서 로그인 할 때 에러 화면에 처리 해주기
- 증상
```
errors.ts:91 Uncaught (in promise) FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).
    at createErrorInternal
```
>처음에 처리 했던 것 같은데 왜 발생하는 것일까? 에러 발생시 에러 페이지로 이동하는 것이 아니라 메세지를 보여주는 방식으로 변경해야한다.

