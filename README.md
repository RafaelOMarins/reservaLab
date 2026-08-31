# 📚 ReservaLab

Sistema web para reserva de laboratórios de informática para fins didáticos. Professores agendam o uso de um laboratório por data e horário, evitando conflitos de agenda, enquanto administradores gerenciam usuários, laboratórios e reservas.

Projeto desenvolvido como estudo prático de desenvolvimento backend com **Java + Spring Boot**, com frontend em **Next.js** consumindo a API.

---

## ✨ Funcionalidades

- Cadastro e login de usuários (professores e administradores)
- Autenticação via token
- CRUD de laboratórios
- CRUD de reservas, com **validação automática de conflito de horário** (não é possível reservar o mesmo laboratório em horários sobrepostos)
- Controle de permissões por perfil — apenas administradores podem excluir usuários, laboratórios e cancelar reservas de terceiros
- Cada reserva é automaticamente associada ao professor autenticado (via token), sem depender de dados informados manualmente pelo cliente

## 🛠️ Tecnologias

**Backend**
- Java
- Spring Boot (Web, Data JPA, Validation)
- MySQL
- Maven

**Frontend**
- Next.js (App Router)
- React

## 🗂️ Modelo de dados

| Entidade | Descrição |
|---|---|
| `Usuario` | Professores e administradores (`role`: `PROFESSOR` ou `ADMIN`) |
| `Laboratorio` | Laboratórios disponíveis para reserva |
| `Reserva` | Agendamento de um laboratório por um professor, em uma data/horário específico |

## 🚀 Como rodar o projeto

### Pré-requisitos

- Java 17+
- Maven
- MySQL rodando localmente
- Node.js 18+ (para o frontend)

### Backend

1. Crie o banco de dados:
```sql
CREATE DATABASE reserva_lab_db;
```

2. Configure `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/reserva_lab_db
spring.datasource.username=root
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Rode a aplicação (pela IDE ou via terminal):
```bash
mvn spring-boot:run
```

O backend sobe em `http://localhost:8080`.

### Frontend

1. Instale as dependências:
```bash
cd reserva-lab-frontend
npm install
```

2. Rode em modo de desenvolvimento:
```bash
npm run dev
```

O frontend sobe em `http://localhost:3000`.

> **Importante:** o backend precisa liberar CORS para `http://localhost:3000`, incluindo o header customizado `Authorization` usado para autenticação. Veja a configuração necessária em [`CorsConfig`](#configuração-de-cors).

## 📡 Endpoints principais

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/registro` | — | Cria um novo usuário |
| POST | `/auth/login` | — | Autentica e retorna token |
| GET | `/auth/me` | Token | Retorna dados do usuário autenticado |
| GET | `/laboratorios` | — | Lista laboratórios |
| POST | `/laboratorios` | — | Cria laboratório |
| DELETE | `/laboratorios/{id}` | Token (Admin) | Remove laboratório |
| GET | `/usuario` | Token (Admin) | Lista usuários |
| DELETE | `/usuario/{id}` | Token (Admin) | Remove usuário |
| GET | `/reserva` | — | Lista reservas |
| POST | `/reserva` | Token | Cria reserva (professor identificado pelo token) |
| DELETE | `/reserva/{id}` | Token (Admin) | Cancela reserva |

## 🔒 Autenticação

Ao fazer login, a API retorna um token que deve ser enviado no header `Authorization` em todas as rotas protegidas:

```
Authorization: <token>
```

## ⚙️ Configuração de CORS

Necessária para o frontend (`localhost:3000`) se comunicar com o backend (`localhost:8080`):

```java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
```

## 📁 Estrutura do projeto

```
reservaLab/
├── src/main/java/.../
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
└── src/main/resources/
    └── application.properties

reserva-lab-frontend/
├── app/
│   ├── laboratorios/
│   ├── usuarios/
│   ├── reservas/
│   ├── login/
│   └── registro/
└── lib/
    ├── api.js
    └── auth.js
```

## 🧩 Possíveis evoluções futuras

- [ ] Migrar autenticação para JWT
- [ ] Criptografar senha dos usuários (BCrypt)
- [ ] Adicionar testes automatizados
- [ ] Paginação nas listagens

## 📄 Licença

Projeto de estudo, sem licença comercial definida.
