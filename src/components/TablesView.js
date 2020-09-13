import React from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
import bell from "../media/bell-off.png";
const db = firebase.firestore();

export class ContentHeader extends React.Component {
  render() {
    const currentRoute = window.location.pathname;
    return (
      <header className="header">
        <div className="containerLogo">
          {currentRoute !== "/mesero" && (
            <div>
              <GoBack />
            </div>
          )}
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Bell />
      </header>
    );
  }
}

class GoBack extends React.Component {
  render() {
    return (
      <Link to="/mesero">
        <i className="fas fa-chevron-left"></i>
      </Link>
    );
  }
}

class Bell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bellonof: false };
  }
  render() {
    return (
      <div>
        <div className="containerBellOf">
          <img
            src={bell}
            alt={""}
            className="bellOff"
            onClick={() => this.setState({ bellonof: !this.state.bellonof })}
          />
        </div>
        <SubMenuOrders bellonof={this.state.bellonof} />
      </div>
    );
  }
}

class SubMenuOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalSubMenu: false, tableModalClicked: undefined };
    this.showModalSubMenu = this.showModalSubMenu.bind(this);
    this.hideModalSubMenu = this.hideModalSubMenu.bind(this);
  }
  showModalSubMenu(e) {
    const table = e.target.value;
    this.setState({ modalSubMenu: true, tableModalClicked: table });
  }
  hideModalSubMenu() {
    this.setState({ modalSubMenu: false });
  }
  render() {
    const classSubMenuOrders =
      this.props.bellonof === true
        ? "containerSubMenuOrdersOpen"
        : "containerSubMenuOrdersClose";
    return (
      <div>
        <ModalOrders
          modalSubMenu={this.state.modalSubMenu}
          tableModalClicked={this.state.tableModalClicked}
          hideModalSubMenu={this.hideModalSubMenu}
        />
        <div className={classSubMenuOrders} bellonof={this.props.bellonof}>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 1"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 1
          </button>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 2"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 2
          </button>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 3"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 3
          </button>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 4"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 4
          </button>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 5"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 5
          </button>
          <button
            className="containerEachOrderSubMenu"
            value="MESA 6"
            onClick={this.showModalSubMenu}
          >
            Pedido mesa 6
          </button>
        </div>
      </div>
    );
  }
}

const ModalOrders = ({ modalSubMenu, hideModalSubMenu }) => {
  const classModal = modalSubMenu
    ? "modal display-block"
    : "modal display-none";
  let olis = [];
  db.collection("pedidos")
    .get()
    .then((querySnapshot) => {
      olis = querySnapshot.forEach((doc) => {
        if (doc.data().mesa === "MESA 1") {
          doc.data().productos.map((item) => {
            return (
              <div className="containerEachOrder" key={item.nombre}>
                <div>
                  {item.nombre} x {item.cantidad}
                </div>
                <div className="priceOrder">${item.preciototal}</div>
              </div>
            );
          });
        }
      });
    });
  return (
    <div className={classModal}>
      <section className="containerModalSubMenu">
        <button onClick={hideModalSubMenu}>X</button>
        <div className="containerModal">
          <div className="containerOrderDetail">
            <div className="containerAllOrders">{}</div>
            <div className="containerInfoBottom">
              <div className="totalPriceOrder">Total: ${}</div>
              <textarea
                placeholder="Comentarios:"
                rows="4"
                cols="10"
              ></textarea>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.tableChoose = this.tableChoose.bind(this);
  }
  tableChoose(event) {
    sessionStorage.setItem(
      "table",
      JSON.stringify({
        table: event.target.value,
      })
    );
  }

  render() {
    return (
      <div
        className="comtainerAllTablesView"
        style={{
          backgroundColor: "#c7c2c2",
        }}
      >
        <div className="containerHeaderAndOptionsMenu">
          <ContentHeader />
        </div>
        <div className="containerTablesView">
          <div className="containerButtonsTables">
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 1"
                onClick={this.tableChoose}
              >
                Mesa 1
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 2"
                onClick={this.tableChoose}
              >
                Mesa 2
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 3"
                onClick={this.tableChoose}
              >
                Mesa 3
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 4"
                onClick={this.tableChoose}
              >
                Mesa 4
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 5"
                onClick={this.tableChoose}
              >
                Mesa 5
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 6"
                onClick={this.tableChoose}
              >
                Mesa 6
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
