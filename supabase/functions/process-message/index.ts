
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MISTRAL_API_KEY = Deno.env.get('MISTRAL_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Create a Supabase client with the service role key for admin access
const supabase = createClient(
  SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY!
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId = 'default' } = await req.json();
    console.log(`Processing message in session ${sessionId}: ${message}`);

    // Step 1: Perform semantic search in the textbook_content table
    const { data: searchResults, error: searchError } = await supabase
      .rpc('search_textbook', {
        query_text: message,
        match_count: 3
      });

    if (searchError) {
      console.error('Error in semantic search:', searchError);
      throw new Error(`Semantic search failed: ${searchError.message}`);
    }

    console.log('Search results:', searchResults);

    // Extract the content from search results to create context
    let context = '';
    if (searchResults && searchResults.length > 0) {
      context = searchResults
        .map((result: any) => `${result.title}: ${result.content}`)
        .join('\n\n');
    }

    // Step 2: Generate a response using Mistral API with the context
    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: `You are Nelson-GPT, a pediatric medical assistant based on the Nelson Textbook of Pediatrics. 
            Provide accurate, helpful, and concise information. Use the following relevant excerpts from the textbook 
            to inform your response: ${context}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 500
      }),
    });

    if (!mistralResponse.ok) {
      const errorText = await mistralResponse.text();
      console.error('Mistral API error:', errorText);
      throw new Error(`Mistral API error: ${mistralResponse.status} ${errorText}`);
    }

    const mistralData = await mistralResponse.json();
    console.log('Mistral API response:', mistralData);

    // Extract the AI response
    const aiResponse = mistralData.choices[0].message.content;

    // Step 3: Store the message and response in the chat_messages table
    const { error: insertError } = await supabase
      .from('chat_messages')
      .insert([
        {
          session_id: sessionId,
          content: message,
          role: 'user',
          created_at: new Date().toISOString()
        },
        {
          session_id: sessionId,
          content: aiResponse,
          role: 'bot',
          created_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error storing messages:', insertError);
      // Continue anyway as this is not critical for the user experience
    }

    // Return the AI response
    return new Response(
      JSON.stringify({
        id: new Date().getTime().toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing message:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while processing your request',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
