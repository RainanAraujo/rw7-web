/**
 * Conteúdo do site RW7.
 * Tudo marcado com `MOCK` é placeholder — troque quando tiver o material final.
 *
 * Vídeos: coloque os .mp4 em /public/media e preencha o campo `src`
 * (ex.: src: '/media/hero.mp4'). Sem `src`, o site mostra um placeholder animado.
 */

export type Footage = {
  /** vídeo horizontal (16:9) em /public/media — vazio = placeholder */
  src?: string
  /** opcional: versão vertical (9:16) para celular em pé */
  srcMobile?: string
  /** imagem mostrada enquanto o vídeo carrega (e se o autoplay for bloqueado) */
  poster?: string
  posterMobile?: string
  /**
   * ponto do quadro que deve ficar visível quando o vídeo é recortado
   * (CSS object-position). Ex.: '30% 50%' mantém o lado esquerdo no celular.
   */
  focus?: string
  /** nome do arquivo esperado (aparece no placeholder) */
  label: string
}

export const nav = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'diretor', label: 'Rwanyto Oscar' },
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'cinema', label: 'Cinema' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contato', label: 'Contato' },
]

export const hero = {
  // MOCK — quando tiver o vídeo:
  // footage: {
  //   src: '/media/hero.mp4',              // 16:9, ~1920px, 10–20s, sem áudio
  //   srcMobile: '/media/hero-vertical.mp4', // 9:16, ~1080px (opcional)
  //   poster: '/media/hero.jpg',
  //   posterMobile: '/media/hero-vertical.jpg',
  //   label: 'hero',
  // },
  footage: { label: 'hero.mp4 + hero-vertical.mp4' } as Footage,
  title: ['Será que', 'dá pra', 'fazer?'],
  sub: 'Por aqui, a resposta costuma começar com uma ideia.',
}

export const about = {
  lead:
    'A RW7 é uma produtora audiovisual que gosta de desafios. Principalmente daqueles que chegam acompanhados de um “será que dá pra fazer?”.',
  paragraphs: [
    'Não somos muito de ficar esperando um roteiro pronto. Preferimos sentar junto, entender o problema, trocar ideias e encontrar caminhos. Às vezes, a solução está numa grande produção. Às vezes, numa ideia simples que ninguém tinha pensado.',
    'Também não acreditamos que criatividade e planejamento sejam coisas opostas. Uma boa ideia precisa funcionar fora do papel. E é aí que entram a experiência, a técnica e uma equipe que sabe transformar possibilidades em realidade.',
    'Mudam os clientes, os formatos, as tecnologias e os desafios. Nossa maneira de trabalhar continua a mesma: pensar junto, criar com liberdade e assumir a responsabilidade de fazer acontecer.',
  ],
  pillars: ['Pensar junto', 'Criar com liberdade', 'Fazer acontecer'],
}

export const services = [
  {
    title: 'Publicidade',
    text: 'Comerciais e filmes para marcas que querem ser lembradas.',
    footage: { label: 'publicidade.mp4' } as Footage, // MOCK
  },
  {
    title: 'Filmes institucionais',
    text: 'A história da sua empresa contada do jeito que as pessoas sentem.',
    footage: { label: 'institucional.mp4' } as Footage, // MOCK
  },
  {
    title: 'Videoclipes',
    text: 'Da ideia ao corte final, com a música no centro de tudo.',
    footage: { label: 'videoclipes.mp4' } as Footage, // MOCK
  },
  {
    title: 'Grandes eventos',
    text: 'Bastidores de festivais, multidões e aftermovies desde antes de terem esse nome.',
    footage: { label: 'eventos.mp4' } as Footage, // MOCK
  },
  {
    title: 'Campanhas',
    text: 'Estratégia, roteiro e produção para campanhas que precisam chegar longe.',
    footage: { label: 'campanhas.mp4' } as Footage, // MOCK
  },
  {
    title: 'Conteúdo para todas as telas',
    text: 'Do telão ao vertical no celular. Cada formato com sua linguagem.',
    footage: { label: 'conteudo.mp4' } as Footage, // MOCK
  },
]

export const statement = {
  footage: { label: 'bastidores_equipe.mp4' } as Footage, // MOCK
  lines: [
    'Tem produção que pede uma equipe inteira.',
    'Outras precisam de um celular na mão e uma ideia na cabeça.',
  ],
  quote: 'Glauber Rocha que nos perdoe, mas os tempos mudaram.',
  punch: 'A criatividade, não.',
}

export const director = {
  name: 'Rwanyto Oscar',
  nickname: 'O Cineasta do Povo',
  portrait: { label: 'rwanyto_retrato.jpg' }, // MOCK
  intro:
    'Nasceu em Pedreiras, no interior do Maranhão, filho de artistas circenses. Talvez venha daí essa mania de achar que tudo pode virar espetáculo. Ou, pelo menos, um bom vídeo.',
  outro:
    'Gosta de dirigir, de inventar soluções e de fazer acontecer. Não é muito de esperar o cenário perfeito, o equipamento perfeito ou a ideia chegar pronta. Gosta de histórias que as pessoas entendem, sentem e, principalmente, nas quais conseguem se reconhecer.',
  timeline: [
    {
      mark: 'Pedreiras · MA',
      title: 'Filho do circo',
      text: 'Cresceu entre picadeiros e lonas. O espetáculo veio de berço.',
    },
    {
      mark: 'TV local',
      title: 'Aprendeu fazendo',
      text: 'Descobriu cedo que uma boa ideia podia resolver muita coisa.',
    },
    {
      mark: '2007',
      title: 'Nasce a RW7 Filmes',
      text: 'Com um carimbo, um computador e uma câmera que veio depois.',
    },
    {
      mark: 'TV nacional',
      title: 'Do interior ao Jô',
      text: 'Comerciais, curtas e videoclipes que chegaram à televisão nacional — um deles, ao Programa do Jô.',
    },
    {
      mark: 'Fortaleza',
      title: 'A música abriu caminho',
      text: 'O trabalho com o Forró Sacode, de Tony Guerra, levou a novos palcos e a um mercado cheio de possibilidades.',
    },
    {
      mark: '15 anos',
      title: 'Fortal',
      text: 'Aftermovies quando quase ninguém chamava assim. Palcos, multidões e muitas noites sem dormir.',
    },
    {
      mark: 'Brasil & mundo',
      title: 'Marcas, artistas, campanhas',
      text: 'Rodou o Brasil e projetos fora do país. A solução quase sempre começa do mesmo jeito: com uma boa ideia.',
    },
  ],
}

export type Work = {
  id: string
  youtube: string
  title: string
  client: string
  category: string
}

export const workCategories = ['Todos', 'Institucional', 'TV', 'Clipe', 'Shows', 'Backstage']

export const works: Work[] = [
  { id: 'piaui-1', youtube: 'E2Ga1U3a89A', title: 'Tai Piauí', client: 'Governo do Piauí', category: 'Institucional' },
  { id: 'babacu', youtube: '58KTBOF7zA4', title: 'Babaçu Love', client: 'Backstage', category: 'Backstage' },
  { id: 'globo-1', youtube: 'x823XEosbgU', title: 'Verdes Mares — 01', client: 'Globo / Verdes Mares', category: 'TV' }, // MOCK título
  { id: 'clipe-1', youtube: 'A3sPqBc5jxc', title: 'Clipe musical', client: 'Videoclipe', category: 'Clipe' }, // MOCK título
  { id: 'piaui-2', youtube: 'Ke2f5tapVZM', title: 'Tai Piauí — 02', client: 'Governo do Piauí', category: 'Institucional' },
  { id: 'globo-2', youtube: '65TgapGlD3w', title: 'Verdes Mares — 02', client: 'Globo / Verdes Mares', category: 'TV' }, // MOCK título
  { id: 'shows-1', youtube: 'QCZIqumwAxE', title: 'Cobertura de shows', client: 'Ao vivo', category: 'Shows' }, // MOCK título
  { id: 'globo-3', youtube: 'GlAZm8bGFV8', title: 'Verdes Mares — 03', client: 'Globo / Verdes Mares', category: 'TV' }, // MOCK título
  { id: 'globo-4', youtube: 'Ci4xz3RFY_k', title: 'Verdes Mares — 04', client: 'Globo / Verdes Mares', category: 'TV' }, // MOCK título
]

export const recognition = {
  title: 'Reconhecimento nacional',
  text: 'Ao longo da nossa trajetória, produções da RW7 ganharam espaço em programas como Jô Soares, Altas Horas, Programa Silvio Santos, Domingão, É de Casa e Encontro.',
  punch: 'Daquelas ideias que começaram pequenas e foram parar na televisão de milhões de brasileiros.',
  shows: ['Jô Soares', 'Altas Horas', 'Programa Silvio Santos', 'Domingão', 'É de Casa', 'Encontro'],
  // MOCK — imagens editadas de bastidores / aparições na TV
  stills: [
    { label: 'bastidor_01.jpg' },
    { label: 'jo_soares.jpg' },
    { label: 'bastidor_02.jpg' },
    { label: 'altas_horas.jpg' },
    { label: 'domingao.jpg' },
    { label: 'bastidor_03.jpg' },
  ],
}

export const films = [
  {
    id: 'quentinha',
    title: 'Quentinha',
    meta: 'Curta-metragem · Ficção',
    synopsis: [
      'Um casal começa a vender quentinhas para complementar a renda. Quando o dinheiro não é suficiente, os dois passam a procurar maneiras secretas de ganhar um pouco mais.',
      'Uma história sobre relacionamentos, dificuldades financeiras e segredos.',
    ],
    poster: { label: 'quentinha_poster.jpg' }, // MOCK
    youtube: undefined as string | undefined,
    link: { label: 'Ver no Porta Curtas', href: '#' }, // MOCK — link do Porta Curtas não veio no briefing
  },
  {
    id: 'a-gosto-de-deus',
    title: 'A Gosto de Deus',
    meta: 'Curta-metragem · Ficção',
    synopsis: [
      'No sertão do Maranhão, onde a terra exige tanto de quem vive dela, um casal de agricultores divide os dias entre o trabalho na roça, as dificuldades da vida e os pequenos gestos de afeto.',
      'Com a descoberta de uma gravidez inesperada, chegam esperanças, incertezas e acontecimentos que desafiam aquilo em que acreditam.',
      'Um filme em que o sertão é mais do que cenário. É testemunha silenciosa dos encontros entre a vida, a morte e aquilo que só a fé tenta explicar.',
    ],
    poster: { label: 'a_gosto_de_deus_poster.jpg' },
    youtube: 'M34vmDvDgyg' as string | undefined,
    link: undefined as { label: string; href: string } | undefined,
  },
]

export const clients = {
  title: 'Boas ideias também nascem de boas parcerias.',
  text: 'Ao longo da nossa trajetória, tivemos a oportunidade de criar para marcas, empresas e projetos de diferentes segmentos. Cada parceria trouxe um novo desafio. E cada desafio, uma nova história para contar.',
  // MOCK — trocar `logo` pelo caminho do SVG/PNG em /public/media/clientes
  list: [
    { name: 'Beach Park', logo: '' },
    { name: 'Fortal', logo: '' },
    { name: 'BSPAR', logo: '' },
    { name: 'DMV Imóveis', logo: '' },
    { name: 'Skol', logo: '' },
    { name: 'TV Clube', logo: '' },
    { name: 'Governo do Ceará', logo: '' },
    { name: 'Governo do Piauí', logo: '' },
    { name: 'Siriguella', logo: '' },
  ],
}

export const contact = {
  pre: 'No fim das contas, não queremos ser apenas a produtora que você chama para fazer um vídeo.',
  headline: 'Queremos ser a produtora que você chama quando precisa encontrar uma solução.',
  // MOCK — dados de contato não vieram no briefing
  email: 'contato@rw7filmes.com.br',
  phone: '+55 (85) 90000-0000',
  whatsapp: 'https://wa.me/5585900000000',
  city: 'Fortaleza · CE — Brasil',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Vimeo', href: '#' },
  ],
}
