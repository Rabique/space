import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    // Initialize Supabase Client (Server-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Supabase credentials are not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(part => part.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      const text = response.text();
      return NextResponse.json({ error: "No image generated. API returned text instead.", text }, { status: 500 });
    }

    const { mimeType, data } = imagePart.inlineData;
    
    // Upload to Supabase Storage
    const buffer = Buffer.from(data, 'base64');
    const fileName = `generated-${Date.now()}.png`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload image to storage" }, { status: 500 });
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return NextResponse.json({ imageUrl: publicUrl });
  } catch (error: any) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 });
  }
}
