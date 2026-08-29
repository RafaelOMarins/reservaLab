# ReservaLab — Frontend (Next.js)

## Como rodar

1. Extraia esta pasta.
2. Abra um terminal dentro dela e rode:

```
npm install
npm run dev
```

3. Acesse **http://localhost:3000**

O backend Spring Boot precisa estar rodando em `http://localhost:8080` (é pra onde o frontend manda as requisições).

## Passo obrigatório no backend: liberar CORS

Por padrão, o navegador bloqueia o frontend (rodando em `localhost:3000`) de chamar o backend (`localhost:8080`), porque são "origens" diferentes. Sem isso, toda requisição vai falhar silenciosamente com erro de CORS no console do navegador.

Crie esse arquivo no seu projeto Spring Boot, em `src/main/java/.../config/CorsConfig.java`:

```java
package com.rafaelMarins.reservaLab.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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

**Importante:** o `.allowedHeaders("*")` é necessário agora porque o frontend manda o header customizado `Authorization` (o token) em várias requisições — sem isso, o navegador bloqueia essas chamadas mesmo com CORS liberado pros métodos.

Reinicie o backend depois de adicionar/ajustar isso.

## Fluxo de autenticação

- Login (`/login`) e Registro (`/registro`) guardam o usuário + token retornados pelo backend no `localStorage` do navegador.
- Toda requisição de criar/deletar reserva, e deletar usuário/laboratório, manda esse token no header `Authorization`.
- Quem não está logado não vê o formulário de criar reserva.
- Botões de excluir (usuários, laboratórios, reservas) só aparecem pra quem tem `role: "ADMIN"` guardado na sessão local.
- "Sair" limpa o `localStorage` e redireciona pro login.

## Estrutura

- `/laboratorios` — CRUD de laboratórios
- `/usuarios` — CRUD de usuários (professores/admin)
- `/reservas` — Criação de reservas, escolhendo professor + laboratório + data/horário

## Rotas da API que o frontend espera

- `GET/POST /laboratorios`, `PUT/DELETE /laboratorios/{id}`
- `GET/POST /usuario`, `PUT/DELETE /usuario/{id}`
- `GET/POST /reserva`, `DELETE /reserva/{id}`

Se você renomeou alguma dessas rotas no Controller, ajuste em `lib/api.js`.
