import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../imagens/carrinho.png';
import Avaliacoes from '../Components/Avaliacoes';
import './DetalhesProduto.css';

export default class DetalhesProduto extends Component {
  constructor() {
    super();
    this.state = {
      idDoProduto: '',
      detalhesDoProduto: [],
      objetoDeDetalhes: {},
      emailInput: '',
      textArea: '',
      nota: '1',
      inputRadio1: true,
      inputRadio2: false,
      inputRadio3: false,
      inputRadio4: false,
      inputRadio5: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const detalhesDoProduto = await request.json();
    this.setState({
      detalhesDoProduto: detalhesDoProduto.attributes,
      objetoDeDetalhes: detalhesDoProduto,
      idDoProduto: id,
    });
  }

  avaliarBtnClick = () => {
    const { emailInput, textArea, nota, idDoProduto } = this.state;
    const objComentarios = {
      emailInput,
      textArea,
      nota,
      idDoProduto,
    };
    const storageComentario = JSON.parse(localStorage.getItem('comentarios'));
    const verify = !storageComentario ? [] : storageComentario;
    const storageComentarioAtt = [...verify, objComentarios];
    localStorage.setItem('comentarios', JSON.stringify(storageComentarioAtt));
    this.setState({
      emailInput: '',
      textArea: '',
      nota: '1',
      inputRadio1: true,
      inputRadio2: false,
      inputRadio3: false,
      inputRadio4: false,
      inputRadio5: false,
    });
    /* if (!JSON.parse(localStorage.getItem('comentarios'))) {
      localStorage.setItem('comentarios', JSON.stringify([objComentarios]));
    } else {
      const storageComentario = JSON.parse(localStorage.getItem('comentarios'));
      const storageComentarioAtt = [...storageComentario, objComentarios];
      localStorage.setItem('comentarios', JSON.stringify(storageComentarioAtt));
    } */
  }

  emailInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  radioInputChange = ({ target }) => {
    const { id } = target;
    this.setState({ nota: id }, () => {
      const { nota } = this.state;
      const inputs = ['inputRadio1',
        'inputRadio2', 'inputRadio3', 'inputRadio4', 'inputRadio5'];
      inputs.forEach((item, index) => {
        if (index + 1 <= Number(nota)) {
          this.setState({ [item]: true });
        } else {
          this.setState({ [item]: false });
        }
      });
    });
  }

  render() {
    const {
      detalhesDoProduto,
      objetoDeDetalhes } = this.state;
    const { adicionaAoCarrinho, produtosNoCarrinho } = this.props;

    return (
      <main>
        <div className="product-info">
          <section className="title-info">
            <h2 data-testid="product-detail-name">
              { objetoDeDetalhes.title }
            </h2>
            <h3>
              { `R$: ${objetoDeDetalhes.price}` }
            </h3>
            <img
              src={ objetoDeDetalhes.thumbnail }
              alt={ `Imagem do produto: ${objetoDeDetalhes.title}` }
            />
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              id={ objetoDeDetalhes.id }
              onClick={ adicionaAoCarrinho }
            >
              Adicionar ao carrinho
            </button>
          </section>
          <section className="especificaçoes">
            <h2> Especificações:</h2>
            {detalhesDoProduto.map((item, index) => (
              <h4 key={ index }>
                { `${item.name}: ${item.value_name}` }
              </h4>
            ))}
          </section>
          <div className="carrinho-detalhes">
            <Link to="/carrinho" data-testid="shopping-cart-button">
              <img src={ Logo } alt="Imagem de um carrinho de compras" width="50px" />
            </Link>
            <span>
              { produtosNoCarrinho.length }
            </span>
          </div>
        </div>
        <Avaliacoes
          { ...this.state }
          radioInputChange={ this.radioInputChange }
          emailInputChange={ this.emailInputChange }
          avaliarBtnClick={ this.avaliarBtnClick }
        />
      </main>
    );
  }
}

DetalhesProduto.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  params: PropTypes.string,
  id: PropTypes.string,
  adicionaAoCarrinho: PropTypes.func.isRequired,
  produtosNoCarrinho: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DetalhesProduto.defaultProps = {
  match: '',
  params: '',
  id: '',
};
