<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <div class="flex flex-row justify-between align-center pt-3">
      <v-btn
          text
          class="text-none font-weight-bold"
          @click="backWeek"
      >
        <v-icon left size="24">mdi-arrow-left</v-icon>
        Week
      </v-btn>

      <span class="font-extrabold text-xl text-capitalize">{{ this.currentMonth }}</span>

      <v-btn
          text
          class="text-none font-weight-bold"
          @click="nextWeek"
      >
        Week
        <v-icon right size="24">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <div class="flex flex-row justify-space-between mt-2 mb-4 h-16">
      <div class="flex flex-col align-center rounded"
           v-for="day in weekDays" :key="day.date" v-ripple
           @click="setDate(day.data)"
      >
        <span class="text-none align-start font-weight-bold text-capitalize">{{ day.name }}</span>
        <span id="span1"
              :class="'rounded-circle font-weight-bold ' + (day.date === selectedDate.date() ? 'selected' : '')"
        >{{ day.date }}</span>
      </div>
    </div>

    <FullCalendar ref="calendar" :options="calendarOptions">
      <template #eventContent="{ timeText, event }">
        <span class="block black--text">{{ event.extendedProps.location }}</span>
        <b class="block truncate black--text">{{ event.extendedProps.company }}</b>
      </template>
    </FullCalendar>


    <v-fab-transition
        origin="center center">
      <v-btn
          color="secondary"
          dark
          fixed
          bottom
          right
          fab
          class="mb-12"
          to="/reserveinformation"
      >
        <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import gql from "graphql-tag";
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/nl';

dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.locale('nl');


export default {
  components: {
    PageHeader,
    FullCalendar
  },
  mounted() {
    this.interval = setInterval(function () {
      this.$refs.calendar.getApi().refetchEvents()
    }.bind(this), 5000);
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    getEvents(fetchInfo, successCallback, failureCallback) {
      this.$apollo.query({
        query: gql`query {
          bookings {
            date
            to
            from
            description
            room {
              location
            }
            user {
              company {
                name
              }
            }
          }
        }`,
        fetchPolicy: "network-only"
      }).then((response) => {
            successCallback(response.data.bookings.map(booking => {
              return {
                company: booking.user.company.name,
                location: booking.room.location,
                start: `${booking.date}T${booking.from}`,
                end: `${booking.date}T${booking.to}`,
              };
            }));
          },
          (error) => {
            failureCallback(error)
          });
    },
    setDate(date) {
      this.selectedDate = date;
      this.$refs.calendar.getApi().gotoDate(this.selectedDate.toDate());
    },
    backWeek() {
      this.setDate(this.selectedDate.subtract(1, 'week'));
    },
    nextWeek() {
      this.setDate(this.selectedDate.add(1, 'week'));
    }
  },
  computed: {
    currentMonth() {
      return this.selectedDate.locale('nl').format('MMMM');
    },
    weekDays() {
      let days = [];
      for (let i = 0; i < 7; i++) {
        let day = this.selectedDate.day(i);
        days.push({
          name: day.format('dd'),
          date: day.date(),
          data: day
        })
      }
      return days;
    },
  },
  data() {
    return {
      interval: null,
      selectedDate: dayjs(new Date()),
      calendarOptions: {
        plugins: [timeGridPlugin],
        initialView: 'timeGridDay',
        nowIndicator: true,
        eventSources: [
          this.getEvents
        ],
        allDaySlot: false,
        dayHeaders: false,
        headerToolbar: false,
        lazyFetching: false,
        height: "auto",
        //eventColor: '#f4e9e9',
        //eventTextColor: '#000000',
        slotEventOverlap: false,
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '8:00',
          endTime: '19:00',
        },
        slotMinTime: '8:00',
        slotMaxTime: '19:00',
        locale: 'nl',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }
      },
    }
  },

}
</script>

<style lang="scss">
.selected {
  background-color: #e0bfbf;
}

#span1 {
  height: 34px;
  width: 34px;
  line-height: 34px;
  text-align: center;
}


.v-current-time {
  height: 2px;
  background-color: #e0bfbf;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #e0bfbf;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}

.fc-day-today {
  background: #FFF !important;
  border: none !important;
  border-top: 1px solid #ddd !important;
}

.fc-v-event {
  color: black !important;
}

div[style*="z-index: 1"] > .fc-v-event {
  background-color: #f4e9e9 !important;
  border-color: #f4e9e9 !important;
}

div[style*="z-index: 2"] > .fc-v-event {
  background-color: #ebd2d2 !important;
  border-color: #ebd2d2 !important;
}

div[style*="z-index: 3"] > .fc-v-event {
  background-color: #d6b1b1 !important;
  border-color: #d6b1b1 !important;
}


</style>