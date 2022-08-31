class Department {
  name: string;

  constructor(n: string) { // 초기화 작업 수행
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name)
  }
}

const accounting = new Department('Accounting');
accounting.describe();

const accountingCopy = {
  name: "DUMMY", // 61. 클래스 내부의 name 프로퍼티는 Department를 기반으로 하기 때문에 없으면 오류남.

  /**
   * [61]
   * 객체 리터럴로 생성됨.
   * 클래스를 기반으로 하지 않고 더미 객체로 생성됨.
   * 
   * 클래스 내부의 this 키워드가 'accountingCopy' 객체를 참조하지 않기 때문에
   * 접근하게 되면 에러가 발생함.\
   * 
   * 그래서 출력시에 undefined와 같은 값이 출력되는 것.
   * 
   * 해결방법 : describe(this: Department) 와 같이 메소드를 정상적으로 호출할 수 있음.
   * 여기서 유의해야할 점은 클래스가 가지고 있는 프로퍼티를 추가해야 한다. 
   */
  describe: accounting.describe
}

accountingCopy.describe();