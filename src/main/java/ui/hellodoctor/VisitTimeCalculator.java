package ui.hellodoctor;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;
import ui.hellodoctor.data.domain.AbsenceTime;
import ui.hellodoctor.data.domain.WorkTime;

import java.time.DayOfWeek;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class VisitTimeCalculator {

    public static List<Long> calculate(List<WorkTime> workTimes, List<AbsenceTime> absenceTimes,
                                       List<Long> pendingVisits, long visitDuration, long startOfTime) {

        Calendar startOfTimeCalender = Calendar.getInstance();
        startOfTimeCalender.setTime(new Date(startOfTime));
        startOfTimeCalender.setTimeZone(TimeZone.getTimeZone(ZoneId.of("UTC")));
        startOfTimeCalender.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        startOfTimeCalender.set(Calendar.HOUR, 0);
        startOfTimeCalender.set(Calendar.MINUTE, 0);
        startOfTimeCalender.set(Calendar.SECOND, 0);
        startOfTimeCalender.set(Calendar.MILLISECOND, 0);

        List<Pair<Calendar, Calendar>> workTimeCalendars = workTimes.stream()
                .map(workTime -> {
                    Calendar start = (Calendar) startOfTimeCalender.clone();
                    start.set(Calendar.DAY_OF_WEEK, convertToCalenderDayOfWeek(workTime.getDayOfWeek()));
                    start.set(Calendar.HOUR_OF_DAY, workTime.getStartHour24());

                    Calendar end = (Calendar) start.clone();
                    end.set(Calendar.HOUR_OF_DAY, workTime.getEndHour24());

                    return Pair.of(start, end);
                }).collect(Collectors.toList());

        List<Long> result = new ArrayList<>();

        while (result.size() < 10) {
            workTimeCalendars.forEach(calendarPair -> {
                long start = calendarPair.getFirst().getTimeInMillis();
                long end = calendarPair.getSecond().getTimeInMillis();

                long currentTime = start;

                while (currentTime < end) {
                    boolean isInAbsences = false;
                    for (AbsenceTime at : absenceTimes) {
                        if (inRange(at.getStart(), at.getEnd(), currentTime)) {
                            isInAbsences = true;
                            break;
                        }
                        if (inRange(at.getStart(), at.getEnd(), currentTime + visitDuration)) {
                            isInAbsences = true;
                            break;
                        }
                    }

                    boolean isInVisits = false;
                    for (Long v : pendingVisits) {
                        if (inRange(currentTime, currentTime + visitDuration, v)) {
                            isInVisits = true;
                            break;
                        }
                    }

                    if (start > startOfTime && inRange(start, end, currentTime)
                            && currentTime + visitDuration <= end && !isInAbsences && !isInVisits) {
                        result.add(currentTime);
                    }

                    currentTime += visitDuration;
                }
            });

            workTimeCalendars = workTimeCalendars.stream()
                    .map(pair -> {
                        Calendar start = pair.getFirst();
                        Calendar end = pair.getSecond();

                        start.roll(Calendar.WEEK_OF_YEAR, true);
                        end.roll(Calendar.WEEK_OF_YEAR, true);

                        return Pair.of(start, end);
                    }).collect(Collectors.toList());
        }

        return result;
    }

    static int convertToCalenderDayOfWeek(DayOfWeek dayOfWeek) {
        int v = dayOfWeek.getValue();
        if (v == 7) return 1;
        return v + 1;
    }

    static boolean inRange(long min, long max, long x) {
        return min <= x && x <= max;
    }
}
