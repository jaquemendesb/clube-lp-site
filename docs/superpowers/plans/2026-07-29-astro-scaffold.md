# Scaffold inicial do projeto Astro (clube-lp-site) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar o esqueleto do projeto Astro + Tailwind definido em `SPEC.md`: configuração de build, design tokens reais, o componente `CtaButton` único, e as 10 seções da LP como componentes vazios montados em `index.astro`.

**Architecture:** Astro (site estático, zero/mínimo JS) com `@astrojs/tailwind` compilado no build. Tokens de cor/espaçamento/raio em `tailwind.config.mjs` (fonte única, sem duplicar em CSS solto) + `src/styles/tokens.css` só para `@font-face` (Tailwind não gera `@font-face`). Uma seção = um componente `.astro` em `src/components/sections/`, importados em ordem por `src/layouts/Layout.astro` → `src/pages/index.astro`. Este scaffold **não inclui copy** (`CONTENT.md`) nem assets de imagem/fonte reais — cada seção nasce como esqueleto vazio, para ser preenchida seção por seção depois.

**Tech Stack:** Astro (última versão estável), `@astrojs/tailwind`, Tailwind CSS, npm, TypeScript (strict, padrão do template Astro).

## Global Constraints

- Tailwind compilado no build — nunca via CDN em produção (`SPEC.md` §Stack).
- As 3 classes legadas dos CTAs (`lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte`) devem existir literalmente no HTML, além de qualquer classe Tailwind — não renomear (`CLAUDE.md` §Decisões já tomadas, `SPEC.md` §Componente de CTA).
- Cores exatas (`SPEC.md` / `STYLE-SPEC.md` §1): `clube-azul-escuro #24224C`, `clube-azul-claro #C0E3EB`, `clube-rosa #DD60A0`, `clube-amarelo #FFD055`, `clube-bege #F9F3ED`, `clube-branco #FFFFFF`.
- Espaçamento em grid de 8px (`STYLE-SPEC.md` §3): `space-xs 8`, `space-sm 16`, `space-md 24`, `space-lg 32`, `space-xl 48`, `space-2xl 64`, `space-3xl 96`.
- Raios (`STYLE-SPEC.md` §4): `radius-sm 8`, `radius-md 15`, `radius-lg 20`, `radius-xl 25`.
- Seletores/ids exigidos pelo GTM (`docs/reference/GTM-EVENTS.md`) precisam sobreviver no HTML: classe contendo `HERO-` na seção 1, classe contendo `BENEFICIOS-CTA` ao redor do CTA da seção 4, classe contendo `OFERTA-` na seção 7, id `#clube-valor` na seção 7, id `#fechamento-cta` na seção 10, classe `.lp-clube-sec12-accordion .accordion-title` no acordeão da seção 9 (nome herdado do Flatsome — manter literal mesmo a seção sendo a 9).
- Estrutura de pastas de `SPEC.md` §Estrutura de pastas é a referência — não inventar layout alternativo.
- **Nota pós-Task 1 (deviation aceita):** `@astrojs/tailwind` (integração clássica) está abandonado e não tem versão compatível com o Astro atual — não usar. O projeto usa Tailwind v4 via `@tailwindcss/vite` (plugin do Vite, configurado em `astro.config.mjs` como `vite: { plugins: [tailwindcss()] }`, não `integrations: [tailwind()]`). `tailwind.config.mjs` continua existindo e é a fonte de `theme.extend` (cores/espaçamento/raios/fontes) via a diretiva `@config "../../tailwind.config.mjs";` em `src/styles/global.css` — as próximas tasks editam `theme.extend` normalmente, como previsto originalmente.

---

### Task 1: Scaffold Astro + Tailwind via CLI

**Files:**
- Create (via CLI, não escritos à mão): `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (versão default do template), `tailwind.config.mjs`, `.gitignore`

**Interfaces:**
- Produces: projeto Astro rodável (`npm run dev`, `npm run build`) com Tailwind já plugado em `astro.config.mjs` (`integrations: [tailwind()]`) — tasks seguintes assumem que `tailwind.config.mjs` já existe e só precisa de edição em `theme.extend`.

- [ ] **Step 1: Rodar o scaffold oficial do Astro (template minimal, TypeScript strict, sem git ainda)**

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict --yes
```

Rodar dentro de `clube-lp-site/` (diretório já tem `CLAUDE.md`, `PRD.md` etc. — o `--yes` evita prompt interativo sobre diretório não vazio).

- [ ] **Step 2: Adicionar a integração Tailwind oficial**

```bash
npx astro add tailwind --yes
```

Isso instala `@astrojs/tailwind` + `tailwindcss`, cria `tailwind.config.mjs` e injeta a integração em `astro.config.mjs` automaticamente.

- [ ] **Step 3: Verificar que o build funciona antes de customizar**

```bash
npm run build
```

Expected: build termina sem erro, gera `dist/index.html` (a página default do template, ainda sem nosso conteúdo).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs .gitignore src public
git commit -m "chore: scaffold Astro + Tailwind via CLI"
```

---

### Task 2: Design tokens (cores, espaçamento, raios, fontes)

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/tokens.css`
- Create: `src/assets/fonts/.gitkeep` (pasta vazia — fontes reais entram depois, cópia de `../LP - Conteúdo e Planejamento/brand/fonts/`, fora deste scaffold)

**Interfaces:**
- Consumes: `tailwind.config.mjs` gerado na Task 1 (import `@astrojs/tailwind` já presente).
- Produces: classes utilitárias Tailwind `bg-clube-*`, `text-clube-*`, `p-space-*`, `rounded-radius-*` e famílias `font-heading`/`font-script`/`font-body`, usadas pelo `CtaButton` (Task 3) e por todas as seções depois.

- [ ] **Step 1: Editar `tailwind.config.mjs` com os tokens de `STYLE-SPEC.md` §1, §3, §4**

```javascript
// tailwind.config.mjs
import tailwindTypography from 'tailwindcss'; // manter os imports que o `astro add tailwind` já gerou; não remover

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'clube-azul-escuro': '#24224C',
        'clube-azul-claro': '#C0E3EB',
        'clube-rosa': '#DD60A0',
        'clube-amarelo': '#FFD055',
        'clube-bege': '#F9F3ED',
        'clube-branco': '#FFFFFF',
      },
      spacing: {
        'space-xs': '8px',
        'space-sm': '16px',
        'space-md': '24px',
        'space-lg': '32px',
        'space-xl': '48px',
        'space-2xl': '64px',
        'space-3xl': '96px',
      },
      borderRadius: {
        'radius-sm': '8px',
        'radius-md': '15px',
        'radius-lg': '20px',
        'radius-xl': '25px',
      },
      fontFamily: {
        heading: ['"Montserrat Alternates"', 'sans-serif'],
        script: ['"Rialto Script"', 'cursive'],
        body: ['Nexa', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

Nota: o `import tailwindTypography from 'tailwindcss'` acima é só um placeholder de exemplo — na prática, copiar o topo real do arquivo gerado pelo `astro add tailwind` na Task 1 e só editar o bloco `theme.extend` e `content`, sem apagar nada que o CLI já configurou.

- [ ] **Step 2: Criar `src/styles/tokens.css` só com `@font-face` (Tailwind não gera `@font-face`)**

```css
/* src/styles/tokens.css */
@font-face {
  font-family: 'Montserrat Alternates';
  src: url('/fonts/MontserratAlternates-SemiBold.ttf');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Montserrat Alternates';
  src: url('/fonts/MontserratAlternates-Regular.ttf');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Nexa';
  src: url('/fonts/Nexa-Regular.ttf');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Rialto Script';
  src: url('/fonts/rialtoscript-regular.ttf');
  font-weight: 400;
  font-display: swap;
}
```

Os arquivos `.ttf` referenciados ainda não existem neste scaffold (ver `SPEC.md` §Assets a copiar) — o `@font-face` fica declarado mesmo assim, para não precisar retocar este arquivo quando as fontes forem copiadas depois, só adicionar os `.ttf` em `src/assets/fonts/` e configurar `public/fonts/` (ou `astro:assets`) na task de assets.

- [ ] **Step 3: Criar a pasta de fontes vazia (placeholder até a cópia real)**

```bash
mkdir -p src/assets/fonts src/assets/icons public/images
touch src/assets/fonts/.gitkeep src/assets/icons/.gitkeep public/images/.gitkeep
```

- [ ] **Step 4: Verificar que o build ainda passa com os tokens novos**

```bash
npm run build
```

Expected: build sem erro (tokens.css ainda não está importado em lugar nenhum — isso acontece na Task 4, `Layout.astro` — então este passo só confirma que `tailwind.config.mjs` não quebrou a sintaxe).

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.mjs src/styles/tokens.css src/assets/fonts/.gitkeep src/assets/icons/.gitkeep public/images/.gitkeep
git commit -m "feat: adicionar design tokens (cores, espaçamento, raios, fontes)"
```

---

### Task 3: Componente `CtaButton` único

**Files:**
- Create: `src/components/ui/CtaButton.astro`

**Interfaces:**
- Consumes: classes Tailwind da Task 2 (`bg-clube-amarelo`, `text-clube-azul-escuro`, `p-space-*`, `rounded-radius-md`, `font-heading`, `font-body`).
- Produces: `<CtaButton variant="primary" | "secondary" | "support" href={string}>texto</CtaButton>` — usado por todas as seções que tiverem CTA (Hero, Benefícios, Oferta, Garantia, CtaFinal) quando a copy real entrar depois.

- [ ] **Step 1: Criar o componente com as 3 variantes e as classes legadas preservadas**

```astro
---
// src/components/ui/CtaButton.astro
interface Props {
  variant: 'primary' | 'secondary' | 'support';
  href: string;
  class?: string;
}

const { variant, href, class: className = '' } = Astro.props;

// Classes legadas do Flatsome — não renomear (CLAUDE.md §Decisões já tomadas).
const legacyClass: Record<Props['variant'], string> = {
  primary: 'lp-clube-button',
  secondary: 'lp-clube-button-secondary',
  support: 'lp-clube-button-suporte',
};

// Estilo visual por variante (STYLE-SPEC.md §6).
const variantClass: Record<Props['variant'], string> = {
  primary:
    'inline-block bg-clube-amarelo text-clube-azul-escuro font-heading font-semibold text-lg px-space-lg py-space-sm rounded-radius-md',
  secondary:
    'inline-block text-clube-azul-escuro font-body underline underline-offset-4',
  support:
    'inline-block border border-clube-branco text-clube-branco font-body px-space-md py-space-xs rounded-radius-md',
};
---

<a href={href} class={`${legacyClass[variant]} ${variantClass[variant]} ${className}`}>
  <slot />
</a>
```

A animação de entrada (`bounceIn`, `STYLE-SPEC.md` §6) e o ícone do WhatsApp na variante `support` ficam para a fase de polish visual — fora do escopo deste scaffold (ainda não há copy nem destino real por seção).

- [ ] **Step 2: Verificar que o build passa com o componente importável (smoke test manual)**

Criar temporariamente em `src/pages/index.astro` um import e uso do `CtaButton` (`<CtaButton variant="primary" href="#">teste</CtaButton>`), rodar `npm run build`, confirmar que compila sem erro de tipos, depois reverter esse uso temporário (a integração real com `index.astro` acontece na Task 4).

Expected: `npm run build` sem erro de TypeScript/Astro.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CtaButton.astro
git commit -m "feat: adicionar componente CtaButton (3 variantes, classes legadas preservadas)"
```

---

### Task 4: As 10 seções (esqueleto vazio) + Layout + index.astro

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/sections/01-Hero.astro` … `10-CtaFinal.astro` (10 arquivos)
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `src/styles/tokens.css` (Task 2), `CtaButton` (Task 3, ainda não usado dentro das seções vazias — só citado em comentário).
- Produces: página montada (`http://localhost:4321/` no dev server) com as 10 seções na ordem de `CONTENT.md`, prontas para receber copy seção por seção.

- [ ] **Step 1: Criar `src/layouts/Layout.astro`**

```astro
---
// src/layouts/Layout.astro
import '../styles/tokens.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="bg-clube-bege text-clube-azul-escuro font-body">
    <slot />
  </body>
</html>
```

Meta tags de SEO/Open Graph (`SPEC.md` §SEO) ficam para a fase de conteúdo — este layout só resolve a estrutura HTML mínima.

- [ ] **Step 2: Criar as 10 seções vazias com os hooks de GTM exigidos**

Seção 1 (`src/components/sections/01-Hero.astro`) — precisa de classe contendo `HERO-` (`GTM-EVENTS.md` linha 15):

```astro
---
---

<section class="HERO-PC-A1">
  <!-- Conteúdo: CONTENT.md §Seção 1. Classe HERO-* exigida por GTM-EVENTS.md (click_cta_top). -->
</section>
```

Seção 2 (`02-Dores.astro`):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 2 -->
</section>
```

Seção 3 (`03-ComoFunciona.astro`):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 3 -->
</section>
```

Seção 4 (`04-Beneficios.astro`) — precisa de wrapper com classe contendo `BENEFICIOS-CTA` ao redor do CTA do meio (`GTM-EVENTS.md` linha 16):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 4. O CTA do meio precisa de um wrapper com classe
       contendo "BENEFICIOS-CTA" (GTM-EVENTS.md, evento click_cta_middle). -->
</section>
```

Seção 5 (`05-ProvaSocial.astro`):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 5 -->
</section>
```

Seção 6 (`06-Autoridade.astro`):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 6 -->
</section>
```

Seção 7 (`07-Oferta.astro`) — precisa de classe contendo `OFERTA-` e id `clube-valor` (`GTM-EVENTS.md` linhas 17-18):

```astro
---
---

<section class="OFERTA-B1" id="clube-valor">
  <!-- Conteúdo: CONTENT.md §Seção 7. Classe OFERTA-* e id #clube-valor exigidos por
       GTM-EVENTS.md (view_pricing, click_cta_bottom). -->
</section>
```

Seção 8 (`08-Garantia.astro`):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 8 -->
</section>
```

Seção 9 (`09-Faq.astro`) — acordeão precisa da classe literal `lp-clube-sec12-accordion` (nome herdado do Flatsome, `GTM-EVENTS.md` linha 22):

```astro
---
---

<section>
  <!-- Conteúdo: CONTENT.md §Seção 9. Acordeão precisa da classe literal
       "lp-clube-sec12-accordion" com itens ".accordion-title" (GTM-EVENTS.md, evento faq_open). -->
</section>
```

Seção 10 (`10-CtaFinal.astro`) — precisa de id `fechamento-cta` (`GTM-EVENTS.md` linha 18):

```astro
---
---

<section id="fechamento-cta">
  <!-- Conteúdo: CONTENT.md §Seção 10. Id #fechamento-cta exigido por GTM-EVENTS.md
       (click_cta_bottom). -->
</section>
```

- [ ] **Step 3: Montar `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/sections/01-Hero.astro';
import Dores from '../components/sections/02-Dores.astro';
import ComoFunciona from '../components/sections/03-ComoFunciona.astro';
import Beneficios from '../components/sections/04-Beneficios.astro';
import ProvaSocial from '../components/sections/05-ProvaSocial.astro';
import Autoridade from '../components/sections/06-Autoridade.astro';
import Oferta from '../components/sections/07-Oferta.astro';
import Garantia from '../components/sections/08-Garantia.astro';
import Faq from '../components/sections/09-Faq.astro';
import CtaFinal from '../components/sections/10-CtaFinal.astro';
---

<Layout title="Clube das Profs">
  <Hero />
  <Dores />
  <ComoFunciona />
  <Beneficios />
  <ProvaSocial />
  <Autoridade />
  <Oferta />
  <Garantia />
  <Faq />
  <CtaFinal />
</Layout>
```

- [ ] **Step 4: Rodar o dev server e verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:4321/` — expected: página carrega sem erro no console, fundo `--clube-bege`, 10 blocos `<section>` vazios (visualmente em branco, sem crash). Parar o servidor depois (Ctrl+C).

- [ ] **Step 5: Rodar o build de produção**

```bash
npm run build
```

Expected: build sem erro, `dist/index.html` gerado contendo as classes/ids exigidos (`HERO-`, `OFERTA-`, `clube-valor`, `fechamento-cta`, `lp-clube-sec12-accordion` só existe como comentário nesta fase — vai virar HTML real quando a Seção 9 ganhar conteúdo).

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Layout.astro src/components/sections src/pages/index.astro
git commit -m "feat: montar layout base e as 10 seções da LP (esqueleto vazio)"
```

---

### Task 5: Verificação final do `.gitignore` e do histórico

**Files:**
- Modify: `.gitignore` (gerado pelo scaffold da Task 1 — conferir que cobre `node_modules/`, `dist/`, `.astro/`)

**Interfaces:**
- Consumes: todos os commits das Tasks 1-4 (repositório já inicializado antes da Task 1, com um commit prévio contendo os documentos de planejamento).
- Produces: repositório com o scaffold completo distribuído em commits sequenciais, working tree limpo.

- [ ] **Step 1: Conferir o `.gitignore` gerado pelo `create astro`**

Abrir `.gitignore` e confirmar que contém pelo menos:

```
node_modules/
dist/
.astro/
.env
.env.production
```

Se algo estiver faltando, completar manualmente e commitar (`git add .gitignore && git commit -m "chore: completar .gitignore"`).

- [ ] **Step 2: Verificar o estado do repositório**

```bash
git status
git log --oneline
```

Expected: working tree limpo, um commit por task (Tasks 1-4) mais o commit prévio dos documentos de planejamento — nenhum arquivo untracked ou modificado sobrando.

---

## Self-Review Notes

- **Cobertura do spec:** stack/build (Task 1), tokens de cor/espaço/raio/fonte (Task 2), CTA único com classes legadas (Task 3), estrutura de pastas + 10 seções + hooks de GTM (Task 4), git (Task 5). Itens de `SPEC.md` fora deste scaffold por decisão do usuário: copy (`CONTENT.md`), assets reais (fontes/ícones/imagens), SEO/OG tags, JSON-LD do FAQ, Dockerfile/deploy — todos citados no plano como próximos passos, não esquecidos por omissão.
- **Sem TDD tradicional:** este scaffold não tem lógica de negócio para testar com unit tests — a verificação é `npm run build` / `npm run dev` a cada task, como uma engenharia de front-end estático pede.
- **Consistência de tipos:** `Props['variant']` do `CtaButton` (`'primary' | 'secondary' | 'support'`) é o único lugar que define as 3 variantes — qualquer seção futura que usar `<CtaButton variant="...">` deve usar exatamente esses 3 valores.
