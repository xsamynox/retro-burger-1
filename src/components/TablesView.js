import React from "react";
import firebase from "../firebaseConfig";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
import bellOff from "../media/bell-off.png";
import bellOn from "../media/bell-on.png";
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
    this.state = { bellonof: false, bellPhoto: bellOff };
    this.handleSubMenu= this.handleSubMenu.bind(this)
  }
  handleSubMenu(){
    this.setState({ bellonof: !this.state.bellonof })
  }
  handleBellPhoto(bellClase){
    this.setState({bellClase: bellClase})
  }
  render() {
    return (
      <div>
        <div className="containerBellOf">
          <img
            src={this.state.bellPhoto}
            alt={""}
            className="bellOff"
            onClick={this.handleSubMenu}
          />
        </div>
        <SubMenuOrders bellonof={this.state.bellonof} handleSubMenu={this.handleSubMenu} handleBellPhoto={this.handleBellPhoto}/>
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
    this.props.handleSubMenu(false)
    this.setState({ modalSubMenu: true, tableModalClicked: table});
  }
  hideModalSubMenu() {
    this.setState({ modalSubMenu: false });
  }
  render() {
    const classSubMenuOrders =this.props.bellonof === true? "containerSubMenuOrdersOpen": "containerSubMenuOrdersClose";
    db.collection("pedidos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().estadoPedido === "Terminado") {
          console.log("oli")
          this.props.handleBellPhoto(bellOn)
        }
      });
    });
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
  const classModal = modalSubMenu? "modal display-block": "modal display-none";
  db.collection("pedidos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().estadoPedido === "Terminado") {
          console.log("oli")
          this.props.handleBellPhoto(bellOn)
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
