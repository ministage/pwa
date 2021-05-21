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
    >
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
      </v-card>
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
import {API_URL, USER_DATA} from "@/constants/settings";
import Swal from "sweetalert2";

dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.locale('nl');


export default {
  components: {
    PageHeader,
    FullCalendar
  },
  apollo: {
    room: {
      query: gql`query($room_id: ID!){
        rooms_by_id(id: $room_id){
            name
        }
        }`,
      variables() {
        return {
          room_id: this.roomId
        }
      },
      update: (data) => data.rooms_by_id,
      errorPolicy() {
        return this.roomId ? "all" : "ignore";
      }
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
    transformUrl(id) {
      return API_URL + '/assets/' + id;
    },
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
                created_id: booking.user_created,
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
    roomId() {
      return this.$route.params.id;
    },
    shouldOpenPopup() {
      return this.selectedEvent !== null;
    },
    eventQuery() {
      if (this.roomId) {
        return gql`query($room_id: String!) {
          bookings(filter: { room: {id: {_eq: $room_id}}}) {
            id
            user_created
            date
            to
            from
            description
            room {
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
            user_created
            date
            to
            from
            description
            room {
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
    userId(){
      let data = JSON.parse(localStorage.getItem(USER_DATA));
      return data.id
    }
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
        eventClick: function (info) {
          let data = JSON.parse(localStorage.getItem(USER_DATA));
          let userId = data.id;
          let event = info.event;
          Swal.fire({
                imageUrl: API_URL + '/assets/' + event.extendedProps.logo,
                title: event.extendedProps.description,
                html: "van " + event.extendedProps.from.substr(0, 5) + " tot " + event.extendedProps.to.substr(0, 5)
                    + "<br>" + "door " + event.extendedProps.first_name + " " + event.extendedProps.last_name
                    + " in " + event.extendedProps.room.name.toLowerCase() + " op de " + event.extendedProps.location.toLowerCase(),

                confirmButtonColor: "#29415d",
                confirmButtonText: "Oke!",
                showDenyButton: event.extendedProps.user_id === userId || event.extendedProps.created_id === userId,
                denyButtonText: "<p class=\"text-black\">Bewerken</p>",
                denyButtonColor: "#e0bfbf",
                iconColor: "#e0bfbf",

              }
          ).then(result => {
            if(result.isDenied){
              let is_production = window.location.href.includes('pwa');
              window.location = (is_production ? '/pwa' : '') + `/reserveinformation/${event.id}`;
            }
          });
        },
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