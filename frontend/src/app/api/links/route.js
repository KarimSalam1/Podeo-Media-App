import { NextResponse } from "next/server";

// This would normally be with a database
// For this demo, i'll just use a simple in-memory array
let links = [];

export async function GET() {
  try {
    return NextResponse.json({ success: true, links });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newLink = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    links.push(newLink);

    return NextResponse.json({ success: true, link: newLink });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create link" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    links = links.filter((link) => link.id !== id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete link" },
      { status: 500 }
    );
  }
}
