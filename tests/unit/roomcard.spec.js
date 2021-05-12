import Vuetify from "vuetify";
import RoomCard from '@/components/RoomCard';
import {createLocalVue, mount} from "@vue/test-utils";
import Vue from "vue";

Vue.use(Vuetify)

const localVue = createLocalVue()
describe('RoomCard.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('shows room name and location on card', () => {
        const wrapper = mount(RoomCard, {
            localVue,
            vuetify,
            propsData: {
                room: {
                    name: "Test Ruimte",
                    location: "Locatie",
                    bookings: [{ date: "2021-05-12", to: "15:00:00", from: "9:00:00" }]
                }
            },
        })

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.find('.v-list-item__title')
        const subtitle = wrapper.find('.v-list-item__subtitle')
        const bezet = wrapper.find('.v-list-item__subtitle > span')
        expect(title.text()).toBe('Test Ruimte')
        expect(subtitle.text()).toBe('Locatie')
        expect(bezet.text()).toBe('Nu beschikbaar')
    })
});
