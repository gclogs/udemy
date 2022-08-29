
> 타입 별칭을 사용하여 타입을 직접 “**생성**”할 수 있습니다. 유니온 타입을 저장하는 것만 가능한 것이 아닙니다. 복잡할 수 있는 객체 타입에도 별칭을 붙일 수 있습니다.


```ts
type User = { name: string; age: number }
const u1: User = { name: 'Max', age: 30 }
```

타입 별칭을 사용하면 **불필요한 반복**을 피하고 타입을 중심에서 관리할 수 있습니다.

예를 들어, 다음 코드를 아래와 같이 **단순화**할 수 있습니다.

```ts
// before 단순화 전
function greet(user: { name: string; age: number }) {
	console.log('Hi I am ' + user);
}

function isOlder(user: {name: string; age: number}) {
	return checkAge > user.age;
}

// after 단순화 후
type User = {
	name: string;
	age: number;
}

function greet(user: User) {
	console.log('Hi I am' + user);
}

function isOlder(user: User) {
	return checkAge > user.age;
}
```