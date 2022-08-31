/**
 * 【한글자막】 Typescript :기초부터 실전형 프로젝트까지 with React + NodeJS
 * 
 * - 순서 -
 * 70. 싱글톤 & 개인 생성자
 */

class DepartmentD {
  employees: string[] = [];
  constructor(protected readonly id: string, public name: string) {
    
  }

  describe(this: DepartmentD) {
    console.log("")
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

class ITDepartmentD extends DepartmentD {
  constructor(id: string, private admins: string[]) {
    super(id, "IT")
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

class AccountDepartmentD extends DepartmentD {
  private lastReport: string;
  private static instance: AccountDepartmentD;

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

  // single-ton pattern
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountDepartmentD.instance) {
      return this.instance;
    }
    this.instance = new AccountDepartmentD("D3", []);
    return this.instance;
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

const it2 = new ITDepartmentD("itD1", []);
it2.describe();

it2.addEmployee("Max")
it2.addEmployee("Anna")
it2.printEmployees();

it2.setAdmin("Anna");
it2.printAdmins();

// const ac = new AccountDepartmentB("acD2", []);
const ac2 = AccountDepartmentD.getInstance();

ac2.addReport("Something went wrong..");
ac2.printReports();

console.log(ac2.mostRecentReport);        // using getter
ac2.mostRecentReport = "Year End Report"; // using setter