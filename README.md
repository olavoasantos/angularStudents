# Students

Sistema de gerenciamento de alunos

## Front-end

+ Angular 5
+ Tailwind Css
+ Font-awesome

## Back-end

+ Laravel Lumen (PHP/MySQL)

## Instalação

### Front-end

Na pasta `./front-end`, instale as dependências utilizando:

```
npm install
```

Inicie o servidor, utilizando:

```
npm run start
```

Você poderá acessar o site através do endereço `localhost:4200`.

### Back-end

Na pasta `./back-end`, configure suas variáveis de ambiente no arquivo `.env` assinalando os dados de acesso ao banco de dados.

Em seguida, rode as `migrations` utilizando o comando:

```
php artisan migrate
```

Por fim, inicie o servidor do back-end pelo comando:

```
php -S localhost:7000 -t public
```

> __IMPORTANTE!!__ Utilize `localhost:7000` pois o front-end està configurado para esse endereço.

## Autor

[Olavo Amorim Santos](https://github.com/olavoasantos/)
