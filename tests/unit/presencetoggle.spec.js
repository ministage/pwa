// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import PresenceToggle from '@/components/PresenceToggle'

// Utilities
import {createLocalVue, mount} from '@vue/test-utils'

describe('PresenceToggle.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('should display aanwezig when enabled', () => {
        const wrapper = mount(PresenceToggle, {
            localVue,
            vuetify,
            propsData: {enabled: true},
        })

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.find('div > span')

        expect(title.text()).toBe('Aanwezig')
    })

    it('should display afwezig when disabled', () => {
        const wrapper = mount(PresenceToggle, {
            localVue,
            vuetify,
            propsData: {enabled: false},
        })

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.find('div > span')

        expect(title.text()).toBe('Afwezig')
    })

    it('should be green when enabled', function () {
        const wrapper = mount(PresenceToggle, {
            localVue,
            vuetify,
            propsData: {enabled: true},
        });
        const color = wrapper.find('div')
        expect(color.classes()).toContain('on')
    })

    it('should be red when disabled', function () {
        const wrapper = mount(PresenceToggle, {
            localVue,
            vuetify,
            propsData: {enabled: false},
        });
        const color = wrapper.find('div')
        expect(color.classes()).toContain('off')
    })

    it('should execute the callback when clicked', () => {
        const event = jest.fn()
        const wrapper = mount(PresenceToggle, {
            localVue,
            vuetify,
            propsData: { enabled: true, onToggle: event },
        })

        const button = wrapper.find('div')

        expect(event).toHaveBeenCalledTimes(0)

        // Simulate a click on the toggle
        button.trigger('click')

        // Ensure that our mock callback was called
        expect(event).toHaveBeenCalledTimes(1)

        // Ensure that the right data was given
        expect(event).toHaveBeenCalledWith(true)
    })
});