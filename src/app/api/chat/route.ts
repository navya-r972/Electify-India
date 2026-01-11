import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = [
  {
    keywords: ['what is', 'onoe', 'one nation', 'concept'],
    response: "One Nation One Election (ONOE) is a proposal to synchronize elections for the Lok Sabha (national parliament) and all State Legislative Assemblies. The idea is to hold these elections simultaneously, either on a single day or within a specific time frame."
  },
  {
    keywords: ['benefit', 'advantage', 'pros', 'good'],
    response: "**Benefits of ONOE:**\n\n1. **Cost Reduction:** Reduces the massive recurring expenditure on separate elections.\n2. **Governance Focus:** Minimizes the period where the Model Code of Conduct is in force, allowing the government to focus on development work.\n3. **Voter Convenience:** Voters can cast ballots for both national and state representatives at once."
  },
  {
    keywords: ['disadvantage', 'con', 'issue', 'problem', 'challenge', 'bad'],
    response: "**Challenges of ONOE:**\n\n1. **Constitutional Amendments:** Requires significant changes to the Constitution regarding the tenure of houses.\n2. **Federalism Concerns:** Critics argue it might overshadow local/regional issues with national narratives.\n3. **Logistics:** Requires a massive increase in EVMs, VVPATs, and security personnel."
  },
  {
    keywords: ['history', 'past', 'when'],
    response: "Simultaneous elections were the norm in India during the first few general elections in 1952, 1957, 1962, and 1967. The cycle was disrupted due to the premature dissolution of some State Assemblies in 1968 and 1969, and the Lok Sabha in 1970."
  },
  {
    keywords: ['committee', 'kovind', 'report'],
    response: "A High-Level Committee headed by former President Ram Nath Kovind was formed to examine the feasibility of ONOE. The committee has submitted its report recommending a two-step approach to synchronization."
  },
  {
    keywords: ['article', 'constitution', 'law'],
    response: "Key constitutional articles involved include Article 83 (Duration of Houses of Parliament), Article 85 (Sessions of Parliament), Article 172 (Duration of State Legislatures), Article 174 (Sessions of State Legislatures), and Article 356 (President's Rule)."
  }
];

const DEFAULT_RESPONSE = "I'm here to help you understand One Nation One Election. You can ask me about its definition, benefits, challenges, history, or the constitutional articles involved.";

function anonymizeText(text: string): string {
  const replacements: Record<string, string> = {
    "Bharatiya Janata Party": "a national political party",
    "BJP": "a national political party",
    "Indian National Congress": "a national opposition party",
    "Congress": "a national opposition party",
    "INC": "a national opposition party",
    "Aam Aadmi Party": "a regional political party",
    "AAP": "a regional political party",
    "Trinamool Congress": "a regional political party",
    "TMC": "a regional political party",
    "DMK": "a regional political party",
    "Prime Minister": "the head of government",
    "PM": "the head of government",
    "Chief Minister": "the head of the regional government",
    "CM": "the head of the regional government",
    "Narendra Modi": "the current leader",
    "Rahul Gandhi": "the opposition leader",
  };

  let blindText = text;
  for (const [key, value] of Object.entries(replacements)) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedKey, "gi");
    blindText = blindText.replace(regex, value);
  }
  return blindText;
}

export async function POST(req: Request) {
  try {
    const { message, blind } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const lowerMsg = message.toLowerCase();
    let response = DEFAULT_RESPONSE;

    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => lowerMsg.includes(k))) {
        response = item.response;
        break;
      }
    }

    // Basic greeting check
    if (lowerMsg.match(/^(hi|hello|hey|greetings)/)) {
      response = "Hello! Ask me anything about One Nation One Election.";
    }

    if (blind) {
      response = anonymizeText(response);
    }

    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 800));

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
