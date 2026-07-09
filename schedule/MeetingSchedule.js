import ScheduleItem from "./ScheduleItem.js";

class MeetingSchedule extends ScheduleItem {
  constructor(
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    priority,
    user,
    location,
    participants,
    agenda,
    host
  ) {
    super(title, description, startDate, endDate, startTime, endTime, priority, user);

    this.location = location;
    this.participants = participants;
    this.agenda = agenda;
    this.host = host;
  }

  getScheduleType() {
    return "MEETING";
  }

  displayInfo() {
    super.displayInfo();

    console.log({
      location: this.location,
      participants: this.participants,
      agenda: this.agenda,
      host: this.host
    });
  }
}

export default MeetingSchedule;
