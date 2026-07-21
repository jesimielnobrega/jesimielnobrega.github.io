# 🚀 Portfólio Pessoal — Jesimiel Nóbrega

<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=61DAFB&center=true&vCenter=true&width=550&lines=Jesimiel+N%C3%B3brega+%E2%80%94+Portf%C3%B3lio+Moderno;React+18+%7C+Vite+5+%7C+TypeScript+%7C+Framer+Motion;Suporte+Bilingue+(PT%2FEN)+%2B+Gerador+de+CVs" alt="Portfólio Banner" />

  <p align="center">
    <b>Aplicação Web moderna, responsiva e de alta performance desenvolvida com React 18, Vite 5 e Framer Motion.</b>
  </p>

  <p align="center">
    <a href="https://github.com/jesimielnobrega"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
    <a href="https://github.com/jesimielnobrega/portfolio/actions/workflows/deploy.yml"><img src="https://img.shields.io/badge/Deploy-GitHub_Pages-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Pages Deploy" /></a>
  </p>

  <p align="center">
    <a href="https://jesimielnobrega.github.io/"><b>🌐 Ver Demonstração Online (Live Demo) »</b></a>
  </p>

</div>

---

## 📋 Índice

- [📌 Visão Geral](#-visão-geral)
- [✨ Principais Funcionalidades](#-principais-funcionalidades)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚡ Como Executar Localmente](#-como-executar-localmente)
- [📄 Gerador de CVs em PDF](#-gerador-de-cvs-em-pdf)
- [🔄 Workflow de Deploy (CI/CD)](#-workflow-de-deploy-cicd)
- [👨‍💻 Autor](#-autor)
- [📝 Licença](#-licença)

---

## 📌 Visão Geral

Este repositório contém o código-fonte do portfólio pessoal e profissional de **Jesimiel Nóbrega** (*Fullstack Developer & Tech Lead*). A plataforma foi concebida para apresentar projetos de grande escala (**nacional e provincial em Angola**), princípios de arquitetura de software, stack técnica e opções de contacto interativo.

Possui **suporte bilingue automático (PT/EN)**, motor de suporte a **múltiplos formatos de CV exportáveis em PDF**, micro-animações fluidas orientadas a performance e design responsivo otimizado para dispositivos móveis e desktops.

---

## ✨ Principais Funcionalidades

- 🌐 **Internacionalização (i18n):** Alternância instantânea entre Português e Inglês com tipagem TypeScript estrita.
- 🎨 **Design & Micro-interações:** Animações de entrada, scroll progressivo, efeitos parallax e carrossel infinito (*marquee*) construídos com `Framer Motion` e `Tailwind CSS`.
- 📜 **Motor de CVs Multi-Tema:** Sistema integrado de visualização e exportação de CVs em formato **A4** (Português/Inglês x Tema Claro/Tema Escuro).
- 🖨️ **Automação de PDFs:** Script com Puppeteer headless (`generate-pdfs.ts`) para compilar automaticamente os ficheiros `.html` de CV para `.pdf` prontos a distribuir.
- ⚡ **Build Utrafast:** Configurado com **Vite 5** para arranque instantâneo do servidor de desenvolvimento e bundling de produção otimizado.
- 🚀 **Deploy Automatizado:** Integrado com GitHub Actions para publicar alterações em tempo real no GitHub Pages.

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia / Ferramenta | Descrição |
| :--- | :--- | :--- |
| **Core UI** | [React 18](https://react.dev/) | Biblioteca UI reativa com componentes tipados em TypeScript |
| **Build System** | [Vite 5](https://vitejs.dev/) | Bundler moderno de alta performance baseado em ES Modules |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estrita e segurança em tempo de compilação |
| **Animações** | [Framer Motion 11](https://framer.com/motion) | Biblioteca de animações físicas, scrollspy e transições de estado |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Framework utility-first com design tokens modernos e CSS customizado |
| **Ícones** | [Lucide React](https://lucide.dev/) | Coleção de ícones vetoriais leves e acessíveis |
| **Automação PDF** | [Puppeteer Core](https://pptr.dev/) | Script Headless Chrome para renderização A4 e exportação PDF |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Deploy automático para GitHub Pages em cada push para `main` |

---

## 📁 Estrutura do Projeto

```bash
react-vite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD de Build & Deploy no GitHub Pages
├── public/
│   ├── assets/                 # Fotos, logos de projetos e ícones de tecnologia
│   ├── cv/                     # Templates HTML dos CVs (PT/EN, Claro/Escuro)
│   └── favicon.svg             # Favicon vetorial da aplicação
├── src/
│   ├── components/             # Componentes React reutilizáveis (Hero, Projects, Stack, UI...)
│   ├── hooks/                  # Custom Hooks (useScrollSpy, etc.)
│   ├── App.tsx                 # Layout principal e montagem das secções
│   ├── data.ts                 # Configuração dos dados de projetos e stack
│   ├── i18n.ts                 # Motor e dicionários de tradução (PT/EN)
│   ├── index.css               # Estilos globais, keyframes e variáveis CSS
│   └── main.tsx                # Ponto de entrada da aplicação React
├── generate-pdfs.ts            # Script TypeScript de geração automática de PDFs
├── me.md                       # README principal do perfil GitHub (@jesimielnobrega)
├── index.html                  # Template HTML da SPA
├── vite.config.ts              # Configuração do Vite (base paths, plugins)
└── package.json                # Dependências e scripts do projeto
```

---

## ⚡ Como Executar Localmente

### Pré-requisitos
- **Node.js** v18.0.0 ou superior
- **npm** v9.0.0 ou superior

### 1. Clonar o repositório
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
O servidor ficará acessível no endereço indicado no terminal (por defeito: `http://localhost:5173`).

### 4. Verificar tipos (TypeScript)
```bash
npm run typecheck
```

### 5. Compilação para produção
```bash
npm run build
```
Os ficheiros estáticos compilados serão gerados na diretoria `/dist`.

### 6. Pré-visualizar o build de produção
```bash
npm run preview
```

---

## 📄 Gerador de CVs em PDF

O projeto possui um utilitário interno em `generate-pdfs.ts` que abre os ficheiros HTML presentes em `public/cv/` e converte-os automaticamente em PDFs com formato A4 exato.

Para gerar ou atualizar os PDFs localmente:
```bash
npm run generate-pdfs
```

---

## 🔄 Workflow de Deploy (CI/CD)

O projeto possui um workflow configurado em `.github/workflows/deploy.yml`.

### Como publicar a sua própria versão:
1. Faça o push das suas alterações para a branch `main`:
   ```bash
   git add .
   git commit -m "feat: melhorias no portfólio"
   git push origin main
   ```
2. No repositório GitHub, aceda a **Settings → Pages**.
3. Em **Build and deployment**, certifique-se de que a **Source** está definida para **Deploy from a branch** e a branch para **`gh-pages`** / **`/ (root)`**.
4. O deploy será efetuado automaticamente a cada `git push` na branch `main`.

---

## 👨‍💻 Autor

**Jesimiel Nóbrega** — *Fullstack Developer & Tech Lead*

- 💼 **LinkedIn:** [linkedin.com/in/jesimielnobrega](https://linkedin.com/in/jesimielnobrega)
- ✉️ **Email:** [jesimielnobrega25@gmail.com](mailto:jesimielnobrega25@gmail.com)
- 📱 **WhatsApp:** [+244 942 031 240](https://wa.me/244942031240)
- 🌐 **Portfólio:** [jesimielnobrega.github.io](https://jesimielnobrega.github.io/)

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Consulte o ficheiro `LICENSE` para mais detalhes.