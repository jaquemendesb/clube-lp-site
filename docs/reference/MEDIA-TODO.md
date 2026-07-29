# Lista de mídias — Nova LP Clube das Profs

> Cópia interna, trazida de `LP - Conteúdo e Planejamento/lp/MEDIA-TODO.md`. Serve de checklist para o que precisa ser baixado/produzido e colocado em `public/images/` e `src/assets/icons/` deste repo (ver `SPEC.md` §Imagens).

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

## Imagens de depoimento (Seção 5) — reais, já existentes

Base: `https://clubedasprofs.com.br/wp-content/uploads/2025/07/`

- `Feedback-Pamela-1.jpg`, `Feedback-Pamela-2.jpg` → Prof Pamela
- `Feedback-Maria.jpg` → associado hoje a "Prof Rosa" (⚠️ ver `CONTENT.md` §Seção 5 — possível troca)
- `Feedback-Rosa.jpg` → associado hoje a "Prof Maria Regina" (⚠️ mesma pendência)

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

## Imagens já existentes reaproveitadas (baixar da biblioteca WP)

| Onde aparece | Descrição |
|---|---|
| Hero — imagem decorativa | Ilustração pequena ao lado do headline |
| Hero — banner lateral (desktop) | Banner grande |
| Hero — banner (mobile/tablet) | Versão mobile do banner |
| Seção 4 — capa Língua Portuguesa | Capa da categoria |
| Seção 4 — capa Matemática | Capa da categoria |
| Seção 4 — capa Demais disciplinas | Capa da categoria |
| Seção 6 — banner principal da Jaque | Foto profissional |
| Seção 6 — foto perfil pequena | Foto estilo Instagram |
| Seção 10 — logos do rodapé (2 imagens) | Selos/logos institucionais |

## Mídias ainda pendentes de produção

Convenções: WebP (qualidade 80) ou AVIF; exportar 2x para retina; cores conforme `docs/reference/STYLE-SPEC.md` §1; prefixo de nome `lp-clube-*`.

| Item | Prioridade | Observação |
|---|---|---|
| 3 imagens da Seção 4 (Projetos, Bônus IA, Comunidade) | **Alta — bloqueia go-live** | Sem elas a grade fica com furos visíveis |
| Selo de garantia (Seção 8) | Média | Aceita fallback temporário (emoji 🛡️) |
| 5 ícones de dor (Seção 2) | Baixa | Font Awesome/ícone genérico funciona como fallback |
| 3 depoimentos textuais (Seção 5) | **Alta — bloqueia go-live** | Depende da Jaque validar/confirmar os 3 prints e resolver a pendência de troca |

**Bloqueador real para publicar:** imagens da Seção 4 e resolução da pendência de depoimentos da Seção 5. O resto aceita fallback.
