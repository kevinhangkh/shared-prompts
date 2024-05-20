import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextRequest } from 'next/server';

// Interfaces
interface Params {
  id: string;
}

interface RequestContext {
  params: Params;
}

// GET
export const GET = async (req: NextRequest, { params }: RequestContext) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

// PATCH
export const PATCH = async (req: NextRequest, { params }: RequestContext) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

// DELETE
export const DELETE = async (req: NextRequest, { params }: RequestContext) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
