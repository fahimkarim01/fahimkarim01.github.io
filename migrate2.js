const fs = require('fs');
const path = require('path');

console.log('Migrating MDX content and configuring Starlight...');

const srcDocs = path.join(process.cwd(), 'src', 'content', 'docs');
const tempContent = path.join(process.cwd(), 'temp_content');

// 1. Clear out the default Starlight docs
if (fs.existsSync(srcDocs)) {
  fs.rmSync(srcDocs, { recursive: true, force: true });
}
fs.mkdirSync(srcDocs, { recursive: true });

// 2. Copy and transform MDX files
const files = fs.readdirSync(tempContent);
for (const file of files) {
  if (file === '_meta.json') continue; // We'll handle this in astro.config.mjs
  
  let content = fs.readFileSync(path.join(tempContent, file), 'utf8');
  
  // Transform Nextra specific things
  if (file === 'achievements.mdx') {
    content = content.replace(
      "import { Callout } from 'nextra/components'",
      "import { Aside } from '@astrojs/starlight/components'"
    );
    content = content.replace(
      '<Callout type="success" emoji="🎉">',
      '<Aside type="tip" title="🎉 Success">'
    );
    content = content.replace('</Callout>', '</Aside>');
  }
  
  fs.writeFileSync(path.join(srcDocs, file), content);
  console.log(`Migrated ${file}`);
}

// 3. Update astro.config.mjs
const configPath = path.join(process.cwd(), 'astro.config.mjs');
let config = fs.readFileSync(configPath, 'utf8');

// Replace default sidebar with portfolio sidebar
const newSidebar = `
			title: 'Portfolio',
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Projects', link: '/projects/' },
				{ label: 'Skills', link: '/skills/' },
				{ label: 'Achievements', link: '/achievements/' },
				{ label: 'Research', link: '/research/' },
				{ label: 'Contact', link: '/contact/' },
			],
			customCss: [],
`;
config = config.replace(/title: 'My Docs',[\s\S]*?sidebar: \[[\s\S]*?\],/g, newSidebar);
fs.writeFileSync(configPath, config);
console.log('Updated astro.config.mjs');

console.log('✅ Content migration complete! You can now test it.');
