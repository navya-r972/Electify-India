import { NextResponse } from 'next/server';

const items = [
  {
    id: 1,
    statement: "You can vote without a Voter ID card if you have other valid ID.",
    isFact: true,
    explanation: "Fact! If your name is in the electoral roll, you can vote using other specified IDs like Aadhaar, Passport, Driving License, etc."
  },
  {
    id: 2,
    statement: "EVMs can be hacked via Bluetooth or Wi-Fi.",
    isFact: false,
    explanation: "Myth! EVMs are standalone machines with no wireless communication capabilities. They are not connected to any network."
  },
  {
    id: 3,
    statement: "One Nation One Election requires a constitutional amendment.",
    isFact: true,
    explanation: "Fact! Implementing simultaneous elections would require amendments to Articles 83, 172, 85, 174, 356, and the Tenth Schedule of the Constitution."
  },
  {
    id: 4,
    statement: "NRI voters can vote online from abroad.",
    isFact: false,
    explanation: "Myth! Currently, NRIs must be physically present at their polling station in India to vote. Proposals for proxy voting or ETPBS are under discussion but not fully implemented for all."
  },
  {
    id: 5,
    statement: "NOTA (None of the Above) counts as a rejected vote.",
    isFact: false,
    explanation: "Myth! NOTA is recorded as a vote for 'None of the Above'. While it doesn't change the winner currently, it registers dissatisfaction. In some local elections, if NOTA gets majority, re-election is held (varies by state laws)."
  }
];

export async function GET() {
  return NextResponse.json(items);
}
