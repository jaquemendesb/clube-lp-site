# PRD — Nova Landing Page do Clube das Profs (codebase independente)

Este documento substitui, para efeitos de implementação, o PRD original produzido em `../LP - Conteúdo e Planejamento/PRD-LP-Clube-das-Profs.md`. O PRD original foi escrito para uma implementação dentro do Flatsome/UX Builder; essa tentativa não funcionou bem visualmente, e a decisão atual é construir a LP como um site independente, fora do WordPress. Objetivos, público, copy e KPIs continuam os mesmos — o que muda é escopo técnico e infraestrutura.

## 1) Visão geral

Nova Landing Page do Clube das Profs (`https://clubedasprofs.com.br`), construída como aplicação estática independente, hospedada fora do WordPress, com o único objetivo de aumentar a conversão para a assinatura anual do Clube.

Contexto do negócio (inalterado): Clube das Profs é assinatura anual da Prof Jaque Mendes (Jaque Mendes JB Educa Ltda) para professoras do Ensino Fundamental I (1º ao 5º ano), com acesso a recursos pedagógicos, atualizações semanais e comunidade no WhatsApp.

## 2) O que mudou em relação ao PRD original

| Tópico | PRD original (Flatsome) | Este projeto |
|---|---|---|
| Onde a LP roda | Dentro do WordPress, tema Flatsome, editor UX Builder | Site estático independente, fora do WordPress |
| Hospedagem | Kinsta (mesma do WooCommerce) | Infraestrutura própria (Hetzner + Docker + Portainer) |
| Como se edita | Shortcode colado no UX Builder | Código versionado em git, componentes reais |
| Escopo de checkout/gateway | Fora de escopo | Continua fora de escopo — checkout, gateway (Pagar.me) e motor de assinatura (YITH) não mudam |
| Domínio | Mesmo domínio do WooCommerce | A definir — provavelmente subdomínio novo numa primeira fase (ver §8) |

## 3) Público-alvo e dores

Sem alteração em relação ao PRD original: professoras do Fundamental I (1º ao 5º ano), rotina sobrecarregada, precisam de material pronto e eficaz, turmas desniveladas, tempo de planejamento escasso.

## 4) Posicionamento e mensagem

**Proposta de valor:** "A assinatura anual que entrega recursos pedagógicos prontos, criativos e eficazes para professoras do Fundamental I, com atualizações semanais, projetos exclusivos e comunidade de apoio."

**Pilares:** praticidade, resultado, confiança, continuidade (atualização constante).

**Tom de voz:** próximo, acolhedor, claro, confiante. Ver `CONTENT.md` para a copy já escrita seção a seção — não é preciso reescrever do zero.

## 5) Escopo

### 5.1 Incluído

- Construção do site estático com as 10 seções definidas em §7.
- Instrumentação de analytics conforme `docs/reference/GTM-EVENTS.md` (mesmo contêiner GTM, adaptado para cross-domain — ver §8).
- Performance conforme metas em §9.
- SEO/schema conforme §9.2.
- Deploy em container Docker na infraestrutura Hetzner/Portainer existente.

### 5.2 Fora de escopo (deste projeto)

- Redesenho do checkout WooCommerce ou troca de gateway de pagamento (Pagar.me/Vindi/Hotmart) — acompanhado à parte em `../Checkout/notas-integracao-hotmart.md`.
- Mudanças no YITH WooCommerce Subscription ou no fluxo de acesso/membership.
- Migração de domínio do WordPress em si (tratada como projeto de infra separado, ver §8).

## 6) Hipóteses de conversão

1. Hero com benefício + público + CTA + prova social imediatos aumenta clique no CTA principal.
2. Reduzir redundância visual e aumentar escaneabilidade reduz tempo até decisão.
3. Preço + garantia + FAQ próximos do CTA final aumentam conversão no checkout.
4. Página mais rápida (fora do WordPress/Flatsome) reduz rejeição e aumenta CVR.

## 7) Arquitetura das seções

Mesma estrutura de 10 seções do PRD original — copy final em `CONTENT.md`:

1. Hero de conversão (2 variantes de headline — Teste A)
2. Problema / identificação (5 dores)
3. Solução / como funciona (3 passos)
4. O que está incluso (6 categorias + CTA intermediário)
5. Prova social (números + depoimentos + galeria)
6. Autoridade da criadora (Prof Jaque)
7. Oferta e preço (2 variantes de destaque — Teste B)
8. Garantia (7 dias incondicional, CDC art. 49)
9. FAQ (com schema JSON-LD)
10. CTA final + suporte + rodapé

## 8) Infraestrutura e domínio

Decisão de rollout em duas fases:

**Fase 1 (agora):** domínio principal (`clubedasprofs.com.br`) permanece no WordPress/Kinsta, intocado. Novo subdomínio (a definir, ex. `lp.clubedasprofs.com.br`) recebe a LP nova, rodando em container próprio na infra Hetzner/Portainer. CTAs da LP linkam para o checkout no domínio principal, sem nenhuma mudança lá.

**Fase 2 (após validação):** possível virada — domínio raiz passa a apontar para a LP, e o WordPress se muda para um subdomínio próprio. Isso exige (a) mudança de `siteurl`/`home` do WP + search-replace de URLs absolutas no banco (mídia, links de checkout hoje hardcoded com domínio raiz), (b) redirects 301 do domínio raiz para o novo subdomínio do WP, preservando SEO e links de login salvos por assinantes. Fase 2 não é escopo de desenvolvimento deste repo — é projeto de infra/migração à parte, só mencionado aqui para contexto.

**Em aberto:** domínio/subdomínio exato da Fase 1, e qual reverse proxy já roda no Portainer (Traefik / Nginx Proxy Manager / nginx puro) — isso define como o container desta LP se conecta sem conflito.

**Analytics cross-domain:** como a LP (Fase 1) roda em domínio diferente do checkout, o GA4 precisa de cross-domain measurement configurado entre os dois domínios, para não perder a continuidade de `begin_checkout`/`purchase` na jornada.

## 9) Requisitos não funcionais

### 9.1 Performance (mobile, principalmente)

- LCP < 2,5s
- CLS < 0,1
- INP < 200ms

### 9.2 SEO e semântica

- Um único H1 por página.
- H2/H3 organizados por seção.
- Meta title/description orientados a intenção de compra.
- FAQPage JSON-LD ativo (conteúdo em `CONTENT.md` §Seção 9).
- Texto alternativo em todas as imagens principais.

## 10) Medição e KPIs

Ver `docs/reference/GTM-EVENTS.md` para o mapa completo de eventos, triggers e parâmetros GA4 — já copiado para dentro deste repo, adaptando os seletores para o HTML novo (mantendo as mesmas classes CSS, ver `CLAUDE.md`).

KPIs principais: CVR LP → checkout, CVR checkout → compra, CTR por posição de CTA (topo/meio/fundo), taxa de rejeição, tempo médio na página, receita por sessão.

## 11) Testes A/B

**Teste A (Hero):** variante A1 "economia de tempo" vs. A2 "engajamento dos alunos". Sucesso: mais `click_cta_top` e `begin_checkout`.

**Teste B (Oferta):** variante B1 (destaque na parcela 12x) vs. B2 (destaque no valor total à vista). Sucesso: mais `click_cta_bottom` e `purchase`.

## 12) Critérios de aceite

1. As 10 seções publicadas conforme `CONTENT.md`, com as duas variantes de Hero e de Oferta implementadas (mesmo que uma comece desativada).
2. Metas de performance (§9.1) validadas em produção, mobile real (não só Lighthouse local).
3. Eventos de analytics disparando corretamente (ver checklist em `GTM-EVENTS.md` §5).
4. FAQ schema validado (Google Rich Results Test).
5. CTA de checkout funcionando de ponta a ponta (LP → WooCommerce → confirmação).
6. Nenhuma quebra no fluxo de assinatura WooCommerce + YITH (nada muda lá, mas o link precisa ser testado).
7. Itens da lista de decisões em aberto (`CLAUDE.md`) resolvidos antes do go-live definitivo (Fase 2 fica de fora — só a Fase 1 precisa estar resolvida).

## 13) Riscos e mitigações

- Risco: depoimento com foto/nome trocado (Seção 5) vai ao ar por engano. Mitigação: bloquear publicação dessa seção até confirmação explícita da Jaque (ver `CONTENT.md`).
- Risco: preço-âncora R$547 sem lastro documentado configura prática enganosa (CDC). Mitigação: confirmar e documentar antes do go-live (ver `CONTENT.md` §Seção 7).
- Risco: cross-domain analytics mal configurado quebra funil de conversão medido. Mitigação: validar em GA4 Realtime antes de considerar a Fase 1 completa.
- Risco: rodapé com CNPJ desatualizado por causa da migração em andamento. Mitigação: confirmar CNPJ vigente antes do go-live.
