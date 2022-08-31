/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 65. 상속
 * 66. 속성 및 'protected(수정된)' 수정자 재정의
 * 67. 게터 & 세터
 * 
 * 69. abstrat(추상) 클래스
 */
abstract class DepartmentB {
  employees: string[] = [];
  constructor(protected readonly id: string, public name: string) {
    
  }

  abstract describe(this: DepartmentB): void;

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

class ITDepartmentB extends DepartmentB {
  constructor(id: string, private admins: string[]) {
    super(id, "IT")
  }

  describe(this: DepartmentB): void {
    console.log("IT Department - ID " + this.id);
  }

  setAdmin(a: string) {
    this.admins.push(a);
  }

  getAdmins() {
    return this.admins;
  }

  printAdmins() {
    console.log( this.getAdmins );
  }
}

class AccountDepartmentB extends DepartmentB {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found!")
  }

  set mostRecentReport(value) {
    if(!value) {
      throw new Error("Plz pass in a valid value!")
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  describe(this: DepartmentB): void {
    console.log("Account Department ID : " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  getReports() {
    return this.reports;
  }

  printReports() {
    console.log( this.getReports );
  }
}

const it = new ITDepartmentB("itD1", []);
it.describe();

it.addEmployee("Max")
it.addEmployee("Anna")
it.printEmployees();

it.setAdmin("Anna");
it.printAdmins();

const ac = new AccountDepartmentB("acD2", []);
ac.addReport("Something went wrong..");
ac.printReports();

console.log(ac.mostRecentReport);        // using getter
ac.mostRecentReport = "Year End Report"; // using setter