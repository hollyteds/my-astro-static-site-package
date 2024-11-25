import fs from 'fs';
import path from 'path';

function codeFormatting() {
  
  return {
    name: 'code-formatting',
    hooks: {
      'astro:build:done': ({ dir }) => {

        const targetDir = path.join(dir.pathname, ''); // 出力ディレクトリのパス
        const processFiles = (currentDir) => {
          const files = fs.readdirSync(currentDir);
  
          files.forEach((file) => {
            const filePath = path.join(currentDir, file);
  
            if (fs.statSync(filePath).isDirectory()) {
              // サブディレクトリの場合、再帰的に処理
              processFiles(filePath);
            } else if (file.endsWith('.html')) {
              // HTMLファイルの場合、置換処理を行う
              let content = fs.readFileSync(filePath, 'utf-8');
  
              // 正規表現による置換
              content = content
                .replace(/> </g, '><')
                .replace(/^\s*[\r\n]/gm, '')
                .replace(/<\/span>\s*<span/g, '</span><span') 
                .replace(/([^<>\n]+)\n\s*(<\/a>)/g, '$1$2')
                .replace(/([^<>\n]+)\n\s*(<\/button>)/g, '$1$2');

              // 変更をファイルに上書き
              fs.writeFileSync(filePath, content, 'utf-8');
            }
          })
        }
        processFiles(targetDir);
      },
    }
  }
}

export default function () {
  return {
      name: 'code-formatting',
      hooks: {
          'astro:config:setup': ({ config, updateConfig }) => {
              updateConfig({
                  integrations: [codeFormatting({ config })],
              });
          },
      },
  };
}

