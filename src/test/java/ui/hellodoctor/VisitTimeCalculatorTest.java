package ui.hellodoctor;

import org.junit.jupiter.api.Test;

import java.time.DayOfWeek;
import java.util.Calendar;

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

}