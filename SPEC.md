# SPEC — Especificação técnica da nova LP (Clube das Profs)

Como construir o que o `PRD.md` define. Este documento é a referência de engenharia; `CONTENT.md` é a referência de copy.

## Stack

**Astro** gerando HTML/CSS estático, com **Tailwind CSS compilado no build** (não via CDN) e JavaScript mínimo (só onde é indispensável: acordeão do FAQ, disparo de eventos GTM). Justificativa: página única, focada em conversão, com metas agressivas de LCP/CLS/INP — um framework com hidratação de componente (React/Vue client-side) adicionaria peso sem benefício real aqui. Um gerador de site estático com componente por seção dá a mesma produtividade de desenvolvimento sem o custo de runtime.

Tailwind via CDN (como estava no protótipo anterior em `../LP - Conteúdo e Planejamento/theme-child-deploy/`) é aceitável só para rascunho local — nunca em produção: sem purge de classe não usada, e recompila no navegador a cada carregamento.

## Estrutura de pastas (proposta)

```
clube-lp-site/
├── docs/
│   └── reference/                 (cópias internas: STYLE-SPEC.md, GTM-EVENTS.md, MEDIA-TODO.md — trazidas do workspace de planejamento pra este repo ser autossuficiente)
├── src/
│   ├── components/
│   │   └── sections/
│   │       ├── 01-Hero.astro
│   │       ├── 02-Dores.astro
│   │       ├── 03-ComoFunciona.astro
│   │       ├── 04-Beneficios.astro
│   │       ├── 05-ProvaSocial.astro
│   │       ├── 06-Autoridade.astro
│   │       ├── 07-Oferta.astro
│   │       ├── 08-Garantia.astro
│   │       ├── 09-Faq.astro
│   │       └── 10-CtaFinal.astro
│   ├── components/ui/
│   │   └── CtaButton.astro        (componente único para os 3 CTAs — ver §Design tokens)
│   ├── styles/
│   │   └── tokens.css             (cores, tipografia, espaçamento — espelha STYLE-SPEC.md)
│   ├── assets/
│   │   ├── fonts/                 (copiar de ../LP - Conteúdo e Planejamento/brand/fonts/)
│   │   └── icons/                 (copiar os SVGs listados em MEDIA-TODO.md)
│   └── pages/
│       └── index.astro
├── public/
│   └── images/                    (imagens de depoimento, galeria, etc., otimizadas)
├── astro.config.mjs
├── tailwind.config.mjs
├── Dockerfile
└── package.json
```

## Design tokens

Fonte: `docs/reference/STYLE-SPEC.md` (cópia interna, já trazida do workspace de planejamento — não depende de acessar a outra pasta). Portar 1:1 para `tailwind.config.mjs` (theme.extend) e `src/styles/tokens.css` como CSS custom properties, para não haver duas fontes de verdade:

| Token | Hex |
|---|---|
| `clube-azul-escuro` | `#24224C` |
| `clube-azul-claro` | `#C0E3EB` |
| `clube-rosa` | `#DD60A0` |
| `clube-amarelo` | `#FFD055` |
| `clube-bege` | `#F9F3ED` |

Tipografia: Montserrat Alternates (títulos), Rialto Script (subtítulo decorativo pontual), Nexa Regular (corpo) — `@font-face` local, nunca substituir por Google Fonts equivalente (Rialto Script não tem equivalente gratuito). `font-display: swap` + `<link rel="preload">` nas 2 variantes críticas (Montserrat SemiBold + Nexa Regular) para não bloquear render do texto do Hero.

Espaçamento: grid de 8px (`space-xs` 8 até `space-3xl` 96 — ver STYLE-SPEC.md §3 para a tabela completa).

## Componente de CTA — regra de identidade única

Os três CTAs da LP (primário, secundário, suporte) devem nascer de um único componente `<CtaButton variant="primary|secondary|support">`, não de HTML duplicado em cada seção — é a única forma de garantir na prática a regra do STYLE-SPEC.md §6 ("os três CTAs são as únicas assinaturas de botão da LP").

**Preservar literalmente as classes CSS** já usadas na versão Flatsome (`lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte`) como classe adicional no componente, além do que o Tailwind gerar — o GTM já tem (ou vai ter) triggers configurados em cima desses seletores (ver `docs/reference/GTM-EVENTS.md`). Trocar o nome quebra a instrumentação sem necessidade.

## Imagens

- Formato: WebP (qualidade 80) ou AVIF; PNG transparente só para ícones com transparência crítica.
- Densidade: exportar 2x para retina.
- Usar `<Image>` do Astro (ou `astro:assets`) para gerar `srcset` responsivo automaticamente e forçar `width`/`height` explícitos (evita CLS).
- Lazy-load em tudo abaixo da dobra; a imagem do Hero é a única com `loading="eager"` / `fetchpriority="high"` (candidata a LCP).
- Naming: manter o prefixo `lp-clube-` já estabelecido em `MEDIA-TODO.md`.

## Acessibilidade

- HTML semântico (`<section>`, `<h1>`–`<h3>` em hierarquia única, `<button>`/`<a>` conforme a ação).
- Conferir contraste WCAG AA nos pares de cor da marca — rosa (`#DD60A0`) sobre bege (`#F9F3ED`) é o par mais arriscado, testar antes de usar como texto (não só como acento/ícone).
- Acordeão do FAQ navegável por teclado (`aria-expanded`, `aria-controls`) — não depender só de clique de mouse.
- `prefers-reduced-motion`: desativar a animação `bounceIn` do CTA para quem tiver a preferência ativada no sistema.
- Depoimentos em print de tela (Seção 5) precisam de transcrição textual visualmente oculta (`.sr-only`) do conteúdo do depoimento — hoje só têm alt genérico ("Depoimento da Prof X"), que não é acessível nem indexável.

## SEO

- Um único `<h1>` (Hero).
- Meta title/description orientados a intenção de compra.
- Open Graph tags (imagem, título, descrição) para compartilhamento.
- FAQPage JSON-LD gerado a partir do conteúdo de `CONTENT.md` §Seção 9 (schema markup, não just visual accordion).
- `sitemap.xml` e `robots.txt` mínimos (mesmo sendo página única, facilita indexação futura se a LP crescer).

## Performance — como validar

Metas do PRD (§9.1): LCP < 2,5s, CLS < 0,1, INP < 200ms, medidos em condições reais de mobile (não confiar só em Lighthouse local/desktop). Sugestão: Lighthouse CI no pipeline de build como gate automático, e teste manual em campo (PageSpeed Insights ou WebPageTest) pós-deploy antes de considerar a Fase 1 do PRD "pronta".

## Analytics

`docs/reference/GTM-EVENTS.md` (já copiado para dentro deste repo) é a especificação de eventos válida para este projeto — os seletores CSS lá descritos (`.lp-clube-button`, `#clube-valor`, `.lp-clube-sec12-accordion .accordion-title`, etc.) precisam existir literalmente no HTML novo. Não recriar os triggers do zero no GTM se os seletores baterem — só validar em modo Preview.

**Cross-domain:** como esta LP roda num (sub)domínio possivelmente diferente do checkout WooCommerce, configurar em GA4 (Admin → Data Streams → Configure tag settings → Configure your domains) a lista de domínios que devem ser tratados como a mesma sessão. Sem isso, `view_lp` e `begin_checkout`/`purchase` aparecem como sessões desconectadas.

## Deploy

- **Dockerfile multi-stage:** stage 1 builda o site estático (`npm run build` → `dist/`), stage 2 serve via nginx (imagem `nginx:alpine`, copiando só `dist/` — imagem final pequena).
- **Integração com Portainer:** adicionar como novo serviço no stack/compose existente, atrás do reverse proxy já em uso (Traefik ou Nginx Proxy Manager — **confirmar qual**, ver `PRD.md` §8 "em aberto").
- **SSL:** certificado via Let's Encrypt, provisionado pelo próprio reverse proxy (padrão em ambos Traefik e NPM).
- **Build/CI:** para o volume desta LP (site único, deploy pouco frequente), um pipeline simples é suficiente — `git push` → build local ou em CI leve → `docker build` + `docker compose up -d` no servidor. Não é necessário Kubernetes nem CI corporativo para este escopo.

## Assets a copiar de `../LP - Conteúdo e Planejamento/brand/` no setup inicial

- `fonts/MontserratAlternates-Regular.ttf`, `-SemiBold.ttf`
- `fonts/Nexa-Regular.ttf`
- `fonts/rialtoscript-regular.ttf`
- Ícones SVG listados em `docs/reference/MEDIA-TODO.md` (dor-*.svg, beneficio-*.svg, selo-garantia-7-dias.svg) — os que já existem hospedados na Kinsta podem ser baixados de lá; os que ainda são pendentes seguem como produção independente deste repo.
- Logos do rodapé (versões PNG referenciadas pelos IDs `20908`/`21312` no Flatsome — baixar da biblioteca WP da Kinsta e salvar aqui com nome descritivo).
