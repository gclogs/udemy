class DepartmentA {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.name = name;
    // this.id = id;
  }

  describe(this: DepartmentA) {
    // this.id = 'd3'
    console.log(`Department : (${this.id}) ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const account_A = new DepartmentA("D1", "Accounting");
account_A.addEmployee("Max");
account_A.addEmployee("Anna");

/**
 * 접근제어자인 public, private 등의 키워드가 없다면
 * 아래와 같이 접근이 가능함..
 * 
 * 개발자가 원하는건 '클래스 내부'에서만 접근 가능하게 하는건데,
 * 이는 원하는 방식이 아님.
 */
// account_A.employees[2] = "Bruh";
account_A.printEmployeeInformation();