# 사내에서 사용할 util성 기능 electron App

## Electron

- npm package들을 사용해서 electron app 세팅
- package.json의 `main` prop에 실행할 js파일 세팅
  - 위의 파일은 electron의 *main process, renderer process*를 관리한다.
    - main process
      - node.js의 instance
      - app의 lifecycle 관리
      - 인터페이스 디스플레잉
    - renderer processes
      - web page 파일 및 url로 접근해 HTML을 읽어올 수 있음
      - web과 유사하게 표현하고, web API 접근 가능

## preload script

- *main process*는 OS에 접근이 가능한 node.js 환경
- 따라서 electron 모듈에선 node.js built-in들에 접근 가능
    - npm을 통해 설치된 package도 마찬가지 접근 가능

- *renderer process*는 web page를 실행하고, 보안적인 이유로 Node.js 위에서 동작하지 않음

- 두 process를 연결하기 위해 사용되는 script가 *proload*

## preload script 와 renderer

- BrowserWindow의 preload script는 DOM에 접근이 가능하고, 몇몇의 Node.js와 electron API에 접근이 가능
- preload script는 페이지가 rendering 되기 전에 주입
- contextBridge API를 통해 global 객체를 정의 가능


## Communicating betwen process
- main, renderer process는 각각 책임과 역할이 다름
    - renderer process 는 Node.js에 바로 접근할 수 없음
    - main process는 DOM에 바로 접근할 수 없음
- 따라서 preload script에  *ipcMin*, *ipcRenderer* 모듈을 사용해 소통(inter-process communication)
- main process는 `ipcMain.handle` 을 통해 이벤트 핸들링
- renderer process는 `ipcRenderer.invoke` 노출