import { isValidDate, isValidTime } from "../util/ValidationUtils.js";

let ScheduleId = 1;

class ScheduleItem {
  constructor(title, description, startDate, endDate,
              startTime, endTime, priority, user) {

    if (title === undefined || title === null || title.trim() === "") {
      throw new Error('제목은 비어있으면 안 돼요.');
    }

    if (user === undefined || user === null) {
      throw new Error("관리자에게 문의하시오.");
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new Error("날짜는 실제 존재하는 YYYY-MM-DD 형식이어야 합니다.");
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      throw new Error("시간은 실제 존재하는 HH:mm 형식이어야 합니다.");
    }

    if (endDate < startDate) {
      throw new Error("종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
    }

    if (startDate === endDate && endTime < startTime) {
      throw new Error("종료 시간은 시작 시간보다 빠를 수 없습니다.");
    }


    this.id = ScheduleId++;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.priority = priority;
    this.userId = user.id;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.isCompleted = false;
  }

  getScheduleType() {
    throw new Error("관리자에게 문의하시오");
  }

  updateSchedule(title, description, startDate, endDate, startTime, endTime, priority) {
    if (title === undefined || title === null || title.trim() === "") {
      throw new Error("제목은 비어있으면 안 돼요.");
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new Error("날짜는 실제 존재하는 YYYY-MM-DD 형식이어야 합니다.");
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      throw new Error("시간은 실제 존재하는 HH:mm 형식이어야 합니다.");
    }

    if (endDate < startDate) {
      throw new Error("종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
    }

    if (startDate === endDate && endTime < startTime) {
      throw new Error("종료 시간은 시작 시간보다 빠를 수 없습니다.");
    }

    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.priority = priority;
    this.updatedAt = new Date().toISOString();
  }

  updateOwner(user) {
    if (user === undefined || user === null) {
      throw new Error("존재하는 사용자만 일정 소유자로 지정할 수 있습니다.");
    }

    this.userId = user.id;
    this.updatedAt = new Date().toISOString();
  }

  markAsCompleted() {
    this.isCompleted = true;
    this.updatedAt = new Date().toISOString();
  }

  notifyUser() {
    console.log("알림 대상 아님");
  }

  displayInfo() {
    console.log({
      type: this.getScheduleType(),
      id: this.id,
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      startTime: this.startTime,
      endTime: this.endTime,
      priority: this.priority,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isCompleted: this.isCompleted
    });
  }
}

export default ScheduleItem;
