import ScheduleItem from "./ScheduleItem.js";
import { isValidDate } from "../util/ValidationUtils.js";

class TaskSchedule extends ScheduleItem {
  constructor(
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    priority,
    user,
    deadLine,
    progress,
    taskStatus,
    assignedTo
  ) {
    super(title, description, startDate, endDate, startTime, endTime, priority, user);

    if (!isValidDate(deadLine)) {
      throw new Error("마감일은 실제 존재하는 YYYY-MM-DD 형식이어야 합니다.");
    }

    if (progress < 0 || progress > 100) {
      throw new Error("진행률은 0 ~ 100 사이만 가능합니다.");
    }

    this.deadLine = deadLine;
    this.progress = progress;
    this.taskStatus = taskStatus;
    this.assignedTo = assignedTo;
  }

  getScheduleType() {
    return "TASK";
  }

  markAsCompleted() {
    this.isCompleted = true;
    this.progress = 100;
    this.taskStatus = "DONE";
    this.updatedAt = new Date().toISOString();
  }

  displayInfo() {
    super.displayInfo();

    console.log({
      deadLine: this.deadLine,
      progress: this.progress,
      taskStatus: this.taskStatus,
      assignedTo: this.assignedTo
    });
  }
}

export default TaskSchedule;
