import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../imagens/carrinho.png';
import './Home.css';

export default class Home extends Component {
  render() {
    const {
      emptyIdAndQuery,
      categorias,
      homeInput,
      handleChange,
      itemPesquisado,
      buttonClick,
      adicionaAoCarrinho,
      produtosNoCarrinho, loading } = this.props;
    return (
      <section className="container-home">
        <header className="home-header">
          <input
            onChange={ handleChange }
            name="homeInput"
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            value={ homeInput }
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ buttonClick }
          >
            Pesquisar
          </button>
          <div className="carrinho">
            <Link to="/carrinho" data-testid="shopping-cart-button">
              <img src={ Logo } alt="Imagem do carrinho de compras" width="50px" />
            </Link>
            <span>{ produtosNoCarrinho.length }</span>
          </div>
        </header>
        <section className="products-container">
          <div className="categoriash2">
            <h2>Categorias</h2>
            <aside className="category-container">
              { categorias.map((item, index) => (
                <button
                  key={ index }
                  id={ item.id }
                  type="button"
                  data-testid="category"
                  onClick={ buttonClick }
                >
                  { item.name }
                </button>
              )) }
            </aside>
          </div>
          <section className="all-products">
            {loading && (
              <div className="loading-component">
                <span> Carregando </span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                  alt='gif de loading'
                />
              </div>)}
            { emptyIdAndQuery && <h2> Digite algo da sua procura ou selecione alguma categoria! </h2> }
            <section className="produtos-pesquisados">
              { itemPesquisado.length < 1
                ? (
                  <p data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>
                ) : (
                  itemPesquisado.map((item) => (
                    <section
                      key={ item.id }
                      id={ item.id }
                      data-testid="product"
                      className="produto"
                    >
                      <h3>
                        { item.title }
                      </h3>
                      <img
                        src={ item.thumbnail }
                        alt={ `Imagem do produto: ${item.title}` }
                        width="150px"
                      />
                      <h4>
                        { `R$: ${item.price}` }
                      </h4>
                      <Link to={ `/detalhes/${item.id}` } data-testid="product-detail-link">
                        Mais detalhes
                      </Link>
                      <button
                        type="button"
                        onClick={ adicionaAoCarrinho }
                        id={ item.id }
                        data-testid="product-add-to-cart"
                      >
                        Adicionar ao carrinho
                      </button>
                    </section>
                  )))}
            </section>
          </section>
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  categorias: PropTypes.arrayOf(PropTypes.object).isRequired,
  homeInput: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  itemPesquisado: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonClick: PropTypes.func.isRequired,
  adicionaAoCarrinho: PropTypes.func.isRequired,
  produtosNoCarrinho: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyIdAndQuery: PropTypes.bool.isRequired,
};
