# CLAUDE.md

Guia para sessões do Claude Code trabalhando neste repositório.

## O que este projeto é

Este é o **código-fonte real** da nova Landing Page do Clube das Profs (`https://clubedasprofs.com.br`) — diferente da pasta `../LP - Conteúdo e Planejamento`, que é só workspace de conteúdo/planejamento (PRD, copy, brand assets), sem build system e sem git.

Aqui SIM é um projeto de software normal: `git init`, `npm install`, build, testes, deploy — tudo isso é esperado e correto.

**Por que este projeto existe:** a LP atual roda dentro do WordPress/Flatsome (UX Builder), no mesmo domínio do WooCommerce, e isso está causando lentidão. A decisão tomada foi desacoplar a LP do WordPress: construir um site estático independente, hospedado na infraestrutura própria (Hetzner + Docker + Portainer), mantendo o checkout (WooCommerce + YITH) exatamente onde está hoje. O CTA de compra da LP só linka para o checkout existente — não substitui nada do backend.

## Estado atual do projeto

O scaffold está implementado e funcional: Astro + Tailwind (v4, via `@tailwindcss/vite` — ver nota abaixo), design tokens, componente `CtaButton`, e as 10 seções da LP já preenchidas com a copy de `CONTENT.md`. Assets de marca reais (fontes Montserrat Alternates + Rialto Script, ícones SVG de dor/benefício/garantia) já copiados. Comandos: `npm run dev`, `npm run build`, `npm run check` (typecheck via `astro check`).

**Nota Tailwind v4:** `@astrojs/tailwind` (integração clássica que `SPEC.md` originalmente assumia) está abandonado e incompatível com o Astro atual. O projeto usa Tailwind v4 via `@tailwindcss/vite`; `tailwind.config.mjs` continua sendo a fonte de `theme.extend` (cores/espaçamento/raios/fontes), carregado via `@config` em `src/styles/global.css`.

Fotos reais das Seções 4, 5, 6 e 10 já foram baixadas do site ao vivo em 2026-07-29 (ver `docs/reference/MEDIA-TODO.md`). Falta: uma imagem para o Hero (nunca existiu, nem no site atual — não é regressão), resolver as pendências marcadas em `## Decisões em aberto` abaixo, e configurar deploy (Dockerfile/Portainer ainda não existem).

## Leia primeiro, nesta ordem

1. **`PRD.md`** — o que construir e por quê (objetivos, público, escopo, critérios de aceite, decisões em aberto).
2. **`SPEC.md`** — como construir (stack, arquitetura, design tokens, performance, deploy).
3. **`CONTENT.md`** — a copy final de cada seção, já em texto limpo (não é preciso ler os `.txt` de shortcode Flatsome).
4. **`docs/reference/`** — cópias internas do style spec, do mapa de eventos GTM e do checklist de mídia, trazidas do workspace de planejamento. Este repo é autossuficiente: uma sessão de Claude Code aberta só nesta pasta tem tudo que precisa para construir a página, sem depender de acessar a pasta irmã.

## Fonte de verdade para conteúdo e marca

O conteúdo original foi produzido em `../LP - Conteúdo e Planejamento/` (fora deste repo) como planejamento para uma tentativa anterior dentro do Flatsome. Esse projeto não deu certo visualmente e por isso este repo existe. `CONTENT.md` e `docs/reference/` já trouxeram tudo que é necessário para o dia a dia do desenvolvimento — a pasta irmã só continua relevante para (a) o PRD original completo, como histórico, e (b) o protótipo abandonado em `theme-child-deploy/`, citado só como exemplo do que não fazer.

**Por que não juntamos as duas pastas num projeto só:** a pasta irmã carrega a biblioteca de marca inteira (todas as variações de logo em `.eps`, todas as fontes, o PDF de branding) e um protótipo abandonado — nada disso deveria entrar no histórico de git deste repo, que é pra ficar enxuto. A solução foi trazer para dentro apenas o que é necessário para construir (copiado, não referenciado por caminho externo), deixando a pasta irmã como arquivo/planejamento maior, que também serve outros assuntos além desta LP.

Assets de marca (fontes, ícones) já foram **copiados para dentro deste repo** a partir de `../LP - Conteúdo e Planejamento/brand/` — fontes em `public/fonts/`, ícones em `src/assets/icons/`. Faltam ainda: fotos reais (Hero, depoimentos, Prof Jaque) e os logos do rodapé. Ver `SPEC.md` §Assets para a lista.

## Decisões já tomadas (não reabrir sem motivo)

- Stack: Astro + Tailwind (build estático, zero/mínimo JS) — ver `SPEC.md` §Stack para justificativa.
- Checkout continua no WooCommerce existente (`https://clubedasprofs.com.br/?add-to-cart=17307`), sem mudança de gateway ou de motor de assinatura (YITH) neste projeto — isso é acompanhado à parte em `../Checkout/notas-integracao-hotmart.md`.
- Classes CSS dos 3 CTAs (`lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte`) devem ser preservadas literalmente no HTML novo — o contêiner GTM já existente será configurado (ou reaproveitado) em cima desses seletores. Trocar o nome da classe quebra a instrumentação de analytics.
- **Nexa Regular não pode ser usada em texto de página** — a licença não cobre esse uso. Substituta no `font-body`: **Poppins** (Google Fonts, OFL), self-hosted em `public/fonts/Poppins-Regular.woff2` — escolhida por comparação visual direta com a Nexa (mesmo desenho de "a"/"g" de história única, contadores circulares). O arquivo original da Nexa fica em `src/assets/fonts/Nexa-Regular.ttf` só como referência histórica, sem `@font-face`.

## Decisões em aberto (checar com a Jaque antes de travar)

- Domínio/subdomínio definitivo onde a LP vai morar (ver `PRD.md` §Infra).
- Qual reverse proxy já roda no Portainer (Traefik / Nginx Proxy Manager / nginx puro) — define como o container novo se conecta.
- ~~Confirmação da troca de foto nos depoimentos "Prof Rosa" / "Prof Maria Regina"~~ — **resolvido em 2026-07-29**: baixamos os prints reais do site ao vivo e conferimos o texto de cada um; o card já está com o print certo em ambos os casos, só o nome do arquivo original na biblioteca WP é que estava trocado. Ver `docs/reference/MEDIA-TODO.md` §Imagens de depoimento.
- Lastro legal do preço-âncora R$547 → R$447 (ver `CONTENT.md` §Seção 7).
- ~~Qual CNPJ deve aparecer no rodapé~~ — **resolvido em 2026-07-30**: a Jaque trouxe o cartão CNPJ oficial (`docs/reference/CARTÃO CNPJ 21-05-2026.pdf`, emitido pela Receita Federal em 21/05/2026). Razão social **JM Ecossistema Educacional Ltda**, CNPJ **45.549.347/0001-26**, situação ATIVA — substitui tanto o CNPJ antigo (40.235.494/0001-08) quanto o CNPJ de migração mencionado anteriormente (45.702.642/0001-70) e a razão social antiga ("Jaque Mendes JB Educa Ltda"). Já hardcodado no rodapé (`10-CtaFinal.astro`).

## Working in Portuguese

Todo o copy, nomes de arquivo e voz de marca são em português do Brasil. Comentários de código podem ser em português ou inglês, sem problema — mas texto voltado ao usuário final é sempre PT-BR.
