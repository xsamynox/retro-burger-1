import React from "react";
import { ContentHeader } from "./InitialView";
import { saveOrder } from "../services/MeseroService";
import { Almuerzo, Desayuno } from "../data/menu.json";
import { Link } from "react-router-dom";

export class ContentMenuOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleIndexButtonClicked = this.handleIndexButtonClicked.bind(this);
    this.state = {
      indexButtonClicked: undefined,
      menuClicked: undefined,
      orderTable: [],
      optionMenu: "lunch",
      totalPrice: 0,
      cantidad: 0,
    };
  }

  handleIndexButtonClicked(indexButtonClicked, menuClicked) {
    // Se guardan los menus en un solo objecto para facilitar la accesibilidad
    const menus = {
      desayuno: Desayuno,
      almuerzo: Almuerzo
    }
    //Comida seleccionada
    const mealSelected = menus[menuClicked][indexButtonClicked];
    // Pregunto si existe una comida con el mismo nombre ya en el arreglo de ordenes
    const existOtherMeal = this.state.orderTable.length && this.state.orderTable.filter(data => data.nombre === mealSelected.nombre).length
    // Guardo el largo de las ordernes para no reescribir lo mismo a cada rato
    const lengthOrderTable = this.state.orderTable.length;

    // Si es el primero lo agrego o si no esta uno del mismo tipo de comida
    if (!lengthOrderTable || !existOtherMeal) {
      const tempOrderTable = [...this.state.orderTable, { ...mealSelected, cantidad: 1, preciototal: mealSelected.precio }];
      let total;
      // Si existe una orden ya en el carro calcular el total de todos
      if (lengthOrderTable) {
        total = tempOrderTable.reduce((total, data) => {
          return total + data.preciototal
        }, 0)
      }
      this.setState({ orderTable: [...tempOrderTable], totalPrice: total || mealSelected.precio })
    }

    // Si existe ya una comida con el mismo nombre en el arreglo entonces aumento cantidad y precio
    if (existOtherMeal) {
      // Creo un arreglo temporar para poder modificar los items del estado
      const tempOrderTable = this.state.orderTable.map((elem) => {
        // Busco el item con el map y si lo encuentro aumento cantidad y precio
        if (elem && elem.nombre === mealSelected.nombre) {
          const newQuantity = ++elem.cantidad; // La cantidad nueva del mismo pedido
          return elem = { ...elem, cantidad: newQuantity, preciototal: elem.precio * newQuantity };
        }
        // Sino es el elemento igual lo retorno para no perderlo de la lista
        return elem
      })
      // Calculo el total de los items
      const total = tempOrderTable.reduce((total, elem) => {
        return total + elem.preciototal
      }, 0)
      // Reemplazo orderTable por el nuevo editado
      this.setState({ orderTable: [...tempOrderTable], totalPrice: total })
    }
  }

  // Modificando el estado que se ejecutara en SendOrder
  handleReset = () => {
    this.setState({ orderTable: [], totalPrice: 0, cantidad: 0 })
  }

  deleteItems = (index) => {
    this.setState({
      cantidad: 0,
      totalPrice: 0,
      orderTable: this.state.orderTable.filter((item, idIndex) => {
        return idIndex !== index
      })
    });
  }

  render() {
    let classMenuLunch =
      this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast =
      this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
    return (
      <div className="containerAllPage">
        <ContentHeader />
        <button
          className={classMenuLunch}
          onClick={() => this.setState({ optionMenu: "lunch", orderTable: [] })}
        >
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={() =>
            this.setState({ optionMenu: "breakfast", orderTable: [] })
          }
        >
          Desayuno
        </button>
        <div className="tableName">
          {JSON.parse(sessionStorage.table).table}
        </div>
        <Menu
          indexButtonClicked={this.state.indexButtonClicked}
          onHandleIndexButtonClicked={this.handleIndexButtonClicked}
          menuClicked={this.state.menuClicked}
          optionMenu={this.state.optionMenu}
        />
        <OrderDetail
          indexButtonClicked={this.state.indexButtonClicked}
          menuClicked={this.state.menuClicked}
          orderTable={this.state.orderTable}
          totalPrice={this.state.totalPrice}
          cantidad={this.state.cantidad}
          handleReset={this.handleReset}
          deleteItems={this.deleteItems}

        />
      </div>
    );
  }
}

const OrderDetail = (props) => {
  const orderList = props.orderTable.map((item, idIndex) => {
    return (
      <div className="containerEachOrder" key={item.nombre} >
        <div className="trashOrder">
          <div>
            {item.nombre} x {item.cantidad}
          </div>
          <div>
            <button className="btn-trash" onClick={() => props.deleteItems(idIndex)}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
        <div>
          <button className="btn-trash btn-line" onClick={() => props.handleSubtract(idIndex)}>-</button>
        </div>
        <div className="priceOrder">${item.preciototal}</div>
      </div>

    );
  });

  return (
    <div className="containerViewOrderDetail">
      <div className="containerOrderDetail">
        <div className="containerAllOrders">{orderList}</div>
        <div className="containerInfoBottom">
          <div className="totalPriceOrder">Total: ${props.totalPrice}</div>
          <textarea placeholder="Comentarios:" rows="4" cols="10"></textarea>
          <SendOrder
            orderToSend={props.orderTable}
            priceToSend={props.totalPrice}
            handleReset={props.handleReset}
          />
        </div>
      </div>
    </div>
  );
};

class SendOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderState: "Sin pedido", buttonIsDisabled: true };
  }
  componentDidMount() {
    let buttonIsDisabled;
    if (this.props.orderToSend.length !== 0) {
      buttonIsDisabled = false;
    } else {
      buttonIsDisabled = true;
    }
    this.setState({
      orderState: this.state.orderState,
      buttonIsDisabled: buttonIsDisabled,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderToSend !== this.props.orderToSend) {
      let buttonIsDisabled;
      if (this.props.orderToSend.length !== 0) {
        buttonIsDisabled = false;
      } else {
        buttonIsDisabled = true;
      }

      this.setState({
        orderState: this.state.orderState,
        buttonIsDisabled: buttonIsDisabled,
      });
    }
  }

  handleClickSendOrder(orderTable, totalPrice) {
    const stateOrder = this.state.estadoPedido;
    this.props.handleReset();
    saveOrder(orderTable, totalPrice, stateOrder);

  }

  render() {
    return (
      <Link to="/mesero">
        <button
          className="btnSendOrder"
          disabled={this.state.buttonIsDisabled}
          onClick={() => {
            this.handleClickSendOrder(
              this.props.orderToSend,
              this.props.priceToSend
            );
          }}
        >
          ENVIAR PEDIDO
        </button>
      </Link>
    );
  }
}
class Menu extends React.Component {
  render() {
    let allFood =
      this.props.optionMenu === "lunch" ? (
        <MenuLunch
          indexButtonClicked={this.props.indexButtonClicked}
          menuClicked={this.props.menuClicked}
          onHandleIndexButtonClickedChildren={
            this.props.onHandleIndexButtonClicked
          }
        />
      ) : (
          <MenuBreakfast
            indexButtonClicked={this.props.indexButtonClicked}
            menuClicked={this.props.menuClicked}
            onHandleIndexButtonClickedChildren={
              this.props.onHandleIndexButtonClicked
            }
          />
        );
    return <div className="containerViewButtonsMenu">{allFood}</div>;
  }
}

class MenuLunch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: undefined };
  }
  showIngredientsWithClick(index) {
    this.setState({ activeButton: index });
  }
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClickedChildren(index, "almuerzo");
  }

  render() {
    return (
      <div className="containerButtonsMenu">
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(0)}
        >
          {Almuerzo[0].nombre}
          <br />${Almuerzo[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Almuerzo[1].nombre}
          <br />${Almuerzo[1].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Almuerzo[2].nombre}
          <br />${Almuerzo[2].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Almuerzo[3].nombre}
          <br />${Almuerzo[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Almuerzo[4].nombre}
          <br />${Almuerzo[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Almuerzo[5].nombre}
          <br />${Almuerzo[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Almuerzo[6].nombre}
          <br />${Almuerzo[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Almuerzo[7].nombre}
          <br />${Almuerzo[7].precio}
        </button>
      </div>
    );
  }
}
class MenuBreakfast extends React.Component {
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClickedChildren(index, "desayuno");
  }
  render() {
    return (
      <div className="containerButtonsMenu">
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(0)}
        >
          {Desayuno[0].nombre}
          <br />${Desayuno[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Desayuno[1].nombre}
          <br />${Desayuno[1].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Desayuno[2].nombre}
          <br />${Desayuno[2].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Desayuno[3].nombre}
          <br />${Desayuno[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Desayuno[4].nombre}
          <br />${Desayuno[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Desayuno[5].nombre}
          <br />${Desayuno[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Desayuno[6].nombre}
          <br />${Desayuno[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Desayuno[7].nombre}
          <br />${Desayuno[7].precio}
        </button>
      </div>
    );
  }
}
