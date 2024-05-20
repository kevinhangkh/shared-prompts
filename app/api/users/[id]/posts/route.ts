import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextRequest } from 'next/server';

interface Params {
  id: string;
}
interface RequestContext {
  params: Params;
}

export const GET = async (req: NextRequest, { params }: RequestContext) => {
  // Get the dynamic id from the params
  const { id } = params;

  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: id }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
