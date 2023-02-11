import { isValid } from "date-fns"
import React from "react"
import { Calendar, DateData , LocaleConfig} from "react-native-calendars"
import { DateUtils } from "utils/DateUitls"
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Oct.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Quin.', 'Sex.', 'Sab.'],
  today: "Hoje",
};
LocaleConfig.defaultLocale = 'pt';
interface DatePickerProps {
  date?: number
  min?: number
  max?: number
  onChange: (date: number) => void
}
export function DatePicker(props: DatePickerProps) {
  const date = props.date && isValid(props.date) ? DateUtils.formatToIntShortDate(props.date) : undefined
  const min = props.min && isValid(props.min) ? DateUtils.formatToIntShortDate(props.min) : undefined
  const max = props.max && isValid(props.max) ? DateUtils.formatToIntShortDate(props.max) : undefined

  const handleOnDayPressed = (day: DateData) => {
    props.onChange(day.timestamp)
  }
  return (
    <Calendar
      // Initially visible month. Default = now
      initialDate={date}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={min}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={max}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={handleOnDayPressed}
      // Handler which gets executed on day long press. Default = undefined

      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MMMM/yyyy"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      // onMonthChange={month => {
      //   console.log('month changed', month);
      // }}
      // Hide month navigation arrows. Default = false
      // hideArrows={true}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      // renderArrow={direction => <Arrow />}
      // Do not show days of other months in month page. Default = false
      // hideExtraDays={true}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      // disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      // hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      // onPressArrowLeft={subtractMonth => subtractMonth()}
      // // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      // onPressArrowRight={addMonth => addMonth()}
      // // Disable left arrow. Default = false
      // disableArrowLeft={true}
      // // Disable right arrow. Default = false
      // disableArrowRight={true}
      // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      // disableAllTouchEventsForDisabledDays={true}
      // // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={date => {
      //   /*Return JSX*/
      // }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
    />
  )
}
