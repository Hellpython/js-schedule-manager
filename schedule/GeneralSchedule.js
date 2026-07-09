import ScheduleItem from "./ScheduleItem.js";

class GeneralSchedule extends ScheduleItem {
  constructor(
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    priority,
    user,
    category,
    place,
    memo
  ) {
    super(title, description, startDate, endDate, startTime, endTime, priority, user);

    this.category = category;
    this.place = place;
    this.memo = memo;
  }

  getScheduleType() {
    return "GENERAL";
  }

  displayInfo() {
    super.displayInfo();

    console.log({
      category: this.category,
      place: this.place,
      memo: this.memo
    });
  }
}

export default GeneralSchedule;
