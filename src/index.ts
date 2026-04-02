/**
 * Genderize MCP — gender prediction from first name (genderize.io, free, no auth)
 *
 * Tools:
 * - predict_gender: Predict the gender of a person based on their first name
 * - predict_gender_country: Predict gender with country-specific calibration
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.genderize.io';

type GenderizeResponse = {
  count: number;
  name: string;
  gender: 'male' | 'female' | null;
  probability: number;
  country_id?: string;
};

const tools: McpToolExport['tools'] = [
  {
    name: 'predict_gender',
    description:
      'Predict the most likely gender of a person based on their first name, using global data from genderize.io. Returns gender ("male" or "female"), probability (0–1), and sample size.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'First name to predict gender for.',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'predict_gender_country',
    description:
      'Predict the most likely gender of a person based on their first name, calibrated to a specific country.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'First name to predict gender for.',
        },
        country_code: {
          type: 'string',
          description:
            'ISO 3166-1 alpha-2 country code (e.g. "US", "GB", "DE") to localize the prediction.',
        },
      },
      required: ['name', 'country_code'],
    },
  },
];

async function predictGender(name: string, countryId?: string): Promise<unknown> {
  const params = new URLSearchParams({ name });
  if (countryId) params.set('country_id', countryId);

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`Genderize error: ${res.status}`);

  const data = (await res.json()) as GenderizeResponse;

  return {
    name: data.name,
    gender: data.gender,
    probability: data.probability,
    sample_size: data.count,
    ...(data.country_id ? { country: data.country_id } : {}),
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'predict_gender':
      return predictGender(args.name as string);
    case 'predict_gender_country':
      return predictGender(args.name as string, args.country_code as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool } satisfies McpToolExport;
