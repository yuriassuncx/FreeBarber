# BACK-END

## Entidades

### Barber

id
name
description
email
photoUrl
bannerUrl
typesOfCut
createdAt
contributors
followers

### Contributor

id
barberId -> references: [id]
name
description
email
age
photoUrl
weekDays
hourStart
hourEnd
isAvailable
createdAt


### User

id
name
photoUrl
description
age
createdAt

## Casos de uso

- Ordenar a listagem de barbearias por meio da sua data de criação
- Criação de uma nova barbearia e de um novo contribuidor
- Listagem de contribuidores por barbearia
- Listagem de usuário por barbearia
