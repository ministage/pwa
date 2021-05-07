<template>
  <div>
    <PageHeader icon="mdi-calendar-blank-outline" name="Reserveren"></PageHeader>
    <div class="flex flex-row justify-between align-center pt-3">
      <v-btn
          text
          class="text-none font-weight-bold"
      >
        <v-icon left size="24">mdi-arrow-left</v-icon>
        Week
      </v-btn>

      <span class="font-extrabold text-xl">April</span>

      <v-btn
          text
          class="text-none font-weight-bold"
      >
        Week
        <v-icon right size="24">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <div class="flex flex-row justify-space-between mt-2 mb-4 h-16">
      <div class="flex flex-col align-center rounded"
           v-for="day in days" :key="day.date" v-ripple
      >
        <span class="text-none align-start font-weight-bold">{{ day.name }}</span>
        <span id="span1"
              :class="'rounded-circle font-weight-bold ' + (day.date === 28 ? 'selected' : '')"
        >{{ day.date }}</span>
      </div>
    </div>


    <v-calendar
        class="pt-3 align-content-start mr-4"
        type="day"
        hide-header
        locale="nl"
        first-time="7:00"
        interval-count="12"
        interval-height="35"
        :interval-format="intervalFormatter"
        ref="calendar"
        :events="events"
        event-color="accent"
        event-overlap-mode="column"
    >
      <template #day-body="{ date, week }">
        <div
            class="v-current-time"
            :class="{ first: date === week[0].date }"
            :style="{ top: nowY }"
        ></div>
      </template>

    </v-calendar>
    <v-fab-transition
        origin="center center">
      <v-btn
          color="secondary"
          dark
          absolute
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

export default {
  components: {
    PageHeader
  },
  mounted() {
    this.ready = true
    this.scrollToTime()
    this.updateTime()
  },
  apollo: {
    events: {
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
      update: data => {
        return data.bookings.map(booking => {
          console.log(booking);
          return {
            location: booking.room.location,
            name: booking.user.company.name + ` -
            ` + booking.room.location,
            start: `${booking.date} ${booking.from}`,
            end: `${booking.date} ${booking.to}`,
          };
        });
      },
      pollInterval: 1000
    }
  },
  methods: {
    intervalFormatter(locale) {
      return locale.time;
    },
    getCurrentTime() {
      return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
    },
    scrollToTime() {
      const time = this.getCurrentTime()
      const first = Math.max(0, time - (time % 30) - 30)

      this.cal.scrollToTime(first)
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000)
    },
  },
  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
    },
  },
  data() {
    return {
      ready: false,
      value: '',
      bookings: [],
      days: [
        {
          name: "Zo",
          date: 26
        },
        {
          name: "Ma",
          date: 27
        }, {
          name: "Di",
          date: 28
        },
        {
          name: "Wo",
          date: 29
        },
        {
          name: "Do",
          date: 30
        },
        {
          name: "Vr",
          date: 31
        },
        {
          name: "Za",
          date: 1
        }
      ]
    }
  },

}
</script>

<style scoped lang="scss">
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
</style>