export interface Article {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    publishedAt: string;
  }
  
  export const articles: Article[] = [
    {
      id: '1',
      slug: 'hiragana-basics',
      title: 'Hiragana Basics Guide',
      description: 'Learn the fundamentals of Hiragana, including writing rules and pronunciation',
      content: `
        # Hiragana Basics Guide
        
        Hiragana is one of the fundamental writing systems in Japanese. This guide will help you master the basics of Hiragana.
        
        ## What is Hiragana?
        
        Hiragana is the most commonly used Japanese syllabary, primarily used for:
        - Grammatical elements in Japanese
        - Writing words without kanji
        - Indicating pronunciation of kanji
        
        ## Writing Rules
        
        Each Hiragana character has specific stroke orders...
      `,
      tags: ['hiragana', 'basics', 'japanese'],
      publishedAt: '2024-03-20'
    },
    {
      id: '2',
      slug: 'how-to-write-hiragana',
      title: 'How to Write Hiragana: Complete Guide',
      description: 'Master the correct stroke order and writing techniques for Hiragana characters',
      content: '',
      tags: ['hiragana', 'writing', 'stroke-order'],
      publishedAt: '2024-03-21'
    },
    {
      id: '3',
      slug: 'hiragana-vs-katakana',
      title: 'When to Use Hiragana vs Katakana',
      description: 'Understanding the differences and appropriate usage of Hiragana and Katakana',
      content: '',
      tags: ['hiragana', 'katakana', 'usage'],
      publishedAt: '2024-03-22'
    },
    {
      id: '4',
      slug: 'hiragana-furigana-guide',
      title: 'How to Add Hiragana Above Kanji',
      description: 'Learn how to write and use Furigana (reading aids) above Kanji characters',
      content: '',
      tags: ['hiragana', 'furigana', 'kanji'],
      publishedAt: '2024-03-23'
    },
    {
      id: '5',
      slug: 'writing-numbers-hiragana',
      title: 'How to Write Numbers in Hiragana',
      description: 'Complete guide to writing and reading numbers using Hiragana',
      content: '',
      tags: ['hiragana', 'numbers', 'counting'],
      publishedAt: '2024-03-24'
    },
    {
      id: '6',
      slug: 'memorize-hiragana',
      title: 'How to Memorize Hiragana Effectively',
      description: 'Proven techniques and methods to quickly memorize Hiragana characters',
      content: '',
      tags: ['hiragana', 'memorization', 'study-tips'],
      publishedAt: '2024-03-25'
    },
    {
      id: '7',
      slug: 'typing-hiragana',
      title: 'How to Type Hiragana on Different Devices',
      description: 'Learn to type Hiragana on computers, smartphones, and tablets',
      content: '',
      tags: ['hiragana', 'typing', 'digital'],
      publishedAt: '2024-03-26'
    },
    {
      id: '8',
      slug: 'common-hiragana-phrases',
      title: 'Essential Hiragana Phrases for Beginners',
      description: 'Most commonly used Hiragana phrases in daily Japanese',
      content: '',
      tags: ['hiragana', 'phrases', 'practical'],
      publishedAt: '2024-03-27'
    },
    {
      id: '9',
      slug: 'hiragana-pronunciation',
      title: 'Mastering Hiragana Pronunciation',
      description: 'Detailed guide to pronouncing Hiragana characters correctly',
      content: '',
      tags: ['hiragana', 'pronunciation', 'speaking'],
      publishedAt: '2024-03-28'
    },
    {
      id: '10',
      slug: 'hiragana-practice',
      title: 'Hiragana Practice Exercises',
      description: 'Comprehensive practice exercises for mastering Hiragana',
      content: '',
      tags: ['hiragana', 'practice', 'exercises'],
      publishedAt: '2024-03-29'
    }
  ];