# RW7 Filmes — site institucional

Vite + React + TypeScript · GSAP (ScrollTrigger) · Lenis (smooth scroll)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
```

## Onde fica cada coisa

- **Todo o texto e mídia:** `src/data/content.ts`. Os itens marcados com `// MOCK` são placeholders.
- **Seções:** `src/components/` (Hero, About, Services, Statement, Director, Works, Recognition, Cinema, Clients, Contact)
- **Visual:** `src/index.css` (as cores ficam em `:root`; a cor secundária é `--accent`)

## Trocando os mocks

| O quê | Como |
|---|---|
| Vídeos de fundo (hero, serviços, bastidores) | Coloque o `.mp4` em `public/media/` e preencha `src: '/media/arquivo.mp4'` no `footage` correspondente. Use vídeos de 10 a 20 s, mudos, em H.264 e com menos de ~8 MB. |
| Foto do diretor / imagens da TV / pôster do Quentinha | Use o componente `<Still src="/media/foto.jpg" … />` (sem `src`, aparece o placeholder) |
| Logos dos clientes | Preencha `logo: '/media/clientes/skol.svg'` em `clients.list` |
| Contato (e-mail, WhatsApp, redes) | Em `contact`, no `content.ts` |
| Link do Porta Curtas | Em `films[0].link.href` |
| Trabalhos | Adicione/edite em `works` (basta o ID do YouTube; a thumbnail é automática) |
