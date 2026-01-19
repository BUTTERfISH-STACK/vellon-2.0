import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Import themes statically to avoid dynamic require issues with Turbopack
const flatTheme = require('jsonresume-theme-flat') as any;
const paperTheme = require('jsonresume-theme-paper') as any;
const elegantTheme = require('jsonresume-theme-elegant') as any;
const kendallTheme = require('jsonresume-theme-kendall') as any;

const themeMap: { [key: string]: any } = {
  'flat': flatTheme,
  'paper': paperTheme,
  'elegant': elegantTheme,
  'kendall': kendallTheme,
};

export async function POST(request: NextRequest) {
  try {
    const { data, templateId, isPro } = await request.json();

    // For now, map templateId to a default theme. Full integration with Reactive Resume templates requires more setup.
    const defaultTheme = 'flat';
    const themePackage = themeMap[defaultTheme];
    if (!themePackage) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 400 });
    }

    const theme = require(themePackage) as any;
    let html = theme.render(data);

    if (!isPro) {
      // Add watermark
      html = html.replace('</body>', '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; font-size: 48px; color: gray;">Vellon 2.0</div></body>');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return new Response(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}