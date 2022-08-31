/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 68. 정적 메서드 & 속성
 */

class DepartmentC {
  static fiscalYear = 2022;

  employees: string[] = [];
  constructor(private readonly id: string, public name: string) {
    // console.log(DepartmentC.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name }
  }

  describe(this: DepartmentC) {
    console.log(`Department : (${this.id}) ${this.name}`);
  }

  addEmployee(em: string) {
    this.employees.push(em);
  }

  getEmployees() {
    return this.employees;
  }

  printEmployees() {
    console.log( this.getEmployees );
  }
}

const employee = DepartmentC.createEmployee("Max");

console.log( `${employee} + ${DepartmentC.fiscalYear}` );