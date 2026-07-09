class ScheduleWorker {
  constructor(scheduleManager) {
    this.manager = scheduleManager;
  }

  completeSchedule(id, user) {
    const item = this.manager.findById(id, user);

    if (item === undefined) {
      console.log("id 못 찾겠어요.");
      return;
    }

    item.markAsCompleted();
    console.log("일정 완료");
  }

  runNotification(id, user) {
    const item = this.manager.findById(id, user);

    if (item === undefined) {
      console.log("id를 찾지 못했습니다.");
      return;
    }

    item.notifyUser();
  }

  checkConflict(user) {
    const schedules = this.manager.getSchedulesByUser(user);

    if (schedules.length <= 1) {
      console.log("겹치는 일정이 없습니다.");
      return;
    }

    let found = false;

    for (let i = 0; i < schedules.length - 1; i++) {
      const first = schedules[i];

      const firstStart = `${first.startDate} ${first.startTime}`;
      const firstEnd = `${first.endDate} ${first.endTime}`;

      for (let j = i + 1; j < schedules.length; j++) {
        const second = schedules[j];

        const secondStart = `${second.startDate} ${second.startTime}`;
        const secondEnd = `${second.endDate} ${second.endTime}`;

        if (firstStart < secondEnd && firstEnd > secondStart) {
          console.log("겹치는 일정이 있습니다.");
          first.displayInfo();
          second.displayInfo();
          found = true;
        }
      }
    }

    if (found === false) {
      console.log("겹치는 일정이 없습니다.");
    }
  }

  hasConflict(newItem) {
    const schedules = this.manager.getSchedulesByUserId(newItem.userId);


    const newStart = `${newItem.startDate} ${newItem.startTime}`;
    const newEnd = `${newItem.endDate} ${newItem.endTime}`;

    for (const existing of schedules) {
      const existingStart = `${existing.startDate} ${existing.startTime}`;
      const existingEnd = `${existing.endDate} ${existing.endTime}`;

      if (newStart < existingEnd && newEnd > existingStart) {
        console.log("겹치는 일정이 있어서 등록할 수 없습니다.");
        existing.displayInfo();
        return true;
      }
    }

    return false;
  }
}

export default ScheduleWorker;
