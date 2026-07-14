class ScheduleManager {
  constructor() {
    this.schedules = [];
  }

  getSchedules() {
    return this.schedules;
  }

  isOwnedByUser(schedule, user) {
    if (user === undefined) {
      return true;
    }

    if (user === null) {
      return false;
    }

    return schedule.userId === user.id;
  }

  getSchedulesByUser(user) {
    return this.schedules.filter(schedule => this.isOwnedByUser(schedule, user));
  }

  getSchedulesByUserId(userId) {
    return this.schedules.filter(schedule => String(schedule.userId) === String(userId));
  }

  getSchedulesByUserSortedByDate(user) {
    return [...this.getSchedulesByUser(user)].sort((a, b) => {
      const first = `${a.startDate} ${a.startTime}`;
      const second = `${b.startDate} ${b.startTime}`;
      return first.localeCompare(second);
    });
  }

  getSchedulesByUserSortedByPriority(user) {
    const priorityOrder = {
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3
    };

    return [...this.getSchedulesByUser(user)].sort((a, b) =>
      priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  getSchedulesByUserSortedByCompletion(user) {
    return [...this.getSchedulesByUser(user)].sort((a, b) =>
      Number(a.isCompleted) - Number(b.isCompleted)
    );
  }

  addSchedule(schedule) {
    this.schedules.push(schedule);
    console.log("스케줄 추가 완료요!");
  }

  displayAllSchedules(user) {
    const schedules = this.getSchedulesByUser(user);

    this.displaySchedules(schedules);
  }

  displaySchedules(schedules) {
    if (schedules.length === 0) {
      console.log("저장된 일정이 없음요");
      return;
    }

    console.log("현재 일정 목록");

    for (const schedule of schedules) {
      schedule.displayInfo();
    }
  }

  displaySchedule(user) {
    const schedules = this.getSchedulesByUser(user);

    if (schedules.length === 0) {
      console.log("저장된 일정이 없음요");
      return;
    }
    console.log("현재 일정 목록");

    for (const schedule of schedules) {
      console.log(`${schedule.id}, ${schedule.getScheduleType()}, ${schedule.title}`);
    }
  }

  findById(id, user) {
    return this.schedules.find(schedule =>
      String(schedule.id) === String(id) && this.isOwnedByUser(schedule, user)
    );
  }

  deleteSchedule(id, user) {
    const index = this.schedules.findIndex(schedule =>
      String(schedule.id) === String(id) && this.isOwnedByUser(schedule, user)
    );

    if (index === -1) {
      console.log("일정을 못 찾겠습니다.");
      return;
    }

    this.schedules.splice(index, 1);
    console.log("일정 삭제 완료!!");
  }

  searchByTitle(keyword, user) {
    return this.schedules.filter(schedule =>
      this.isOwnedByUser(schedule, user) &&
      schedule.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  searchByDate(date, user) {
    return this.schedules.filter(schedule =>
      this.isOwnedByUser(schedule, user) &&
      schedule.startDate === date);
  }

  searchByPriority(priority, user) {
    return this.schedules.filter(schedule =>
      this.isOwnedByUser(schedule, user) &&
      schedule.priority === priority
    );
  }

  sortByDate() {
    this.schedules.sort((a, b) => {
      const first = `${a.startDate} ${a.startTime}`;
      const second = `${b.startDate} ${b.startTime}`;
      return first.localeCompare(second);
    });
  }

  sortByPriority() {
    const priorityOrder = {
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3
    };

    this.schedules.sort((a, b) =>
      priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  sortByCompletion() {
    this.schedules.sort((a, b) =>
      Number(a.isCompleted) - Number(b.isCompleted)
    );
  }
}

export default ScheduleManager;
