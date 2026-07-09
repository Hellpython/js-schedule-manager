import ScheduleItem from "./ScheduleItem.js";
import { isValidTime } from "../util/ValidationUtils.js";

class ReminderSchedule extends ScheduleItem {
  constructor(
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    priority,
    user,
    reminderTime,
    reminderMessage,
    notificationType,
    isReminderSent
  ) {
    super(title, description, startDate, endDate, startTime, endTime, priority, user);

    if (!isValidTime(reminderTime)) {
      throw new Error("알림 시간은 실제 존재하는 HH:mm 형식이어야 합니다.");
    }

    this.reminderTime = reminderTime;
    this.reminderMessage = reminderMessage;
    this.notificationType = notificationType;
    this.isReminderSent = isReminderSent;
  }

  getScheduleType() {
    return "REMINDER";
  }

  notifyUser() {
    console.log(this.reminderMessage);
    this.isReminderSent = true;
    this.updatedAt = new Date().toISOString();
  }

  displayInfo() {
    super.displayInfo();

    console.log({
      reminderTime: this.reminderTime,
      reminderMessage: this.reminderMessage,
      notificationType: this.notificationType,
      isReminderSent: this.isReminderSent
    });
  }
}

export default ReminderSchedule;
