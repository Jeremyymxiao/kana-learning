import { Metadata } from 'next';
import { getArticleBySlug } from '@/data/articles';
import { routing } from '../../../../../i18n.config';

const baseUrl = 'https://learnkana.pro';

// Multilingual article metadata - properly translated for each language
const articleTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  'hiragana-basics': {
    en: {
      title: 'Hiragana Basics Guide: Complete Introduction to Japanese Writing',
      description: 'Master Hiragana fundamentals with our comprehensive guide. Learn writing rules, pronunciation, stroke order, and practice techniques for Japanese learners.'
    },
    de: {
      title: 'Hiragana-Grundlagen: Vollständige Einführung in die japanische Schrift',
      description: 'Beherrschen Sie die Grundlagen von Hiragana mit unserem umfassenden Leitfaden. Lernen Sie Schreibregeln, Aussprache, Strichreihenfolge und Übungstechniken.'
    },
    fr: {
      title: 'Guide des bases Hiragana : Introduction complète à l\'écriture japonaise',
      description: 'Maîtrisez les fondamentaux des Hiragana avec notre guide complet. Apprenez les règles d\'écriture, la prononciation, l\'ordre des traits et les techniques de pratique.'
    },
    pt: {
      title: 'Guia Básico de Hiragana: Introdução Completa à Escrita Japonesa',
      description: 'Domine os fundamentos do Hiragana com nosso guia abrangente. Aprenda regras de escrita, pronúncia, ordem dos traços e técnicas de prática.'
    },
    es: {
      title: 'Guía Básica de Hiragana: Introducción Completa a la Escritura Japonesa',
      description: 'Domina los fundamentos del Hiragana con nuestra guía completa. Aprende reglas de escritura, pronunciación, orden de trazos y técnicas de práctica.'
    }
  },
  'how-to-write-hiragana': {
    en: {
      title: 'How to Write Hiragana: Complete Stroke Order & Writing Guide',
      description: 'Learn proper Hiragana stroke order and writing techniques. Master correct character formation with detailed instructions for all 46 basic characters.'
    },
    de: {
      title: 'Hiragana schreiben: Vollständige Strichreihenfolge & Schreibanleitung',
      description: 'Lernen Sie die richtige Hiragana-Strichreihenfolge und Schreibtechniken. Meistern Sie die korrekte Zeichenbildung mit detaillierten Anweisungen.'
    },
    fr: {
      title: 'Comment écrire les Hiragana : Guide complet de l\'ordre des traits',
      description: 'Apprenez l\'ordre correct des traits des Hiragana et les techniques d\'écriture. Maîtrisez la formation correcte des caractères avec des instructions détaillées.'
    },
    pt: {
      title: 'Como Escrever Hiragana: Guia Completo de Ordem dos Traços',
      description: 'Aprenda a ordem correta dos traços do Hiragana e técnicas de escrita. Domine a formação correta dos caracteres com instruções detalhadas.'
    },
    es: {
      title: 'Cómo Escribir Hiragana: Guía Completa del Orden de Trazos',
      description: 'Aprende el orden correcto de trazos del Hiragana y técnicas de escritura. Domina la formación correcta de caracteres con instrucciones detalladas.'
    }
  },
  'hiragana-vs-katakana': {
    en: {
      title: 'Hiragana vs Katakana: When to Use Each Japanese Writing System',
      description: 'Understand the differences between Hiragana and Katakana. Learn when to use each script with practical examples and usage rules in Japanese writing.'
    },
    de: {
      title: 'Hiragana vs. Katakana: Wann man welches japanische Schriftsystem verwendet',
      description: 'Verstehen Sie die Unterschiede zwischen Hiragana und Katakana. Lernen Sie, wann Sie welche Schrift mit praktischen Beispielen verwenden.'
    },
    fr: {
      title: 'Hiragana vs Katakana : Quand utiliser chaque système d\'écriture japonais',
      description: 'Comprenez les différences entre Hiragana et Katakana. Apprenez quand utiliser chaque script avec des exemples pratiques.'
    },
    pt: {
      title: 'Hiragana vs Katakana: Quando Usar Cada Sistema de Escrita Japonesa',
      description: 'Entenda as diferenças entre Hiragana e Katakana. Aprenda quando usar cada script com exemplos práticos e regras de uso.'
    },
    es: {
      title: 'Hiragana vs Katakana: Cuándo Usar Cada Sistema de Escritura Japonesa',
      description: 'Comprende las diferencias entre Hiragana y Katakana. Aprende cuándo usar cada script con ejemplos prácticos y reglas de uso.'
    }
  },
  'hiragana-furigana-guide': {
    en: {
      title: 'Furigana Guide: How to Add Hiragana Reading Aids Above Kanji',
      description: 'Master the art of using Furigana (ふりがな). Learn how to write and read Hiragana pronunciation guides above Kanji characters in Japanese texts.'
    },
    de: {
      title: 'Furigana-Leitfaden: Hiragana-Lesehilfen über Kanji hinzufügen',
      description: 'Meistern Sie die Kunst der Verwendung von Furigana (ふりがな). Lernen Sie, wie Sie Hiragana-Aussprachehilfen über Kanji-Zeichen schreiben und lesen.'
    },
    fr: {
      title: 'Guide Furigana : Comment ajouter des aides de lecture Hiragana au-dessus des Kanji',
      description: 'Maîtrisez l\'art d\'utiliser les Furigana (ふりがな). Apprenez à écrire et lire les guides de prononciation Hiragana au-dessus des caractères Kanji.'
    },
    pt: {
      title: 'Guia Furigana: Como Adicionar Guias de Leitura Hiragana Acima de Kanji',
      description: 'Domine a arte de usar Furigana (ふりがな). Aprenda a escrever e ler guias de pronúncia Hiragana acima de caracteres Kanji.'
    },
    es: {
      title: 'Guía Furigana: Cómo Agregar Ayudas de Lectura Hiragana Sobre Kanji',
      description: 'Domina el arte de usar Furigana (ふりがな). Aprende a escribir y leer guías de pronunciación Hiragana sobre caracteres Kanji.'
    }
  },
  'writing-numbers-hiragana': {
    en: {
      title: 'Writing Numbers in Hiragana: Complete Japanese Number Guide',
      description: 'Learn to write and read numbers in Hiragana. Comprehensive guide covering counting systems, pronunciations, and practical usage in Japanese.'
    },
    de: {
      title: 'Zahlen in Hiragana schreiben: Vollständiger japanischer Zahlenleitfaden',
      description: 'Lernen Sie, Zahlen in Hiragana zu schreiben und zu lesen. Umfassender Leitfaden zu Zählsystemen, Aussprache und praktischer Verwendung.'
    },
    fr: {
      title: 'Écrire les nombres en Hiragana : Guide complet des nombres japonais',
      description: 'Apprenez à écrire et lire les nombres en Hiragana. Guide complet couvrant les systèmes de comptage, les prononciations et l\'usage pratique.'
    },
    pt: {
      title: 'Escrever Números em Hiragana: Guia Completo de Números Japoneses',
      description: 'Aprenda a escrever e ler números em Hiragana. Guia abrangente cobrindo sistemas de contagem, pronúncias e uso prático.'
    },
    es: {
      title: 'Escribir Números en Hiragana: Guía Completa de Números Japoneses',
      description: 'Aprende a escribir y leer números en Hiragana. Guía completa que cubre sistemas de conteo, pronunciaciones y uso práctico.'
    }
  },
  'memorize-hiragana': {
    en: {
      title: 'How to Memorize Hiragana: Effective Learning Techniques & Methods',
      description: 'Discover proven techniques to memorize Hiragana quickly and effectively. Learn mnemonic devices, practice methods, and study strategies that work.'
    },
    de: {
      title: 'Hiragana auswendig lernen: Effektive Lerntechniken & Methoden',
      description: 'Entdecken Sie bewährte Techniken, um Hiragana schnell und effektiv auswendig zu lernen. Lernen Sie Merkhilfen, Übungsmethoden und Lernstrategien.'
    },
    fr: {
      title: 'Mémoriser les Hiragana : Techniques et méthodes d\'apprentissage efficaces',
      description: 'Découvrez des techniques éprouvées pour mémoriser les Hiragana rapidement et efficacement. Apprenez les dispositifs mnémoniques et les méthodes de pratique.'
    },
    pt: {
      title: 'Como Memorizar Hiragana: Técnicas e Métodos de Aprendizagem Eficazes',
      description: 'Descubra técnicas comprovadas para memorizar Hiragana rápida e efetivamente. Aprenda dispositivos mnemônicos, métodos de prática e estratégias de estudo.'
    },
    es: {
      title: 'Cómo Memorizar Hiragana: Técnicas y Métodos de Aprendizaje Efectivos',
      description: 'Descubre técnicas probadas para memorizar Hiragana rápida y efectivamente. Aprende dispositivos mnemónicos, métodos de práctica y estrategias de estudio.'
    }
  },
  'typing-hiragana': {
    en: {
      title: 'How to Type Hiragana on Computer, Phone & Tablet - Complete Guide',
      description: 'Learn to type Hiragana on any device. Step-by-step instructions for Windows, Mac, iOS, Android, and web-based Japanese input methods.'
    },
    de: {
      title: 'Hiragana tippen auf Computer, Handy & Tablet - Vollständige Anleitung',
      description: 'Lernen Sie, Hiragana auf jedem Gerät zu tippen. Schritt-für-Schritt-Anleitungen für Windows, Mac, iOS, Android und webbasierte japanische Eingabemethoden.'
    },
    fr: {
      title: 'Comment taper Hiragana sur ordinateur, téléphone et tablette - Guide complet',
      description: 'Apprenez à taper les Hiragana sur n\'importe quel appareil. Instructions étape par étape pour Windows, Mac, iOS, Android et méthodes de saisie japonaises.'
    },
    pt: {
      title: 'Como Digitar Hiragana em Computador, Celular e Tablet - Guia Completo',
      description: 'Aprenda a digitar Hiragana em qualquer dispositivo. Instruções passo a passo para Windows, Mac, iOS, Android e métodos de entrada japoneses baseados na web.'
    },
    es: {
      title: 'Cómo Escribir Hiragana en Computadora, Teléfono y Tableta - Guía Completa',
      description: 'Aprende a escribir Hiragana en cualquier dispositivo. Instrucciones paso a paso para Windows, Mac, iOS, Android y métodos de entrada japoneses basados en web.'
    }
  },
  'common-hiragana-phrases': {
    en: {
      title: 'Essential Hiragana Phrases for Beginners - Common Japanese Expressions',
      description: 'Master the most common Hiragana phrases used in daily Japanese. Learn essential greetings, expressions, and practical phrases with pronunciations.'
    },
    de: {
      title: 'Wesentliche Hiragana-Phrasen für Anfänger - Gebräuchliche japanische Ausdrücke',
      description: 'Meistern Sie die gebräuchlichsten Hiragana-Phrasen im täglichen Japanisch. Lernen Sie wichtige Grüße, Ausdrücke und praktische Phrasen mit Aussprache.'
    },
    fr: {
      title: 'Phrases Hiragana essentielles pour débutants - Expressions japonaises courantes',
      description: 'Maîtrisez les phrases Hiragana les plus courantes utilisées quotidiennement en japonais. Apprenez les salutations essentielles et expressions pratiques.'
    },
    pt: {
      title: 'Frases Essenciais em Hiragana para Iniciantes - Expressões Japonesas Comuns',
      description: 'Domine as frases mais comuns em Hiragana usadas no japonês diário. Aprenda saudações essenciais, expressões e frases práticas com pronúncias.'
    },
    es: {
      title: 'Frases Esenciales en Hiragana para Principiantes - Expresiones Japonesas Comunes',
      description: 'Domina las frases más comunes en Hiragana usadas en el japonés diario. Aprende saludos esenciales, expresiones y frases prácticas con pronunciaciones.'
    }
  },
  'hiragana-pronunciation': {
    en: {
      title: 'Mastering Hiragana Pronunciation: Complete Sound & Accent Guide',
      description: 'Perfect your Hiragana pronunciation with our comprehensive guide. Learn correct sounds, pitch accents, and speaking techniques for natural Japanese.'
    },
    de: {
      title: 'Hiragana-Aussprache meistern: Vollständiger Laut- und Akzentleitfaden',
      description: 'Perfektionieren Sie Ihre Hiragana-Aussprache mit unserem umfassenden Leitfaden. Lernen Sie korrekte Laute, Tonhöhenakzente und Sprechtechniken.'
    },
    fr: {
      title: 'Maîtriser la prononciation Hiragana : Guide complet des sons et accents',
      description: 'Perfectionnez votre prononciation Hiragana avec notre guide complet. Apprenez les sons corrects, les accents toniques et les techniques de parole.'
    },
    pt: {
      title: 'Dominando a Pronúncia Hiragana: Guia Completo de Sons e Acentos',
      description: 'Aperfeiçoe sua pronúncia Hiragana com nosso guia abrangente. Aprenda sons corretos, acentos tonais e técnicas de fala para japonês natural.'
    },
    es: {
      title: 'Dominar la Pronunciación Hiragana: Guía Completa de Sonidos y Acentos',
      description: 'Perfecciona tu pronunciación Hiragana con nuestra guía completa. Aprende sonidos correctos, acentos tonales y técnicas de habla para japonés natural.'
    }
  },
  'hiragana-practice': {
    en: {
      title: 'Hiragana Practice Exercises: Interactive Learning & Writing Drills',
      description: 'Strengthen your Hiragana skills with comprehensive practice exercises. Interactive drills, writing practice, and reading comprehension activities.'
    },
    de: {
      title: 'Hiragana-Übungen: Interaktives Lernen & Schreibübungen',
      description: 'Stärken Sie Ihre Hiragana-Fähigkeiten mit umfassenden Übungen. Interaktive Übungen, Schreibpraxis und Leseverständnisaktivitäten.'
    },
    fr: {
      title: 'Exercices de pratique Hiragana : Apprentissage interactif et exercices d\'écriture',
      description: 'Renforcez vos compétences en Hiragana avec des exercices pratiques complets. Exercices interactifs, pratique d\'écriture et activités de compréhension.'
    },
    pt: {
      title: 'Exercícios de Prática Hiragana: Aprendizagem Interativa e Exercícios de Escrita',
      description: 'Fortaleça suas habilidades em Hiragana com exercícios práticos abrangentes. Exercícios interativos, prática de escrita e atividades de compreensão.'
    },
    es: {
      title: 'Ejercicios de Práctica Hiragana: Aprendizaje Interactivo y Ejercicios de Escritura',
      description: 'Fortalece tus habilidades en Hiragana con ejercicios prácticos completos. Ejercicios interactivos, práctica de escritura y actividades de comprensión.'
    }
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn/${slug}`;

  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: 'Article Not Found',
      alternates: { canonical: canonicalUrl }
    };
  }

  // Get translated metadata or fallback to English
  const translatedMeta = articleTranslations[slug]?.[locale] || articleTranslations[slug]?.['en'] || {
    title: article.title,
    description: article.description
  };

  // Generate language alternates for hreflang
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path = loc === 'en' ? '' : `/${loc}`;
    languages[loc] = `${baseUrl}${path}/learn/${slug}`;
  });
  // Add x-default for international users
  languages['x-default'] = `${baseUrl}/learn/${slug}`;

  return {
    title: translatedMeta.title,
    description: translatedMeta.description,
    keywords: [
      'japanese learning',
      'hiragana',
      'katakana',
      'japanese writing',
      'kana practice',
      'learn japanese',
      'japanese alphabet',
      'japanese characters',
      ...article.tags
    ],
    authors: [{ name: 'LearnKana.pro', url: baseUrl }],
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: translatedMeta.title,
      description: translatedMeta.description,
      type: "article",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: routing.locales
        .filter(l => l !== locale)
        .map(l => l === 'en' ? 'en_US' : `${l}_${l.toUpperCase()}`),
      siteName: "LearnKana.pro",
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      tags: article.tags,
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(translatedMeta.title)}&type=article&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: translatedMeta.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: translatedMeta.title,
      description: translatedMeta.description,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(translatedMeta.title)}&type=article&locale=${locale}`],
      site: '@learnkana'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}

export async function generateStructuredData({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn/${slug}`;

  const article = await getArticleBySlug(slug);
  if (!article) {
    return null;
  }

  // Get translated metadata
  const translatedMeta = articleTranslations[slug]?.[locale] || articleTranslations[slug]?.['en'] || {
    title: article.title,
    description: article.description
  };

  return {
    "@context": "https://schema.org",
    "@type": ["Article", "EducationalOccupationalCredential", "LearningResource"],
    "headline": translatedMeta.title,
    "description": translatedMeta.description,
    "articleBody": translatedMeta.description,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "author": {
      "@type": "Organization",
      "name": "LearnKana.pro",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana.pro",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/android-chrome-512x512.png`,
        "width": 512,
        "height": 512
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "articleSection": "Japanese Language Education",
    "keywords": article.tags.join(', '),
    "inLanguage": locale,
    "isAccessibleForFree": true,
    "educationalLevel": "Beginner to Intermediate",
    "learningResourceType": ["Article", "Guide", "Tutorial"],
    "educationalUse": ["Learning", "Self-Study", "Practice"],
    "teaches": `Japanese ${article.tags.includes('hiragana') ? 'Hiragana' : 'Kana'} writing and reading`,
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": ["Language Learner", "Beginner", "Student"],
      "educationalField": "Japanese Language Learning"
    },
    "about": {
      "@type": "Thing",
      "name": "Japanese Writing System",
      "sameAs": "https://en.wikipedia.org/wiki/Japanese_writing_system"
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": canonicalUrl
      }
    }
  };
}