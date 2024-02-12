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
  showWarning: false,
  currentUser: null,
  warningUser: null,
  warningItem: {
    item_id: null,
    item_name: null,
    item_price: null,
    quantity: 1
  },
  addToCart(id, name, price, user_id) {
    if (this.cart.length === 0)
      this.currentUser = user_id
    if (this.currentUser === user_id) {
      if (!this.addQuantity(id)) {
        console.log(this.addQuantity(id));
        this.cart.push({
          item_id: id,
          quantity: 1,
          item_price: price,
          item_name: name,
        });
      }
      console.log(this.cart);
    } else {
      this.showWarning = true
      this.warningItem.item_id = id
      this.warningItem.item_name = name
      this.warningItem.item_price = price
      this.warningUser = user_id
    }
  },
  addQuantity(id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        this.cart[i].quantity++;
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
        this.cart.splice(i, 1);
        return true;
      }
    }
  },
  emptyCart() {
    this.cart = [];
    this.showWarning = false
  },
  emptyAdd() {
    this.emptyCart()
    this.cart.push(this.warningItem)
    this.currentUser = this.warningUser
  },
  returnQty(id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        return this.cart[i].quantity;
      }
    }
    return 0;
  },
  calcTotal() {
    let tot = 0;
    this.cart.forEach(el => {
      tot += (el.item_price * el.quantity);
    });
    return tot.toFixed(2);
  },
  calcPartial(id) {
    let part = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item_id == id) {
        part = this.cart[i].item_price * this.cart[i].quantity;
        return part.toFixed(2);
      }
    }
    return 0;
  },
  cartQuantity() {
    let tot = 0
    for (let i = 0; i < this.cart.length; i++) {
      tot += this.cart[i].quantity
    }
    return tot
  }
});
