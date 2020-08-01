# Imagem base
FROM node:13.12.0-alpine as build

# Informacoes sobre a imagem
LABEL author="Juan Carlos" \
      email="juancarllos.a@gmail.com" \
      date_create="01/08/2020" \
      version="1.0.0" \
      description="Imagem de um projeto pessoal dom ReactJs" \
      license="copyright"

# Criando o diretorio de trabalho
WORKDIR /app

# Adicionando para a variavel $PATH 
ENV PATH /app/node_modules/.bin:$PATH

# Copiando os arquivos
COPY package.json ./
COPY yarn.lock ./

# Instalando as dependencias
RUN yarn

# Copiando
COPY . ./

# Executando build
RUN npm run build


# Imagem base
FROM nginx:stable-alpine

# Copiando o buil do projeto para pasta do nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expondo a porta
EXPOSE 80

# Inicializando
CMD ["nginx", "-g", "daemon off;"]