<template>
  <div>
    <div class="fixed z-10 bg-white w-full">
      <PageHeader v-if="this.roomId" icon="mdi-calendar-blank-outline" :name="$apollo.queries.room.loading ? 'Loading...' : room.name"></PageHeader>
      <PageHeader v-if="!this.roomId" icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <div class="flex flex-row justify-between align-center pt-1">
      <v-btn
          text
          class="text-none tracking-tight"
          @click="backWeek"
      >
        <v-icon left size="24">mdi-arrow-left</v-icon>
        Week
      </v-btn>

      <span class="font-semibold text-xl text-capitalize">{{ this.currentMonth }}</span>

      <v-btn
          text
          class="text-none tracking-tight"
          @click="nextWeek"
      >
        Week
        <v-icon right size="24">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <div class="flex flex-row justify-space-between mt-2 h-16">
      <div class="flex flex-col align-center rounded"
           v-for="day in weekDays" :key="day.date" v-ripple
           @click="setDate(day.data)"
      >
        <span class="text-none align-start text-capitalize">{{ day.name }}</span>
        <span id="span1"
              :class="'rounded-circle font-semibold ' + (day.date === selectedDate.date() ? 'selected' : '')"
        >{{ day.date }}</span>
      </div>
    </div>
    </div>
    <v-dialog
      v-model="popup"
      v-if="popup"
    >
      <BookingCard :event="selectedEvent" :edit="eventEdit" :close="eventClose"></BookingCard>
    </v-dialog>
    <section class="pt-44">
    <FullCalendar ref="calendar" :options="calendarOptions">
      <template #eventContent="{ timeText, event }">
        <span class="block black--text">{{ event.extendedProps.location }}</span>
        <b class="block truncate black--text">{{ event.extendedProps.company }}</b>
      </template>
    </FullCalendar>
    </section>


    <v-fab-transition
        origin="center center">
      <v-btn
          color="secondary"
          dark
          fixed
          bottom
          right
          fab
          class="mb-20"
          @click="createReservation"
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
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/nl';
import {API_URL} from "@/constants/settings";
import BookingCard from "@/components/BookingCard";

dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.extend(weekday)
dayjs.locale('nl');

// zorgen dat week begint op maandag ipv zondag
dayjs.updateLocale('nl', {
  weekStart: 1
});


export default {
  components: {
    BookingCard,
    PageHeader,
    FullCalendar
  },
  apollo: {
    room: {
      query: gql`query($room_id: ID!){
        rooms_by_id(id: $room_id){
            id
            name
        }
        }`,
      variables() {
        return {
          room_id: this.roomId
        }
      },
      update: (data) => data.rooms_by_id,
      skip(){
        return this.roomId === undefined
      },
    }
  },
  mounted() {
      let timeslots = Array.from(document.querySelectorAll('.fc-timegrid-slot-label-cushion'));
      timeslots[4].scrollIntoView({
        behavior: "smooth"
      });

    this.interval = setInterval(function () {
      this.$refs.calendar.getApi().refetchEvents()
    }.bind(this), 5000);
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    // Ga naar reserveinformation met informatie meegegeven
    createReservation(){
      this.$router.push({path: '/reserveinformation', query: {given_date: this.selectedDate.format('YYYY-MM-DD'), given_room: this.roomId ?? ''}})
    },
    // URL omzetten
    transformUrl(id) {
      return API_URL + '/assets/' + id;
    },

    // Events ophalen voor in de kalender
    getEvents(fetchInfo, successCallback, failureCallback) {
      this.$apollo.query({
        query: this.eventQuery,
        fetchPolicy: "network-only",
        variables: this.roomId ? {room_id: this.roomId} : undefined
      }).then((response) => {
            successCallback(response.data.bookings.map(booking => {
              return {
                id: booking.id,
                company: booking.user.company.name,
                location: booking.room.location,
                start: `${booking.date}T${booking.from}`,
                end: `${booking.date}T${booking.to}`,
                from: booking.from,
                to: booking.to,
                description: booking.description,
                first_name: booking.user.first_name,
                last_name: booking.user.last_name,
                room: booking.room,
                logo: booking.user.company.logo.id,
                user_id: booking.user.id,
                user_created: booking.user_created,
                created_id: booking.user_created.id,
              };
            }));
          },
          (error) => {
            failureCallback(error)
          });
    },
    // Datum zetten voor kalender
    setDate(date) {
      this.selectedDate = date;
      this.$refs.calendar.getApi().gotoDate(this.selectedDate.toDate());
    },
    // Week terug wanneer op knop wordt geklikt
    backWeek() {
      this.setDate(this.selectedDate.subtract(1, 'week'));
    },
    // Week vooruit wanneer op knop wordt geklikt
    nextWeek() {
      this.setDate(this.selectedDate.add(1, 'week'));
    },
    //Zorgt ervoor dat er een dialog wordt getoond als je op een event klikt
    eventClick(info){
      console.dir(info.event);
      console.dir(info);
      this.selectedEvent = {
        ...info.event.extendedProps,
        date: info.event.date,
        id: info.event.id
      }
      this.popup = true;
    },
    //Sluit de dialog
    eventClose(){
      this.selectedEvent = null;
      this.popup = false;
    },
    //Stuurt de gebruiker door naar de bewerkpagina
    eventEdit(){
      this.$router.push({path: `/reserveinformation/${this.selectedEvent.id}`});
    }
  },
  computed: {
    //De ruimte id die in de url kan worden meegegeven
    roomId() {
      return this.$route.params.id;
    },
    eventQuery() {
      if (this.roomId) {
        return gql`query($room_id: String!) {
          bookings(filter: { room: {id: {_eq: $room_id}}}) {
            id
            user_created {
                id
                first_name
                last_name
            }
            date
            to
            from
            description
            room {
              id
              name
              location
            }
            user {
              id
              first_name
              last_name
              company {
                name
                logo {
                  id
                  }
              }
            }
          }
        }`;
      } else {
        return gql`query {
           bookings {
            id
            user_created {
                id
                first_name
                last_name
            }
            date
            to
            from
            description
            room {
              id
              name
              location
            }
            user {
              id
              first_name
              last_name
              company {
                name
                logo {
                  id
                  }
              }
            }
          }
        }`;
      }
    },
    // Maand ophalen
    currentMonth() {
      return this.selectedDate.locale('nl').format('MMMM');
    },
    // Zorgen dat de goede dagen erin staan
    weekDays() {
      let days = [];
      for (let i = 0; i < 7; i++) {
        let day = this.selectedDate.weekday(i);
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
      selectedEvent: null,
      popup: false,
      calendarOptions: {
        scrollTime: '06:00',
        plugins: [timeGridPlugin],
        initialView: 'timeGridDay',
        nowIndicator: true,
        nowIndicatorClassNames: "nowIndicator",
        eventSources: [
          this.getEvents
        ],
        allDaySlot: false,
        dayHeaders: false,
        headerToolbar: false,
        height: "auto",
        slotEventOverlap: false,
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '8:00',
          endTime: '19:00',
        },
        locale: 'nl',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        },
        // Als er op het event geklikt wordt, dialog met alle informatie
        eventClick: this.eventClick
      },
    }
  }
}
</script>

<style lang="scss">
.selected {
  background-color: #e0bfbf;
}


.nowIndicator {
  --fc-now-indicator-color: #29415d;
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
  background-color: #e8d2d2 !important;
  border-color: #e8d2d2 !important;
}

div[style*="z-index: 2"] > .fc-v-event {
  background-color: #d6b1b1 !important;
  border-color: #d6b1b1 !important;
}

div[style*="z-index: 3"] > .fc-v-event {
  background-color: #c49090 !important;
  border-color: #c49090 !important;
}

div[style*="z-index: 4"] > .fc-v-event {
  background-color: #bc7f7f !important;
  border-color: #bc7f7f !important;

}


</style>