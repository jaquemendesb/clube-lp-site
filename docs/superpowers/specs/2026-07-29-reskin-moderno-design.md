# Reskin visual moderno — LP Clube das Profs

## Contexto

A Jaque pediu para a LP seguir o padrão visual "moderno" de duas páginas de referência do próprio portfólio dela: `https://lp.jaquemendes.com/profcriadora` e `https://lp.jaquemendes.com/cursocanva`. Prints dessas páginas foram salvos em `docs/reference/método LP.png` e `docs/reference/canva LP.png`.

Ambas as referências seguem o padrão visual comum de página de lançamento de infoproduto brasileiro:

- Ritmo de seções alternando fundo (branco → tom claro → escuro → branco), criando cadência visual ao rolar
- Botões CTA em formato pílula (`rounded-full`), cor sólida de alto contraste, repetidos ao longo da página
- Hero com foto da instrutora + fundo em gradiente/glow
- Cards de "dor" com ícone dentro de badge circular colorido
- Comparação em duas colunas ("é pra você" / "não é pra você")
- Grid de módulos em cards com fundo colorido + ícone + texto
- Bônus em cards horizontais empilhados
- Preço: pilha de valor (itens riscados) culminando em card de destaque com preço final grande
- Garantia com selo/medalha sobre fundo em tom suave
- Bio da criadora: foto + texto lado a lado
- Cantos bem arredondados e sombras suaves em quase todos os elementos

## Decisão de escopo

- **Manter a marca**: cores (`clube-azul-escuro`, `clube-rosa`, `clube-amarelo`, `clube-bege`, `clube-azul-claro`, `clube-branco`) e fontes (`Montserrat Alternates`, `Poppins`, `Rialto Script`) definidas em `tailwind.config.mjs` **não mudam**. Só o padrão de layout/composição é adotado.
- **Copy e ordem das 10 seções não mudam** (já vêm de `CONTENT.md`, aprovadas). O que muda é como cada seção apresenta essa copy (cards com badge, checklist, ritmo de fundo).
- **Fora de escopo**: botão de WhatsApp flutuante fixo, nova paleta de cor, mudança de conteúdo/copy, mudança de ordem de seções.
- As 3 classes legadas de CTA (`lp-clube-button`, `lp-clube-button-secondary`, `lp-clube-button-suporte`) permanecem literais no HTML — só a classe de estilo visual associada muda (ver `CLAUDE.md` §Decisões já tomadas).

## Primitivos globais

1. **Botões (`CtaButton.astro`)**: trocar `rounded-radius-md` por `rounded-full` (pílula) em todas as variantes. Adicionar `shadow-md` e `hover:scale-105 transition-transform` (CSS puro, sem JS). Respeitar a preferência `prefers-reduced-motion` já tratada no projeto (SPEC.md §Acessibilidade) — a transição de hover deve ser desativada nesse caso.
2. **Cards**: padronizar em `rounded-radius-xl` (25px) + `shadow-md`, com `hover:shadow-lg transition-shadow` em cards informativos/clicáveis.
3. **Badges circulares de ícone**: novo padrão visual — ícone dentro de círculo colorido (~56px, `rounded-full`), usando `clube-rosa/15` como fundo para ícones de "dor" (equivalente ao vermelho da referência dentro da paleta do Clube), e `clube-amarelo`/`clube-azul-claro` para outros contextos (numeração de passos, checklist de oferta, garantia).
4. **Ritmo de seções**: alternar fundos entre as 10 seções para evitar sequências longas de branco:
   - 1 Hero: gradiente sutil `clube-bege` → branco
   - 2 Dores: `clube-bege`
   - 3 Como Funciona: `clube-azul-claro/10`
   - 4 Benefícios: branco (mantido)
   - 5 Prova Social: `clube-bege`
   - 6 Autoridade: `clube-azul-escuro` (mantido, já escuro)
   - 7 Oferta: `clube-azul-escuro` (mantido, já escuro)
   - 8 Garantia: `clube-amarelo/10`
   - 9 FAQ: branco (mantido)
   - 10 CTA Final: `clube-azul-escuro` (mantido)

## Aplicação por seção

| # | Seção | Mudança |
|---|---|---|
| 1 | Hero | Fundo com gradiente sutil `clube-bege`→branco. Placeholder de imagem com `rounded-radius-xl` + sombra + blob decorativo (`clube-amarelo/20`, círculo CSS atrás da imagem). Grid/layout mantido. |
| 2 | Dores | Fundo `clube-bege`. Ícones em badge circular `clube-rosa/15`. Cards `rounded-radius-xl shadow-md`. |
| 3 | Como Funciona | Fundo `clube-azul-claro/10`. Números "01/02/03" viram badge circular preenchido (`bg-clube-rosa text-clube-branco rounded-full`) em vez de texto solto. |
| 4 | Benefícios | Sem mudança estrutural — só `rounded-radius-xl shadow-md hover:shadow-lg`. |
| 5 | Prova Social | Fundo `clube-bege`. Mesma padronização de raio/sombra nos cards de stat e depoimento. |
| 6 | Autoridade | Sem mudança estrutural (já é escura, foto+texto). Selos retangulares viram pílula (`rounded-full`). |
| 7 | Oferta | Maior mudança: lista de itens vira checklist com ✓ em badge circular `clube-amarelo`. Preço final em destaque maior (`text-5xl` em vez do tamanho atual). Card de preço com `shadow-lg` mais pronunciado. |
| 8 | Garantia | Fundo `clube-amarelo/10`. Selo central com círculo de fundo atrás do ícone. Selos de texto viram pílula/chip. |
| 9 | FAQ | Cada pergunta vira card individual (`rounded-radius-lg`, fundo branco, sombra leve) em vez de lista com `divide-y`. Ícone +/− ganha círculo de fundo. |
| 10 | CTA Final | Sem mudança estrutural. Botões em pílula (herdado do primitivo global). Selos finais em formato de chip/pill. Footer sem mudança. |

## Performance e acessibilidade

- Nenhuma animação nova depende de JS — tudo é `transition` CSS em `:hover`, que não roda em dispositivos touch sem hover e não afeta LCP/CLS/INP (metas do PRD §9.1 continuam válidas).
- Blobs decorativos são `div`s com `background` CSS (sem imagem extra), para não adicionar peso de rede.
- Manter `prefers-reduced-motion` desativando as transições de hover novas, seguindo o padrão já usado para o CTA (SPEC.md linha 97).

## Fora de escopo (confirmado com a Jaque)

- Botão de WhatsApp flutuante fixo
- Nova paleta de cor (roxo/verde-menta das referências)
- Mudança de copy ou ordem das seções
- Novas imagens/fotos (assets pendentes seguem os mesmos definidos em `docs/reference/MEDIA-TODO.md`)
