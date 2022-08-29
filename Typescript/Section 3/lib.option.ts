// tsconfig > CompileOptions > lib: []

const button = document.querySelector('button')!;

/**
 * 버튼 요소가 addEventListener를 가지고 있다는 것을 아는 이유?
 * 
 * 1. 자바스크립트에서는 유효한 코드라고 여겨진다.
 * 2. 그러나 타입스크립트 코드에서는 브라우저를 기반으로 작성하는 것이 아님을 인지하자.
 * 
 * 3. 작동하는 이유는 tsconfig.json 옵션중에 "lib" 옵션 덕분이다.
 * 4. "lib" 옵션이 세팅이 되어 있지 않는 경우 "target" 옵션의 '자바스크립트 버전'을 기반으로 동작한다.
 * 
 */
button.addEventListener('click', () => {
  console.log('Clicked!')
})