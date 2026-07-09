import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import GeneralSchedule from "./schedule/GeneralSchedule.js";
import MeetingSchedule from "./schedule/MeetingSchedule.js";
import TaskSchedule from "./schedule/TaskSchedule.js";
import ReminderSchedule from "./schedule/ReminderSchedule.js";
import ScheduleManager from "./ScheduleManager.js";
import ScheduleWorker from "./ScheduleWorker.js";
import User from "./user/User.js";
import UserManager from "./user/UserManager.js";
import { isValidDate, isValidTime } from "./util/ValidationUtils.js";

const rl = readline.createInterface({ input, output });

const manager = new ScheduleManager();
const worker = new ScheduleWorker(manager);
const userManager = new UserManager();

function printMenu() {
  console.log("\n==== 프로그램 메뉴 ====");
  console.log("1. 사용자 등록");
  console.log("2. 전체 사용자 조회");
  console.log("3. 사용자 상세 조회");
  console.log("4. 사용자 수정");
  console.log("5. 사용자 삭제");
  console.log("6. 일정 등록");
  console.log("7. 전체 일정 조회");
  console.log("8. 사용자별 일정 조회");
  console.log("9. 일정 상세 조회");
  console.log("10. 일정 수정");
  console.log("11. 일정 삭제");
  console.log("12. 일정 완료 처리");
  console.log("13. 제목 검색");
  console.log("14. 날짜 검색");
  console.log("15. 중요도 검색");
  console.log("16. 사용자별 제목 검색");
  console.log("17. 사용자별 날짜 검색");
  console.log("18. 사용자별 중요도 검색");
  console.log("19. 날짜순 정렬");
  console.log("20. 중요도순 정렬");
  console.log("21. 완료 여부순 정렬");
  console.log("22. 사용자별 날짜순 정렬");
  console.log("23. 사용자별 중요도순 정렬");
  console.log("24. 사용자별 완료 여부순 정렬");
  console.log("25. 알림 실행");
  console.log("26. 프로그램 종료");
  console.log("0. 괸리자에게 문의")
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function inputNumber(message) {
  while (true) {
    try {
      const value = (await rl.question(message)).trim();

      if (value === "") {
        throw new Error("숫자를 입력하세요.");
      }

      const number = Number(value);

      if (!Number.isInteger(number)) {
        throw new Error("숫자를 입력하세요.");
      }

      return number;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputTitle() {
  while (true) {
    try {
      const title = (await rl.question("제목: ")).trim();

      if (title === "") {
        throw new Error("제목은 비어있으면 안 됩니다.");
      }

      return title;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputUserName() {
  while (true) {
    try {
      const name = (await rl.question("사용자 이름: ")).trim();

      if (name === "") {
        throw new Error("사용자 이름은 비어있으면 안 됩니다.");
      }

      return name;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputEmail() {
  while (true) {
    try {
      const email = (await rl.question("이메일: ")).trim();

      if (email === "") {
        throw new Error("이메일은 비어있으면 안 됩니다.");
      }

      if (!isValidEmail(email)) {
        throw new Error("올바른 이메일 형식으로 입력하세요.");
      }

      return email;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputDate(message) {
  while (true) {
    try {
      const value = (await rl.question(message)).trim();

      if (!isValidDate(value)) {
        throw new Error("날짜는 실제 존재하는 YYYY-MM-DD 형식이어야 합니다.");
      }

      return value;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputTime(message) {
  while (true) {
    try {
      const value = (await rl.question(message)).trim();

      if (!isValidTime(value)) {
        throw new Error("시간은 실제 존재하는 HH:mm 형식이어야 합니다.");
      }

      return value;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputPriority() {
  while (true) {
    try {
      const value = (await rl.question("중요도(LOW, MEDIUM, HIGH): ")).trim().toUpperCase();

      if (value !== "LOW" && value !== "MEDIUM" && value !== "HIGH") {
        throw new Error("LOW, MEDIUM, HIGH 중 하나로 입력하세요.");
      }

      return value;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputProgress() {
  while (true) {
    try {
      const progress = await inputNumber("진행률(0~100): ");

      if (progress < 0 || progress > 100) {
        throw new Error("진행률은 0~100 사이여야 합니다.");
      }

      return progress;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputTaskStatus() {
  while (true) {
    try {
      const value = (await rl.question("상태(TODO, IN_PROGRESS, DONE): ")).trim().toUpperCase();

      if (value !== "TODO" && value !== "IN_PROGRESS" && value !== "DONE") {
        throw new Error("TODO, IN_PROGRESS, DONE 중 하나로 입력하세요.");
      }

      return value;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputNotificationType() {
  while (true) {
    try {
      const value = (await rl.question("알림 종류(POPUP, SOUND, MESSAGE): ")).trim().toUpperCase();

      if (value !== "POPUP" && value !== "SOUND" && value !== "MESSAGE") {
        throw new Error("POPUP, SOUND, MESSAGE 중 하나로 입력하세요.");
      }

      return value;
    } catch (error) {
      console.log(error.message);
    }
  }
}

async function inputBaseSchedule() {
  const title = await inputTitle();
  const description = (await rl.question("내용: ")).trim();

  const startDate = await inputDate("시작 날짜(YYYY-MM-DD): ");

  let endDate;
  while (true) {
    try {
      endDate = await inputDate("종료 날짜(YYYY-MM-DD): ");

      if (endDate < startDate) {
        throw new Error("종료 날짜는 시작 날짜보다 빠를 수 없습니다.");
      }

      break;
    } catch (error) {
      console.log(error.message);
    }
  }

  const startTime = await inputTime("시작 시간(HH:mm): ");

  let endTime;
  while (true) {
    try {
      endTime = await inputTime("종료 시간(HH:mm): ");

      const startDateTime = `${startDate} ${startTime}`;
      const endDateTime = `${endDate} ${endTime}`;

      if (endDateTime < startDateTime) {
        throw new Error("종료 일시는 시작 일시보다 빠를 수 없습니다.");
      }

      break;
    } catch (error) {
      console.log(error.message);
    }
  }

  const priority = await inputPriority();

  return {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    priority
  };
}


function printResults(results) {
  if (results.length === 0) {
    console.log("조건에 맞는 일정이 없습니다.");
    return;
  }

  console.log("=== 검색 결과 ===");
  for (const schedule of results) {
    schedule.displayInfo();
  }
}

async function addUser() {
  try {
    const name = await inputUserName();
    const email = await inputEmail();
    const user = new User(name, email);

    userManager.addUser(user);
    console.log(`사용자 등록 완료: ${user.name}`);
  } catch (error) {
    console.log(error.message);
  }
}

async function inputUserFromList(message) {
  userManager.displayUsers();

  if (userManager.getUsers().length === 0) {
    return null;
  }

  const id = (await rl.question(message)).trim();
  const user = userManager.findById(id);

  if (user === undefined) {
    console.log("사용자를 찾을 수 없습니다.");
    return null;
  }

  return user;
}

async function displayUserById() {
  const user = await inputUserFromList("자세히 볼 사용자 ID: ");

  if (user === null) {
    return;
  }

  user.displayInfo();
}

async function updateUser() {
  const user = await inputUserFromList("수정할 사용자 ID: ");

  if (user === null) {
    return;
  }

  const name = await inputUserName();
  const email = await inputEmail();

  user.updateUser(name, email);

  console.log("사용자 수정 완료!!");
}

async function deleteUser() {
  const user = await inputUserFromList("삭제할 사용자 ID: ");

  if (user === null) {
    return;
  }

  const userSchedules = manager.getSchedulesByUser(user);

  if (userSchedules.length > 0) {
    console.log("사용자를 삭제하려면 먼저 해당 사용자의 일정을 모두 삭제하시고 그래도 안되면 관리자에게 문의바랍니다.");
    return;
  }

  userManager.deleteUser(user.id);
}

async function displaySchedulesByUser() {
  const user = await inputUserFromList("일정을 조회할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displayAllSchedules(user);
}

async function addSchedule() {

  const targetUser = await inputUserFromList("일정을 추가할 사용자 ID: ");

  if (targetUser === null) {
    console.log("일정을 등록할 사용자를 찾을 수 없습니다.");
    return;
  }

  console.log("1 = 일반 일정, 2 = 회의 일정, 3 = 할일 일정, 4 = 알림 일정");

  const type = await inputNumber("선택: ");
  const base = await inputBaseSchedule();

  let newItem;

  if (type === 1) {
    const category = (await rl.question("카테고리: ")).trim();
    const place = (await rl.question("장소: ")).trim();
    const memo = (await rl.question("메모: ")).trim();

    newItem = new GeneralSchedule(
      base.title,
      base.description,
      base.startDate,
      base.endDate,
      base.startTime,
      base.endTime,
      base.priority,
      targetUser,
      category,
      place,
      memo
    );
  } else if (type === 2) {
    const location = (await rl.question("장소: ")).trim();
    const participants = (await rl.question("참석자: ")).trim();
    const agenda = (await rl.question("안건: ")).trim();
    const host = (await rl.question("주최자: ")).trim();

    newItem = new MeetingSchedule(
      base.title,
      base.description,
      base.startDate,
      base.endDate,
      base.startTime,
      base.endTime,
      base.priority,
      targetUser,
      location,
      participants,
      agenda,
      host
    );
  } else if (type === 3) {
    const deadLine = await inputDate("마감일(YYYY-MM-DD): ");
    const progress = await inputProgress();
    const taskStatus = await inputTaskStatus();
    const assignedTo = (await rl.question("담당자: ")).trim();

    newItem = new TaskSchedule(
      base.title,
      base.description,
      base.startDate,
      base.endDate,
      base.startTime,
      base.endTime,
      base.priority,
      targetUser,
      deadLine,
      progress,
      taskStatus,
      assignedTo
    );
  } else if (type === 4) {
    const reminderTime = await inputTime("알림 시간(HH:mm): ");
    const reminderMessage = (await rl.question("알림 메시지: ")).trim();
    const notificationType = await inputNotificationType();
    const isReminderSent = false;

    newItem = new ReminderSchedule(
      base.title,
      base.description,
      base.startDate,
      base.endDate,
      base.startTime,
      base.endTime,
      base.priority,
      targetUser,
      reminderTime,
      reminderMessage,
      notificationType,
      isReminderSent
    );
  } else {
    console.log("잘못된 일정 종류입니다.");
    return;
  }

  if (worker.hasConflict(newItem)) {
    return;
  }

  manager.addSchedule(newItem);
}

async function displayScheduleById() {
  const user = await inputUserFromList("일정을 조회할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displaySchedule(user);

  const id = (await rl.question("자세히 볼 일정 ID: ")).trim();
  const item = manager.findById(id, user);

  if (item === undefined) {
    console.log("없는 일정입니다.");
    return;
  }

  item.displayInfo();
}

async function updateSchedule() {
  const user = await inputUserFromList("일정을 수정할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displaySchedule(user);

  const id = (await rl.question("수정할 일정 ID: ")).trim();
  const item = manager.findById(id, user);

  if (item === undefined) {
    console.log("없는 일정입니다.");
    return;
  }

  const base = await inputBaseSchedule();
  const ownerId = (await rl.question("새로운 사용자ID(기존에 있어야 함): ")).trim();

  let newOwner = null;

  if (ownerId !== "") {
    newOwner = userManager.findById(ownerId);

    if (newOwner === undefined) {
      console.log("존재하지 않는 사용자 ID입니다.");
      return;
    }
  }

  item.updateSchedule(
    base.title,
    base.description,
    base.startDate,
    base.endDate,
    base.startTime,
    base.endTime,
    base.priority
  );

  if (newOwner !== null) {
    item.updateOwner(newOwner);
  }

  console.log("일정 수정 완료!!");
}

async function deleteSchedule() {
  const user = await inputUserFromList("일정을 삭제할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displaySchedule(user);

  const id = (await rl.question("삭제할 일정 ID: ")).trim();
  manager.deleteSchedule(id, user);
}

async function completeSchedule() {
  const user = await inputUserFromList("완료 처리할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displaySchedule(user);

  const id = (await rl.question("완료 처리할 일정 ID: ")).trim();
  worker.completeSchedule(id, user);
}

async function searchByTitle() {
  const keyword = (await rl.question("검색할 제목 키워드: ")).trim();
  const results = manager.searchByTitle(keyword);

  printResults(results);
}

async function searchByDate() {
  const date = await inputDate("검색할 날짜(YYYY-MM-DD): ");
  const results = manager.searchByDate(date);

  printResults(results);
}

async function searchByPriority() {
  const priority = await inputPriority();
  const results = manager.searchByPriority(priority);

  printResults(results);
}

async function runNotification() {
  const user = await inputUserFromList("알림을 실행할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.displaySchedule(user);

  const id = (await rl.question("알림을 실행할 일정 ID: ")).trim();
  worker.runNotification(id, user);
}

async function searchByUserAndTitle() {
  const user = await inputUserFromList("검색할 사용자 ID: ");

  if (user === null) {
    return;
  }

  const keyword = (await rl.question("검색할 제목 키워드: ")).trim();
  const results = manager.searchByTitle(keyword, user);

  printResults(results);
}

async function searchByUserAndDate() {
  const user = await inputUserFromList("검색할 사용자 ID: ");

  if (user === null) {
    return;
  }

  const date = await inputDate("검색할 날짜(YYYY-MM-DD): ");
  const results = manager.searchByDate(date, user);

  printResults(results);
}

async function searchByUserAndPriority() {
  const user = await inputUserFromList("검색할 사용자 ID: ");

  if (user === null) {
    return;
  }

  const priority = await inputPriority();
  const results = manager.searchByPriority(priority, user);

  printResults(results);
}

async function sortByUserAndDate() {
  const user = await inputUserFromList("정렬해서 조회할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.sortByDate();
  console.log("사용자별 날짜순 정렬 완료");
  manager.displayAllSchedules(user);
}

async function sortByUserAndPriority() {
  const user = await inputUserFromList("정렬해서 조회할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.sortByPriority();
  console.log("사용자별 중요도순 정렬 완료");
  manager.displayAllSchedules(user);
}

async function sortByUserAndCompletion() {
  const user = await inputUserFromList("정렬해서 조회할 사용자 ID: ");

  if (user === null) {
    return;
  }

  manager.sortByCompletion();
  console.log("사용자별 완료 여부순 정렬 완료");
  manager.displayAllSchedules(user);
}

async function main() {
  while (true) {
    try {
      printMenu();

      const choice = await inputNumber("선택 번호: ");

      switch (choice) {
        case 1:
          await addUser();
          break;

        case 2:
          userManager.displayAllUsers();
          break;

        case 3:
          await displayUserById();
          break;

        case 4:
          await updateUser();
          break;

        case 5:
          await deleteUser();
          break;

        case 6:
          await addSchedule();
          break;
        case 7:
          manager.displayAllSchedules();
          break;

        case 8:
          await displaySchedulesByUser();
          break;

        case 9:
          await displayScheduleById();
          break;

        case 10:
          await updateSchedule();
          break;

        case 11:
          await deleteSchedule();
          break;

        case 12:
          await completeSchedule();
          break;

        case 13:
          await searchByTitle();
          break;

        case 14:
          await searchByDate();
          break;

        case 15:
          await searchByPriority();
          break;

        case 16:
          await searchByUserAndTitle();
          break;

        case 17:
          await searchByUserAndDate();
          break;

        case 18:
          await searchByUserAndPriority();
          break;

        case 19:
          manager.sortByDate();
          console.log("날짜순 정렬 완료");
          manager.displayAllSchedules();
          break;

        case 20:
          manager.sortByPriority();
          console.log("중요도순 정렬 완료");
          manager.displayAllSchedules();
          break;

        case 21:
          manager.sortByCompletion();
          console.log("완료 여부순 정렬 완료");
          manager.displayAllSchedules();
          break;

        case 22:
          await sortByUserAndDate();
          break;

        case 23:
          await sortByUserAndPriority();
          break;

        case 24:
          await sortByUserAndCompletion();
          break;

        case 25:
          await runNotification();
          break;

        case 26:
          console.log("프로그램 종료");
          rl.close();
          return;

        default:
          console.log("잘못된 메뉴 번호입니다.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

main();
