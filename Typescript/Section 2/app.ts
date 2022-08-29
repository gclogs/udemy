let userInput: unknown; // unkown(알 수 없는 타입) 은 any 타입보다 제한적임.
let userName: string;

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') { // 따라서 추가적인 타입 검사가 필요함
  userName = userInput;
}

function generatorError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generatorError('An error occurred!', 500);