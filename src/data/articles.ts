export interface Article {
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    publishedAt: string;
  }
  
  export const articles: Article[] = [
    {
      id: '1',
      slug: 'hiragana-basics',
      title: 'Hiragana Basics Guide',
      description: 'Learn the fundamentals of Hiragana, including writing rules and pronunciation',
      tags: ['hiragana', 'basics', 'japanese'],
      publishedAt: '2024-03-20'
    },
    {
      id: '2',
      slug: 'how-to-write-hiragana',
      title: 'How to Write Hiragana: Complete Guide',
      description: 'Master the correct stroke order and writing techniques for Hiragana characters',
      tags: ['hiragana', 'writing', 'stroke-order'],
      publishedAt: '2024-03-21'
    },
    {
      id: '3',
      slug: 'hiragana-vs-katakana',
      title: 'When to Use Hiragana vs Katakana',
      description: 'Understanding the differences and appropriate usage of Hiragana and Katakana',
      tags: ['hiragana', 'katakana', 'usage'],
      publishedAt: '2024-03-22'
    },
    {
      id: '4',
      slug: 'hiragana-furigana-guide',
      title: 'How to Add Hiragana Above Kanji',
      description: 'Learn how to write and use Furigana (reading aids) above Kanji characters',
      tags: ['hiragana', 'furigana', 'kanji'],
      publishedAt: '2024-03-23'
    },
    {
      id: '5',
      slug: 'writing-numbers-hiragana',
      title: 'How to Write Numbers in Hiragana',
      description: 'Complete guide to writing and reading numbers using Hiragana',
      tags: ['hiragana', 'numbers', 'counting'],
      publishedAt: '2024-03-24'
    },
    {
      id: '6',
      slug: 'memorize-hiragana',
      title: 'How to Memorize Hiragana Effectively',
      description: 'Proven techniques and methods to quickly memorize Hiragana characters',
      tags: ['hiragana', 'memorization', 'study-tips'],
      publishedAt: '2024-03-25'
    },
    {
      id: '7',
      slug: 'typing-hiragana',
      title: 'How to Type Hiragana on Different Devices',
      description: 'Learn to type Hiragana on computers, smartphones, and tablets',
      tags: ['hiragana', 'typing', 'digital'],
      publishedAt: '2024-03-26'
    },
    {
      id: '8',
      slug: 'common-hiragana-phrases',
      title: 'Essential Hiragana Phrases for Beginners',
      description: 'Most commonly used Hiragana phrases in daily Japanese',
      tags: ['hiragana', 'phrases', 'practical'],
      publishedAt: '2024-03-27'
    },
    {
      id: '9',
      slug: 'hiragana-pronunciation',
      title: 'Mastering Hiragana Pronunciation',
      description: 'Detailed guide to pronouncing Hiragana characters correctly',
      tags: ['hiragana', 'pronunciation', 'speaking'],
      publishedAt: '2024-03-28'
    },
    {
      id: '10',
      slug: 'hiragana-practice',
      title: 'Hiragana Practice Exercises',
      description: 'Comprehensive practice exercises for mastering Hiragana',
      tags: ['hiragana', 'practice', 'exercises'],
      publishedAt: '2024-03-29'
    },
    {
      id: '11',
      slug: 'katakana-basics',
      title: 'Katakana Basics Guide',
      description: 'Learn the fundamentals of Katakana, including character sets, usage rules, and key differences from Hiragana',
      tags: ['katakana', 'basics', 'japanese'],
      publishedAt: '2025-03-01'
    },
    {
      id: '12',
      slug: 'how-to-write-katakana',
      title: 'How to Write Katakana: Complete Guide',
      description: 'Master the correct stroke order and writing techniques for all Katakana characters, including common mistakes and practice tips',
      tags: ['katakana', 'writing', 'stroke-order'],
      publishedAt: '2026-03-04'
    },
    {
      id: '13',
      slug: 'katakana-words-guide',
      title: 'Common Katakana Words Guide',
      description: 'Essential Katakana vocabulary organized by category: food, technology, daily life, and more',
      tags: ['katakana', 'vocabulary', 'loanwords'],
      publishedAt: '2025-03-03'
    },
    {
      id: '14',
      slug: 'memorize-katakana',
      title: 'How to Memorize Katakana Effectively',
      description: 'Proven techniques for memorizing Katakana using visual mnemonics, loanword context, and spaced repetition',
      tags: ['katakana', 'memorization', 'study-tips'],
      publishedAt: '2025-03-04'
    },
    {
      id: '15',
      slug: 'katakana-pronunciation',
      title: 'Mastering Katakana Pronunciation',
      description: 'Guide to Katakana pronunciation including long vowels, double consonants, and foreign sound combinations',
      tags: ['katakana', 'pronunciation', 'speaking'],
      publishedAt: '2025-03-05'
    },
    {
      id: '16',
      slug: 'typing-katakana',
      title: 'How to Type Katakana on Different Devices',
      description: 'Learn to type Katakana on Windows, Mac, and mobile with conversion shortcuts and IME tips',
      tags: ['katakana', 'typing', 'digital'],
      publishedAt: '2025-03-06'
    },
    {
      id: '17',
      slug: 'katakana-practice',
      title: 'Katakana Practice Exercises',
      description: 'Hands-on practice exercises for reading, writing, and recognizing Katakana characters',
      tags: ['katakana', 'practice', 'exercises'],
      publishedAt: '2025-03-07'
    },
    {
      id: '18',
      slug: 'katakana-loanwords',
      title: 'Japanese Loanwords in Katakana',
      description: 'Explore how foreign words are adapted into Japanese Katakana, from English to Portuguese and beyond',
      tags: ['katakana', 'loanwords', 'vocabulary'],
      publishedAt: '2025-03-08'
    },
    {
      id: '19',
      slug: 'katakana-vs-hiragana-usage',
      title: 'When to Use Katakana vs Hiragana',
      description: 'Advanced guide to choosing between Katakana and Hiragana in different contexts',
      tags: ['katakana', 'hiragana', 'usage'],
      publishedAt: '2025-03-09'
    },
    {
      id: '20',
      slug: 'common-katakana-words',
      title: 'Essential Katakana Words for Beginners',
      description: 'Beginner-friendly Katakana vocabulary organized by difficulty level with practice exercises',
      tags: ['katakana', 'vocabulary', 'beginners'],
      publishedAt: '2025-03-10'
    }
  ];

export async function getArticleContent(slug: string): Promise<string> {
  try {
    const response = await fetch(`/articles/${slug}.md`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article content for ${slug}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Failed to load article content for ${slug}:`, error);
    throw new Error(`Article content not found for ${slug}`);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find(article => article.slug === slug);
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return articles.filter(article => article.tags.includes(tag));
}