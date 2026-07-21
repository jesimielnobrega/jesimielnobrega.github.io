# 🚀 O Meu Portfólio Pessoal — Jesimiel Nóbrega

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=61DAFB&center=true&vCenter=true&width=550&lines=Jesimiel+N%C3%B3brega+%E2%80%94+Portf%C3%B3lio+Pessoal;React+18+%7C+Vite+5+%7C+TypeScript+%7C+Framer+Motion;Suporte+Bilingue+(PT%2FEN)+%2B+Gerador+de+CVs" alt="Portfólio Banner" />

  <p align="center">
    <b>Boas-vindas ao meu repositório! Esta é a minha aplicação Web pessoal, moderna e de alta performance que desenvolvi com React 18, Vite 5, TypeScript e Framer Motion.</b>
  </p>

  <p align="center">
    <a href="https://github.com/jesimielnobrega"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://github.com/jesimielnobrega/portfolio/actions/workflows/deploy.yml"><img src="https://img.shields.io/badge/Deploy-GitHub_Pages-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Pages Deploy" /></a>
  </p>

  <p align="center">
    <a href="https://jesimielnobrega.github.io/"><b>🌐 Experimenta a minha aplicação online (Live Demo) »</b></a>
  </p>

</div>

---

## 📋 Índice

- [📌 Visão Geral](#-visão-geral)
- [✨ O Que Desenvolvi neste Projeto](#-o-que-desenvolvi-neste-projeto)
- [🛠️ A Minha Stack Tecnológica](#️-a-minha-stack-tecnológica)
- [📁 Estrutura do Meu Código](#-estrutura-do-meu-código)
- [⚡ Como Executar o Meu Projeto Localmente](#-como-executar-o-meu-projeto-localmente)
- [📄 O Meu Gerador de CVs em PDF](#-o-meu-gerador-de-cvs-em-pdf)
- [🔄 O Meu Workflow de Deploy (CI/CD)](#-o-meu-workflow-de-deploy-cicd)
- [👨‍💻 Sobre Mim & Contactos](#-sobre-mim--contactos)
- [📝 Licença](#-licença)

---

## 📌 Visão Geral

Criei este repositório para disponibilizar o código-fonte do meu portfólio pessoal e profissional. Desenvolvi esta aplicação com o objetivo de apresentar os meus projetos de grande escala (**nacional e provincial em Angola**), partilhar a minha stack tecnológica e demonstrar as minhas práticas de arquitetura de software e liderança técnica.

No meu portfólio, implementei **suporte bilingue automático (PT/EN)**, um **sistema próprio de geração e exportação de CVs em PDF** (formatos A4 em temas claro e escuro), micro-animações fluidas orientadas a performance e um layout totalmente responsivo para dispositivos móveis e desktop.

---

## ✨ O Que Desenvolvi neste Projeto

- 🌐 **Internacionalização Própria (i18n):** Projetei o motor de traduções para alternância instantânea entre Português e Inglês com tipagem estrita no TypeScript.
- 🎨 **Design & Micro-interações Otimizadas:** Desenvolvi animações de entrada, scroll progressivo, efeitos parallax e um carrossel de tecnologias (*marquee*) utilizando `Framer Motion` e `Tailwind CSS`.
- 📜 **Motor de CVs Multi-Tema:** Criei um sistema de visualização de currículos com suporte a 4 variantes (Português/Inglês x Tema Claro/Tema Escuro), formatados rigorosamente em padrão A4.
- 🖨️ **Automação de PDFs com Puppeteer:** Escrevi o script `generate-pdfs.ts` para compilar automaticamente os ficheiros `.html` dos meus CVs em ficheiros `.pdf` prontos a descarregar.
- ⚡ **Build de Alta Performance:** Configurei a aplicação com **Vite 5** para garantir tempos de carregamento ultra-rápidos e bundling leve.
- 🚀 **Deploy Automatizado:** Configurei a integração contínua com GitHub Actions para publicar as minhas atualizações automaticamente.

---

## 🛠️ A Minha Stack Tecnológica

| Categoria | Tecnologia / Ferramenta | Como a utilizei no meu projeto |
| :--- | :--- | :--- |
| **Core UI** | [React 18](https://react.dev/) | Construção dos meus componentes reutilizáveis e reativos em TypeScript |
| **Build System** | [Vite 5](https://vitejs.dev/) | Bundler rápido para dev server instantâneo e build otimizado |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estrita para segurança de código e autocompletion |
| **Animações** | [Framer Motion 11](https://framer.com/motion) | Criação das animações de scroll, transições e interações visuais |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utility-first com design tokens personalizados |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones vetoriais modernos e leves para a interface |
| **Automação PDF** | [Puppeteer Core](https://pptr.dev/) | Script Headless Chrome que programei para exportar os meus CVs |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Automação do meu processo de build e deploy |

---

## 📁 Estrutura do Meu Código

```bash
react-vite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # O meu workflow de CI/CD para deploy automático
├── public/
│   ├── assets/                 # Minhas fotografias, logos de projetos e ícones
│   ├── cv/                     # Meus templates HTML de CV (PT/EN, Claro/Escuro)
│   └── favicon.svg             # Favicon personalizado da aplicação
├── src/
│   ├── components/             # Os meus componentes React (Hero, Projects, Stack, UI...)
│   ├── hooks/                  # Meus custom hooks (useScrollSpy, etc.)
│   ├── App.tsx                 # Componente raiz e estruturação da página
│   ├── data.ts                 # Configuração dos meus projetos, experiências e stack
│   ├── i18n.ts                 # O meu motor e dicionários de tradução (PT/EN)
│   ├── index.css               # Estilos globais e variáveis de design
│   └── main.tsx                # Ponto de entrada da aplicação
├── generate-pdfs.ts            # O meu script TypeScript de geração automática de PDFs
├── me.md                       # O meu README de perfil para o GitHub (@jesimielnobrega)
├── index.html                  # Template HTML base da minha SPA
├── vite.config.ts              # A minha configuração do Vite
└── package.json                # Dependências e scripts do meu projeto
```

---

## ⚡ Como Executar o Meu Projeto Localmente

Se quiseres testar ou rodar a minha aplicação no teu ambiente local, basta seguires os passos abaixo:

### Pré-requisitos
- **Node.js** (v18.0.0 ou superior)
- **npm** (v9.0.0 ou superior)

### 1. Clonar o meu repositório
```bash
git clone https://github.com/jesimielnobrega/portfolio.git
cd portfolio
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O meu servidor ficará acessível no teu navegador em `http://localhost:5173`.

### 4. Verificar a tipagem do meu código
```bash
npm run typecheck
```

### 5. Gerar o build de produção
```bash
npm run build
```

---

## 📄 O Meu Gerador de CVs em PDF

Programei um script em `generate-pdfs.ts` que utiliza o Puppeteer em modo headless para ler os meus ficheiros de CV em HTML (`public/cv/`) e convertê-los automaticamente para formato PDF A4.

Se quiseres gerar ou atualizar os PDFs localmente:
```bash
npm run generate-pdfs
```

---

## 🔄 O Meu Workflow de Deploy (CI/CD)

Criei um pipeline de deploy em `.github/workflows/deploy.yml`. Sempre que faço um `git push` para a branch `main`, o meu workflow compila o projeto e atualiza o site no GitHub Pages.

---

## 👨‍💻 Sobre Mim & Contactos

Olá! Eu sou o **Jesimiel Nóbrega** — *Fullstack Developer & Tech Lead*. Lidero equipas técnicas e desenvolvo soluções de grande escala em Angola (como o **Acesso ETP** e o **SIPE-GPEL**).

- 💼 **LinkedIn:** [linkedin.com/in/jesimielnobrega](https://linkedin.com/in/jesimielnobrega)
- ✉️ **Email:** [jesimielnobrega25@gmail.com](mailto:jesimielnobrega25@gmail.com)
- 📱 **WhatsApp:** [+244 942 031 240](https://wa.me/244942031240)
- 🌐 **O Meu Portfólio Live:** [jesimielnobrega.github.io](https://jesimielnobrega.github.io/)

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Sente-te à vontade para explorar o meu código!