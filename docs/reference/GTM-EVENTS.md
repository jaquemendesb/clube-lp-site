# GTM Events — Nova LP Clube das Profs

> Cópia interna, trazida de `LP - Conteúdo e Planejamento/lp/GTM-EVENTS.md` para este repo ser autossuficiente. Esta é a especificação de analytics válida para a implementação em `clube-lp-site` — os seletores abaixo precisam existir literalmente no HTML gerado (ver `CLAUDE.md` e `SPEC.md`).

Mapa completo de eventos a configurar no contêiner GTM já existente do Clube das Profs.
Convenção de nomenclatura GA4: **snake_case**.

---

## 1. Tabela mestra de eventos

| Evento | Trigger no GTM | Seletor / Condição | Parâmetros GA4 | Onde nasce na LP |
|---|---|---|---|---|
| `view_lp` | Page View — DOM Ready | `Page Path` contains o path da LP nova (ajustar ao domínio/subdomínio final) | `lp_version: "v2"`, `hero_variant: "A1\|A2"` | Página inteira |
| `click_cta_top` | Click — Just Links | Click Element matches CSS selector `[class*="HERO-"] .lp-clube-button, .lp-clube-button[href*="add-to-cart=17307"]:first-of-type` | `cta_position: "top"`, `hero_variant: "A1\|A2"` | Hero (Seção 1) |
| `click_cta_middle` | Click — Just Links | `[class*="BENEFICIOS-CTA"] .lp-clube-button` | `cta_position: "middle"` | Seção 4 |
| `view_pricing` | Element Visibility | Selector `#clube-valor`, threshold 50%, fire once per page | `oferta_variant: "B1\|B2"` | Seção 7 |
| `click_cta_bottom` | Click — Just Links | `[class*="OFERTA-"] .lp-clube-button, #fechamento-cta .lp-clube-button` | `cta_position: "bottom"`, `oferta_variant: "B1\|B2"` | Seções 7 e 10 |
| `click_whatsapp_support` | Click — Just Links | `.lp-clube-button-suporte, a[href*="api.whatsapp.com"], a[href*="wa.me"]` | `support_origin: "lp_final"` | Seção 10 — ⚠️ o CTA de suporte trocou de WhatsApp para e-mail (`mailto:atendimento@clubedasprofs.com.br`) em 2026-07-30; o evento ainda dispara normalmente porque o seletor por classe `.lp-clube-button-suporte` continua batendo, mas o nome do evento e os seletores por href (`api.whatsapp.com`/`wa.me`) ficaram desatualizados — considerar renomear para `click_support` no contêiner GTM |
| `scroll_50` | Scroll Depth — Vertical | 50% | — | Auto |
| `scroll_90` | Scroll Depth — Vertical | 90% | — | Auto |
| `faq_open` (opcional) | Click — All Elements | `.lp-clube-sec12-accordion .accordion-title` | `faq_question: {{Click Text}}` | Seção 9 |
| `begin_checkout` | Existente — WooCommerce | Disparado pelo plugin WC após add-to-cart | (mantido como já está) | Fora desta LP |
| `purchase` | Existente — WooCommerce | Disparado na thank-you page | (mantido como já está) | Fora desta LP |

---

## 2. Configuração detalhada — `click_cta_top` (exemplo modelo)

**Variável GTM (Custom JavaScript) — `dlv.hero_variant`:**

```javascript
function() {
  var el = {{Click Element}};
  var section = el.closest('section[class*="HERO-"]');
  if (!section) return undefined;
  var match = section.className.match(/HERO-(?:PC|TB-MB)-(A[12])/);
  return match ? match[1] : undefined;
}
```

> Nota: no HTML novo (fora do Flatsome), o componente de seção precisa expor essa classe/label diretamente — não depende mais de conversão automática de atributo `label` → `class` como no Flatsome. Ver `SPEC.md`.

**Trigger — `Click Trigger / CTA Top`:**
- Type: `Click — Just Links`
- Conditions: `Click Classes` matches RegEx `(^|\s)lp-clube-button(\s|$)`; `Click Element` matches CSS selector `section[class*="HERO-"] *`

**Tag — GA4 Event `click_cta_top`:**
- Event name: `click_cta_top`
- Parâmetros: `cta_position: "top"`, `hero_variant: {{dlv.hero_variant}}`, `link_url: {{Click URL}}`

---

## 3. Configuração detalhada — `view_pricing`

**Trigger:**
- Type: `Element Visibility`, CSS Selector `#clube-valor`, mínimo 50% visível, `Once per page`

**Variável GTM — `dlv.oferta_variant`:**

```javascript
function() {
  var section = document.querySelector('section[class*="OFERTA-"]');
  if (!section) return undefined;
  var match = section.className.match(/OFERTA-(B[12])/);
  return match ? match[1] : undefined;
}
```

---

## 4. KPIs e como ler no GA4

| KPI | Como medir |
|---|---|
| **CVR LP → checkout** | `view_lp` ÷ `begin_checkout` na mesma sessão (Funnel Exploration) |
| **CVR checkout → compra** | `begin_checkout` ÷ `purchase` |
| **CTR por CTA** | Comparar `click_cta_top`, `click_cta_middle`, `click_cta_bottom` por sessão |
| **Taxa de rejeição** | GA4 nativo (Bounce Rate) |
| **Tempo médio na página** | Average Engagement Time |
| **Receita por sessão** | Total Revenue ÷ Sessions |

### Testes A/B
- **Teste A (Hero):** segmentar por `hero_variant`; sucesso = mais `click_cta_top` + `begin_checkout`.
- **Teste B (Oferta):** segmentar por `oferta_variant`; sucesso = mais `begin_checkout` + `purchase`.

---

## 5. Checklist de implementação no GTM

- [ ] Criar 2 variáveis Custom JS: `dlv.hero_variant`, `dlv.oferta_variant`.
- [ ] Criar triggers conforme tabela §1.
- [ ] Criar tags GA4 Event para cada evento novo.
- [ ] **Configurar cross-domain measurement** no GA4 entre o domínio da LP e o domínio do checkout (novo requisito — a LP não roda mais no mesmo domínio do WooCommerce). Ver `PRD.md` §Infraestrutura e domínio.
- [ ] Preview Mode: percorrer Hero → CTA top → scroll → Oferta → checkout, confirmando cada evento dispara uma única vez.
- [ ] Validar em GA4 Realtime: eventos chegam com os parâmetros corretos, incluindo a continuidade de sessão entre os dois domínios.
- [ ] Após 24h, verificar em GA4 Events que os contadores fazem sentido.
- [ ] Publicar versão do contêiner.

---

## 6. Notas finais

- **Não apagar eventos antigos** da LP atual — pausar via blocking trigger se necessário, para não quebrar comparativos históricos.
- **Custom dimensions GA4:** registrar `hero_variant`, `oferta_variant`, `cta_position` em Admin → Custom definitions.
- **Consent Mode:** confirmar se a nova LP precisa de banner de consentimento próprio (a LP antiga herdava isso do WordPress; a nova, sendo site independente, precisa da própria implementação de Consent Mode v2 se aplicável).
