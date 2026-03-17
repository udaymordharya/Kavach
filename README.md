# Kavach: AI Bureaucracy Fighter

![Kavach Banner](https://img.shields.io/badge/Status-Prototype-blue) ![License](https://img.shields.io/badge/License-MIT-green)

**KAVACH** is an advanced AI-powered application designed to help individuals fight unfair bureaucratic denials. By leveraging a pipeline of specialized AI agents, KAVACH analyzes denial letters against policy documents to generate valid, legally-grounded appeal letters.


## 🛡️ Key Features

- **Document Analysis**: Upload denial letters (PDF/Images) and policy documents for deep analysis.
- **Multi-Modal Input**: Support for voice recordings and text explanations to provide context.
- **AI Agent Pipeline**: A sophisticated chain of AI agents that:
  - Extracts text from documents.
  - Analyzes policy coverage.
  - Cross-references denials with claimed policies.
  - Generates a verdict with confidence scores.
- **Actionable Results**:
  - **Appeal Letter Generation**: Automatically drafts a professional appeal letter.
  - **Risk Assessment**: Classifies the risk level (Low, Medium, High).
  - **Audit Trail**: detailed logs of the AI's reasoning process.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Installation & Setup

Prerequisites: Node.js installed on your system.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/udaymordharya/Kavach.git
    cd Kavach
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

- `src/components`: UI components for the specific stages (Upload, AgentPipeline, Results).
- `src/agents`: Logic for the AI agent interactions.
- `src/ui`: Reusable UI components (buttons, cards, etc.).

