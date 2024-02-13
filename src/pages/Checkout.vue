<script>
import braintree from 'braintree-web';
import { store } from '../store';
export default {
  data() {
    return {
      store,
      hostedFieldInstance: false,
      nonce: "",
      error: "",
    }
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {

        this.error = "";
        this.nonce = "";

        this.hostedFieldInstance.tokenize().then(payload => {
          console.log(payload);
          this.nonce = payload.nonce;
        })
          .catch(err => {
            console.error(err);
            this.error = "Alcuni dei dati inseriti non sono validi";
          })
      }
    },
    createBraintree() {
      braintree.client.create({
        authorization: "sandbox_fwwypyc6_txrv7qdk3dghrytf"
      })
        .then(clientInstance => {
          let options = {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '14px',
                'font-family': 'Outfit'
              }
            },
            fields: {
              number: {
                selector: '#creditCardNumber',
                placeholder: 'Inserici Numero Carta'
              },
              cvv: {
                selector: '#cvv',
                placeholder: 'Enter CVV'
              },
              expirationDate: {
                selector: '#expireDate',
                placeholder: '00 / 0000'
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
  },
  mounted() {
    braintree.client.create({
      authorization: "sandbox_fwwypyc6_txrv7qdk3dghrytf"
    })
      .then(clientInstance => {
        let options = {
          client: clientInstance,
          styles: {
            input: {
              'font-size': '14px',
              'font-family': 'Open Sans'
            }
          },
          fields: {
            number: {
              selector: '#creditCardNumber',
              placeholder: 'Inserici Numero Carta'
            },
            cvv: {
              selector: '#cvv',
              placeholder: 'Enter CVV'
            },
            expirationDate: {
              selector: '#expireDate',
              placeholder: '00 / 0000'
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
  }
}
</script>

<template>
  <div class="container">
    <div class="col-sx">
      <div class="card-header">Inserisci i dati richiesti per procedere con il pagamento</div>
      <div class="card-body">
        <form>
          <label for="nome">Nome</label>
          <input placeholder="Inserisci il tuo Nome" type="text" id="nome" name="nome" required>

          <label for="mail">Email</label>
          <input placeholder="Inserisci la tua Mail" type="email" id="mail" name="mail" required>

          <label for="telefono">Telefono</label>
          <input placeholder="Inserisci numero di telefono" type="tel" id="telefono" name="telefono" required>

          <label for="dettagli_ordine">Dettagli Ordine</label>
          <textarea placeholder="Inserisci dettagli aggiuntivi" id="dettagli_ordine" name="dettagli_ordine" rows="2"
            cols="50" required></textarea>

          <label for="indirizzo">Indirizzo</label>
          <textarea placeholder="Inserisci l'indirizzo di consegna" id="indirizzo" name="indirizzo" rows="2" cols="50"
            required></textarea>

          <div class="form-group">
            <label>Carta di Credito</label>
            <div id="creditCardNumber" class="form-control"></div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="expireDate">Data di scadenza</label>
                <div id="expireDate" class="form-control"></div>
              </div>
              <div class="col-6">
                <label>CVV</label>
                <div id="cvv" class="form-control"></div>
              </div>
            </div>
          </div>
          <button type="submit" class="form-button" @click.prevent="payWithCreditCard">
            Paga con Carta di Credito
          </button>
        </form>
        <div class="alert alert-success" v-if="nonce">
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
  </div>
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
      border-bottom: 2px solid $orange;
      border-left: 2px solid $orange;
    }

    .card-body {
      padding: 30px 80px;
      background-color: $linen;
      border-radius: 25px;
      box-shadow: -5px 5px 0px 0px $orange;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.4rem;

      .form-group {
        margin: 10px 0px;

        #amount {
          font-size: 1.3rem;
        }

        #creditCardNumber,
        #expireDate,
        #cvv {
          height: 80px;
        }
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
        border: none;
        margin: 35px 0px;
        width: 100%;

        &:focus {
          outline: none;
        }
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