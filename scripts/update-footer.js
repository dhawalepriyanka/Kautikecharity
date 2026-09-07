import sharp from 'sharp';

async function updateTemplateFooter() {
  const footerSvg = `
    <svg width="1149" height="1369" xmlns="http://www.w3.org/2000/svg">
      <!-- Clean background for the contact bar (inside the green outer border) -->
      <rect x="35" y="1265" width="1079" height="60" fill="#EBF3EE" />

      <!-- Contact Bar Content -->
      <!-- Address -->
      <g transform="translate(60, 1290)">
        <text x="0" y="0" font-family="'Segoe UI Emoji', Arial" font-size="15px" fill="#134B36">📍</text>
        <text x="20" y="-1" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="11.5px" font-weight="600" fill="#1E293B">Office No. A-1, D'Souza Sadan, Sakinaka, Mumbai - 400 072</text>
      </g>

      <!-- Phone -->
      <g transform="translate(450, 1290)">
        <text x="0" y="0" font-family="'Segoe UI Emoji', Arial" font-size="14px" fill="#134B36">📞</text>
        <text x="18" y="-1" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="11.5px" font-weight="600" fill="#1E293B">+91 83560 08675 / 81083 62688</text>
      </g>

      <!-- Email -->
      <g transform="translate(710, 1290)">
        <text x="0" y="0" font-family="'Segoe UI Emoji', Arial" font-size="14px" fill="#134B36">✉️</text>
        <text x="20" y="-1" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="11.5px" font-weight="600" fill="#1E293B">kc.foundation2025@gmail.com</text>
      </g>

      <!-- Website -->
      <g transform="translate(940, 1290)">
        <text x="0" y="0" font-family="'Segoe UI Emoji', Arial" font-size="14px" fill="#134B36">🌐</text>
        <text x="20" y="-1" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="11.5px" font-weight="600" fill="#1E293B">kautikefoundation.org</text>
      </g>

      <!-- Bottom Centered Slogan -->
      <rect x="150" y="1330" width="850" height="28" fill="#FFFFFF" />
      <text x="574" y="1348" font-family="'Inter', 'Segoe UI', Arial, sans-serif" font-size="13px" font-style="italic" font-weight="600" fill="#134B36" text-anchor="middle">
        Thank you for being a part of our journey towards a better tomorrow! 💚
      </text>
    </svg>
  `;

  const orig = await sharp('public/images/receipt-clean-template.png').toBuffer();

  await sharp(orig)
    .composite([
      { input: Buffer.from(footerSvg), top: 0, left: 0 }
    ])
    .toFile('public/images/receipt-clean-template.png');

  console.log('Successfully updated footer in receipt-clean-template.png');
}
updateTemplateFooter();
