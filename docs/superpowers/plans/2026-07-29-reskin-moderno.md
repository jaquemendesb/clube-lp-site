# Reskin Visual Moderno — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar o padrão visual moderno descrito em `docs/superpowers/specs/2026-07-29-reskin-moderno-design.md` (inspirado em `docs/reference/método LP.png` e `docs/reference/canva LP.png`) às 10 seções existentes da LP e ao componente `CtaButton`, sem mudar copy, ordem de seções, paleta de cor ou nomes de classe de instrumentação.

**Architecture:** Cada seção Astro (`src/components/sections/0N-*.astro`) e o componente `src/components/ui/CtaButton.astro` são editados isoladamente — só classes Tailwind mudam (raio de borda, sombra, fundo, novos wrappers de badge circular). Nenhuma estrutura de dados (`const` arrays no frontmatter) muda. Nenhum JS novo é adicionado; transições usam o variant `motion-safe:` do Tailwind, que já implementa `prefers-reduced-motion` nativamente (equivalente ao `@media (prefers-reduced-motion: no-preference)`).

**Tech Stack:** Astro 5 + Tailwind v4 (via `@tailwindcss/vite`), sem dependências novas.

## Global Constraints

- Não mudar as 3 classes legadas de CTA: `lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte` (CLAUDE.md §Decisões já tomadas).
- Não mudar as classes de instrumentação do FAQ: `lp-clube-sec12-accordion`, `.accordion-title`, `.accordion-icon`, `.accordion-panel` (`09-Faq.astro` comentário de topo, GTM-EVENTS.md evento `faq_open`).
- Não mudar `id="beneficios"`, `id="clube-valor"`, `id="fechamento-cta"` (âncoras/eventos GTM existentes).
- Não introduzir cor fora da paleta já definida em `tailwind.config.mjs` (`clube-azul-escuro`, `clube-azul-claro`, `clube-rosa`, `clube-amarelo`, `clube-bege`, `clube-branco`).
- Não mudar texto/copy de nenhuma seção — só classes/wrappers de markup.
- Não há suite de testes automatizados de UI neste projeto (só `npm run check` para typecheck via `astro check`, e `npm run build` para build estático). Cada task verifica via esses dois comandos + inspeção visual manual com `npm run dev`, em vez de testes unitários.
- Elementos de "chip"/badge com texto de frase longa (não single-line) usam `rounded-radius-xl` (soft card), não `rounded-full` — pílula literal só é usada em elementos curtos (botões, números, ícones, badges de 2-4 palavras). Essa é uma correção de implementação sobre a spec (que generalizava "vira pílula"): em `06-Autoridade.astro` e `08-Garantia.astro` os selos têm frases longas que quebram em 2+ linhas, então usam `rounded-radius-xl` em vez de `rounded-full` para não deformar a caixa.

---

### Task 1: CtaButton — botões em pílula

**Files:**
- Modify: `src/components/ui/CtaButton.astro:19-26`

**Interfaces:**
- Consumes: nada (componente folha)
- Produces: `variantClass['primary'|'secondary'|'support']` — usado por todas as 10 seções que importam `CtaButton`. Nenhuma prop nova é adicionada; a interface `Props` não muda.

- [ ] **Step 1: Editar `variantClass` em `CtaButton.astro`**

Substituir o bloco (linhas 19-26):

```astro
const variantClass: Record<Props['variant'], string> = {
  primary:
    'inline-block bg-clube-amarelo text-clube-azul-escuro font-heading font-semibold text-lg px-space-lg py-space-sm rounded-radius-md',
  secondary:
    'inline-block text-clube-azul-escuro font-body underline underline-offset-4',
  support:
    'inline-block border border-clube-branco text-clube-branco font-body px-space-md py-space-xs rounded-radius-md',
};
```

por:

```astro
const variantClass: Record<Props['variant'], string> = {
  primary:
    'inline-block bg-clube-amarelo text-clube-azul-escuro font-heading font-semibold text-lg px-space-lg py-space-sm rounded-full shadow-md motion-safe:transition-transform motion-safe:hover:scale-105',
  secondary:
    'inline-block text-clube-azul-escuro font-body underline underline-offset-4 motion-safe:transition-colors motion-safe:hover:text-clube-rosa',
  support:
    'inline-block border border-clube-branco text-clube-branco font-body px-space-md py-space-xs rounded-full shadow-md motion-safe:transition-transform motion-safe:hover:scale-105',
};
```

(`secondary` continua sendo um link de texto sublinhado — não vira pílula porque nunca teve forma de botão; ganha só uma transição de cor no hover.)

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:4321/`, checar o botão "Quero entrar no Clube agora" no Hero (seção 1): deve estar em formato de pílula (bordas totalmente arredondadas), com sombra, e crescer levemente ao passar o mouse.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CtaButton.astro
git commit -m "style: botoes CTA em formato pilula com sombra e hover"
```

---

### Task 2: Seção 1 (Hero) — gradiente e imagem com blob decorativo

**Files:**
- Modify: `src/components/sections/01-Hero.astro:10-32`

**Interfaces:**
- Consumes: `CtaButton` (Task 1)
- Produces: nada consumido por outras seções

- [ ] **Step 1: Adicionar gradiente de fundo à section**

Substituir (linha 10):

```astro
<section class="HERO-PC-A1 py-[40px] md:py-[60px]">
```

por:

```astro
<section class="HERO-PC-A1 py-[40px] md:py-[60px] bg-gradient-to-b from-clube-bege to-clube-branco">
```

- [ ] **Step 2: Envolver o placeholder de imagem com blob decorativo**

Substituir (linhas 30-32):

```astro
    <!-- Imagem pendente (docs/reference/MEDIA-TODO.md: "Hero — banner lateral"). Placeholder
         reserva o espaço (evita CLS) até o asset real ser copiado para public/images/. -->
    <div class="aspect-[4/3] w-full rounded-radius-lg bg-clube-azul-claro" role="img" aria-label="Prof Jaque apresentando o Clube das Profs"></div>
```

por:

```astro
    <!-- Imagem pendente (docs/reference/MEDIA-TODO.md: "Hero — banner lateral"). Placeholder
         reserva o espaço (evita CLS) até o asset real ser copiado para public/images/. -->
    <div class="relative">
      <div class="absolute -top-6 -right-6 -z-10 h-40 w-40 rounded-full bg-clube-amarelo/20" aria-hidden="true"></div>
      <div class="aspect-[4/3] w-full rounded-radius-xl shadow-lg bg-clube-azul-claro" role="img" aria-label="Prof Jaque apresentando o Clube das Profs"></div>
    </div>
```

- [ ] **Step 3: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:4321/`. Confirmar: fundo da seção 1 tem gradiente sutil de bege para branco; o placeholder de imagem tem cantos bem arredondados, sombra, e um círculo amarelo translúcido parcialmente atrás dele no canto superior direito.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/01-Hero.astro
git commit -m "style: gradiente e blob decorativo na secao Hero"
```

---

### Task 3: Seção 2 (Dores) — badges circulares e fundo bege

**Files:**
- Modify: `src/components/sections/02-Dores.astro:18-26`

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Fundo da seção**

Substituir (linha 18):

```astro
<section class="py-[40px] md:py-[60px]">
```

por:

```astro
<section class="py-[40px] md:py-[60px] bg-clube-bege">
```

- [ ] **Step 2: Ícone em badge circular dentro do card**

Substituir (linhas 26-29):

```astro
        <div class="bg-clube-branco rounded-radius-lg shadow-sm p-space-md text-center">
          <img src={dor.icon.src} width="48" height="48" alt="" class="mx-auto" />
          <p class="mt-space-sm font-body text-clube-azul-escuro"><strong>{dor.forte}</strong> {dor.resto}</p>
        </div>
```

por:

```astro
        <div class="bg-clube-branco rounded-radius-xl shadow-md p-space-md text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clube-rosa/15">
            <img src={dor.icon.src} width="28" height="28" alt="" />
          </div>
          <p class="mt-space-sm font-body text-clube-azul-escuro"><strong>{dor.forte}</strong> {dor.resto}</p>
        </div>
```

- [ ] **Step 3: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, rolar até a seção "Se você sente isso no dia a dia da sala de aula...". Confirmar: fundo da seção em tom bege, os 5 ícones de dor agora estão dentro de um círculo rosa claro, cards com cantos mais arredondados e sombra mais visível.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/02-Dores.astro
git commit -m "style: badges circulares e fundo bege na secao Dores"
```

---

### Task 4: Seção 3 (Como Funciona) — numeração em badge e fundo azul claro

**Files:**
- Modify: `src/components/sections/03-ComoFunciona.astro:19-34`

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Fundo da seção**

Substituir (linha 19):

```astro
<section class="py-[40px] md:py-[60px]">
```

por:

```astro
<section class="py-[40px] md:py-[60px] bg-clube-azul-claro/10">
```

- [ ] **Step 2: Número do passo em badge circular preenchido**

Substituir (linhas 27-33):

```astro
      {passos.map((passo, i) => (
        <div class="text-center">
          <span class="font-heading font-semibold text-4xl text-clube-rosa">{String(i + 1).padStart(2, '0')}</span>
          <h3 class="mt-space-xs font-heading text-lg text-clube-azul-escuro">{passo.titulo}</h3>
          <p class="mt-space-xs font-body text-clube-azul-escuro">{passo.texto}</p>
        </div>
      ))}
```

por:

```astro
      {passos.map((passo, i) => (
        <div class="text-center">
          <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clube-rosa font-heading font-semibold text-xl text-clube-branco">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 class="mt-space-sm font-heading text-lg text-clube-azul-escuro">{passo.titulo}</h3>
          <p class="mt-space-xs font-body text-clube-azul-escuro">{passo.texto}</p>
        </div>
      ))}
```

- [ ] **Step 3: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, rolar até "Em 3 passos simples...". Confirmar: fundo levemente azulado, números 01/02/03 dentro de círculos rosa preenchidos com texto branco.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/03-ComoFunciona.astro
git commit -m "style: numeracao em badge circular na secao Como Funciona"
```

---

### Task 5: Seção 4 (Benefícios) — cards padronizados

**Files:**
- Modify: `src/components/sections/04-Beneficios.astro:75`

**Interfaces:**
- Consumes: `CtaButton` (Task 1)
- Produces: nada

- [ ] **Step 1: Padronizar raio e sombra do card**

Substituir (linha 75):

```astro
        <div class="rounded-radius-lg shadow-sm overflow-hidden bg-clube-bege">
```

por:

```astro
        <div class="rounded-radius-xl shadow-md motion-safe:transition-shadow motion-safe:hover:shadow-lg overflow-hidden bg-clube-bege">
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, rolar até "Tudo o que você recebe ao entrar no Clube das Profs". Confirmar: os 6 cards têm cantos mais arredondados, sombra mais visível, e sombra cresce ao passar o mouse.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/04-Beneficios.astro
git commit -m "style: padronizar raio e sombra dos cards de beneficios"
```

---

### Task 6: Seção 5 (Prova Social) — fundo bege e cards padronizados

**Files:**
- Modify: `src/components/sections/05-ProvaSocial.astro:54,63,72`

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Fundo da seção**

Substituir (linha 54):

```astro
<section class="py-[40px] md:py-[60px]">
```

por:

```astro
<section class="py-[40px] md:py-[60px] bg-clube-bege">
```

- [ ] **Step 2: Padronizar cards de estatística**

Substituir (linha 63):

```astro
        <div class="text-center rounded-radius-md shadow-sm p-space-md bg-clube-branco">
```

por:

```astro
        <div class="text-center rounded-radius-xl shadow-md p-space-md bg-clube-branco">
```

- [ ] **Step 3: Padronizar cards de depoimento**

Substituir (linha 72):

```astro
        <div class="rounded-radius-lg shadow-md bg-clube-branco p-space-md">
```

por:

```astro
        <div class="rounded-radius-xl shadow-md bg-clube-branco p-space-md">
```

- [ ] **Step 4: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`, rolar até "Uma comunidade de profs que já transformou suas aulas". Confirmar: fundo bege na seção, cards de estatística e depoimento com o mesmo raio de borda arredondado (25px) usado nas outras seções.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/05-ProvaSocial.astro
git commit -m "style: fundo bege e cards padronizados na Prova Social"
```

---

### Task 7: Seção 6 (Autoridade) — selos em card suave

**Files:**
- Modify: `src/components/sections/06-Autoridade.astro:39`

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Trocar raio do chip de selo**

Substituir (linha 39):

```astro
          <div class="rounded-radius-md bg-clube-azul-claro/10 p-space-sm">
```

por:

```astro
          <div class="rounded-radius-xl bg-clube-azul-claro/10 p-space-md">
```

(Ver nota em Global Constraints: `rounded-full` não é usado aqui porque o texto do selo é uma frase longa que quebra em 2 linhas — um raio de 25px mantém a estética arredondada sem deformar a caixa.)

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, rolar até "Prof Jaque Mendes". Confirmar: os 3 selos (🎓/👩‍🏫/✏️) têm cantos mais arredondados e um pouco mais de respiro interno.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/06-Autoridade.astro
git commit -m "style: selos com raio de borda maior na secao Autoridade"
```

---

### Task 8: Seção 7 (Oferta) — checklist com badge e preço em destaque

**Files:**
- Modify: `src/components/sections/07-Oferta.astro:38-45,51-53`

**Interfaces:**
- Consumes: `CtaButton` (Task 1)
- Produces: nada

- [ ] **Step 1: Checklist com ✓ em badge circular**

Substituir (linhas 38-45):

```astro
    <ul class="mt-space-lg grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
      {itens.map((item) => (
        <li class="font-body text-clube-azul-claro flex items-start gap-space-xs">
          <span aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
```

por:

```astro
    <ul class="mt-space-lg grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
      {itens.map((item) => (
        <li class="font-body text-clube-azul-claro flex items-start gap-space-sm">
          <span aria-hidden="true" class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clube-amarelo text-sm font-bold text-clube-azul-escuro">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
```

- [ ] **Step 2: Preço final em destaque maior**

Substituir (linhas 51-53):

```astro
      <p class="mt-space-xs font-heading font-semibold text-3xl md:text-4xl text-clube-azul-escuro">
        12x de R$ 44,70
      </p>
```

por:

```astro
      <p class="mt-space-xs font-heading font-semibold text-4xl md:text-5xl text-clube-azul-escuro">
        12x de R$ 44,70
      </p>
```

- [ ] **Step 3: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, rolar até "Você recebe tudo isso por 1 ano". Confirmar: cada item da lista tem um ✓ dentro de um círculo amarelo; o preço "12x de R$ 44,70" está visivelmente maior que antes.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/07-Oferta.astro
git commit -m "style: checklist com badge e preco em destaque na secao Oferta"
```

---

### Task 9: Seção 8 (Garantia) — fundo amarelo claro e selo com círculo

**Files:**
- Modify: `src/components/sections/08-Garantia.astro:12-14,23-27`

**Interfaces:**
- Consumes: nada
- Produces: nada

- [ ] **Step 1: Fundo da seção e ícone dentro de círculo**

Substituir (linhas 12-14):

```astro
<section class="py-[40px] md:py-[60px]">
  <div class="max-w-3xl mx-auto px-space-md text-center">
    <img src={iconSelo.src} width="96" height="96" alt="Selo de 7 dias de garantia" class="mx-auto" />
```

por:

```astro
<section class="py-[40px] md:py-[60px] bg-clube-amarelo/10">
  <div class="max-w-3xl mx-auto px-space-md text-center">
    <div class="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-clube-branco shadow-md">
      <img src={iconSelo.src} width="96" height="96" alt="Selo de 7 dias de garantia" />
    </div>
```

- [ ] **Step 2: Selos de texto em card suave**

Substituir (linhas 23-27):

```astro
    <div class="mt-space-lg grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
      {selos.map((selo) => (
        <p class="rounded-radius-md shadow-sm bg-clube-branco p-space-sm font-body text-sm text-clube-azul-escuro">{selo}</p>
      ))}
    </div>
```

por:

```astro
    <div class="mt-space-lg grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
      {selos.map((selo) => (
        <p class="rounded-radius-xl shadow-sm bg-clube-branco p-space-md font-body text-sm text-clube-azul-escuro">{selo}</p>
      ))}
    </div>
```

(Mesma nota da Task 7: os selos aqui são frases longas, então usam `rounded-radius-xl`, não `rounded-full`.)

- [ ] **Step 3: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, rolar até "Você tem 7 dias para conhecer o Clube por dentro". Confirmar: fundo da seção em amarelo bem claro, o selo de garantia está dentro de um círculo branco com sombra, e os 3 textos de selo abaixo têm cantos mais arredondados.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/08-Garantia.astro
git commit -m "style: fundo amarelo claro e selo em circulo na secao Garantia"
```

---

### Task 10: Seção 9 (FAQ) — perguntas em cards individuais

**Files:**
- Modify: `src/components/sections/09-Faq.astro:57-80`

**Interfaces:**
- Consumes: nada
- Produces: nada (classes `lp-clube-sec12-accordion`, `.accordion-title`, `.accordion-icon`, `.accordion-panel` continuam existindo com os mesmos nomes — o script no final do arquivo, linhas 86-99, não muda)

- [ ] **Step 1: Substituir lista com `divide-y` por cards individuais**

Substituir (linhas 57-80):

```astro
    <div class="lp-clube-sec12-accordion mt-space-xl divide-y divide-clube-azul-claro">
      {faq.map((item, i) => (
        <div class="py-space-sm">
          <button
            type="button"
            class="accordion-title w-full flex items-center justify-between gap-space-sm text-left font-heading text-clube-azul-escuro"
            aria-expanded="false"
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span>{item.pergunta}</span>
            <span class="accordion-icon shrink-0" aria-hidden="true">+</span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            class="accordion-panel hidden mt-space-xs font-body text-clube-azul-escuro"
          >
            {item.resposta}
          </div>
        </div>
      ))}
    </div>
```

por:

```astro
    <div class="lp-clube-sec12-accordion mt-space-xl space-y-space-sm">
      {faq.map((item, i) => (
        <div class="rounded-radius-lg bg-clube-branco shadow-sm p-space-md">
          <button
            type="button"
            class="accordion-title w-full flex items-center justify-between gap-space-sm text-left font-heading text-clube-azul-escuro"
            aria-expanded="false"
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span>{item.pergunta}</span>
            <span class="accordion-icon shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-clube-azul-claro/30 text-lg" aria-hidden="true">+</span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            class="accordion-panel hidden mt-space-xs font-body text-clube-azul-escuro"
          >
            {item.resposta}
          </div>
        </div>
      ))}
    </div>
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 3: Verificar visualmente e funcionalmente**

Run: `npm run dev`, rolar até "Perguntas frequentes". Confirmar: cada pergunta agora é um card branco com sombra leve, separado das outras (não mais uma lista com linha divisória). Clicar em uma pergunta: a resposta deve expandir e o ícone deve trocar de "+" para "−" (o JS do accordion não mudou, então isso já deve funcionar).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/09-Faq.astro
git commit -m "style: perguntas do FAQ em cards individuais"
```

---

### Task 11: Seção 10 (CTA Final) — selos em pílula

**Files:**
- Modify: `src/components/sections/10-CtaFinal.astro:36-40`

**Interfaces:**
- Consumes: `CtaButton` (Task 1)
- Produces: nada

- [ ] **Step 1: Envolver cada selo em pílula**

Substituir (linhas 36-40):

```astro
    <div class="mt-space-md flex flex-wrap justify-center gap-space-sm">
      {selos.map((selo) => (
        <span class="font-body text-sm text-clube-azul-claro">{selo}</span>
      ))}
    </div>
```

por:

```astro
    <div class="mt-space-md flex flex-wrap justify-center gap-space-sm">
      {selos.map((selo) => (
        <span class="rounded-full bg-clube-branco/10 px-space-md py-1 font-body text-sm text-clube-azul-claro">{selo}</span>
      ))}
    </div>
```

(Selos aqui são curtos — "🔒 Pagamento seguro" etc. — cabem em uma linha, então `rounded-full` funciona bem, diferente das Tasks 7 e 9.)

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sem erros novos.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, rolar até o final da página ("A próxima semana de aula vai acontecer com você ou sem o Clube"). Confirmar: os 3 selos finais (🔒/⚡/🛟) aparecem como pequenas pílulas com fundo sutilmente destacado do fundo escuro da seção. Os botões CTA já devem estar em pílula (herdado da Task 1).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/10-CtaFinal.astro
git commit -m "style: selos finais em formato de pilula"
```

---

### Task 12: Verificação final de build e regressão visual

**Files:**
- Nenhum arquivo novo — só verificação.

**Interfaces:**
- Consumes: todas as tasks anteriores
- Produces: nada

- [ ] **Step 1: Typecheck completo**

Run: `npm run check`
Expected: `0 errors`.

- [ ] **Step 2: Build de produção**

Run: `npm run build`
Expected: build completa sem erros, gera `dist/`.

- [ ] **Step 3: Preview do build de produção**

Run: `npm run preview`, abrir a URL indicada no terminal (geralmente `http://localhost:4321/`).

- [ ] **Step 4: Checklist de regressão visual manual**

Rolar a página inteira e confirmar, seção por seção:
1. Hero: gradiente de fundo, imagem com blob decorativo, botões em pílula
2. Dores: fundo bege, ícones em badge circular rosa
3. Como Funciona: fundo azul claro, números em badge circular preenchido
4. Benefícios: cards com sombra que cresce no hover
5. Prova Social: fundo bege, cards padronizados
6. Autoridade: selos com cantos mais arredondados
7. Oferta: checklist com ✓ em badge amarelo, preço grande em destaque
8. Garantia: fundo amarelo claro, selo dentro de círculo
9. FAQ: perguntas em cards separados, accordion abre/fecha ao clicar
10. CTA Final: selos em pílula, botões em pílula, footer intacto

Confirmar também:
- Os 3 CTAs (`lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte`) ainda levam para `https://clubedasprofs.com.br/?add-to-cart=17307` e para o WhatsApp de suporte, sem mudança de destino.
- Nenhum erro no console do navegador.

- [ ] **Step 5: Commit final (se houver ajustes da checklist)**

Se a checklist do Step 4 não apontar nenhum ajuste, não há o que commitar nesta task — as Tasks 1-11 já cobrem todas as mudanças. Se algum ajuste for necessário, aplicar, rodar `npm run check` de novo, e commitar separadamente descrevendo o ajuste.
