import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FinalizarCompra.css';
import states from '../Components/estados';

export default class FinalizarCompra extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputEmail: '',
      inputCPF: '',
      inputTel: '',
      inputCEP: '',
      inputAdress: '',
      inputComp: '',
      inputNum: '',
      inputCity: '',
      estado: 'Estado',
      pay: '',
      verifyEmpty: false,
    };
  }

  finalizarCompraChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyButton = () => {
    const { resetProdutosCarrinho } = this.props;
    const { history } = this.props;
    const values = Object.values(this.state);
    const verifyEmpty = values.some((i) => i === '' || i === 'Estado');
    const finalizarCompra = {
      inputName: '',
      inputEmail: '',
      inputCPF: '',
      inputTel: '',
      inputCEP: '',
      inputAdress: '',
      inputComp: '',
      inputNum: '',
      inputCity: '',
      estado: 'Estado',
      pay: '',
    };
    if (verifyEmpty) {
      this.setState({ verifyEmpty });
    }

    if (!verifyEmpty) {
      resetProdutosCarrinho();
      this.setState({ ...finalizarCompra, verifyEmpty });
      history.push('/compra-finalizada');
    }
  }

  render() {
    const {
      inputName,
      inputEmail,
      inputCPF,
      inputTel,
      inputCEP,
      inputAdress,
      inputComp,
      inputNum,
      inputCity,
      verifyEmpty,
      estado
    } = this.state;

    const {
      produtosNoCarrinho,
    } = this.props;
    const mySet = new Set();
    produtosNoCarrinho.forEach((item) => mySet.add(item.id));
    const NAO_DUPLI = [];
    for (let item of mySet) {
      produtosNoCarrinho.find((el) => item === el.id && NAO_DUPLI.push(el))
    }
    return (
      <main>
        <h2>
          Revise seus produtos
        </h2>
        {NAO_DUPLI.map((item) => (
          <article key={ item.id }>
            <img
              src={ item.thumbnail }
              alt={ `Imagem do produto: ${item.title}` }
              width="100px"
            />
            <h4 className="nome-produto">
              { item.title }
              {' '}
              ---
              {' '}
              {produtosNoCarrinho.filter((i) => i.id === item.id).length}
              {' '}
              Un.
            </h4>
            R$:
            {' '}
            {((produtosNoCarrinho.filter((i) => i.id === item.id).length) * item.price).toFixed(2)}
          </article>
        ))}
        <h3>
          Valor total:
          R$
          {' '}
          {produtosNoCarrinho.reduce((acc, i) => acc + i.price, 0).toFixed(2)}
        </h3>
        <div className="formulario">

          <form className="info-comprador">
            <h2>
              Informações do comprador
            </h2>
            <input
              className={ (verifyEmpty && !inputName) ? 'border-red' : null }
              value={ inputName }
              type="text"
              name="inputName"
              onChange={ this.finalizarCompraChange }
              placeholder="Nome completo"
            />
            <input
              className={ (verifyEmpty && !inputCPF) ? 'border-red' : null }
              value={ inputCPF }
              type="number"
              name="inputCPF"
              onChange={ this.finalizarCompraChange }
              placeholder="CPF"
            />
            <input
              className={ (verifyEmpty && !inputEmail) ? 'border-red' : null }
              value={ inputEmail }
              type="email"
              name="inputEmail"
              onChange={ this.finalizarCompraChange }
              placeholder="E-mail"
            />
            <input
              className={ (verifyEmpty && !inputTel) ? 'border-red' : null }
              value={ inputTel }
              type="number"
              name="inputTel"
              onChange={ this.finalizarCompraChange }
              placeholder="Telefone"
            />
            <input
              className={ (verifyEmpty && !inputCEP) ? 'border-red' : null }
              value={ inputCEP }
              type="number"
              name="inputCEP"
              onChange={ this.finalizarCompraChange }
              placeholder="CEP"
            />
            <input
              className={ (verifyEmpty && !inputAdress) ? 'border-red' : null }
              value={ inputAdress }
              type="text"
              name="inputAdress"
              onChange={ this.finalizarCompraChange }
              placeholder="Endereço"
            />
            <input
              className={ (verifyEmpty && !inputComp) ? 'border-red' : null }
              value={ inputComp }
              type="text"
              name="inputComp"
              onChange={ this.finalizarCompraChange }
              placeholder="Complemento"
            />
            <input
              className={ verifyEmpty && !inputNum ? 'border-red' : null }
              value={ inputNum }
              type="number"
              name="inputNum"
              onChange={ this.finalizarCompraChange }
              placeholder="Número"
            />
            <input
              className={ verifyEmpty && !inputCity ? 'border-red' : null }
              value={ inputCity }
              type="text"
              name="inputCity"
              onChange={ this.finalizarCompraChange }
              placeholder="Cidade"
            />
            <select
              className={ (verifyEmpty && estado === 'Estado') ? 'border-red' : null }
              name="estado"
              onChange={ this.finalizarCompraChange }>
              <option>
                Estado
              </option>
              {states.map((i) => (
                <option key={ i.value }>
                  {i.label}
                </option>
              ))}
            </select>
          </form>
          <section className="method-pay">
            <h2>
              Método de pagamento
            </h2>
            <label htmlFor="boleto">
              {' '}
              Boleto
              <input type="radio" name="pay" id="boleto" value="boleto" onChange={ this.finalizarCompraChange } />
            </label>
            <div>
              <label htmlFor="visa">
                <input type="radio" name="pay" id="visa" value="visa" onChange={ this.finalizarCompraChange } />
                {' '}
                Visa
              </label>
              <label htmlFor="mastercard">
                <input type="radio" name="pay" id="mastercard" value="mastercard" onChange={ this.finalizarCompraChange } />
                {' '}
                Master Card
              </label>
              <label htmlFor="elo">
                <input type="radio" name="pay" id="elo" value="elo" onChange={ this.finalizarCompraChange } />
                {' '}
                Elo
              </label>
            </div>
              <button type="button" onClick={ this.verifyButton }>
                Comprar
              </button>
              { verifyEmpty && <span className='preencha-campo'> Preencha todas os campos!</span>}
          </section>
        </div>
      </main>
    );
  }
}

FinalizarCompra.propTypes = {
  produtosNoCarrinho: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetProdutosCarrinho: PropTypes.func.isRequired,
};
