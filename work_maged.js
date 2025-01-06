function adjustShift(obj, X, shifts) {
  const maxEndTime = Math.max(...shifts[obj.shiftType]);

  if (obj.end + X <= maxEndTime && obj.end + X <= 22) {
    obj.end += X;
  } else if (obj.start - X >= 9) {

    obj.start -= X;
  }
  obj.shiftDuration += X;
  return obj;
}
function extractShifts(schedule, e1) {
  const result = [[], [], []];

  schedule[e1].forEach((shift) => {
    if (shift.shiftDuration === 7 && shift.shiftType != "special") {
      result[1].push(shift);
    } else if (shift.shiftDuration === 6) {
      result[2].push(shift);
    }
  });

  return result;
}

function generateMonthlySchedule(
  daysInMonth,
  fridaysInMonth,
  saturdaysInMonth
) {
  const employees = ["e1", "e2", "e3", "e4"];
  const shifts = {
    openning: [16.5, 16, 15.5, 15],
    morning: [18, 17],
    evening: [21, 20],
    closing: [22],
  };
  const specialShifts = {
    friday: [16],
    saturday: [18, 20, 22],
  };
  const hoursPerShift = {
    openning: [6, 7],
    morning: [6, 8],
    evening: [6, 8],
    closing: [6, 8],
  };
  const saturdayHours = 8;
  const fridayHours = 7;
  const maxHoursPerMonth = 183;

  const schedule = {};
  employees.forEach((emp) => (schedule[emp] = []));

  let totalHours = {
    e1: 0,
    e2: 0,
    e3: 0,
    e4: 0,
  };

  function assignShift(day, employee, shiftType, shiftEnd) {
    const shiftStart = Math.max(
      9,
      shiftEnd - (hoursPerShift[shiftType] || [saturdayHours])[0]
    );
    if (shiftEnd > 22 || shiftStart < 9) return false;
    schedule[employee].push({
      day,
      shiftType,
      start: shiftStart,
      end: shiftEnd,
      shiftDuration: shiftEnd - shiftStart,
    });
    totalHours[employee] += shiftEnd - shiftStart;
    return true;
  }


  for (let i = 0; i < fridaysInMonth; i++) {
    assignShift(`Friday-${i + 1}`, "e1", "special", specialShifts.friday[0]);
  }


  for (let i = 0; i < saturdaysInMonth; i++) {
    const availableEmployees = ["e2", "e3", "e4"];
    specialShifts.saturday.forEach((shiftEnd) => {
      const employee = availableEmployees.pop();
      assignShift(`Saturday-${i + 1}`, employee, "special", shiftEnd);
    });
  }


  for (let day = 1; day <= daysInMonth; day++) {
    if (day % 7 === 5 || day % 7 === 6) continue;

    const availableShifts = [...Object.keys(shifts)];
    const availableEmployees = [...employees];

    while (availableShifts.length && availableEmployees.length) {
      const shiftType = availableShifts.splice(
        Math.floor(Math.random() * availableShifts.length),
        1
      )[0];
      const shiftEnd =
        shifts[shiftType][Math.floor(Math.random() * shifts[shiftType].length)];
      const employee = availableEmployees.splice(
        Math.floor(Math.random() * availableEmployees.length),
        1
      )[0];
      assignShift(`Day-${day}`, employee, shiftType, shiftEnd);
    }
  }

  //ensuring all workers do 183 hours exactly...
  for (const employee of employees) {
    let remainingHours = maxHoursPerMonth - totalHours[employee];
    const result = extractShifts(schedule, employee);
    while (remainingHours > 0) {
      const extraHours = Math.min(remainingHours, Math.floor(Math.random() * 2) + 1);
      index = extraHours == 2 ? 2 : Math.floor(Math.random() * 2) + 1;
      index_inner = Math.floor(Math.random() * result[index].length);
      const randomElement = result[index][index_inner];
      if (randomElement === undefined) {
        continue;
      }
      const modified = adjustShift(randomElement, extraHours, shifts);
      result[index].splice(index_inner, 1);
      if (modified.shiftDuration === 7) {
        result[1].push(modified);
      }

      remainingHours -= extraHours;
      totalHours[employee] += extraHours;
    }
}
    console.log("Total Hours for each employee:", totalHours);

    // for (const employee of employees) {
    //     const totalShiftDuration = schedule[employee].reduce((total, shift) => {
    //         return total + shift.shiftDuration;
    //       }, 0);
    //       console.log(employee + " ===> " +totalShiftDuration)
    // }
    return schedule;
  }

const schedule = generateMonthlySchedule(30, 4, 4);
console.log(schedule);
