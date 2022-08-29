# Typescript Enum 정리

대충 내용.

열거형은 이름이 있는 상수들의 집합을 정의함.

```typescript
enum Direction {
	Start = 1, Middle, End
  
}
```

위 코드처럼 `Start` 이 `1` 로 초기화된 숫자 열거형을 선언했음.
그 지점부터 뒤 따르는 멤버들은 auto-increament 값을 얻음.

## 참고자료
[# Enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html)