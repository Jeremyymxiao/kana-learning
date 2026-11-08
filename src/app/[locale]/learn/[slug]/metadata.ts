import { Metadata } from 'next';
import { getArticleBySlug } from '@/data/articles';
import { ARTICLE_CONTENT_LOCALE, getArticleCanonicalUrl } from '@/lib/seo-utils';
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
      title: 'Hiragana Stroke Order Basics (7 Characters)',
      description: 'Learn the stroke order of 7 representative Hiragana characters, plus the rules (stroke direction, curves, balance) that apply to the remaining ones.'
    },
    de: {
      title: 'Hiragana-Strichreihenfolge: Grundlagen (7 Zeichen)',
      description: 'Lernen Sie die Strichreihenfolge von 7 repräsentativen Hiragana-Zeichen und die Regeln, die für die übrigen gelten.'
    },
    fr: {
      title: 'Ordre des traits des Hiragana : les bases (7 caractères)',
      description: 'Apprenez l\'ordre des traits de 7 caractères Hiragana représentatifs et les règles valables pour les autres.'
    },
    pt: {
      title: 'Ordem dos Traços do Hiragana: Noções Básicas (7 Caracteres)',
      description: 'Aprenda a ordem dos traços de 7 caracteres Hiragana representativos e as regras que se aplicam aos demais.'
    },
    es: {
      title: 'Orden de Trazos del Hiragana: Fundamentos (7 Caracteres)',
      description: 'Aprende el orden de trazos de 7 caracteres Hiragana representativos y las reglas que se aplican al resto.'
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
  },
  'katakana-basics': {
    en: {
      title: 'Katakana Basics: Complete Introduction to the Japanese Script',
      description: 'Learn Katakana from zero: the 46 basic characters, dakuon and yōon, when the script is used, and how it differs from Hiragana.'
    },
    de: {
      title: 'Katakana-Grundlagen: Einführung in die japanische Schrift',
      description: 'Lernen Sie Katakana von Grund auf: die 46 Grundzeichen, Dakuon und Yōon, wann die Schrift verwendet wird und worin sie sich von Hiragana unterscheidet.'
    },
    fr: {
      title: 'Bases du Katakana : introduction complète à l\'écriture japonaise',
      description: 'Apprenez le katakana depuis zéro : les 46 caractères de base, les dakuon et yōon, quand cette écriture est utilisée et ce qui la distingue du hiragana.'
    },
    pt: {
      title: 'Fundamentos do Katakana: Introdução Completa à Escrita Japonesa',
      description: 'Aprenda katakana do zero: os 46 caracteres básicos, dakuon e yōon, quando a escrita é usada e o que a diferencia do hiragana.'
    },
    es: {
      title: 'Fundamentos del Katakana: Guía Completa de Escritura',
      description: 'Aprende katakana desde cero: los 46 caracteres básicos, dakuon y yōon, cuándo se usa esta escritura y en qué se diferencia del hiragana.'
    }
  },
  'how-to-write-katakana': {
    en: {
      title: 'How to Write Katakana: Stroke Order and Writing Tips',
      description: 'Stroke order and writing technique for every Katakana character, plus the mistakes that make Japanese handwriting look wrong.'
    },
    de: {
      title: 'Katakana schreiben: Strichfolge und Schreibtipps',
      description: 'Strichfolge und Schreibtechnik für jedes Katakana-Zeichen, dazu die Fehler, die japanische Handschrift falsch wirken lassen.'
    },
    fr: {
      title: 'Comment écrire le katakana : ordre des traits et conseils',
      description: 'Ordre des traits et technique d\'écriture pour chaque caractère katakana, avec les erreurs qui rendent l\'écriture manuscrite japonaise incorrecte.'
    },
    pt: {
      title: 'Como Escrever Katakana: Ordem dos Traços e Dicas',
      description: 'Ordem dos traços e técnica de escrita para cada caractere katakana, além dos erros que deixam a caligrafia japonesa errada.'
    },
    es: {
      title: 'Cómo Escribir Katakana: Orden de Trazos y Consejos',
      description: 'Orden de trazos y técnica de escritura para cada carácter katakana, además de los errores que hacen que la caligrafía japonesa se vea mal.'
    }
  },
  'katakana-words-guide': {
    en: {
      title: 'Common Katakana Words: A Vocabulary Guide',
      description: 'Essential Katakana vocabulary by category — food, technology, travel and daily life — with readings and meanings.'
    },
    de: {
      title: 'Häufige Katakana-Wörter: Ein Vokabularleitfaden',
      description: 'Wichtiges Katakana-Vokabular nach Kategorien — Essen, Technik, Reisen und Alltag — mit Lesung und Bedeutung.'
    },
    fr: {
      title: 'Mots courants en katakana : guide de vocabulaire',
      description: 'Vocabulaire katakana essentiel par catégorie — cuisine, technologie, voyage et vie quotidienne — avec lectures et significations.'
    },
    pt: {
      title: 'Palavras Comuns em Katakana: Guia de Vocabulário',
      description: 'Vocabulário essencial em katakana por categoria — comida, tecnologia, viagem e dia a dia — com leituras e significados.'
    },
    es: {
      title: 'Palabras Comunes en Katakana: Guía de Vocabulario',
      description: 'Vocabulario esencial en katakana por categoría — comida, tecnología, viajes y vida diaria — con lecturas y significados.'
    }
  },
  'memorize-katakana': {
    en: {
      title: 'How to Memorize Katakana: Techniques That Work',
      description: 'Practical ways to memorize Katakana: shape mnemonics, loanword anchors, and a two-week practice plan that sticks.'
    },
    de: {
      title: 'Katakana auswendig lernen: Techniken, die funktionieren',
      description: 'Praktische Methoden für Katakana: Form-Merkhilfen, Lehnwort-Anker und ein zweiwöchiger Übungsplan, der hält.'
    },
    fr: {
      title: 'Comment mémoriser le katakana : des techniques efficaces',
      description: 'Des méthodes concrètes pour mémoriser le katakana : moyens mnémotechniques de forme, ancrages par mots d\'emprunt et un plan de pratique de deux semaines.'
    },
    pt: {
      title: 'Como Memorizar Katakana: Técnicas que Funcionam',
      description: 'Métodos práticos para memorizar katakana: mnemônicos de forma, âncoras em palavras estrangeiras e um plano de prática de duas semanas.'
    },
    es: {
      title: 'Cómo Memorizar Katakana: Técnicas que Funcionan',
      description: 'Métodos prácticos para memorizar katakana: mnemónicos de forma, anclajes en préstamos y un plan de práctica de dos semanas.'
    }
  },
  'katakana-pronunciation': {
    en: {
      title: 'Katakana Pronunciation: Long Vowels and Small Kana',
      description: 'How Katakana pronunciation really works: long vowels, double consonants, small ャュョ and the foreign sounds added for loanwords.'
    },
    de: {
      title: 'Katakana-Aussprache: Langvokale und kleine Kana',
      description: 'Wie Katakana-Aussprache wirklich funktioniert: Langvokale, Doppelkonsonanten, kleine ャュョ und die zusätzlichen Laute für Lehnwörter.'
    },
    fr: {
      title: 'Prononciation du katakana : voyelles longues et petits kana',
      description: 'Le fonctionnement réel de la prononciation du katakana : voyelles longues, consonnes doubles, petits ャュョ et sons ajoutés pour les mots d\'emprunt.'
    },
    pt: {
      title: 'Pronúncia do Katakana: Vogais Longas e Kana Pequenos',
      description: 'Como a pronúncia do katakana funciona de verdade: vogais longas, consoantes duplas, ャュョ pequenos e os sons criados para palavras estrangeiras.'
    },
    es: {
      title: 'Pronunciación del Katakana: Vocales Largas y Kana Pequeños',
      description: 'Cómo funciona realmente la pronunciación del katakana: vocales largas, consonantes dobles, ャュョ pequeños y los sonidos añadidos para préstamos.'
    }
  },
  'typing-katakana': {
    en: {
      title: 'How to Type Katakana on Windows, Mac and Mobile',
      description: 'Type Katakana on any device: IME setup for Windows and macOS, mobile keyboards, and the shortcuts that convert hiragana instantly.'
    },
    de: {
      title: 'Katakana tippen unter Windows, macOS und mobil',
      description: 'Katakana auf jedem Gerät tippen: IME-Einrichtung für Windows und macOS, mobile Tastaturen und die Kürzel für sofortige Umwandlung.'
    },
    fr: {
      title: 'Comment taper le katakana sur Windows, macOS et mobile',
      description: 'Taper le katakana sur n\'importe quel appareil : configuration IME sous Windows et macOS, claviers mobiles et raccourcis de conversion immédiate.'
    },
    pt: {
      title: 'Como Digitar Katakana no Windows, macOS e Celular',
      description: 'Digite katakana em qualquer dispositivo: configuração de IME no Windows e macOS, teclados móveis e atalhos de conversão imediata.'
    },
    es: {
      title: 'Cómo Escribir Katakana en Windows, macOS y Móvil',
      description: 'Escribe katakana en cualquier dispositivo: configuración de IME en Windows y macOS, teclados móviles y atajos de conversión inmediata.'
    }
  },
  'katakana-practice': {
    en: {
      title: 'Katakana Practice: Exercises for Reading and Recognition',
      description: 'Practice Katakana with reading, recognition and writing exercises, ordered from single characters to full loanwords.'
    },
    de: {
      title: 'Katakana-Übungen: Lesen und Erkennen trainieren',
      description: 'Üben Sie Katakana mit Lese-, Erkennungs- und Schreibübungen — von einzelnen Zeichen bis zu vollständigen Lehnwörtern.'
    },
    fr: {
      title: 'Pratique du katakana : exercices de lecture et de reconnaissance',
      description: 'Entraînez-vous au katakana avec des exercices de lecture, de reconnaissance et d\'écriture, des caractères isolés aux mots d\'emprunt complets.'
    },
    pt: {
      title: 'Prática de Katakana: Exercícios de Leitura e Reconhecimento',
      description: 'Pratique katakana com exercícios de leitura, reconhecimento e escrita, de caracteres isolados a palavras estrangeiras completas.'
    },
    es: {
      title: 'Práctica de Katakana: Ejercicios de Lectura y Reconocimiento',
      description: 'Practica katakana con ejercicios de lectura, reconocimiento y escritura, desde caracteres sueltos hasta préstamos completos.'
    }
  },
  'katakana-loanwords': {
    en: {
      title: 'Japanese Loanwords in Katakana: How They Work',
      description: 'How foreign words become Katakana: sound adaptation rules, common English and Portuguese loanwords, and why the result often sounds different.'
    },
    de: {
      title: 'Japanische Lehnwörter in Katakana: So funktionieren sie',
      description: 'Wie aus fremden Wörtern Katakana werden: Lautanpassung, häufige englische und portugiesische Lehnwörter und warum das Ergebnis oft anders klingt.'
    },
    fr: {
      title: 'Les mots d\'emprunt japonais en katakana : comment ça marche',
      description: 'Comment les mots étrangers deviennent du katakana : règles d\'adaptation phonétique, emprunts anglais et portugais courants, et pourquoi le résultat sonne souvent différent.'
    },
    pt: {
      title: 'Palavras Estrangeiras em Katakana: Como Funcionam',
      description: 'Como palavras estrangeiras viram katakana: regras de adaptação sonora, empréstimos comuns do inglês e do português e por que o resultado soa diferente.'
    },
    es: {
      title: 'Préstamos Japoneses en Katakana: Cómo Funcionan',
      description: 'Cómo las palabras extranjeras se convierten en katakana: reglas de adaptación sonora, préstamos habituales del inglés y del portugués y por qué suenan distinto.'
    }
  },
  'katakana-vs-hiragana-usage': {
    en: {
      title: 'Katakana vs Hiragana: When to Use Each Script',
      description: 'A practical guide to choosing between Katakana and Hiragana: loanwords, emphasis, onomatopoeia, names and the cases that confuse learners.'
    },
    de: {
      title: 'Katakana oder Hiragana: Wann welche Schrift?',
      description: 'Ein praktischer Leitfaden zur Wahl zwischen Katakana und Hiragana: Lehnwörter, Betonung, Lautmalerei, Namen und die Fälle, die Lernende verwirren.'
    },
    fr: {
      title: 'Katakana ou hiragana : quand utiliser chaque écriture',
      description: 'Un guide pratique pour choisir entre katakana et hiragana : mots d\'emprunt, mise en valeur, onomatopées, noms et les cas qui déroutent les apprenants.'
    },
    pt: {
      title: 'Katakana ou Hiragana: Quando Usar Cada Escrita',
      description: 'Um guia prático para escolher entre katakana e hiragana: palavras estrangeiras, ênfase, onomatopeias, nomes e os casos que confundem os estudantes.'
    },
    es: {
      title: 'Katakana o Hiragana: Cuándo Usar Cada Escritura',
      description: 'Una guía práctica para elegir entre katakana e hiragana: préstamos, énfasis, onomatopeyas, nombres y los casos que confunden a los estudiantes.'
    }
  },
  'common-katakana-words': {
    en: {
      title: 'Essential Katakana Words for Beginners',
      description: 'The Katakana words beginners meet first, grouped by difficulty, with readings, meanings and short practice exercises.'
    },
    de: {
      title: 'Wichtige Katakana-Wörter für Anfänger',
      description: 'Die Katakana-Wörter, die Anfänger zuerst brauchen — nach Schwierigkeit gruppiert, mit Lesung, Bedeutung und kurzen Übungen.'
    },
    fr: {
      title: 'Mots katakana essentiels pour débutants',
      description: 'Les mots en katakana que les débutants rencontrent en premier, classés par difficulté, avec lectures, significations et courts exercices.'
    },
    pt: {
      title: 'Palavras Essenciais em Katakana para Iniciantes',
      description: 'As palavras em katakana que os iniciantes encontram primeiro, agrupadas por dificuldade, com leituras, significados e exercícios curtos.'
    },
    es: {
      title: 'Palabras Esenciales en Katakana para Principiantes',
      description: 'Las palabras en katakana que los principiantes encuentran primero, agrupadas por dificultad, con lecturas, significados y ejercicios cortos.'
    }
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params;

  /**
   * Every article body lives in `public/articles/{slug}.md` and is written in
   * English only. The de/fr/pt/es routes (`/de/learn/{slug}` …) render that same
   * English body, so self-canonicalising them made 80 URLs compete with the
   * English originals as duplicate content. They now point their canonical at
   * the English URL: 20 indexable article URLs instead of 100.
   */
  const canonicalUrl = getArticleCanonicalUrl(slug);

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

  /**
   * There is exactly one indexable language for an article (English), so
   * hreflang is limited to `en` + `x-default`. Listing de/fr/pt/es here would
   * contradict the canonical above and send Google two conflicting messages.
   */
  const languages: Record<string, string> = {
    'en': canonicalUrl,
    'x-default': canonicalUrl
  };

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
  const { slug } = await params;

  // Same rule as generateMetadata: the body is English everywhere, so the
  // structured data must describe the canonical English URL — not the
  // localised route that only wraps the English body in localised chrome.
  const canonicalUrl = getArticleCanonicalUrl(slug);

  const article = await getArticleBySlug(slug);
  if (!article) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    // headline must match the visible <h1>, which is the English article title
    // on every locale (the localised title is only used in <title>/meta).
    "headline": article.title,
    "description": article.description,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "LearnKana"
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
    "inLanguage": ARTICLE_CONTENT_LOCALE,
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