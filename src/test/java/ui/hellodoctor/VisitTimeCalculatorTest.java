package ui.hellodoctor;

import org.junit.jupiter.api.Test;
import ui.hellodoctor.data.domain.AbsenceTime;
import ui.hellodoctor.data.domain.WorkTime;

import java.time.DayOfWeek;
import java.time.ZoneId;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class VisitTimeCalculatorTest {

    @Test
    public void check_convertToCalenderDayOfWeek() {
        assertEquals(Calendar.SUNDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.SUNDAY));
        assertEquals(Calendar.MONDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.MONDAY));
        assertEquals(Calendar.TUESDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.TUESDAY));
        assertEquals(Calendar.WEDNESDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.WEDNESDAY));
        assertEquals(Calendar.THURSDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.THURSDAY));
        assertEquals(Calendar.FRIDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.FRIDAY));
        assertEquals(Calendar.SATURDAY, VisitTimeCalculator.convertToCalenderDayOfWeek(DayOfWeek.SATURDAY));
    }

    @Test
    public void test_calculate() {
        List<Long> times = VisitTimeCalculator.calculate(
                Arrays.asList(workTime(DayOfWeek.SUNDAY, 9, 10), workTime(DayOfWeek.SUNDAY, 13, 14), workTime(DayOfWeek.FRIDAY, 17, 18)),
                Arrays.asList(AbsenceTime.builder().start(1592870400000L).end(1593345600000L).build()),
                Arrays.asList(1592744400001L, 1592746800001L, 1593334800001L),
                1200000,
                1592740800000L
        );

        for (long l : times) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeZone(TimeZone.getTimeZone(ZoneId.of("UTC")));
            calendar.setTimeInMillis(l);
            System.out.println(
                    calendar.getDisplayName(Calendar.MONTH, Calendar.SHORT, Locale.ENGLISH) + " " +
                            calendar.get(Calendar.DAY_OF_MONTH) + " " +
                            calendar.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.SHORT, Locale.ENGLISH) + " " +
                            calendar.get(Calendar.HOUR_OF_DAY) + " " +
                            calendar.get(Calendar.MINUTE) + " "
            );
        }
    }

    private WorkTime workTime(DayOfWeek dayOfWeek, int start24, int end24) {
        return WorkTime.builder().dayOfWeek(dayOfWeek).startHour24(start24).endHour24(end24).build();
    }

}