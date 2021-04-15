import { render, fireEvent } from '@testing-library/vue'
import RoomCard from '@/components/RoomCard.vue'


test('Shows room name on card', async () => { 
    const { getByText } = render(RoomCard, {
        props: {
            name: "Test Ruimte",
        },
    });

    getByText("Test Ruimte");
});

test('Shows amount of people on card', async () => {
    const { getByText } = render(RoomCard, {
        props: {
            amount: 10
        },
    });

    getByText("10 personen");
});

test('Has "nu reserveren" button on card', async () => {
    const { getByText } = render(RoomCard);

    getByText("Nu reserveren");
})