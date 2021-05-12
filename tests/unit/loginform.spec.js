// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import LoginForm from '@/components/LoginForm'

// Utilities
import {createLocalVue, mount} from '@vue/test-utils'


Vue.use(Vuetify)

const localVue = createLocalVue()

describe('LoginForm.vue', () => {
    let vuetify
    beforeEach(() => {
        vuetify = new Vuetify();
    })

    it('should display email input', () => {
        const wrapper = mount(LoginForm, {
            localVue,
            vuetify,
            propsData: {},
        })

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.find('.v-label')

        expect(title.text()).toBe('Emailadres')
    })

    it('should display password input', () => {
        const wrapper = mount(LoginForm, {
            localVue,
            vuetify,
            propsData: {},
        })

        // We could also verify this differently
        // by checking the text content
        const title = wrapper.findAll('.v-label').at(1)
        expect(title.text()).toBe('Wachtwoord')
    })

    it('shouldnt call the callback when the data is invalid', () => {
        const event = jest.fn()
        const wrapper = mount(LoginForm, {
            localVue,
            vuetify,
            propsData: {loginCallback: event},
        })

        const button = wrapper.find('button')

        expect(event).toHaveBeenCalledTimes(0)

        // Simulate a click on the toggle
        button.trigger('click')

        // Ensure that our mock callback was called
        expect(event).toHaveBeenCalledTimes(0)
    })
    
    it('it should call the callback when data is valid', () => {
        const event = jest.fn()
        const wrapper = mount(LoginForm, {
            localVue,
            vuetify,
            propsData: {
                loginCallback: event
            },
        })

        const fields = wrapper.findAll('input');
        fields.at(0).setValue('test@test.nl')
        fields.at(1).setValue('password')

        const button = wrapper.find('button')

        expect(event).toHaveBeenCalledTimes(0)

        // Simulate a click on the toggle
        button.trigger('click')

        // Ensure that our mock callback was called
        expect(event).toHaveBeenCalledTimes(1)
    })
});