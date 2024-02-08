import { reactive } from "vue";

export const store = reactive({
  request: {
    name: "",
    types_id: [],
  },
  categories: [
    {
      img: "src/assets/img/italiano.jpg",
      name: "Italiano",
      id: 1,
      isOn: false,
    },
    {
      img: "src/assets/img/cinese.jpg",
      name: "Cinese",
      id: 2,
      isOn: false,
    },
    {
      img: "src/assets/img/vegetariano.jpg",
      name: "Vegetariano",
      id: 3,
      isOn: false,
    },
    {
      img: "src/assets/img/messicano.jpg",
      name: "Messicano",
      id: 4,
      isOn: false,
    },
    {
      img: "src/assets/img/giapponese.jpg",
      name: "Giapponese",
      id: 5,
      isOn: false,
    },
    {
      img: "src/assets/img/pizzeria.jpg",
      name: "pizzeria",
      id: 6,
      isOn: false,
    },
    {
      img: "src/assets/img/francese.jpg",
      name: "Francese",
      id: 7,
      isOn: false,
    },
    {
      img: "src/assets/img/spagnolo.jpg",
      name: "Spagnolo",
      id: 8,
      isOn: false,
    },
    {
      img: "src/assets/img/greco.jpg",
      name: "Greco",
      id: 9,
      isOn: false,
    },
  ],
});
