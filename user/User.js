let userId = 1;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

class User {
  constructor(name, email) {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("사용자 이름은 비어있으면 안 됩니다.");
    }

    if (email === undefined || email === null || email.trim() === "") {
      throw new Error("이메일은 비어있으면 안 됩니다.");
    }

    if (!isValidEmail(email)) {
      throw new Error("올바른 이메일 형식으로 입력하세요.");
    }

    this.id = userId++;
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  updateUser(name, email) {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("사용자 이름은 비어있으면 안 됩니다.");
    }

    if (email === undefined || email === null || email.trim() === "") {
      throw new Error("이메일은 비어있으면 안 됩니다.");
    }

    if (!isValidEmail(email)) {
      throw new Error("올바른 이메일 형식으로 입력하세요.");
    }

    this.name = name;
    this.email = email;
    this.updatedAt = new Date().toISOString();
  }

  displayInfo() {
    console.log({
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    });
  }
}

export default User;
