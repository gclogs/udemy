class Department {
  name: string;

  constructor(n: string) { // 초기화 작업 수행
    this.name = n;
  }
}

const accounting = new Department('Accounting');