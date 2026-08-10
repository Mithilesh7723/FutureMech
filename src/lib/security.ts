const ATTACK_PATTERNS = [
  /(\b(union|select|insert|update|delete|drop|alter|create|exec|execute|truncate|declare|cursor|fetch|open|close)\b)/i,
  /(\/\*|\*\/|;--|--|\bOR\b\s+\d+\s*=\s*\d+|\bAND\b\s+\d+\s*=\s*\d+)/i,
  /(<script[\s>]|<\/script>|javascript:|on\w+\s*=)/i,
  /(\/etc\/passwd|\/etc\/shadow|\/bin\/bash|cmd\.exe|powershell)/i,
  /(eval\s*\(|function\s*\(|setTimeout\s*\(|setInterval\s*\()/i,
  /(UNION\s+ALL\s+SELECT|SELECT\s+FROM|INSERT\s+INTO|DROP\s+TABLE)/i,
  /(\b(OR|AND)\b\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?)/i,
  /(;\s*(DROP|DELETE|UPDATE|INSERT|ALTER|CREATE)\b)/i,
  /(--\s*$|\/\*.*\*\/)/i,
  /(CHAR\s*\(|CONCAT\s*\(|0x[0-9a-f]+)/i,
  /(WAITFOR\s+DELAY|BENCHMARK\s*\(|SLEEP\s*\()/i,
  /(\.\.\/|\.\.\\|%2e%2e)/i,
  /(cookie\s*=|document\.cookie|localStorage|sessionStorage)/i,
];

const HORROR_MESSAGES = [
  "Oh honey... you really thought that would work? 🕷️",
  "Nice try, script kiddie. Your IP just got a personal invitation to our blacklist. 🦇",
  "Error 418: I'm a teapot, not a database. But your IP? That's definitely logged. ☕",
  "Congratulations! You've triggered our 'Definitely Not a Robot' detection system. 🤖",
  "That query was so bad, even our firewall cringed. IP logged, reported, and mocked. 👻",
  "SQL injection in 2026? Really? Your IP is now permanently disappointed in you. 💀",
  "We detected suspicious activity. Just kidding — we detected HILARIOUS activity. IP logged. 🎃",
  "Your attempt has been recorded for our team's entertainment. Thanks for the laugh. 😈",
  "Plot twist: There is no database. There's only judgment. And your IP is now on it. 🔥",
  "Error: Brain not found. Your IP, however, was found and logged. Have a nice day! 🌈",
  "Achievement unlocked: 'Most Creative Way to Waste 3 Seconds'. IP: logged. 🏆",
  "Our AI didn't even flinch. But it DID write your IP in its diary. 📔",
  "Bold of you to try that. Bolder still that your IP is real. Logged & reported. 🦷",
  "We run on Next.js, not nightmares. But your input? That was nightmare fuel. IP logged. 😱",
  "Tell your friends: this firewall has zero chill and maximum petty energy. 🖤",
];

function getRandomMessage(): string {
  return HORROR_MESSAGES[Math.floor(Math.random() * HORROR_MESSAGES.length)];
}

export function detectAttack(input: string): boolean {
  if (typeof input !== "string") return false;
  return ATTACK_PATTERNS.some((p) => p.test(input));
}

export function scanForAttacks(body: Record<string, unknown>): {
  attacked: boolean;
  field: string;
} {
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string" && detectAttack(value)) {
      return { attacked: true, field: key };
    }
  }
  return { attacked: false, field: "" };
}

export function getAttackResponse(
  ip: string,
  field: string
): Response {
  return new Response(
    JSON.stringify({
      error: "Nice try.",
      message: getRandomMessage(),
      _debug: `Field: ${field}`,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    }
  );
}
