import { NextRequest, NextResponse } from "next/server";

const ATS_SCORER_URL = process.env.ATS_SCORER_URL;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json(
        { error: "No resume file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (resume.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Create form data for the ATS scorer
    const atsFormData = new FormData();
    atsFormData.append("resume", resume);

    console.log(`Sending resume to ATS scorer at ${ATS_SCORER_URL}/analyze-resume/`);

    // Call the ATS scorer service
    const atsResponse = await fetch(`${ATS_SCORER_URL}/analyze-resume/`, {
      method: "POST",
      body: atsFormData,
    });

    if (!atsResponse.ok) {
      const errorData = await atsResponse.json();
      throw new Error(errorData.detail || "ATS analysis failed");
    }

    const analysisResult = await atsResponse.json();

    // Add timestamp to the result
    const enhancedResult = {
      ...analysisResult,
      analyzedAt: new Date().toISOString(),
    };

    return NextResponse.json(enhancedResult);
  } catch (error: any) {
    console.error("Resume analysis API error:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error during resume analysis",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
