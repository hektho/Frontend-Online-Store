import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Carrinho.css';

export default class Carrinho extends Component {
  preçoDosProdutos = (itemId) => {
    const { produtosNoCarrinho } = this.props;
    const totalDoMesmoProduto = produtosNoCarrinho.filter((e) => e.id === itemId);
    return (totalDoMesmoProduto.length * totalDoMesmoProduto[0].price).toFixed(2);
  }

  render() {
    const { produtosNoCarrinho,
      aumentaProduto,
      diminuiProduto,
      excluiProdutos,
      history } = this.props;
    const mySet = new Set();
    console.log(produtosNoCarrinho);
    produtosNoCarrinho.forEach((item) => mySet.add(item.id));
    const NAO_DUPLI = [];
    for (const item of mySet) {
      produtosNoCarrinho.find((el) => item === el.id && NAO_DUPLI.push(el));
    }
    const ONE = -1;
    NAO_DUPLI.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      }
      if (b.title < a.title) {
        return ONE;
      }
      return 0;
    });
    return (
      <main>
        <h1>Meu carrinho</h1>
        <section className="carrinho-container">
          { produtosNoCarrinho.length === 0
            ? (
              <p style={ { color: 'white' } } data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio :(
              </p>)
            : (
              NAO_DUPLI.map((item, index) => (
                <section className="produtos-carrinho" key={ index }>
                  <h3 data-testid="shopping-cart-product-name">
                    { item.title }
                  </h3>
                  <img
                    src={ item.thumbnail }
                    alt={ `Imagem do produto: ${item.title}` }
                    width="100px"
                  />
                  <div className="product-quantity">
                    <button
                      type="button"
                      id={ item.id }
                      onClick={ diminuiProduto }
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                    <h4 data-testid="shopping-cart-product-quantity">
                      { produtosNoCarrinho.filter((e) => item.id === e.id).length }
                    </h4>
                    <button
                      type="button"
                      id={ item.id }
                      onClick={ aumentaProduto }
                      data-testid="product-increase-quantity"
                    >
                      +
                    </button>
                    <h4>
                      { `R$: ${this.preçoDosProdutos(item.id)}` }
                    </h4>
                  </div>
                </section>)))}
        </section>
        <div className="total">
          <h3>
            Valor total:
            { ` R$ ${produtosNoCarrinho.reduce((acc, i) => acc + i.price, 0).toFixed(2)}` }
          </h3>
          <button type="button" onClick={ excluiProdutos }>
            Remover tudo
          </button>
          <button type="button" onClick={ produtosNoCarrinho.length > 0 && (() => history.push('/finalizar-compra')) }>
            Finalizar compra
          </button>
          { produtosNoCarrinho.length < 1 && <span className="span-carrinho">Você precisa adicionar itens ao carrinho para poder finalizar a compra.</span>}
        </div>
      </main>
    );
  }
}

Carrinho.propTypes = {
  produtosNoCarrinho: PropTypes.arrayOf(PropTypes.object).isRequired,
  aumentaProduto: PropTypes.func.isRequired,
  diminuiProduto: PropTypes.func.isRequired,
  excluiProdutos: PropTypes.func.isRequired,
};
