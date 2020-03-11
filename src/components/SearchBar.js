import React, { Component } from "react";
import ItemShow from "./ItemShow";

export default class SearchBar extends Component {
  state = {
    expenses: [],
    income: [],
    expenseItem: "",
    expenseAmount: [],
    incomeItem: "",
    incomeAmount: [],
    errorMessage: '',
    errorMessage2: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleExpenseSubmit = e => {
    e.preventDefault();
    let err;
    if (this.state.expenseItem === "") {
      err = <strong>Enter a $ amount</strong>
      this.setState({errorMessage: err})
      setTimeout(() => {
        this.setState({errorMessage: ''})
      }, 2000);
      return false;
    } else {
      this.setState({errorMessage: ''})
      const item = {
        id: Math.random() + 1,
        value: this.state.expenseItem,
        money: parseFloat(this.state.expenseAmount)
      };

      const prevExpenses = [...this.state.expenses];
      prevExpenses.push(item);
      this.setState({
        expenses: [...this.state.expenses, item],
        expenseItem: "",
        expenseAmount: ""
      });
    }
  };

  handleIncomeSubmit = e => {
    e.preventDefault();
    let LS;
    let err;
    if (this.state.incomeItem === "") {
      err = <strong>Enter a $ amount</strong>
      this.setState({errorMessage2: err})
      setTimeout(() => {
        this.setState({errorMessage2: ''})
      }, 2000);
      return false;
    } else {
      const item = {
        id: Math.random() + 1,
        value: this.state.incomeItem,
        money: parseFloat(this.state.incomeAmount)
      };

      const prevIncome = [...this.state.income];
      prevIncome.push(item);
      this.setState({
        income: [...this.state.income, item],
        incomeItem: "",
        incomeAmount: ""
      });
    }
  };

  deleteExpenses = id => {
    const prevExp = [...this.state.expenses];
    const updatedExp = prevExp.filter(item => item.id !== id);
    this.setState({ expenses: updatedExp });
  };

  deleteIncome = id => {
    const prevInc = [...this.state.income];
    const updatedInc = prevInc.filter(item => item.id !== id);
    this.setState({ income: updatedInc });
  };

  render() {
    return (
      <div className="searchBarContainer">
        <h1>{this.props.title}</h1>
        <div className="formContainer">
          <form className="form expForm" onSubmit={this.handleExpenseSubmit}>
            <label>Enter Expense</label>
            <input
              type="text"
              name="expenseItem"
              value={this.state.expenseItem}
              onChange={this.handleChange}
              placeholder="Enter Expense Item"
            />
            <label>Enter amount</label>
            <input
              type="number"
              name="expenseAmount"
              value={this.state.expenseAmount}
              onChange={this.handleChange}
              placeholder="$"
            />
            <h3 style={{color: 'red'}}>{this.state.errorMessage}</h3>
            <button className="btn expBTN">Submit Expense</button>
          </form>

          <form className="form incForm" onSubmit={this.handleIncomeSubmit}>
            <label>Enter Income</label>
            <input
              type="text"
              name="incomeItem"
              value={this.state.incomeItem}
              onChange={this.handleChange}
              placeholder="Enter Income Item"
            />
            <label>Enter Amount</label>
            <input
              type="number"
              name="incomeAmount"
              value={this.state.incomeAmount}
              onChange={this.handleChange}
              placeholder="$"
            />
            <h3 style={{color: 'red'}}>{this.state.errorMessage2}</h3>
            <button className="btn incBTN">Submit Income</button>
          </form>
        </div>
        <ItemShow
          expenses={this.state.expenses}
          income={this.state.income}
          newSubmit={this.deleteExpenses}
          newSubmit2={this.deleteIncome}
        />
      </div>
    );
  }
}
