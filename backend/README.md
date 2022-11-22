# BackEnd

A API contém endpoints referente a usuários, contas e transações.

### Endpoints

#### Usuários

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os usuários, exceto o usuário presente no token enviado na requisição | http://localhost:3001/user |
| `POST` | Realiza o login do usuário, retornando um token | http://localhost:3001/login |
| `POST` | Realiza o cadastro de um novo usuário, retornando um token | http://localhost:3001/register |

Nas requisições POST é necessário informar o seguinte JSON:

```
{
	"username": "lilipad",
	"password": "Pillow1234"
}
```

#### Conta

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna o número da conta e saldo do usuário | http://localhost:3001/account/:id |


#### Transações

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos (ou filtra) as transações que o usuário está presente | http://localhost:3001/filter?search=debit&date=2022-11-20 |
| `POST` | Criar uma nova transação monetária entre usuários (Cash-Out, Cash-In) | http://localhost:3001/transactions |

Na requisição POST é necessário informar o seguinte JSON:

```
{
	"debitedAccountId": 1,
	"creditedAccountId": 2,
	"value": 21.89
}
```

