# Nelson-GPT

A pediatric AI assistant powered by the Nelson Textbook of Pediatrics.

## Overview

Nelson-GPT is a Progressive Web Application (PWA) that provides healthcare professionals and medical students with instant access to pediatric medical information from the Nelson Textbook of Pediatrics. The application uses a Retrieval-Augmented Generation (RAG) system to provide accurate, contextual responses to medical queries.

## Features

- **Progressive Web App**: Fully installable on Android & iOS with offline capabilities
- **Modern UI/UX**: Clean interface with smooth transitions using React and Tailwind CSS
- **RAG System**: Combines vector search of the Nelson Textbook with Mistral AI for accurate responses
- **Offline Support**: Access previously viewed content even without an internet connection
- **Real-time Responses**: Streaming API responses for immediate feedback

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **State Management**: React Hooks
- **PWA Features**: Service Worker, IndexedDB, Web App Manifest
- **Vector Database**: Supabase with pgvector
- **Embeddings**: Sentence Transformers (all-MiniLM-L6-v2)
- **AI Model**: Mistral API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+
- npm or pnpm
- Supabase account with the Nelson Textbook data
- Mistral API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   MISTRAL_API_KEY=your_mistral_api_key
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

```
nelson-gpt/
├── public/               # Static assets
│   ├── icons/            # PWA icons
│   ├── lottie/           # Lottie animations
│   ├── manifest.json     # PWA manifest
│   ├── service-worker.js # Service worker for offline functionality
│   └── offline.html      # Offline fallback page
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   │   └── chat/     # Chat API endpoint
│   │   └── page.tsx      # Main application page
│   ├── components/       # React components
│   │   ├── chat/         # Chat interface components
│   │   ├── layout/       # Layout components
│   │   ├── pwa/          # PWA-specific components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   │   └── usePWA.ts     # PWA-related hooks
│   ├── lib/              # Utility functions
│   │   ├── api/          # API integrations
│   │   ├── db/           # Database operations
│   │   └── rag/          # RAG system
│   └── tests/            # Test files
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
└── vercel.json           # Vercel deployment configuration
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Nelson Textbook of Pediatrics for the medical content
- Mistral AI for the language model
- Supabase for the vector database
