<script>
import braintree from 'braintree-web';
import { store } from '../store';
import axios from 'axios';
export default {
  data() {
    return {
      store,
      hostedFieldInstance: false,
      error: "",
    }
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {

        this.error = "";

        this.hostedFieldInstance.tokenize().then(payload => {
          console.log(payload);
          this.store.paymentRequest.nonce = payload.nonce;
          this.store.paymentRequest.amount = this.store.calcTotal(); 
        })
          .catch(err => {
            console.error(err);
            this.error = "Alcuni dei dati inseriti non sono validi";
          })
      }
    },
    createBraintree() {
      braintree.client.create({
        authorization: "sandbox_v2dty569_7kfb5d3sq8xwt3tr"
      })
        .then(clientInstance => {
          let options = {
            client: clientInstance,
            styles: {
              'input': {
                'font-size': '16px',
                'font-family': 'sans-serif',
                'border': '1px solid #666',
                'padding-left': '1rem',
                'backgroud-color': 'red'
              },

            },
            fields: {
              number: {
                selector: '#creditCardNumber',
                placeholder: ''
              },
              cvv: {
                selector: '#cvv',
                placeholder: ''
              },
              expirationDate: {
                selector: '#expireDate',
                placeholder: ''
              }
            }
          }
          return braintree.hostedFields.create(options)
        })
        .then(hostedFieldInstance => {
          // @TODO - Use hostedFieldInstance to send data to Braintree
          this.hostedFieldInstance = hostedFieldInstance;
        })
        .catch(err => {

        });
    },
    async createTransaction() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/createTransaction', this.store.paymentRequest);
        console.log('Transaction created:', response.data);
        // Handle success response here
      } catch (error) {
        console.error('Error creating transaction:', error);
        // Handle error response here
      }
    },
  },
  mounted() {
    this.createBraintree();
  }
}
</script>

<template>
  <div class="container">
    <div class="col-sx">
      <div class="card-body">
        <div class="card-header">Inserisci i dati richiesti per procedere con il pagamento</div>
        <form>
          <div class="form-group">
            <input type="text" id="nome" name="nome" placeholder="&nbsp" required>
            <label for="nome">Nome</label>
          </div>
          <div class="form-group">
            <input type="email" id="mail" name="mail" placeholder="&nbsp" required>
            <label for="mail">Email</label>
          </div>
          <div class="form-group">
            <input type="tel" id="telefono" name="telefono" placeholder="&nbsp" required>
            <label for="telefono">Telefono</label>
          </div>
          <div class="form-group">
            <textarea id="dettagli_ordine" name="dettagli_ordine" rows="2" cols="50" placeholder="&nbsp"
              required></textarea>
            <label for="dettagli_ordine">Richieste aggiuntive</label>
          </div>
          <div class="form-group">
            <textarea id="indirizzo" name="indirizzo" rows="2" cols="50" placeholder="&nbsp" required></textarea>
            <label for="indirizzo">Indirizzo di consegna</label>
          </div>
          <div class="form-group">
            <div id="creditCardNumber" class="form-control"></div>
            <label>Carta di Credito</label>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <div id="expireDate" class="form-control"></div>
              <label for="expireDate">Data di scadenza</label>
            </div>
            <div class="form-group">
              <div id="cvv" class="form-control"></div>
              <label>CVV</label>
            </div>
          </div>
          <button type="submit" class="form-button" @click.prevent="payWithCreditCard">
            Paga con Carta di Credito
          </button>
        </form>
      </div>
      <div class="alert alert-success" v-if="store.paymentRequest.nonce">
        Pagamento avvenuto con successo
      </div>
      <div class="error-msg" v-if="error">
        {{ error }}
      </div>
    </div>
  </div>
  <div class="col-dx">
    <div class="card-header">Il tuo ordine</div>
    <div class="card-body">
      <p v-if="store.cart.length === 0">Il tuo carrello è vuoto</p>
      <div class="cart-card" v-for="card in store.cart">
        <div class="cart-card-name">
          <div>{{ card.item_name }}</div>
          <div>€ {{ store.calcPartial(card.item_id) }}</div>
        </div>
        <div class="cart-item-delete" @click="store.deleteItem(card.item_id)">
          <font-awesome-icon :icon="['fas', 'trash-can']" />
        </div>
        <div class="cart-card-counter">
          <button @click="store.removeItem(card.item_id)"><font-awesome-icon :icon="['fas', 'minus']" /></button>
          <div class="counter">{{ card.quantity }}</div>
          <button @click="store.addQuantity(card.item_id)"><font-awesome-icon :icon="['fas', 'plus']" /></button>
        </div>
      </div>
    </div>
  </div>
  <button @click="createTransaction()">Submit</button>
</template>

<style scoped lang="scss">
@use '../scss/partials/variables' as *;

.container {
  margin-top: 90px;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  .col-sx,
  .col-dx {
    .card-header {
      margin: 10px 0px 20px;
      font-size: 1.4rem;
      padding: 5px;
      // border-bottom: 2px solid $orange;
      // border-left: 2px solid $orange;
    }

    .card-body {
      width: min(500px, 100% - 2rem);
      border-radius: 1rem;
      background-color: #FFF2E7;
      border: 1px solid #FC8019;
      padding: 2rem;
      color: #3D4152;

      .form-group {
        position: relative;
        margin-bottom: 1.5rem;
        z-index: 2;

        label {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          z-index: 1;
          transition: $transition;
        }

        textarea~label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          transform: translateY(-50%);
          font-size: 1rem;
          z-index: 1;
          transition: $transition;
        }

        input:focus,
        input:valid,
        textarea:focus,
        textarea:valid {
          border-color: $orange;
        }

        input:focus~label,
        input:valid~label,
        textarea:focus~label,
        textarea:valid~label {
          top: 0;
          font-size: 0.875rem;
          background-color: $linen;
          color: $orange;
          padding-inline: 0.25rem;
          left: 0.75rem;
          z-index: 3;

        }



        #amount {
          font-size: 1.3rem;
        }

        #creditCardNumber,
        #expireDate,
        #cvv {
          position: relative;
          height: 40px;
          border: 1px solid $silver;
          border-radius: 0.5rem;
          font-family: 'Outfit', sans-serif;
          transition: $transition;
          z-index: 2;

        }

        #creditCardNumber.braintree-hosted-fields-focused,
        #expireDate.braintree-hosted-fields-focused,
        #cvv.braintree-hosted-fields-focused {
          border-color: $orange;
        }

        #creditCardNumber.braintree-hosted-fields-focused~label,
        #expireDate.braintree-hosted-fields-focused~label,
        #cvv.braintree-hosted-fields-focused~label,
        #creditCardNumber.braintree-hosted-fields-valid~label,
        #expireDate.braintree-hosted-fields-valid~label,
        #cvv.braintree-hosted-fields-valid~label {
          top: 0;
          font-size: 0.75rem;
          background-color: $linen;
          color: $orange;
          padding-inline: 0.25rem;
          left: 0.75rem;
          z-index: 3;
        }
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .form-button {
        background-color: rgb(247, 202, 0);
        padding: 10px 15px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        border: 1px solid transparent;

        &:hover {
          background-color: rgb(247, 165, 0);
        }

        &:focus {
          // padding: 1px;
          border: 1px solid rgb(0, 217, 255);
          box-shadow: 0px 0px 5px 2px rgba(0, 255, 255, 0.5);
        }
      }

      .error-msg,
      .alert-success {
        margin: 30px 0px;
      }

      .alert-success {
        color: green;
      }

      .error-msg {
        color: red;
      }

      input,
      textarea {
        background-color: transparent;
        border: 1px solid $silver;
        line-height: 40px;
        border-radius: 0.5rem;
        padding-left: 1rem;
        font-size: 1rem;
        transition: $transition;
        z-index: 2;
        width: 100%;

        &:focus {
          outline: none;
        }

        &:not(:placeholder-shown)+label {
          top: 0;
          font-size: 0.875rem;
          padding-inline: 0.25rem;
          left: 0.5rem;
          background-color: $linen;
        }
      }

      textarea {
        resize: none;
        height: 100px;
        font-family: 'Outfit', sans-serif;
      }
    }
  }

  .col-dx {
    .card-body {
      overflow: auto;
      max-width: 800px;
      height: 60vh;
      padding: 18px;

      .cart-card {
        position: relative;
        // border-bottom: 1px solid rgba($orange, 0.5);
        padding: 15px 10px;
        margin-bottom: 15px;
        background-color: rgba($orange, 0.2);
        border-radius: 25px;
        width: 100%;

        .cart-card-name {
          font-size: 18px;
          display: flex;
          justify-content: space-between;
        }

        .cart-item-delete {
          background-color: red;
          position: absolute;
          right: 8px;
          bottom: 8px;
          color: $linen;
          border-radius: 50px;
          aspect-ratio: 1/1;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 100ms linear;

          &:hover {
            transform: scale(1.1);
            cursor: pointer;
          }

          &:active {
            transform: scale(1);
          }
        }

        .cart-card-counter {
          display: flex;
          gap: 10px;
          margin-top: 20px;

          .counter {
            background-color: $orange;
            padding: 0px 15px;
            border-radius: 25px;
            color: white;
          }

          button {
            background-color: $orange;
            color: $linen;
            border-radius: 50px;
            aspect-ratio: 1/1;
            width: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 100ms linear;
            cursor: pointer;

            &:hover {
              background-color: $orange;
            }

            &:active {
              background-color: white;
              color: $orange;
            }
          }
        }
      }
    }
  }
}
</style>