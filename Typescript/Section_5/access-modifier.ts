class DepartmentA {
  // private name: string;
  // private id: string;
  private employees: string[] = [];

  constructor(private id: string, private name: string) {
    // this.name = name;
    // this.id = id;
  }

  describe(this: DepartmentA) {
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
 * 이런식으로 접근이 가능함..
 * 
 * 개발자가 원하는건 메소드로만 접근하여서 값을 수정하는 건데
 * 이는 원하는 방식이 아님.
 */
// account_A.employees[2] = "Bruh";
account_A.printEmployeeInformation();