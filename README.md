# 🚀 Portfólio Web — Jesimiel Nóbrega

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=61DAFB&center=true&vCenter=true&width=550&lines=Jesimiel+N%C3%B3brega+%E2%80%94+Portf%C3%B3lio+Web;React+18+%7C+Vite+5+%7C+TypeScript+%7C+Framer+Motion;Suporte+Bilingue+(PT%2FEN)+%2B+Gerador+de+CVs" alt="Portfólio Banner" />

  <p align="center">
    <b>Aplicação Web moderna, responsiva e de alta performance desenvolvida com React 18, Vite 5, TypeScript e Framer Motion.</b>
  </p>

  <p align="center">
    <a href="https://github.com/jesimielnobrega"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://github.com/jesimielnobrega/portfolio/actions/workflows/deploy.yml"><img src="https://img.shields.io/badge/Deploy-GitHub_Pages-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Pages Deploy" /></a>
  </p>

  <p align="center">
    <a href="https://portfolio-ruby-eight-80.vercel.app/"><b>🚀 Ver no Vercel (Recomendado) »</b></a>
    &nbsp; | &nbsp;
    <a href="https://jesimielnobrega.github.io/"><b>🌐 Ver no GitHub Pages »</b></a>
  </p>

</div>

---

## 📋 Índice

- [📌 Visão Geral](#-visão-geral)
- [✨ Funcionalidades Destacadas](#-funcionalidades-destacadas)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📁 Estrutura do Repositório](#-estrutura-do-repositório)
- [⚡ Execução Local](#-execução-local)
- [📄 Automação de CVs em PDF](#-automação-de-cvs-em-pdf)
- [🔄 Pipeline de CI/CD](#-pipeline-de-cicd)
- [👨‍💻 Contactos & Perfil](#-contactos--perfil)
- [📝 Licença](#-licença)

---

## 📌 Visão Geral

Este repositório disponibiliza o código-fonte da aplicação Web do portfólio profissional de **Jesimiel Nóbrega** (Fullstack Developer & Tech Lead). O projeto apresenta a trajetória técnica, arquitetura de software e soluções institucionais e empresariais concebidas em Angola (como o **Acesso ETP** e o **SIPE-GPEL**).

A aplicação conta com **suporte bilingue automático (PT/EN)**, **módulos interativos**, **geração automatizada de currículos A4 em PDF** e animações fluidas focadas em performance e acessibilidade universal (desktop e dispositivos móveis).

---

## ✨ Funcionalidades Destacadas

- 🎮 **Mini-Jogo Arcade (*Bug Hunter: Tech Lead Edition*):** Jogo 2D em HTML5 Canvas com Web Audio API e controlos táteis inclusivos para dispositivos móveis (DPad virtual) e PC (disparo contínuo com barra de espaço).
- 🧠 **Desafio Lógico (*Logic Architect*):** Jogo de memória e lógica de arquitetura de software com registo de recordes locais e estatísticas de jogadas.
- 💻 **Consola CLI (*Nóbrega Shell*):** Terminal de linha de comandos acessível por atalho (`Ctrl + K`) ou dock com atalhos táteis para navegação rápida em smartphones.
- 🌐 **Internacionalização (i18n):** Motor de tradução próprio para alternância instantânea entre Português e Inglês com tipagem estrita em TypeScript.
- 🎨 **Dock Flutuante Glassmorphism:** Interface de atalhos em estilo macOS/Pinterest com magnificação por física de molas e adaptação automática ao tema claro/escuro.
- 📜 **Motor de CVs Multi-Tema:** Templates HTML/CSS formatados estritamente em norma A4 com opções em Português e Inglês (temas Claro e Escuro).
- 🖨️ **Exportação de PDFs com Puppeteer:** Script Headless Chrome (`generate-pdfs.ts`) para compilação e exportação de currículos para PDF.

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia / Ferramenta | Aplicação |
| :--- | :--- | :--- |
| **Core UI** | [React 18](https://react.dev/) | Arquitetura de componentes reutilizáveis e reativos |
| **Build System** | [Vite 5](https://vitejs.dev/) | Dev server instantâneo e bundling otimizado |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estrita para segurança de código |
| **Animações** | [Framer Motion 11](https://framer.com/motion) | Transições, micro-interações e físicas de molas |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Design tokens e estilização utilitária |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones vetoriais leves para a interface |
| **Automação PDF** | [Puppeteer Core](https://pptr.dev/) | Compilação automatizada de CVs para PDF |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Pipeline de compilação e deploy automático |

---

## 📁 Estrutura do Repositório

```bash
react-vite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de CI/CD para deploy automático
├── public/
│   ├── assets/                 # Fotografias, logos de projetos e ícones vetoriais
│   ├── cv/                     # Templates HTML de CV (PT/EN, Claro/Escuro)
│   └── favicon.svg             # Favicon da aplicação
├── src/
│   ├── components/             # Componentes React (Hero, Projects, Stack, Games, Dock...)
│   ├── hooks/                  # Custom hooks (useScrollSpy, etc.)
│   ├── App.tsx                 # Componente raiz e estruturação da página
│   ├── data.ts                 # Configuração de projetos, trajetórias e competências
│   ├── i18n.ts                 # Dicionários e motor de tradução (PT/EN)
│   ├── index.css               # Estilos globais, temas e variáveis CSS
│   └── main.tsx                # Ponto de entrada da aplicação
├── generate-pdfs.ts            # Script TypeScript para geração de PDFs com Puppeteer
├── me.md                       # Documentação de perfil para o GitHub
└── index.html                  # Template HTML base da SPA
```

---

## ⚡ Execução Local

Para testar ou executar a aplicação localmente:

### Pré-requisitos
- **Node.js** (v18.0.0 ou superior)
- **npm** (v9.0.0 ou superior)

### 1. Clonar o repositório
```bash
git clone https://github.com/jesimielnobrega/jesimielnobrega.github.io.git
cd jesimielnobrega.github.io
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Aceda a `http://localhost:5173` no navegador.

### 4. Verificar a tipagem do código
```bash
npm run typecheck
```

### 5. Compilar para produção
```bash
npm run build
```

---

## 📄 Automação de CVs em PDF

O script `generate-pdfs.ts` executa o Puppeteer em modo headless para compilar os templates HTML de `public/cv/` diretamente em PDFs em conformidade com o formato A4:

```bash
npm run generate-pdfs
```

---

## 🔄 Pipeline de CI/CD

O workflow `.github/workflows/deploy.yml` executa automaticamente a compilação do projeto a cada `push` para a branch `main`, publicando o bundle resultante na branch `gh-pages` e no Vercel.

---

## 👨‍💻 Contactos & Perfil

- **Jesimiel Nóbrega** — *Fullstack Developer & Tech Lead @ SOSOFT LDA*
- 💼 **LinkedIn:** [linkedin.com/in/jesimielnobrega](https://linkedin.com/in/jesimielnobrega)
- ✉️ **Email:** [jesimielnobrega25@gmail.com](mailto:jesimielnobrega25@gmail.com)
- 📱 **WhatsApp:** [+244 942 031 240](https://wa.me/244942031240)
- 🌐 **Vercel Live:** [portfolio-ruby-eight-80.vercel.app](https://portfolio-ruby-eight-80.vercel.app/)
- 🌐 **GitHub Pages:** [jesimielnobrega.github.io](https://jesimielnobrega.github.io/)

---

## 📝 Licença

Este projeto está sob a licença **MIT**.