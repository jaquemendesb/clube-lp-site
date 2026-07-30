# Lista de mídias — Nova LP Clube das Profs

> Cópia interna, trazida de `LP - Conteúdo e Planejamento/lp/MEDIA-TODO.md`. Serve de checklist para o que precisa ser baixado/produzido e colocado em `public/images/` e `src/assets/icons/` deste repo (ver `SPEC.md` §Imagens).

> **✅ Atualização 2026-07-29:** as imagens reais de `clubedasprofs.com.br` (Seção 4 capas, Seção 5 depoimentos + galeria, Seção 6 foto da Jaque, logos do rodapé) foram baixadas do site ao vivo e já estão em `src/assets/images/`, importadas via `astro:assets` nos componentes correspondentes. A pendência de troca de prints da Seção 5 (abaixo) foi conferida e **não é uma troca real** — ver nota na Seção 5. Continuam pendentes apenas: foto/banner do Hero (nunca existiu, nem no site atual) e produção de novas mídias que não têm equivalente no site ao vivo.

## ✅ Já existentes — baixar da Kinsta e trazer para este repo

Base URL atual: `https://clubedasprofs.com.br/wp-content/uploads/2026/04/` (pasta pode mudar de mês — nome do arquivo é estável).

| Arquivo | Onde aparece | Destino neste repo |
|---|---|---|
| `dor-relogio.svg` | Seção 2 — "Falta de tempo" | `src/assets/icons/dor-relogio.svg` |
| `dor-turma.svg` | Seção 2 — "Turma desnivelada" | `src/assets/icons/dor-turma.svg` |
| `dor-atencao.svg` | Seção 2 — "Atenção que escapa" | `src/assets/icons/dor-atencao.svg` |
| `dor-busca.svg` | Seção 2 — "Horas garimpando" | `src/assets/icons/dor-busca.svg` |
| `dor-qualidade.svg` | Seção 2 — "Material que não funciona" | `src/assets/icons/dor-qualidade.svg` |
| `selo-garantia-7-dias.svg` | Seção 8 — selo central | `src/assets/icons/selo-garantia-7-dias.svg` |
| `beneficio-projetos.svg` | Seção 4 — "Projetos exclusivos" | `src/assets/icons/beneficio-projetos.svg` |
| `beneficio-bonus-ia.svg` | Seção 4 — "Bônus IA" | `src/assets/icons/beneficio-bonus-ia.svg` |
| `beneficio-comunidade.svg` | Seção 4 — "Comunidade WhatsApp" | `src/assets/icons/beneficio-comunidade.svg` |

## Imagens de depoimento (Seção 5) — reais, já baixadas

Base: `https://clubedasprofs.com.br/wp-content/uploads/2025/07/` → `src/assets/images/depoimento-*`

- `Feedback-Pamela-1.jpg` → Prof Pamela — conferido: print é da própria "Pamela Santos".
- `Feedback-Maria.jpg` → card "Prof Rosa" — conferido: o texto do print é assinado "Rosa Caroline de Liz Martinelli". **O card está certo**, só o nome do arquivo original (na biblioteca WP) é que usa "Maria" por engano.
- `Feedback-Rosa.jpg` → card "Prof Maria Regina" — conferido: o texto do print é assinado "Maira Regina Schossler". **O card está certo**, mesmo caso de nome de arquivo trocado.

Conclusão: **não é necessário trocar nada** — a pendência registrada em `CONTENT.md` §Seção 5 / `CLAUDE.md` §Decisões em aberto era sobre o nome do arquivo, não sobre qual print aparece em qual card. Pode reportar à Jaque como resolvida.

## Galeria de prova social (Seção 5) — curadoria de 6

IDs originais da biblioteca WP, para conferência visual em `https://clubedasprofs.com.br/wp-content/uploads/2024/01/<arquivo>` (ou `/2024/03/` para os 3 marcados):

| Arquivo | Pasta |
|---|---|
| Feedback-08.jpg | /2024/01/ |
| Feedback-11.jpg | /2024/03/ |
| Feedback-04.jpg | /2024/01/ |
| Feedback-05-1.jpg | /2024/01/ |
| Feedback-06.jpg | /2024/01/ |
| Feedback-01.jpg | /2024/01/ |

Demais arquivos disponíveis no mapeamento original (`Feedback-02` a `Feedback-13`) caso queiram trocar algum da curadoria — conferir com a Jaque se necessário.

## Imagens já baixadas do site ao vivo (2026-07-29)

| Onde aparece | Arquivo original (clubedasprofs.com.br) | Destino neste repo |
|---|---|---|
| Seção 4 — capa Língua Portuguesa | `Fundo-Imagens-Atividade-e-Mockup-Celular-Portugues.jpg` | `src/assets/images/beneficio-capa-portugues.jpg` |
| Seção 4 — capa Matemática | `Fundo-Imagens-Atividade-e-Mockup-Celular-Matematica.jpg` | `src/assets/images/beneficio-capa-matematica.jpg` |
| Seção 4 — capa Demais disciplinas | `Fundo-Imagens-Atividade-e-Mockup-Celular-Cie-Hist-Geo.jpg` | `src/assets/images/beneficio-capa-demais-disciplinas.jpg` |
| Seção 6 — foto da Prof Jaque | `Prof-Jaque.jpg` | `src/assets/images/prof-jaque.jpg` |
| Seção 10 — logo Clube das Profs (versão branca, biblioteca de marca) | `VARIAÇÃO-47_1.png` | `src/assets/images/footer-logo-clube-branco.png` |
| Seção 10 — logo Prof Jaque Mendes (versão branca, biblioteca de marca) | `LOGOTIPO HORIZONTAL-31 cópia@100x-8.png` | `src/assets/images/footer-logo-jaque-branco.png` |

> **Atualização 2026-07-30:** a logo "Prof Jaque Mendes" antiga (baixada do site ao vivo, `footer-logo-jaque-pink.svg`) foi removida por estar fora do branding atual. A versão correta, trazida da biblioteca de marca em `docs/reference/imagens/`, foi adicionada de volta — agora em branco, ao lado da logo do Clube das Profs (também branca), sem precisar da caixa de contraste bege usada antes.

Ícones de dor/benefício/garantia (Seção 2, 4, 8) já foram copiados em sessão anterior — ver `CLAUDE.md` §Decisões já tomadas.

## Mídias que ainda não existem (nem no site atual)

| Item | Prioridade | Observação |
|---|---|---|
| Hero — foto/composição de imagem | Média | O site ao vivo hoje também não tem imagem no Hero — não é uma regressão, mas seria uma melhoria real sobre a versão atual |
| Logo "Prof Jaque" em versão texto colorido (usado no rodapé do site atual) | Baixa | Substituído aqui pela versão vetorial rosa (`footer-logo-jaque-pink.svg`), que já cobre a função |

**Não há mais bloqueador de mídia para publicar** as Seções 4, 5, 6 e 10 — a única mídia realmente pendente é a foto/imagem do Hero, que é uma melhoria nova, não uma correção de regressão.
