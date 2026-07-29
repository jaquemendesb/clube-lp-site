# Style Spec — Nova LP Clube das Profs

> Cópia interna, trazida de `LP - Conteúdo e Planejamento/lp/STYLE-SPEC.md` para este repo ser autossuficiente (ver `SPEC.md` §Design tokens). Se a fonte original mudar, atualizar aqui também.

Tokens visuais consolidados das 10 seções do conteúdo (`CONTENT.md`, na raiz deste repo).
Pareie esta spec com o branding guide (fora deste repo) quando precisar de contexto adicional de marca.

Aplicação original: a maioria dos tokens já estava hard-coded em cada shortcode Flatsome. Nesta versão (Astro), os tokens viram `tailwind.config.mjs` + `src/styles/tokens.css` — não texto solto.

---

## 1. Cores

| Token | Hex | RGB | Uso na LP |
|---|---|---|---|
| `--clube-azul-escuro` | `#24224C` | `36, 34, 76` | Texto de cabeçalho, fundo de seção de autoridade, pricing dark, fechamento |
| `--clube-azul-claro` | `#C0E3EB` | `192, 227, 235` | Texto auxiliar sobre fundo escuro, micro-copy, dividers |
| `--clube-rosa` | `#DD60A0` | `221, 96, 160` | Eyebrow ("COMO FUNCIONA"), numeração 01/02/03, ícones de dor, autoria |
| `--clube-amarelo` | `#FFD055` | `255, 208, 85` | Bloco de reforço, eyebrow do CTA final, badge promo no Hero |
| `--clube-bege` | `#F9F3ED` | `249, 243, 237` | Background padrão da página |
| `--clube-branco` | `#FFFFFF` | `255, 255, 255` | Cards e card de oferta |

**Regras de uso:**
- Texto sobre bege/branco: sempre `--clube-azul-escuro`. Nunca preto puro.
- Texto sobre `--clube-azul-escuro`: `--clube-bege` (corpo) ou `--clube-azul-claro` (auxiliar).
- `--clube-rosa` é reservado para acentos: links, ícones de destaque, eyebrows. **Nunca em CTA primário.**
- `--clube-amarelo` é exclusivo de momentos de alta densidade emocional: oferta, atualizações semanais, fechamento. Usar como cor de fundo de bloco, não de texto.

---

## 2. Tipografia

Carregar via `@font-face` local (fontes ficam em `src/assets/fonts/`, copiadas de `LP - Conteúdo e Planejamento/brand/fonts/` na configuração inicial do projeto):

```css
@font-face { font-family: 'Montserrat Alternates'; src: url('/fonts/MontserratAlternates-SemiBold.ttf'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'Montserrat Alternates'; src: url('/fonts/MontserratAlternates-Regular.ttf'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Nexa'; src: url('/fonts/Nexa-Regular.ttf'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Rialto Script'; src: url('/fonts/rialtoscript-regular.ttf'); font-weight: 400; font-display: swap; }
```

| Papel | Família | Onde |
|---|---|---|
| H1 / H2 | Montserrat Alternates SemiBold | Headlines de seção e do Hero |
| H3 | Montserrat Alternates Regular | Títulos de card |
| Subtítulo decorativo | Rialto Script | Uso pontual, no máximo 1 por seção |
| Body | Nexa Regular | Parágrafos, listas, copy de card |

### Escala

| Nível | Desktop | Mobile |
|---|---|---|
| H1 | 36–48px | 28–34px |
| H2 | 28–36px | 24–30px |
| H3 (card) | 18–22px | 18–20px |
| Body | 16–18px | 16px |
| Eyebrow | 16px UPPERCASE letter-spacing 0.05em | mesmo |
| Caption legal | 12–13px | mesmo |

---

## 3. Espaçamento

Sistema de **8px**.

| Token | px |
|---|---|
| `space-xs` | 8 |
| `space-sm` | 16 |
| `space-md` | 24 |
| `space-lg` | 32 |
| `space-xl` | 48 |
| `space-2xl` | 64 |
| `space-3xl` | 96 |

Padding de seção padrão: `60px 0` desktop, `40px 0` mobile.

---

## 4. Raios

| Token | px | Onde |
|---|---|---|
| `radius-sm` | 8 | Imagens dentro de galeria |
| `radius-md` | 15 | Cards pequenos, mini-stat blocks |
| `radius-lg` | 20 | Cards de benefício, depoimento |
| `radius-xl` | 25 | Card de oferta, card de garantia |

---

## 5. Sombras

| Estado | Equivalente Tailwind | Quando |
|---|---|---|
| Sem destaque | sem `shadow` | Seções inteiras |
| Sutil | `shadow-sm` | Mini-cards de stats / dores |
| Médio | `shadow-md` | Cards de depoimento, garantia |
| Forte | `shadow-lg` | Card de oferta (peça-âncora) |

Hover: subir um nível de sombra sempre que o card for clicável-conceitual.

---

## 6. Botões / CTAs

Ver `SPEC.md` §"Componente de CTA" para a regra de implementação (componente único `CtaButton`).

### CTA Primário
- Fundo `--clube-amarelo`, texto `--clube-azul-escuro`.
- Tamanho grande (equivalente ao antigo `size="xxlarge"`).
- Copy padrão: "Quero entrar no Clube agora".
- Destino padrão: `https://clubedasprofs.com.br/?add-to-cart=17307`.
- Animação de entrada leve (equivalente a `bounceIn`), respeitando `prefers-reduced-motion`.

### CTA Secundário (Hero)
- Estilo link sublinhado, cor `--clube-azul-escuro`.
- Copy: "Ver tudo o que está incluso" → âncora `#beneficios`.

### CTA Suporte
- Estilo outline branco, ícone WhatsApp.
- Copy: "Falar com o suporte" → link WhatsApp.

**Regra de identidade única:** os três CTAs acima são as **únicas** assinaturas de botão da LP. Qualquer botão novo deve cair em uma destas três — nunca criar uma variação nova ad-hoc.

---

## 7. Eventos GTM (resumo)

Ver `docs/reference/GTM-EVENTS.md` para o mapa completo de eventos, triggers e parâmetros GA4.

---

## 8. Notas de portabilidade (herdadas do Flatsome — já resolvidas neste repo)

Estas notas valiam para a versão dentro do WordPress/UX Builder e **não se aplicam mais**, mas ficam registradas para contexto:
- Cores via Customizer do tema → substituído por `tailwind.config.mjs`.
- Fontes via upload manual em `/wp-content/uploads/fonts/` → substituído por `src/assets/fonts/` versionado no repo.
- Versionamento por export manual do UX Builder → substituído por git.
