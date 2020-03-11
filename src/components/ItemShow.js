import React, { Component } from "react";

export default class ItemShow extends Component {
  state = {
    tax: 0,
  };

  tax = () => {
    let totalInc = this.props.income.reduce((a, b) => a + b.money, 0);
    this.setState({
      tax: totalInc * 0.13
    });
  };

  deleteExp(id) {
    this.props.newSubmit(id);
  }

  deleteInc(id) {
    this.props.newSubmit2(id);
  }

  render() {
    let totalExp = this.props.expenses.reduce((a, b) => a + b.money, 0);
    let totalInc = this.props.income.reduce((a, b) => a + b.money, 0);
    let total = (totalInc - totalExp).toFixed(2);

    const expenseList = this.props.expenses.map(item => {
      return (
        <li className='listItem' key={item.id}>
          {item.value} <strong>${item.money}</strong>
          <button className='deleteBTN' onClick={this.deleteExp.bind(this, item.id)}>X</button>
        </li>
      );
    });
    const incomeList = this.props.income.map(item => {
      return (
        <li className='listItem' key={item.id}>
          {item.value} <strong>${item.money}</strong>
          <button className='deleteBTN' onClick={this.deleteInc.bind(this, item.id)}>X</button>
        </li>
      );
    });
    return (
      <div className='secondContainer'>
                <h2 className={total >= 0 ? 'totalPlus' : 'totalNegative'}>Total: ${total}</h2>
        <div className="moneyContainer">
          <div className="expenseContainer">
            <h2>Expenses</h2>
            {expenseList}
            <h3>Total Expenses: ${totalExp} </h3>
          </div>
          <div className="incomeContainer">
            <h2>Income</h2>
            {incomeList}
            <h3>Total Income: ${totalInc}</h3>
          </div>
        </div>

        <button onClick={this.tax} className="btn taxBTN">
          Tax
        </button>
        <h3>Sales Tax to Collect: ${this.state.tax}</h3>
      </div>
    );
  }
}
