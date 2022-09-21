# Frontend-Online-Store
Repositório referente ao projeto Frontend Online Store
Link para o projeto: https://frontend-online-store-hektho.vercel.app
# Objetivos do projeto
- Simular uma loja de compra de produtos online consumindo a API do Mercado Livre.

# Tecnologias utilizadas
- JavaScript
- ReactJS
- CSS3
- React Router DOM

# Funcionalidades do projeto
 O projeto possui ao todo 4 rotas para navegação, sendo elas:
 - Home
 - Carrinho
 - Detalhes
 - Compra finalizada
 
 ## Home
 
 A página principal do projeto. Tem como o objetivo listar os produtos disponíveis ao usuário de acordo com sua preferência.
 No topo da página é possível visualizar um campo de busca de produtos, um botão para pesquisar os produtos e um botão que acessa o carrinho que conterá os produtos selecionados pelo usuário. Ao lado do ícone do carrinho, há uma numeração indicando a quantidade de produtos existentes no carrinho. O campo de busca filtrará os resultados de acordo com o que foi digitado pelo usuário.
 Ao lado esquerdo da página, há listado as categorias dos produtos, dessa forma é possível filtrar os produtos pela categoria também.
 No centro da página é onde ficarão disponibilizados os produtos que foram filtrados, seja pela sessão de categorias ou pelo campo de busca.
 Cada produto listado contém:
 - Título do produto;
 - Imagem; 
 - Preço;
 - Link para mais detalhes do produto;
 - Um botão que o adiciona ao carrinho;
 
 OBS: Os produtos listados e as categorias são disponibilizadas pela API do Mercado Livre.
 
 ## Detalhes do produto
 
 - É acessado atráves de um produto listado na página principal da aplicação.
 
 - Ao lado esquerdo é disponibilizado o nome do produto, o preço, uma imagem e um botão que adiciona ao carrinho de compras.
 
 - Ao centro da página é disponibilizado todas as especificações daquele produto em questão.
 
 - Ao lado superior direito há o botão que leva o usuário ao carrinho de compras.
 
 ### Avaliações do produto
 
 - Logo abaixo na página é possível verificar uma sessão de avaliações do produto, que é permitido ao usuário inserir uma nota e um comentário opcional.
 
 - O campo de e-mail precisa conter um e-mail válido para habilitar o botão de 'avaliar'.
 
 - Os comentários são salvos no localStorage da aplicação sendo possível visualizá-los mesmo após o recarregamento da página.
 
 ## Carrinho 
 
 Nesta página é possível visualizar os itens selecionados pelo usuário e sua quantidade.
 
 - É possível adicionar ou diminuir a quantidade dos produtos.
 - É disponibilizado o valor total dos produtos e o valor total individual dos produtos selecionados.
 - Há o botão de remover todos os itens do carrinho e o 'finalizar compra' que só é habilitado caso haja itens no carrinho.
 
 ## Finalizar compra
 
 Aqui é possível finalizar a compra do usuário.
 
 - Logo no topo da página é disponibilizado as informações dos produtos selecionados.
 - Há a sessão para cadastrar as informações do comprador.
 - O método de pagamento a direita é disponibilizado com algumas opções.
 - O botão de 'comprar' só é habilitado caso todos os campos de informações do comprador estejam preenchidos assim como o método de pagamento.
 - Ao clicar no botão de 'comprar', o usuário é redirecionado à página principal e o seu carrinho zerado.
 
 OBS: Nenhuma informação é armazenada, a sessão de 'informações do comprador' só existe para fins de simulação de uma aplicação real.
 
 
