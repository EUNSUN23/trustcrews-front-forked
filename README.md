
<br/>

# TRUSTCREWS 소개

- 다양한 개발 직군, 프로그래밍 언어별로 개설된 **사이드 프로젝트**에 참여하거나, 직접 프로젝트를 개설하여 **팀원을 모집**할 수 있는 사이트 입니다.
- 사이드 프로젝트의 **업무**와 **팀원**을 관리할 수 있으며, **팀원 강제탈퇴 시스템**, 프로젝트 업무 수행을 통해 포인트를 얻는 **신뢰점수 시스템** 등 다양한 방법으로
  **책임감 있는** 사이드 프로젝트 운영을 돕습니다.

<br/>

# Front-end

<br/>

### 멤버

[EUNSUN23](https://github.com/EUNSUN23) (2023.11 ~ ), [moa1128](https://github.com/orgs/oneMonthProject/people/moa1128) (2023.11 ~ 2024.01)

<br/>

### 기술스택

JavaScript, TypeScript, React (Hook), Next.js 14, Tanstack-Query, Recoil, Tailwind CSS, Github Actions, Vercel

<br/>

### 작업 내용

1. 서비스 주요 기능 구현 - 2023.11 ~ 2024.10
2. 프로젝트 구조 리팩토링 - 2025.04 ~ 2025.05.25
3. Sentry 로그 도입 - 2025.06 ~ (예정)

<br/>

## 프로젝트 구조

```text
src
├── app
├── constants
├── features
├── hooks
├── layouts
├── lib
├── providers
├── shared
├── store
├── types
├── corsMiddleware.ts
└── middleware.ts
```

- **`shared`** : 프로젝트에 종속되지 않는 재사용 가능 소스 <br/>
- **`lib`** : 프로젝트 라이브러리 소스 <br/>
- **`constants`**, **`hooks`**, **`store`**, **`types`**, **`providers`** : 프로젝트에서 사용하는 constant, hook, store,  type, provider <br/>
- **`features`** : 애플리케이션 핵심 기능 <br/>
  
  ```text
  src/features/myProjects/
  ├── components
  └── contents
  ```
  
  - **`components`** : 뷰를 구성하는 **시각적 요소 중심의 단순한 컴포넌트**
  - **`contents`** : UI를 조합해 특정 동작이나 API 호출 등을 하는 등 **기능 수행 중심의 컴포넌트** <br/><br/>
- **`corsmiddleware.ts`** : 라우트핸들러 요청 미들웨어
- **`middleware.ts`** : 앱라우터 요청 미들웨어

<br/>

## 프로젝트 실행

<br/>

**`.nvmrc`에 기재된 Node.js 버전 설치**

```bash
nvm install 
nvm use
```

<br/>

**프로젝트 패키지 설치**

```bash
npm i
```

<br/>

**프로젝트 개발모드 실행**

```
npm run dev
```

```

```

