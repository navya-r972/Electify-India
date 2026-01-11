import { NextResponse } from 'next/server';

const FACTS_MYTHS = [
  {
    id: 1,
    statement: "You cannot vote if your name is missing from the voter list, even if you have a Voter ID card.",
    type: "Fact",
    explanation: "Possession of a Voter ID card alone is not sufficient. Your name must appear in the electoral roll of your constituency to cast a vote."
  },
  {
    id: 2,
    statement: "One Nation One Election means you only vote once for everything forever.",
    type: "Myth",
    explanation: "ONOE means simultaneous elections for Lok Sabha and State Assemblies, typically every 5 years. It does not abolish elections."
  },
  {
    id: 3,
    statement: "Electronic Voting Machines (EVMs) can be hacked via Bluetooth.",
    type: "Myth",
    explanation: "EVMs used by the ECI are standalone machines with no wireless communication capabilities (Wi-Fi, Bluetooth, etc.), making remote hacking impossible."
  },
  {
    id: 4,
    statement: "NOTA (None of the Above) votes count towards the final result.",
    type: "Fact",
    explanation: "NOTA votes are counted, but currently, they do not impact the result. Even if NOTA gets the highest votes, the candidate with the second-highest votes wins (though this is a subject of legal debate)."
  }
];

export async function GET() {
  // Return a random fact/myth
  const randomIndex = Math.floor(Math.random() * FACTS_MYTHS.length);
  return NextResponse.json(FACTS_MYTHS[randomIndex]);
}
