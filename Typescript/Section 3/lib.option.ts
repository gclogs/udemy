// tsconfig > CompileOptions > lib: []


/**
 * [Tip] 개발자가 button 요소가 있다고 알고 있는 가정하에, 
 * ; 앞에 붙은 ! 는 개발자에게 button이 존재하거나 null이 아닌 값을 반환한다는 걸 알 수 있게 해주는 역할임
 * 
 * 그게 아니라면 if문으로 문제가 있을지도 모르는 코드를 검사하는 게 좋다.
 */
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

if (button) { // null check
  button.addEventListener('click', () => {
    console.log('Clicked!');
  })
}