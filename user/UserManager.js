class UserManager {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  addUser(user) {
    const alreadyUser = this.users.find(existingUser => existingUser.email === user.email);

    if (alreadyUser !== undefined) {
      throw new Error("이미 등록된 이메일입니다.");
    }

    this.users.push(user);
    console.log("사용자 추가 완료!!");
  }

  displayAllUsers() {
    if (this.users.length === 0) {
      console.log("등록된 사용자가 없습니다.");
      return;
    }

    console.log("현재 사용자 목록");

    for (const user of this.users) {
      user.displayInfo();
    }
  }

  displayUsers() {
    if (this.users.length === 0) {
      console.log("등록된 사용자가 없습니다.");
      return;
    }

    console.log("현재 사용자 목록");

    for (const user of this.users) {
      console.log(`${user.id}, ${user.name}, ${user.email}`);
    }
  }

  findById(id) {
    return this.users.find(user => String(user.id) === String(id));
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => String(user.id) === String(id));

    if (index === -1) {
      console.log("사용자를 찾을 수 없습니다.");
      return;
    }

    this.users.splice(index, 1);
    console.log("사용자 삭제 완료!!");
  }


}

export default UserManager;
