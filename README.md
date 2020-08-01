

# Informações sobre a imagem do Search Beer no DockerHub

A imagem está disponível na URL a seguir.

https://hub.docker.com/r/juancarllos88/search-beer

O Search Beer é uma aplicação de estudo utilizando ReactJs.

Imagens Bases utilizadas.

* node:13.12.0-alpine
* nginx:stable-alpine

## Como usar a imagem?

* Baixe a imagem do DockerHub:

```sh
docker pull juancarllos88/search-beer:0.0.2
```

* Crie um contêiner com uma das formas abaixo.

a) contêiner em background:

```sh
docker run -d --name search-beer -p 3000:80 juancarllos88/search-beer:0.0.2
```

b) contêiner interativo:

```sh
docker run -i -t --name=search-beer -p 3000:80 juancarllos88/search-beer:0.0.2 /bin/bash
```


## Compile a imagem Docker a partir do DockerFile.

* Baixe o código do repositório Git.

```sh
https://github.com/juancarllos88/search-beer.git
```

```sh
cd search-beer
docker build -t juancarllos88/search-beer:0.0.2 .
```

## Referências:

https://docs.docker.com/engine/tutorials/dockerimages/

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

