```json
{
  "CompileOptions": {
    "target": "es6", // 37. 어떤 자바스크립트 버전으로 컴파일을 할 것인지 알려줌.
    "module": "commonjs",
    "lib": [
      "dom",
      "es6",
      "dom.iterable",
      "scripthost"
    ] // 38.  dom API를 타입스크립트에서 사용할 수 있게 한다. 필자가 작성한 설정들은 "es6" 버전에 있는 기본 설정들임. 참고바람

    // something code..
  },
  "exclude": [ // 파일을 '제외'시킴
    "node_moudles" // 라이브러리들 중 일부가 타입스크립트 파일이 있는 경우 컴파일 해서는 안됨. -> 최악의 경우 프로젝트가 망가짐
  ],
  "include": [ // 파일을 '포함'시킴
    "app.ts",
    "*.module.ts" // module.ts 파일들을 모두 컴파일
  ]
}
```

> 기본 컴파일 기능이나 프로젝트 관리 설정만 하면 됨.

# 참고 문서

1. [타입스크립트 설정 파일 (tsconfig.json)](https://joshua1988.github.io/ts/config/tsconfig.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EC%86%8D%EC%84%B1)