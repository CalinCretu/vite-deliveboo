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
  cart: [],
  isItemInCart: [],
  addToCart(id, price, length, index) {
    if (this.isItemInCart.length == 0) {
      this.fillIsItemInCart(length);
    }
    if(!this.addQuantity(id)) {
      console.log(this.addQuantity(id));
      this.cart.push({
        item_id: id,
        quantity: 1,
        item_price: price,
        list_index: index,
      });
      this.isItemInCart[this.cart[this.cart.length - 1].list_index] = true;
    }
    console.log(this.cart)
  },
  addQuantity(id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        this.cart[i].quantity++;
        this.isItemInCart[this.cart[i].list_index] = true;

        return true;
      }
    }
    return false;
  },
  removeItem(id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        this.cart[i].quantity--;
        if (this.cart[i].quantity == 0) {
          this.isItemInCart[this.cart[i].list_index] = false;
          this.cart.splice(i, 1);
        }

        return true;
      }
    }
    console.log(this.cart);
  },
  deleteItem(id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        this.isItemInCart[this.cart[i].list_index] = false;
        this.cart.splice(i, 1);
        return true;
      }
    }
  },
  fillIsItemInCart(length) {
    for (let i = 0; i < length; i++) {
      this.isItemInCart[i] = false;
    }
  },
});
