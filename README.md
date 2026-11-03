# Cantinho do Chá — Chás & Tisaanas

Site institucional e catálogo com conversão para WhatsApp, desenvolvido como site estático, pronto para GitHub + Vercel. As imagens da marca são conceitos previamente criados para este projeto.

## Arquivos

- `index.html` — estrutura, SEO, seção dos blends e kit presenteável.
- `styles.css` — identidade visual, design responsivo e animações.
- `script.js` — links específicos do WhatsApp, modal de produtos, efeitos de rolagem e menu mobile.
- `assets/` — imagens otimizadas `.webp` e logo derivado do material aprovado.
- `vercel.json` — configuração de segurança/caching para Vercel.

## Rodar localmente

Não é necessário instalar bibliotecas nem compilar. Em uma máquina com Python:

```bash
python3 -m http.server 3000
```

Abra `http://localhost:3000`.

## Publicar no GitHub

1. Crie um repositório GitHub vazio, por exemplo `cantinho-do-cha`.
2. No terminal, dentro desta pasta, execute:

```bash
git init
git add .
git commit -m "feat: site Cantinho do Chá"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cantinho-do-cha.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu nome de usuário real.

## Hospedar na Vercel

1. Vercel → **Add New Project** → **Import Git Repository**.
2. Escolha `cantinho-do-cha`.
3. **Framework Preset:** Other. **Build Command:** vazio. **Output Directory:** vazio / raiz.
4. Clique em Deploy. A Vercel publica a raiz como site estático. Caso o painel solicite **Output Directory**, selecione `.`. Não use comandos de compilação.

## Editar o número do WhatsApp

Em `script.js` altere:

```js
const phone = '5511992610461';
```

Em `index.html`, ajuste o telefone mostrado no rodapé e no JSON-LD, se necessário.

## Produtos e identidade

- **Luar:** calêndula, camomila, melissa, cidreira e passiflora.
- **Aurora:** oolong, casca de laranja, cacau e pimenta-rosa (confirmar composição comercial).
- **Chá Verde Serenata:** chá verde e hortelã egípcia.
- **Kit:** Três Rituais, conceito sob consulta.

O site usa identidade **Cantinho do Chá — Chás & Tisaanas por Lilian Mendes**, verde botânico, creme e dourado, com acentos por blend.

**Atenção:** as embalagens são mockups anteriores contendo dados ou alegações a confirmar. É necessário revisar rótulos, composição, alegações, medidas, peso líquido e informações obrigatórias antes da produção ou publicação comercial definitiva. O site não publica preços nem apresenta disponibilidade como confirmada. O clique para comprar abre o WhatsApp; não há checkout nem pagamento integrado.

## Técnicas

- Sem bibliotecas JS obrigatórias. Fontes web têm fallback local.
- Scroll reveal via `IntersectionObserver`, parallax leve, header sticky, progress bar e hover em cards.
- `prefers-reduced-motion`, menu mobile com aria-label e modal nativo `<dialog>`.
- SEO básico: title/description, Open Graph, Organization JSON-LD; configurar URL canônica/OG absoluto após a definição do domínio.
- Imagens comprimidas e carregamento tardio exceto hero.


## Antes de colocar no ar

- Confirmar a composição definitiva, alergênicos, peso e informações legais de cada blend; a arte de embalagem é ilustrativa.
- Confirmar o funcionamento do número de WhatsApp da Lilian com um clique real após a publicação.
- Conferir entrega e condições de compra, que são tratados diretamente pelo WhatsApp.
- Quando o domínio estiver definido, adicionar `rel=canonical` e mudar `og:image` para a URL absoluta da imagem publicada.
- Publicação no GitHub e criação de deploy na Vercel exigem acesso/autorização às contas; o projeto local não é publicação online.
